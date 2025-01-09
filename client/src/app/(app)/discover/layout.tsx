import TabsLayout from './_components/UpperTabs';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <TabsLayout />
      <div className="flex w-full items-center flex-col">{children}</div>
    </div>
  );
};

export default Layout;
