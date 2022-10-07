import { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const Main: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main min-h-screen dark:bg-gray-800">
      <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">{children}</main>
    </div>
  );
};

export default Main;
