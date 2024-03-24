import React, { ReactNode, createContext, useContext, useState } from 'react';

interface BackendUrlContextType {
    backendUrl: string;
}

const BackendUrlContext = createContext<BackendUrlContextType>({
    backendUrl: 'http://example.com', 
});

export const useBackendUrl = () => useContext(BackendUrlContext);
interface  BackendUrlContextProps {
    children: ReactNode;
  }
export const BackendUrlProvider: React.FC<BackendUrlContextProps> = ({ children }) => {
    const [backendUrl, setBackendUrl] = useState<string>('62.72.30.33:5000');

    return (
        <BackendUrlContext.Provider value={{ backendUrl }}>
            {children}
        </BackendUrlContext.Provider>
    );
};

export default BackendUrlContext;
