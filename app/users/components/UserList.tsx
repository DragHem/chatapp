'use client';

import { User } from '@prisma/client';
import UserBox from '@/app/users/components/UserBox';

interface Props {
  items: User[];
}

const UserList = ({ items }: Props) => {
  return (
    <aside className="fixed inset-y-0 left-0 block w-full overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0">
      <div className="px-5">
        <div className="flex-coll">
          <div className="py-4 text-2xl font-bold text-neutral-800">People</div>
        </div>
        {items.map((user) => (
          <UserBox key={user.id} data={user} />
        ))}
      </div>
    </aside>
  );
};

export default UserList;
