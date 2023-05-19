import React from 'react';
import DesktopSidebar from '@/app/components/sidebar/DesktopSidebar';

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="h-full lg:pl-20">{children}</main>
    </div>
  );
};

export default Sidebar;
