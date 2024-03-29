import { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const Main: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main min-h-screen dark:bg-slate-900">
      <main className="max-w-7xl mx-auto pb-[56px] md:pb-0 lg:px-8 py-2">
        {children}
      </main>
    </div>
  );
};

export default Main;
