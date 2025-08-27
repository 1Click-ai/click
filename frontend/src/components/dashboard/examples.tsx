'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Bot,
  Briefcase,
  Settings,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
  Brain,
  Globe,
  Heart,
  PenTool,
  Code,
  Camera,
  Calendar,
  DollarSign,
  Rocket,
} from 'lucide-react';

type PromptExample = {
  title: string;
  query: string;
  icon: React.ReactNode;
};

const allPrompts: PromptExample[] = [
  // {
  //   title: 'Найти карту лучших пекарен',
  //   query: '1. Искать в Google Maps "лучшие пекарни в {{city}}"\n2. Создать собственный список из {{number}} лучших пекарен\n3. Для каждой пекарни собрать:\n   - Рейтинги клиентов и популярные товары\n   - Часы работы, местоположение и специализацию\n   - Диапазон цен и выпечку, которую стоит попробовать\n4. Сгенерировать резюме с рекомендациями',
    
  //   icon: <Globe className="text-blue-700 dark:text-blue-400" size={16} />,
  // },
  {
    title: 'Исследовать данные об образовании',
    query: '1. Получить доступ к базе данных ЮНЕСКО для статистики образования по {{topic}}\n2. Собрать данные о:\n   - Коэффициентах охвата студентов по регионам\n   - Соотношении учителей и учеников в мире\n   - Расходах на образование в % от ВВП\n3. Создать структурированную таблицу с тенденциями\n4. Сгенерировать краткое резюме с ключевыми выводами',
    
    icon: <BarChart3 className="text-purple-700 dark:text-purple-400" size={16} />,
  },
  {
    title: 'Спланировать маршрут путешествия',
    query: '1. Исследовать {{destination}} на TripAdvisor для {{duration}}-дневной поездки\n2. Найти лучшие достопримечательности, рестораны и развлечения\n3. Оптимизировать ежедневное расписание по местоположению и часам работы\n4. Включить информацию о транспорте, погоде и запасных планах\n5. Создать ежедневный маршрут с временными блоками',
    
    icon: <Calendar className="text-rose-700 dark:text-rose-400" size={16} />,
  },
  {
    title: 'Анализировать новости в СМИ',
    query: '1. Искать в {{news_outlet}} статьи по {{topic}} за последний {{time_period}}\n2. Категоризировать освещение и определить ключевые темы\n3. Отслеживать экспертные источники и данные\n4. Создать хронологию основных событий\n5. Сгенерировать отчет с выводами и пробелами в освещении',
    
    icon: <PenTool className="text-indigo-700 dark:text-indigo-400" size={16} />,
  },
  // {
  //   title: 'Book restaurant reservations',
  //   query: '1. Search OpenTable for restaurants in {{city}} for {{occasion}}\n2. Filter by date, party size, and cuisine preferences\n3. Check reviews and menu highlights\n4. Make reservations at {{number}} restaurants\n5. Create itinerary with confirmation details',
    
  //   icon: <Users className="text-emerald-700 dark:text-emerald-400" size={16} />,
  // },
  {
    title: 'Построить финансовую модель',
    query: '1. Создать {{model_type}} модель для бизнеса типа {{company_type}}\n2. Собрать исторические данные и отраслевые показатели\n3. Построить прогнозы доходов и расходов\n4. Включить анализ DCF, LTV/CAC или NPV\n5. Разработать дашборд в Excel со сценариями',
    
    icon: <DollarSign className="text-orange-700 dark:text-orange-400" size={16} />,
  },
  {
    title: 'Разработать рыночную стратегию',
    query: '1. Создать стратегию выхода на рынок для запуска {{product_type}}\n2. Проанализировать целевой рынок и конкурентную среду\n3. Разработать стратегию входа на рынок и ценообразования\n4. Построить финансовые прогнозы и временную шкалу\n5. Создать презентацию с рекомендациями',
    
    icon: <Target className="text-cyan-700 dark:text-cyan-400" size={16} />,
  },
  {
    title: 'Исследовать информацию о компании',
    query: '1. Всесторонне исследовать {{company_name}}\n2. Собрать последние новости, информацию о финансировании и руководстве\n3. Проанализировать конкурентную позицию и долю рынка\n4. Исследовать биографии ключевых сотрудников\n5. Создать подробный профиль с практическими выводами',
    
    icon: <Briefcase className="text-teal-700 dark:text-teal-400" size={16} />,
  },
  {
    title: 'Аудит продуктивности календаря',
    query: '1. Проанализировать данные из {{calendar_app}} за последние {{months}} месяцев\n2. Оценить частоту встреч и время для сфокусированной работы\n3. Определить возможности для оптимизации\n4. Проанализировать шаблоны эффективности встреч\n5. Сгенерировать рекомендации и план внедрения',
    
    icon: <Calendar className="text-violet-700 dark:text-violet-400" size={16} />,
  },
  {
    title: 'Исследовать отраслевые тенденции',
    query: '1. Исследовать тенденции в {{industry}} из {{data_sources}}\n2. Собрать данные об инвестиционной активности и технологических разработках\n3. Проанализировать рыночные драйверы и возможности\n4. Определить новые темы и пробелы\n5. Создать всеобъемлющий отчет с рекомендациями',
    
    icon: <TrendingUp className="text-pink-700 dark:text-pink-400" size={16} />,
  },
  {
    title: 'Автоматизировать обработку заявок в поддержку',
    query: '1. Мониторить {{support_platform}} на предмет входящих заявок\n2. Категоризировать проблемы и оценивать срочность\n3. Искать решения в {{knowledge_base}}\n4. Автоматически отвечать или эскалировать в зависимости от уверенности\n5. Отслеживать метрики и генерировать ежедневные отчеты',
    
    icon: <Shield className="text-yellow-600 dark:text-yellow-300" size={16} />,
  },
  {
    title: 'Исследовать юридическое соответствие',
    query: '1. Исследовать {{legal_topic}} в разных {{jurisdictions}}\n2. Сравнить требования и сборы штатов\n3. Проанализировать факторы принятия решений и их последствия\n4. Собрать детали практической реализации\n5. Создать сравнительную таблицу с рекомендациями',
    
    icon: <Settings className="text-red-700 dark:text-red-400" size={16} />,
  },
  {
    title: 'Скомпилировать анализ данных',
    query: '1. Собрать {{data_topic}} из {{data_sources}}\n2. Очистить и стандартизировать наборы данных\n3. Проанализировать закономерности и рассчитать тенденции\n4. Создать таблицу с визуализациями\n5. Предоставить стратегические рекомендации',

    
    icon: <BarChart3 className="text-slate-700 dark:text-slate-400" size={16} />,
  },
  {
    title: 'Планировать контент для социальных сетей',
    query: '1. Создать социальную стратегию на {{duration}} для {{brand}}\n2. Исследовать популярные темы и контент конкурентов\n3. Разработать контент-календарь с {{posts_per_week}} постами\n4. Создать контент для конкретных платформ и график публикаций\n5. Настроить аналитику и ежемесячную отчетность',
    
    icon: <Camera className="text-stone-700 dark:text-stone-400" size={16} />,
  },
  {
    title: 'Сравнить продукты',
    query: '1. Всесторонне исследовать варианты {{product_category}}\n2. Собрать научные исследования и мнения экспертов\n3. Проанализировать преимущества, недостатки и затраты\n4. Исследовать текущее мнение экспертов\n5. Создать сравнительный отчет с персональными рекомендациями',
    
    icon: <Brain className="text-fuchsia-700 dark:text-fuchsia-400" size={16} />,
  },
  {
    title: 'Анализировать рыночные возможности',
    query: '1. Исследовать {{market_topic}} на предмет инвестиционных возможностей\n2. Проанализировать размер рынка, рост и ключевых игроков\n3. Определить инвестиционные темы и риски\n4. Оценить рыночные вызовы и барьеры\n5. Создать инвестиционную презентацию с рекомендациями',
    
    icon: <Rocket className="text-green-600 dark:text-green-300" size={16} />,
  },
  {
    title: 'Обрабатывать счета и документы',
    query: '1. Сканировать {{document_folder}} на наличие счетов в формате PDF\n2. Извлекать ключевые данные: номера, даты, суммы, поставщиков\n3. Организовать данные со стандартизированными полями\n4. Создать комплексную таблицу для отслеживания\n5. Генерировать ежемесячные финансовые отчеты',

    
    icon: <Heart className="text-amber-700 dark:text-amber-400" size={16} />,
  },
  {
    title: 'Поиск талантов и кандидатов',
    query: '1. Искать кандидатов на должность {{job_title}} в {{location}}\n2. Использовать LinkedIn, GitHub и доски объявлений о работе\n3. Оценивать навыки, опыт и соответствие культуре\n4. Создать ранжированный список кандидатов\n5. Разработать персонализированную стратегию outreach',

    
    icon: <Users className="text-blue-600 dark:text-blue-300" size={16} />,
  },
  {
    title: 'Создать профессиональный веб-сайт',
    query: '1. Всесторонне исследовать {{person_name}} в Интернете\n2. Проанализировать профессиональный бренд и достижения\n3. Разработать структуру и содержание веб-сайта\n4. Создать оптимизированные страницы с портфолио\n5. Внедрить функции SEO и производительности',

    
    icon: <Globe className="text-red-600 dark:text-red-300" size={16} />,
  },
];

// Function to get random prompts
const getRandomPrompts = (count: number = 3): PromptExample[] => {
  const shuffled = [...allPrompts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const Examples = ({
  onSelectPrompt,
  count = 3,
}: {
  onSelectPrompt?: (query: string) => void;
  count?: number;
}) => {
  const [displayedPrompts, setDisplayedPrompts] = useState<PromptExample[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initialize with random prompts on mount
  useEffect(() => {
    setDisplayedPrompts(getRandomPrompts(count));
  }, [count]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setDisplayedPrompts(getRandomPrompts(count));
    setTimeout(() => setIsRefreshing(false), 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="group relative">
        <div className="flex gap-2 justify-center py-2 flex-wrap">
          {displayedPrompts.map((prompt, index) => (
            <motion.div
              key={`${prompt.title}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: index * 0.03,
                ease: "easeOut"
              }}
            >
              <Button
                variant="outline"
                className="w-fit h-fit px-3 py-2 rounded-full border-neutral-200 dark:border-neutral-800 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
    
                onClick={() => onSelectPrompt && onSelectPrompt(prompt.query)}
              >
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    {React.cloneElement(prompt.icon as React.ReactElement, { size: 14 })}
                  </div>
                  <span className="whitespace-nowrap">{prompt.title}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Refresh button that appears on hover */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="absolute -top-4 right-1 h-5 w-5 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"                                 
        >
          <motion.div
            animate={{ rotate: isRefreshing ? 360 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <RefreshCw size={10} className="text-muted-foreground" />
          </motion.div>
        </Button>
      </div>
    </div>
  );
};