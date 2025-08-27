"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Edit,
  Trash2,
  ExternalLink,
  MessageSquare,
  Webhook,
  Clock,
  Mail,
  Github,
  Gamepad2,
  Activity,
  Copy,
  Zap,
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { TriggerConfiguration } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getTriggerIcon } from './utils';
import { cn, truncateString } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ConfiguredTriggersListProps {
  triggers: TriggerConfiguration[];
  onEdit: (trigger: TriggerConfiguration) => void;
  onRemove: (trigger: TriggerConfiguration) => void;
  onToggle: (trigger: TriggerConfiguration) => void;
  isLoading?: boolean;
  onAddNewTrigger: () => void;
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

const getCronDescription = (cron: string): string => {
  const cronDescriptions: Record<string, string> = {
    '0 9 * * *': 'Daily at 9:00 AM',
    '0 18 * * *': 'Daily at 6:00 PM',
    '0 9 * * 1-5': 'Weekdays at 9:00 AM',
    '0 10 * * 1-5': 'Weekdays at 10:00 AM',
    '0 9 * * 1': 'Every Monday at 9:00 AM',
    '0 9 1 * *': 'Monthly on the 1st at 9:00 AM',
    '0 9 1 1 *': 'Yearly on Jan 1st at 9:00 AM',
    '0 */2 * * *': 'Every 2 hours',
    '*/30 * * * *': 'Every 30 minutes',
    '0 0 * * *': 'Daily at midnight',
    '0 12 * * *': 'Daily at noon',
    '0 9 * * 0': 'Every Sunday at 9:00 AM',
    '0 9 * * 6': 'Every Saturday at 9:00 AM',
  };

  return cronDescriptions[cron] || cron;
};

export const ConfiguredTriggersList: React.FC<ConfiguredTriggersListProps> = ({
  triggers,
  onEdit,
  onRemove,
  onToggle,
  isLoading = false,
  onAddNewTrigger,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [triggerToDelete, setTriggerToDelete] = React.useState<TriggerConfiguration | null>(null);

  const handleDeleteClick = (trigger: TriggerConfiguration) => {
    setTriggerToDelete(trigger);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (triggerToDelete) {
      onRemove(triggerToDelete);
      setTriggerToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (triggerToDelete) {
      onRemove(triggerToDelete);
      setTriggerToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const renderTrigger = (trigger: TriggerConfiguration) => {
    return (
      <div
        key={trigger.trigger_id}
        className={`flex items-stretch justify-between p-4 rounded-xl border transition-all duration-200 overflow-hidden ${trigger.is_active
          ? "bg-card hover:bg-muted/50 border-border"
          : "bg-muted/20 hover:bg-muted/30 border-muted-foreground/30"
          }`}
      >
        <div className="flex items-stretch space-x-4 flex-1 min-w-0">
          <div className={`h-10 min-h-10 max-h-10 w-10 rounded-xl border transition-colors flex-shrink-0 flex items-center justify-center ${trigger.is_active
            ? "bg-muted border-border"
            : "bg-muted/50 border-muted-foreground/20"
            } ${trigger.is_active ? "" : "opacity-70"}`}>
            {getTriggerIcon(trigger.trigger_type)}
          </div>

          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`text-sm font-medium truncate transition-colors ${trigger.is_active ? "text-foreground" : "text-muted-foreground"
                }`}>
                {trigger.name}
              </h4>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={cn('h-2 w-2 rounded-full', trigger.is_active ? 'bg-green-500' : 'bg-red-500')} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{trigger.is_active ? 'Активный' : 'Неактивный'}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {trigger.description && (
              <p className={`text-xs truncate transition-colors ${trigger.is_active ? "text-muted-foreground" : "text-muted-foreground/80"
                }`}>
                {truncateString(trigger.description, 50)}
              </p>
            )}
            {trigger.trigger_type === 'schedule' && trigger.config && (
              <div className={`text-xs mt-1 transition-colors ${trigger.is_active ? "text-muted-foreground" : "text-muted-foreground/80"
                }`}>
                {trigger.config.execution_type === 'agent' && trigger.config.agent_prompt && (
                  <p>Промпт: {truncateString(trigger.config.agent_prompt, 40)}</p>
                )}
                {trigger.config.execution_type === 'workflow' && trigger.config.workflow_id && (
                  <p>Workflow: {trigger.config.workflow_id}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <Switch
                  checked={trigger.is_active}
                  onCheckedChange={() => onToggle(trigger)}
                  disabled={isLoading}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{trigger.is_active ? 'Отключить' : 'Включить'} триггер</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(trigger)}
                className={`h-8 w-8 p-0 transition-opacity ${trigger.is_active ? "" : "opacity-70"
                  }`}
                disabled={isLoading}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Редактировать триггер</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className={`h-8 w-8 p-0 text-muted-foreground hover:text-destructive transition-opacity ${trigger.is_active ? "" : "opacity-70"
                  }`}
                disabled={isLoading}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => copyToClipboard(trigger.trigger_id)}>
                <Copy className="h-4 w-4 mr-2" />
                <p>Копировать</p>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteClick(trigger)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="h-4 w-4" />
                <p>Удалить триггер</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {triggers.length === 0 ? (
        <div className="text-center py-12 px-6 bg-muted/30 rounded-xl border-2 border-dashed border-border">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4 border">
            <Zap className="h-6 w-6 text-muted-foreground" />
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-2">
            Нет триггеров
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Триггеры автоматически запускают рабочего процесса агента на основе определенных событий или расписаний.
          </p>
          <Button onClick={onAddNewTrigger} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Добавить новый триггер
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {triggers.map((trigger) => renderTrigger(trigger))}
        </div>
      )}

      <AlertDialog open={!!triggerToDelete} onOpenChange={() => setTriggerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить триггер?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить триггер "{triggerToDelete?.name}"? Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90 text-white">
              Удалить триггер
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}; 