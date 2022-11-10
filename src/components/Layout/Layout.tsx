import { FC, ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = (props) => {
  const { children } = props;

  return <main className="layout">{children}</main>;
};

export default Layout;
