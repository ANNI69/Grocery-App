import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {dummyProducts} from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL ;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // Define any state or functions you want to provide to the context
  const currency = import.meta.env.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [isSeller, setIsSeller] = useState(false);

  const fetchSeller = async () => {
    try {
      const response = await axios.get("/api/seller/isAuth");
      if (response.data.success) {
        setIsSeller(true);
      }
    } catch (error) {
      console.error("Error fetching seller authentication:", error);
      setIsSeller(false);
    }
  };

  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);


  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);

    if(cartData[itemId]){
      cartData[itemId] += 1;
    }
    else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  }

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
      cartData[itemId] -= 1;
      if(cartData[itemId] === 0){
        delete cartData[itemId];
        toast.success("Item removed from cart");
      } 
    }
    toast.success("Item removed from cart");
    setCartItems(cartData);
  }

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart item updated");
  }

  const getCartCount = () => {
    let count = 0;
    for (const key in cartItems) {
      if (Object.hasOwnProperty.call(cartItems, key)) {
        count += cartItems[key];
      }
    }
    return count;
  }

  const getCartTotalAmount = () => {
    let total = 0;
    for (const key in cartItems) {
      if (Object.hasOwnProperty.call(cartItems, key)) {
        const product = products.find((item) => item._id === key);
        if (product) {
          total += product.offerPrice * cartItems[key];
        }
      }
    }
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  }


        
  

  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

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
    setShowUserLogin,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    products,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartTotalAmount,
    isSeller,
    setIsSeller,
    axios,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return useContext(AppContext);
};
