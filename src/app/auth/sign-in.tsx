'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import { FormInput } from '@/components/inputs';
import { useSigninAdmin } from '@/features/auth/hooks/use-signin-admin';
import { Loader2 } from 'lucide-react';
import { signinSchema, SigninSchemaType } from '@/features/auth/auth.schema';

export default function SignIn() {
  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: signIn, isPending } = useSigninAdmin();

  function onSubmit(data: SigninSchemaType) {
    console.log('data', data);
    signIn(data);
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex justify-center">
            <Image src="/images/logo-with-text.png" alt="logo" width={300} height={300} />
          </div>
          <CardDescription className="text-center">
            Enter your credentials to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                <FormInput name="email" label="Email" type="email" required disabled={isPending} />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  required
                  disabled={isPending}
                />
              </div>

              <Button type="submit" className="mt-5 w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    Signing in... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
