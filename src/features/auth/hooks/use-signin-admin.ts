import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signinAdmin } from '../api/signin-admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function useSigninAdmin() {
  const queryClient = useQueryClient();

  const router = useRouter();

  return useMutation({
    mutationFn: signinAdmin,

    onSuccess: () => {
      //  After sign-in, invalidate current user query (it will now be authenticated)
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

      //  redirect to dashboard
      router.push('/dashboard/patients');
    },

    onError: (error: any) => {
      console.error('Sign-in failed:', error);

      const errorMessage = error.data.message;
      // Optionally show toast
      toast(errorMessage);
    },
  });
}
