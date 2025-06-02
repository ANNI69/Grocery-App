import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/Footer";
import { useAppContext } from "./Context/AppContext";
import Login from "./Components/Login";
import AllProducts from "./Pages/AllProducts";
import ProductCategory from "./Pages/ProductCategory";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders";
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerLayout from "./Pages/Seller/SellerLayout";
import AddProducts from "./Pages/Seller/AddProducts";
import Orders from "./Pages/Seller/Orders";
import ProductList from "./Pages/Seller/ProductList";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("/seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <>
      <div className="text-default min-h-screen text-gray-700 bg-white">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Login /> : null}

        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />

        <div
          className={`${isSellerPath ? "" : "px-4 md:px-16 lg:px-24 xl:px-32"}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route
              path="/products/:category/:id"
              element={<ProductDetails />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />

            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />} >
              <Route index element={isSeller ?  <AddProducts /> : null} />
              <Route path="product-list" element={isSeller ? <ProductList /> : null} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/contact" element={<h1>Contact Page</h1>} />
          </Routes>
        </div>
        {isSellerPath ? null : <Footer />}
      </div>
    </>
  );
};

export default App;
