import { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const Main: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main min-h-screen dark:bg-gray-800">
      <main className="max-w-7xl mx-auto pb-[56px] lg:px-8 py-2">
        {children}
      </main>
    </div>
  );
};

export default Main;
