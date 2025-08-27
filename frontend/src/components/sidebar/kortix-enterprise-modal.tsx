import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import Image from 'next/image';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useTheme } from 'next-themes';
import { Check, Calendar } from 'lucide-react';

interface EnterpriseModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function KortixEnterpriseModal({ 
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange
}: EnterpriseModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  // Use controlled or internal state
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'enterprise-demo' });
      cal('ui', { hideEventTypeDetails: true, layout: 'month_view' });
    })();
  }, []);

  const benefits = [
    "Персональный архитектор решений",
    "Корпоративная безопасность и соответствие стандартам",
    "Кастомная интеграция с существующими системами",
    "Комплексное обучение команды",
    "Приоритетная поддержка и постоянная оптимизация",
    "Масштабируемая архитектура для роста",
    "Мониторинг производительности и аналитика",
    "100% гарантия удовлетворенности"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 border-none max-w-[90vw] lg:max-w-[80vw] xl:max-w-[70vw] rounded-xl overflow-hidden">
        <DialogTitle className="sr-only">
Корпоративное внедрение ИИ - Запланировать консультацию
        </DialogTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[700px] lg:h-[800px]">
          {/* Enhanced Info Panel */}
          <div className="p-6 lg:p-8 flex flex-col bg-white dark:bg-black relative h-full overflow-y-auto border-r border-gray-200 dark:border-gray-800">
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 flex-shrink-0">
                <Image
                  src={isDarkMode ? '/kortix-logo-white.svg' : '/kortix-logo.svg'}
                  alt="Логотип КЛИК"
                  width={80}
                  height={28}
                  className="h-7 w-auto"
                />
              </div>

              <div className="mb-6 flex-shrink-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-xs font-medium text-primary">Корпоративное внедрение</span>
                </div>
                
                <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-3 text-foreground">
Создадим ваше ИИ-решение
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground mb-6 leading-relaxed">
Запланируйте стратегическую сессию с нашими архитекторами решений, чтобы исследовать, как кастомные ИИ-агенты могут трансформировать ваши бизнес-процессы.
                </p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex-1">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Что включено</h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-6 flex-shrink-0">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>Бесплатная стратегическая сессия</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
30-минутная консультация • Никаких обязательств
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Panel */}
          <div className="bg-white dark:bg-[#171717] h-full overflow-hidden">
            <div className="h-full overflow-auto">
              <Cal
                namespace="enterprise-demo"
                calLink="problemx"
                style={{ width: '100%', height: '100%' }}
                config={{
                  layout: 'month_view',
                  hideEventTypeDetails: 'false',
                }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Export with original name for backwards compatibility
export const KortixProcessModal = KortixEnterpriseModal;
