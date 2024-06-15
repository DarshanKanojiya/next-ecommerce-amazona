import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { LoginForm } from '../types';

const LoginScreen: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query as { redirect?: string };

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginForm>();

  const submitHandler: SubmitHandler<LoginForm> = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result) {
        if (result.error) {
          toast.error(result.error);
        }
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className="w-full"
            id="password"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href={`/register?redirect=${encodeURIComponent(redirect || '/')}`}>
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
