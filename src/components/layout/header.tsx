'use client';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import UserNav from './user-nav';
import { ThemeToggleButton } from '../ui/theme-toggle-button';
import { Calendar, Hospital, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const company = {
  name: 'Teledental',
  logo: '/images/logo-with-text.png',
  smallLogo: '/images/logo.png',
  plan: 'Manage business',
};

// Menu items
const items = [
  {
    title: 'dentists',
    url: '/dashboard/dentists',
    icon: Hospital,
    logoImage: '',
    activeLogoImage: '',
  },
  {
    title: 'patients',
    url: '/dashboard/patients',
    icon: User,
    logoImage: '',
    activeLogoImage: '',
  },
  {
    title: 'appointments',
    url: '/dashboard/appointments',
    icon: Calendar,
    logoImage: '',
    activeLogoImage: '',
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-2 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 lg:hidden" />
        <Separator orientation="vertical" className="mr-2 h-4 lg:hidden" />
        <Link href="/">
          <Image
            src={company.logo}
            alt={company.name}
            className="hidden lg:block"
            width={200}
            height={200}
          />
        </Link>
      </div>

      <div className="flex items-center gap-2 px-4">
        <div className="hidden items-center gap-2 lg:flex">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`hover:bg-accent flex items-center gap-2 rounded-lg px-3 py-2 text-lg ${pathname === item.url ? '!text-brand-primary' : ''}`}
            >
              {item.logoImage ? (
                <Image
                  src={
                    pathname === item.url && item.activeLogoImage
                      ? item?.activeLogoImage
                      : item?.logoImage
                  }
                  alt={item.title}
                  width={16}
                  height={16}
                />
              ) : (
                <item.icon className="h-4 w-4" />
              )}
              <span className="capitalize">{item.title}</span>
            </Link>
          ))}
        </div>
        <UserNav />
        {/* <ThemeToggleButton /> */}
      </div>
    </header>
  );
}
