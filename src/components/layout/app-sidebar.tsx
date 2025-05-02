'use client';
import { ChevronsUpDown, FileUser, Hospital, LogOut, User } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
// import { useLogoutUser, useUser } from "@/features/auth/authSelectors";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

//company details
const company = {
  name: 'Teledental',
  logo: '/images/logo-with-text.png',
  smallLogo: '/images/logo.png',
  plan: 'Manage bussines',
};

// Menu items
const items = [
  {
    title: 'patients',
    url: '/dashboard/patients',
    icon: User,
  },
  {
    title: 'dentists',
    url: '/dashboard/dentists',
    icon: Hospital,
  },
];

const user = {
  name: 'John Doe',
};

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  // const logoutUser = useLogoutUser();
  const router = useRouter();
  // const user = useUser();

  const signOut = () => {
    // logoutUser();
    router.push('/auth');
  };

  return (
    <Sidebar collapsible="icon">
      {/* side header  */}
      <SidebarHeader>
        <div className="text-sidebar-accent-foreground flex gap-2 py-2">
          <div className="relative h-10 w-40">
            <Link href={'/'}>
              <img
                src={open ? company.logo : company.smallLogo}
                alt={company.name}
                className="object-start h-full w-full object-contain"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </SidebarHeader>

      {/* side menu  */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link
                      href={item.url}
                      className={`${pathname === item.url ? '!text-[#005BEA]' : ''}`}
                    >
                      <item.icon />
                      <span className="py-2 capitalize">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* side footer  */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full">
                  {/* user avatar  */}
                  <Avatar className={`${!open ? 'h-8 w-8 rounded-lg' : ''}`}>
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>
                      {user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                    </AvatarFallback>
                  </Avatar>

                  {/* user detail  */}
                  <div className="grid text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.name}</span>
                    {/* <span className="truncate text-xs">{user?.email}</span> */}
                  </div>

                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="min-w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* user avatar  */}
                    <Avatar>
                      <AvatarImage src="" alt="" />
                      <AvatarFallback>
                        {user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                      </AvatarFallback>
                    </Avatar>

                    {/* user detail  */}
                    <div className="grid text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.name}</span>
                      {/* <span className="truncate text-xs">{user?.email}</span> */}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
