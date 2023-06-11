import AuthForm from '@/app/(site)/components/AuthForm';
import { FaMap, FaUserFriends } from 'react-icons/fa';
import { AiFillMessage } from 'react-icons/ai';
import React from 'react';

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:max-x-md sm:mx-auto sm:w-full">
        <div className="relative mx-auto h-24 w-auto">
          <FaMap className="absolute -left-4 top-3 h-16 w-full text-rose-300" />
          <AiFillMessage className="absolute -right-6 top-6 h-16 w-full text-sky-400" />
          <FaUserFriends className="absolute -left-4 top-10 h-16 w-full text-teal-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
