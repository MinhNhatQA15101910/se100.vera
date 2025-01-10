import SearchBar from '@/components/SearchBar';
import TabsLayout from './_components/UpperTabs';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex w-full items-center flex-col mt-4">
        <SearchBar />
      </div>

      <TabsLayout />
      <div className="flex w-full items-center flex-col">{children}</div>
    </div>
  );
};

export default Layout;
