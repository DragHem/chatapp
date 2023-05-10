'use client';

import React from 'react';
import clsx from 'clsx';

interface Props {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const Button = ({
  danger,
  onClick,
  disabled,
  type,
  secondary,
  fullWidth,
  children,
}: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        'flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        disabled && 'cursor-default opacity-50',
        fullWidth && 'w-full',
        secondary ? 'text-gray-500' : 'text-white',
        danger &&
          'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary &&
          !danger &&
          'hover:bg-shy-600 focus-visible:outline-shy-600 bg-sky-500'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
