'use client';
import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = ({ onClick, active, icon: Icon, href }: Props) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        'gap-x-3- group flex w-full justify-center p-4 text-sm font-semibold leading-6 text-gray-500 hover:bg-gray-100 hover:text-black',
        active && 'bg-gray-100 text-black'
      )}
    >
      <Icon className="h-6 w-6" />
    </Link>
  );
};

export default MobileItem;
