import { ImBubbles } from 'react-icons/im';
import AuthForm from '@/app/(site)/components/AuthForm';

export default function Home() {
  return (
    <div
      className="
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm:px-6
        lg:px-8
        bg-gray-100
    "
    >
      <div className="sm:mx-auto sm:w-full sm:max-x-md">
        <ImBubbles className="mx-auto w-auto h-24 text-sky-400" />
        <h2
          className="
        mt-6
        text-center
        text-3xl
        font-bold
        tracking-tight
        text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
