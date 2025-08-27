'use client';

import React from 'react';
import { Globe, Loader2, AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PublishDialogData {
  templateId: string;
  templateName: string;
}

interface PublishDialogProps {
  publishDialog: PublishDialogData | null;
  templatesActioningId: string | null;
  onClose: () => void;
  onPublish: () => void;
}

export const PublishDialog = ({
  publishDialog,
  templatesActioningId,
  onClose,
  onPublish
}: PublishDialogProps) => {
  return (
    <Dialog open={!!publishDialog} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Опубликовать шаблон на маркетплейсе</DialogTitle>
          <DialogDescription>
            Сделайте "{publishDialog?.templateName}" доступным для сообщества, чтобы они могли его найти и установить.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={!!templatesActioningId}
          >
            Отмена
          </Button>
          <Button
            onClick={onPublish}
            disabled={!!templatesActioningId}
          >
            {templatesActioningId ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Публикация...
              </>
            ) : (
              <>
                <Globe className="h-4 w-4" />
                Опубликовать шаблон
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 