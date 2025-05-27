import { createContext,  useContext } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    // Define any state or functions you want to provide to the context

    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ isDarkMode, setIsDarkMode ] = useState(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);


  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    error,
    setError,
    isDarkMode,
    setIsDarkMode,
    isMobile,
    setIsMobile,
    navigate,
    showUserLogin,
    setShowUserLogin
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppContextProvider");
    }
    return useContext(AppContext);
    }