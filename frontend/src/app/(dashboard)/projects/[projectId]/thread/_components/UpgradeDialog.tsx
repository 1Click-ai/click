import React from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Clock, Crown, Sparkles, Zap } from 'lucide-react';
import { UpgradeDialog as UnifiedUpgradeDialog } from '@/components/ui/upgrade-dialog';

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDismiss: () => void;
}

export function UpgradeDialog({ open, onOpenChange, onDismiss }: UpgradeDialogProps) {
  const router = useRouter();

  const handleUpgradeClick = () => {
    router.push('/settings/billing');
    onOpenChange(false);
    localStorage.setItem('suna_upgrade_dialog_displayed', 'true');
  };

  return (
    <UnifiedUpgradeDialog
      open={open}
      onOpenChange={onOpenChange}
      icon={Crown}
      title="Разблокируйте полный потенциал КЛИК"
      description="Сейчас вы используете бесплатный тариф КЛИК с ограниченными возможностями. Обновитесь сейчас, чтобы получить доступ к нашей самой мощной ИИ-модели."
      theme="primary"
      size="sm"
      preventOutsideClick={true}
      actions={[
        {
          label: "Может быть, позже",
          onClick: onDismiss,
          variant: "outline"
        },
        {
          label: "Обновить сейчас",
          onClick: handleUpgradeClick,
          icon: Sparkles
        }
      ]}
    >
      <div className="py-4">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Преимущества Pro</h3>

        <div className="space-y-3">
          <div className="flex items-start">
            <div className="rounded-full bg-secondary/10 p-2 flex-shrink-0 mt-0.5">
              <Brain className="h-4 w-4 text-secondary" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Продвинутые модели ИИ</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Получите доступ к продвинутым моделям, подходящим для сложных задач</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="rounded-full bg-secondary/10 p-2 flex-shrink-0 mt-0.5">
              <Zap className="h-4 w-4 text-secondary" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Более быстрые ответы</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Получите доступ к более быстрым моделям, которые легко справляются с вашими задачами</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="rounded-full bg-secondary/10 p-2 flex-shrink-0 mt-0.5">
              <Clock className="h-4 w-4 text-secondary" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">Более высокие лимиты использования</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Наслаждайтесь большим количеством разговоров и большей продолжительностью выполнения</p>
            </div>
          </div>
        </div>
      </div>
    </UnifiedUpgradeDialog>
  );
} 