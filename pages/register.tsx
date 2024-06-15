import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { FormValuesType } from '../types';

const RegisterScreen: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      if (Array.isArray(redirect)) {
        router.push(redirect[0] || '/');
      } else {
        router.push(redirect || '/');
      }
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<FormValuesType>();

  const submitHandler: SubmitHandler<FormValuesType> = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });
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
    <Layout title="Register">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Register</h1>
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', { required: 'Please enter name' })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>
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
          ></input>
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
                message: 'Password is more than 5 chars',
              },
            })}
            className="w-full"
            id="password"
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Confirm password is more than 5 chars',
              },
            })}
            className="w-full"
            id="confirmPassword"
          ></input>
          {errors.confirmPassword && (
            <div className="text-red-500">{errors.confirmPassword.message}</div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500">Passwords do not match</div>
            )}
        </div>
        <div className="mb-4">
          <button className="primary-button">Register</button>
        </div>
        <div className="mb-4">
          Already have an account? &nbsp;
          <Link href={`/login?redirect=${redirect || '/'}`}>Login</Link>
        </div>
      </form>
    </Layout>
  );
};

export default RegisterScreen;
