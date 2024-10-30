// src/ConfigContext.tsx
import React, { createContext, useContext, useState } from 'react';
import configData from './config/config.json';

const ConfigContext = createContext<{
  config: Record<string, any>; // Use a generic type
  updateConfig: (key: string, value: any) => void; // Update function
} | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<Record<string, any>>(configData);

  const updateConfig = (key: string, value: any) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};