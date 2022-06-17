import { FC, ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

const Main: FC<MainLayoutProps> = ({ children }) => {
  return <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</main>;
};

export default Main;
