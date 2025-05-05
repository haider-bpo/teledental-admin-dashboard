'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
// import { useLogoutUser, useUser } from "@/features/auth/authSelectors";

const user = {
  name: 'John Doe',
};

function UserNav() {
  // const logoutUser = useLogoutUser();
  const router = useRouter();
  // const user = useUser();

  const signOut = () => {
    // logoutUser();
    router.push('/auth');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-50 rounded-full">
          <Avatar className="h-9 w-50">
            <AvatarImage src={''} alt={user?.name ?? ''} />
            <AvatarFallback className="bg-brand-primary text-white capitalize font-semibold hover:bg-white hover:text-brand-primary transition-colors hover:cursor-pointer hover:shadow-lg hover:shadow-brand-primary/50 hover:border-2 hover:border-brand-primary">
              Welcome {user?.name}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium capitalize">{user?.name}</p>
            {/* <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
