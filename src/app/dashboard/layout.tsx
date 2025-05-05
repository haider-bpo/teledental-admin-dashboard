import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="lg:hidden">
        <AppSidebar />
      </div>
      <main className="h-full w-full">
        <SidebarInset>
          <Header />
          <div className="px-4">{children}</div>
        </SidebarInset>
      </main>
    </SidebarProvider>
  );
}
