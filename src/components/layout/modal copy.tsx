import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import PageContainer from './page-container';

interface ModalProps {
  title: string;
  child: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function Modal({ title, child, trigger, open, onOpenChange }: ModalProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side="bottom" className="h-[100dvh] w-full overflow-hidden">
        <PageContainer>
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
            {child}
          </div>
        </PageContainer>
      </SheetContent>
    </Sheet>
  );
}

export default Modal;
