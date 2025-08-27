import React from 'react';
import { Bot, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  hasAgents: boolean;
  onCreateAgent: () => void;
  onClearFilters: () => void;
}

export const EmptyState = ({ hasAgents, onCreateAgent, onClearFilters }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="flex flex-col items-center text-center max-w-md space-y-6">
        <div className="rounded-full bg-muted p-6">
          {!hasAgents ? (
            <Bot className="h-12 w-12 text-muted-foreground" />
          ) : (
            <Search className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-foreground">
            {!hasAgents ? 'Пока нет ИИ-агентов' : 'ИИ-агенты не найдены'}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {!hasAgents ? (
              'Создайте своего первого ИИ-агента, чтобы начать автоматизировать задачи с помощью пользовательских инструкций и инструментов. Настройте пользовательские возможности AgentPress для точной настройки ИИ-агента в соответствии с вашими потребностями.'
            ) : (
              'No agents match your current search and filter criteria. Try adjusting your filters or search terms.'
            )}
          </p>
        </div>
        {!hasAgents ? (
          <Button 
            size="lg" 
            onClick={onCreateAgent}
            className="mt-4"
          >
            <Plus className="h-5 w-5" />
            'Создайте своего первого ИИ-агента'
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={onClearFilters}
            className="mt-4"
          >
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}