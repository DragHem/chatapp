'use client';

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from '@/app/(site)/components/AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('Authenticated');
    }
  }, [session.status]);

  const toggleVariantHandler = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
      return;
    }

    setVariant('LOGIN');
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmitHandler: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      try {
        const resp = await axios.post('/api/auth/register', data);

        if (resp.status === 200) {
          toast.success('Successfully registered!');
        }
      } catch (e: any) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
      // axios
      // .post('/api/auth/register', data)
      // .catch(() => toast.error('Something went wrong!'))
      // .finally(() => setIsLoading(false));
    }
    if (variant === 'LOGIN') {
      signIn('credentials', { ...data, redirect: false })
        .then((cb) => {
          if (cb?.error) {
            toast.error('Invalid credentials.');
          }
          if (cb?.ok && !cb?.error) {
            toast.success('Logged in!');
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((cb) => {
        if (cb?.error) {
          toast.error('Invalid credentials.');
        }
        if (cb?.ok && !cb?.error) {
          toast.success('Logged in!');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialActions('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialActions('google')}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
          {variant === 'LOGIN' ? 'Are You new here?' : 'Already have account?'}
          <div
            onClick={toggleVariantHandler}
            className="cursor-pointer underline"
          >
            {variant === 'LOGIN' ? 'Create an account?' : 'Log in'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
