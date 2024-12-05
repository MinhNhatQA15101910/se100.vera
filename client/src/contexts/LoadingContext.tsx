import { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

type LoadingContextType = {
  isLoading: boolean;
  setLoadingState: (state: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider!');
  }

  return context;
};

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forceShow, setForceShow] = useState<boolean>(false);

  const setLoadingState = (state: boolean) => {
    if (!state) {
      setTimeout(() => {
        setForceShow(false);
      }, 500);
    } else {
      setIsLoading(true);
      setForceShow(true);
    }
  };

  useEffect(() => {
    if (!forceShow) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [forceShow]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoadingState }}>
      {children}
      {isLoading && <LoadingScreen />}
    </LoadingContext.Provider>
  );
};
