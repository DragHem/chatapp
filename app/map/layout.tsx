import React from 'react';
import Sidebar from '@/app/components/sidebar/Sidebar';
import getUsers from '@/app/actions/getUsers';
import UserList from '@/app/users/components/UserList';

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users = await getUsers();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
