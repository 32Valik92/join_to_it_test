import type { ReactNode } from "react";

import Header from "./Header.tsx";
import Sidebar from "./Sidebar.tsx";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-[2220px] bg-app-background">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="min-w-0 flex-1 px-5 py-6 md:px-8 xl:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
