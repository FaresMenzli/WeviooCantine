import React, { ReactNode, createContext, useContext, useState } from 'react';

interface BackendUrlContextType {
    backendUrl: string;
}

const BackendUrlContext = createContext<BackendUrlContextType>({
    backendUrl: 'http://62.72.30.33:5000', 
    
});

export const useBackendUrl = () => useContext(BackendUrlContext);
interface  BackendUrlContextProps {
    children: ReactNode;
  }
export const BackendUrlProvider: React.FC<BackendUrlContextProps> = ({ children }) => {
    const [backendUrl, setBackendUrl] = useState<string>(backUrl());

    return (
        <BackendUrlContext.Provider value={{ backendUrl }}>
            {children}
        </BackendUrlContext.Provider>
    );
};
function backUrl() {
    let activeUrl = window.location.href;
    switch (true) {
      case activeUrl.indexOf('localhost') > -1:
        return 'http://localhost:5000';
      case activeUrl.indexOf(':3002') > -1:
        return 'http://62.72.30.33:5002';
      case activeUrl.indexOf(':3001') > -1:
        return 'http://62.72.30.33:5001';
      default:
        return '';
    }
  }

export default BackendUrlContext;
