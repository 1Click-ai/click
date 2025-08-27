'use client';

import { SectionHeader } from '@/components/home/section-header';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

// Simple Agent Card Component
const AgentCard = ({ agent }: { agent: any }) => {
  return (
    <motion.div
      className="flex flex-col items-start justify-end min-h-[400px] relative group cursor-pointer hover:bg-accent/30 transition-colors duration-300"
    >
      <div className="relative flex size-full items-center justify-center h-full overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
        
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 text-center">
          <motion.div 
            className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {agent.icon}
          </motion.div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold tracking-tighter group-hover:text-primary transition-colors">
              {agent.name}
            </h3>
            <p className="text-sm text-primary/70 font-medium uppercase tracking-wider">
              {agent.role}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {agent.desc}
            </p>
          </div>

          <motion.button
            className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            Попробовать {agent.name} 
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 flex-col gap-2 p-6">
        <h4 className="text-lg tracking-tighter font-semibold">
          {agent.name} • {agent.role}
        </h4>
        <p className="text-muted-foreground text-sm">
          {agent.shortDesc || agent.desc.split('.')[0] + '.'}
        </p>
      </div>
    </motion.div>
  );
};

// Custom Agent Card Component
const CustomAgentCard = () => {
  return (
    <motion.div
      className="flex flex-col items-start justify-end min-h-[400px] relative group cursor-pointer hover:bg-primary/5 transition-colors duration-300"
    >
      <div className="relative flex size-full items-center justify-center h-full overflow-hidden">
        <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
        
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 p-8 text-center">
          <motion.div 
            className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            ⚡
          </motion.div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-semibold tracking-tighter group-hover:text-primary transition-colors">
              Создайте своего
            </h3>
            <p className="text-sm text-primary/70 font-medium uppercase tracking-wider">
              Пользовательский агент
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Создайте специализированного ИИ-сотрудника, адаптированного к вашим уникальным бизнес-потребностям и рабочему процессу.
            </p>
          </div>

          <motion.button
            className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-all duration-300"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            Начать создание 
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 flex-col gap-2 p-6">
        <h4 className="text-lg tracking-tighter font-semibold">
          Пользовательский агент • Ваш выбор
        </h4>
        <p className="text-muted-foreground text-sm">
          Создайте своего собственного ИИ-специалиста для любой задачи или отрасли
        </p>
      </div>
    </motion.div>
  );
};

// Agent Grid Component
const AgentGrid = () => {
  const agents = [
    { 
      name: 'Maya', 
      role: 'Копирайтер', 
      icon: '✍️', 
      desc: 'Создает привлекательные тексты для рекламы, блогов и маркетинговых кампаний, которые превращают читателей в клиентов.',
      shortDesc: 'ИИ-копирайтер для маркетингового контента и кампаний'
    },
    { 
      name: 'Hunter', 
      role: 'Рекрутер', 
      icon: '🎯', 
      desc: 'Превращает проблемы с наймом в возможности с помощью привлекательных вакансий и гладкого онбординга.',
      shortDesc: 'ИИ-рекрутер для размещения вакансий и отбора кандидатов'
    },
    { 
      name: 'Nova', 
      role: 'SEO-специалист', 
      icon: '📈', 
      desc: 'Повышает рейтинг сайта с помощью проверенных SEO-стратегий и оптимизированного контента.',
      shortDesc: 'ИИ-эксперт по SEO для оптимизации и повышения рейтинга сайта'
    },
    { 
      name: 'Pixel', 
      role: 'Менеджер по социальным сетям', 
      icon: '📱', 
      desc: 'Эффективно генерирует контент, планирует стратегии и управляет присутствием в социальных сетях.',
      shortDesc: 'ИИ-менеджер по социальным сетям для создания контента и вовлечения'
    },
    { 
      name: 'Sage', 
      role: 'Аналитик данных', 
      icon: '📊', 
      desc: 'Преобразует необработанные данные в полезные идеи с помощью всестороннего анализа и отчетности.',
      shortDesc: 'ИИ-аналитик данных для получения инсайтов и отчетности'
    },
    { 
      name: 'Echo', 
      role: 'Менеджер проектов', 
      icon: '📋', 
      desc: 'Оптимизирует рабочие процессы, координирует задачи и обеспечивает своевременную реализацию проектов.',
      shortDesc: 'ИИ-менеджер проектов для координации рабочих процессов'
    },
    { 
      name: 'Byte', 
      role: 'Ассистент по коду', 
      icon: '💻', 
      desc: 'Предоставляет экспертную поддержку в программировании с ревью кода, отладкой и проектированием архитектуры.',
      shortDesc: 'ИИ-агент для разработки и отладки кода'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-border">
      {agents.map((agent) => (
        <AgentCard key={agent.name} agent={agent} />
      ))}
      <CustomAgentCard />
    </div>
  );
};

export function AgentShowcaseSection() {
  return (
    <section
      id="agent-showcase"
      className="flex flex-col items-center justify-center w-full relative"
    >
      <div className="relative w-full px-6">
        <div className="max-w-6xl mx-auto border-l border-r">
          <SectionHeader>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance pb-1">
              Создайте свою команду ИИ
            </h2>
            <p className="text-muted-foreground text-center text-balance font-medium">
              Специализированные ИИ-сотрудники готовы преобразить ваш рабочий процесс. Выбирайте из нашей команды экспертов.
            </p>
          </SectionHeader>

          <AgentGrid />
        </div>
      </div>
    </section>
  );
}