import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signinAdmin } from '../api/signin-admin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import ApiResponse from '@/lib/api-response';

export function useSigninAdmin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: signinAdmin,

    onSuccess: (response: ApiResponse) => {
      console.log('response', response);
      if (response.success) {
        // Show success toast
        toast.success('Successfully signed in!');

        // After sign-in, invalidate current user query
        queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

        // Redirect to dashboard
        router.push('/dashboard/patients');
      } else {
        // Show error toast if success is false
        toast.error(response.message || 'Sign in failed');
      }
    },

    onError: (error: any) => {
      console.error('Sign-in failed:', error);

      // Show error toast with the error message
      toast.error(error.data.message || 'An error occurred during sign in');
    },
  });
}
