'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import Avatar from '@/app/components/Avatar';
import LoadingModal from '@/app/components/LoadingModal';

interface Props {
  data: User;
}

const UserBox = ({ data }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post('/api/conversations', {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="rounded-100 relative flex w-full cursor-pointer items-center space-x-3 bg-white p-3 transition hover:bg-neutral-100"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-grey-900 text-sm font-medium">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
