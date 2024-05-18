import React, { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [activeId, setActiveId] = useState('dashboard');

  const handleActiveId = (id) => {
    setActiveId(id);
  };

  return (
    <SidebarContext.Provider value={{ activeId, handleActiveId }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
