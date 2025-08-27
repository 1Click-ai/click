'use client';

import React, { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { KortixLogo } from '../sidebar/kortix-logo';
import { AlertDialog, AlertDialogContent, AlertDialogHeader } from '../ui/alert-dialog';
import { AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';

interface TourConfirmationDialogProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const TourConfirmationDialog = React.memo(({ open, onAccept, onDecline }: TourConfirmationDialogProps) => {
  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      onDecline();
    }
  }, [onDecline]);

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-md w-[90vw] p-0 overflow-hidden [&>button]:hidden">
        <div className="relative">
          <AlertDialogHeader className="p-6 pb-4">
            <div className='h-32 w-full rounded-xl bg-muted/50 border flex items-center justify-center'>
                <KortixLogo size={60} />
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div>
                <AlertDialogTitle className="text-xl font-semibold">
                  Добро пожаловать в КЛИК
                </AlertDialogTitle>
              </div>
            </div>
            <AlertDialogDescription>
Хотите ли пройти краткий обзор, чтобы начать работу? Мы покажем вам ключевые функции и как наилучшим образом использовать КЛИК.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-between p-6">
            <Button
              variant="outline"
              onClick={onDecline}
              className="flex-1 mr-3"
            >
Пропустить обзор
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1"
            >
Начать обзор
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
});

TourConfirmationDialog.displayName = 'TourConfirmationDialog'; 