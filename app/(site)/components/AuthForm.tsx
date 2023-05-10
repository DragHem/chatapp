'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariantHandler = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
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

  const onSubmitHandler: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
    }
    if (variant === 'LOGIN') {
    }
  };

  const socialActions = (action: string) => {
    setIsLoading(true);
  };

  return <div>Auth Form!</div>;
};

export default AuthForm;
