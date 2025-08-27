'use client';

import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchBar } from './search-bar';
import { MarketplaceSectionHeader } from './marketplace-section-header';
import { AgentCard } from './agent-card';

import type { MarketplaceTemplate } from '@/components/agents/installation/types';

interface MarketplaceTabProps {
  marketplaceSearchQuery: string;
  setMarketplaceSearchQuery: (value: string) => void;
  marketplaceFilter: 'all' | 'kortix' | 'community' | 'mine';
  setMarketplaceFilter: (value: 'all' | 'kortix' | 'community' | 'mine') => void;
  marketplaceLoading: boolean;
  allMarketplaceItems: MarketplaceTemplate[];
  mineItems: MarketplaceTemplate[];
  installingItemId: string | null;
  onInstallClick: (item: MarketplaceTemplate, e?: React.MouseEvent) => void;
  onDeleteTemplate?: (item: MarketplaceTemplate, e?: React.MouseEvent) => void;
  getItemStyling: (item: MarketplaceTemplate) => { avatar: string; color: string };
  currentUserId?: string;
  onAgentPreview?: (agent: MarketplaceTemplate) => void;
}

export const MarketplaceTab = ({
  marketplaceSearchQuery,
  setMarketplaceSearchQuery,
  marketplaceFilter,
  setMarketplaceFilter,
  marketplaceLoading,
  allMarketplaceItems,
  mineItems,
  installingItemId,
  onInstallClick,
  onDeleteTemplate,
  getItemStyling,
  currentUserId,
  onAgentPreview
}: MarketplaceTabProps) => {
  const handleAgentClick = (item: MarketplaceTemplate) => {
    if (onAgentPreview) {
      onAgentPreview(item);
    }
  };

  return (
    <div className="space-y-6 mt-8 flex flex-col min-h-full">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <SearchBar
          placeholder="Поиск ИИ-агентов..."
          value={marketplaceSearchQuery}
          onChange={setMarketplaceSearchQuery}
        />
        <div className="flex items-center gap-3">
          <Select value={marketplaceFilter} onValueChange={(value: 'all' | 'kortix' | 'community' | 'mine') => setMarketplaceFilter(value)}>
            <SelectTrigger className="w-[180px] h-12 rounded-xl">
              <SelectValue placeholder="Фильтр ИИ-агентов" />
            </SelectTrigger>
            <SelectContent className='rounded-xl'>
              <SelectItem className='rounded-xl' value="all">Все агенты</SelectItem>
              <SelectItem className='rounded-xl' value="mine">Мои</SelectItem>
              {/* <SelectItem className='rounded-xl' value="kortix">Kortix Verified</SelectItem> */}
              <SelectItem className='rounded-xl' value="community">Сообщество</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1">
        {marketplaceLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-sm">
                <Skeleton className="h-48" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-5 rounded" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 rounded" />
                    <Skeleton className="h-4 rounded w-3/4" />
                  </div>
                  <Skeleton className="h-10 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : allMarketplaceItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {marketplaceSearchQuery 
                ? "Нет шаблонов, соответствующих вашим критериям. Попробуйте изменить параметры поиска или фильтры."
                : "В настоящее время в торговой площадке нет доступных шаблонов агентов."}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {marketplaceFilter === 'all' ? (
              <div className="space-y-6">
                <MarketplaceSectionHeader
                  title="Популярные ИИ-агенты"
                  subtitle="Отсортировано по популярности - сначала самые загружаемые"
                />
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allMarketplaceItems.map((item) => (
                    <AgentCard
                      key={item.id}
                      mode="marketplace"
                      data={item}
                      styling={getItemStyling(item)}
                      isActioning={installingItemId === item.id}
                      onPrimaryAction={onInstallClick}
                      onDeleteAction={onDeleteTemplate}
                      onClick={() => handleAgentClick(item)}
                      currentUserId={currentUserId}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allMarketplaceItems.map((item) => (
                  <AgentCard
                    key={item.id}
                    mode="marketplace"
                    data={item}
                    styling={getItemStyling(item)}
                    isActioning={installingItemId === item.id}
                    onPrimaryAction={onInstallClick}
                    onDeleteAction={onDeleteTemplate}
                    onClick={() => handleAgentClick(item)}
                    currentUserId={currentUserId}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 