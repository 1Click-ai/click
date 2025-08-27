# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev         # Start development server with Turbopack
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
```

### Installation
```bash
npm install         # Install dependencies
```

## Architecture

### Project Structure
This is a Next.js 15 frontend application (named "Kortix" in package.json, branded as "КЛИК") for an AI agent platform. The application is built with:

- **Framework**: Next.js 15 with App Router and Turbopack for development
- **Language**: TypeScript with relaxed strict mode (strict: false)
- **Styling**: Tailwind CSS v4 with custom UI components
- **Database**: Supabase with SSR support
- **State Management**: Zustand for client state, React Query for server state
- **Authentication**: Supabase Auth with MFA support via @supabase/ssr
- **UI Components**: Radix UI primitives with custom component library
- **Real-time**: Supabase realtime subscriptions
- **Analytics**: PostHog, Vercel Analytics, Google Analytics
- **Payments**: Stripe integration for billing/subscriptions

### Key Directories

#### `/src/app/` - Next.js App Router
- `(dashboard)/` - Main authenticated dashboard routes
  - `agents/` - Agent management (configuration, workflows, triggers)
  - `projects/` - Project and thread management
  - `settings/` - User/team settings, billing, API keys
- `(home)/` - Marketing/landing pages
- `api/` - API routes (webhooks, integrations, OG images)
- `auth/` - Authentication flows
- `share/` - Public shared threads

#### `/src/components/` - React Components
- `agents/` - Agent-related components (builders, configs, marketplace)
- `thread/` - Chat interface and message handling
- `ui/` - Base UI components (buttons, dialogs, forms)
- `sidebar/` - Navigation and search
- `billing/` - Payment and subscription components
- `file-renderers/` - File preview components

#### `/src/lib/` - Core Libraries
- `api.ts` - Main API client with comprehensive error handling
- `supabase/` - Database client configuration
- `hooks/` - React Query hooks for data fetching
- `stores/` - Zustand state stores
- `utils.ts` - Utility functions

### Core Concepts

#### Authentication Architecture
- Uses Supabase Auth with JWT tokens
- Supports phone verification with OTP
- Session management via @supabase/ssr
- MFA support for enterprise users
- Team-based access control via Basejump

#### Agent System
- Agents are configurable ИИ-агенты
- Support for custom tools via MCP (Model Context Protocol)
- Workflow builder for conditional logic
- Trigger system for scheduled/event-based execution
- Version management for agent configurations
- Integration with Composio for third-party tools

#### Project/Thread Model
- Projects contain multiple conversation threads
- Threads support real-time messaging
- File attachments and sandbox integration
- Public sharing capabilities
- Message streaming via Server-Sent Events

#### Billing Integration
- Stripe-based subscription management
- Usage tracking and limits
- Credit system for pay-per-use
- Commitment-based pricing options
- Portal integration for customer management

### API Integration
The frontend communicates with a Python backend via:
- REST API at `NEXT_PUBLIC_BACKEND_URL`
- Server-Sent Events for real-time streaming
- FormData uploads for file handling
- JWT authentication via Supabase tokens

### Development Notes
- TypeScript configuration allows implicit any and unused variables
- ESLint rules are relaxed for rapid development
- Uses Geist font family for typography
- PostHog integration for analytics and feature flags
- Environment variables managed via `.env.local`

### Error Handling
The API client includes comprehensive error handling with:
- Custom error types (BillingError, AgentRunLimitError, etc.)
- Automatic retry logic for certain failures
- User-friendly error messages
- Silent error handling for non-critical operations

### File Structure Patterns
- Components use barrel exports (`index.ts` files)
- Hooks are organized by feature area
- API functions grouped by resource type
- Types defined alongside implementation files
- Utilities separated into focused modules

### Team/Account Management
Built on Basejump for multi-tenant architecture:
- Personal accounts (user ID-based)
- Team accounts with role-based access
- Invitation system for team members
- Account switching capabilities