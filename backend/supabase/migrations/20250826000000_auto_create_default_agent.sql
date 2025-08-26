BEGIN;

-- Function to create a default Suna agent for a user
CREATE OR REPLACE FUNCTION create_default_suna_agent(p_account_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    new_agent_id UUID;
    agent_data JSONB;
BEGIN
    -- Default Suna configuration
    agent_data := jsonb_build_object(
        'is_suna_default', true,
        'centrally_managed', true,
        'installation_date', NOW()
    );

    -- Create the default agent
    INSERT INTO agents (
        account_id,
        name,
        description,
        is_default,
        avatar,
        avatar_color,
        metadata,
        version_count
    ) VALUES (
        p_account_id,
        'MEVO',
        'MEVO is your AI assistant with access to various tools and integrations to help you with tasks across domains.',
        true,
        '🌞',
        '#F59E0B',
        agent_data,
        1
    ) RETURNING agent_id INTO new_agent_id;

    RETURN new_agent_id;
END;
$$;

-- Function to ensure user has a default agent
CREATE OR REPLACE FUNCTION ensure_user_has_default_agent(p_account_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    agent_count INTEGER;
    new_agent_id UUID;
BEGIN
    -- Check if user has any agents
    SELECT COUNT(*) INTO agent_count
    FROM agents
    WHERE account_id = p_account_id;
    
    -- If no agents exist, create default Suna agent
    IF agent_count = 0 THEN
        SELECT create_default_suna_agent(p_account_id) INTO new_agent_id;
        RETURN new_agent_id;
    END IF;
    
    RETURN NULL;
END;
$$;

-- Update the user setup function to include default agent creation
CREATE OR REPLACE FUNCTION basejump.run_new_user_setup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    first_account_id UUID;
    generated_user_name TEXT;
    new_agent_id UUID;
BEGIN
    -- First we setup the user profile
    IF new.email IS NOT NULL THEN
        generated_user_name := split_part(new.email, '@', 1);
    END IF;
    
    -- Create the new user's personal account
    INSERT INTO basejump.accounts (name, primary_owner_user_id, personal_account, id)
    VALUES (generated_user_name, NEW.id, true, NEW.id)
    RETURNING id INTO first_account_id;

    -- Add them to the account_user table so they can act on it
    INSERT INTO basejump.account_user (account_id, user_id, account_role)
    VALUES (first_account_id, NEW.id, 'owner');

    -- Create default Suna agent for the new user
    SELECT create_default_suna_agent(first_account_id) INTO new_agent_id;

    RETURN NEW;
END;
$$;

-- Create a function to check and create default agents for existing users
CREATE OR REPLACE FUNCTION check_and_create_default_agents()
RETURNS TABLE (
    account_id UUID,
    agent_created BOOLEAN,
    agent_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    account_record RECORD;
    new_agent_id UUID;
    agent_count INTEGER;
BEGIN
    -- Loop through all personal accounts
    FOR account_record IN 
        SELECT id FROM basejump.accounts WHERE personal_account = true
    LOOP
        -- Check if account has any agents
        SELECT COUNT(*) INTO agent_count
        FROM agents
        WHERE agents.account_id = account_record.id;
        
        IF agent_count = 0 THEN
            -- Create default agent
            SELECT create_default_suna_agent(account_record.id) INTO new_agent_id;
            
            -- Return the result
            RETURN QUERY SELECT account_record.id, true, new_agent_id;
        ELSE
            -- User already has agents
            RETURN QUERY SELECT account_record.id, false, NULL::UUID;
        END IF;
    END LOOP;
END;
$$;

-- Grant permissions
GRANT EXECUTE ON FUNCTION create_default_suna_agent(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION ensure_user_has_default_agent(UUID) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION check_and_create_default_agents() TO authenticated, service_role;

-- Run the function once to create default agents for existing users who don't have any
SELECT * FROM check_and_create_default_agents();

COMMIT;