import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin, navigate } = useAppContext();

  const Logout = async () => {
    setUser(null);
    setShowUserLogin(false);

    navigate("/");
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        <NavLink to={"/"} className="flex items-center gap-2">
          {" "}
          <img className="h-9" src={assets.logo} alt="dummyLogoColored" />
        </NavLink>
            <div className="hidden sm:flex items-center gap-8">
              <NavLink to={"/"}>Home</NavLink>
              <NavLink to={"/products"}>All Products</NavLink>
              <NavLink to={"/"}>Contact</NavLink>

              <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                <input
                  className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
                  type="text"
                  placeholder="Search products"
                />
                <img
                  src={assets.search_icon}
                  alt="searchIcon"
                  className="w-4 h-4"
                />
              </div>

              <div onClick={()=>{
                navigate("/cart");
              }} className="relative cursor-pointer">
                <img
                  src={assets.cart_icon}
                  alt="cartIcon"
                  className="w-6 h-6 opacity-80 hover:opacity-100 transition"
                />
                <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
                  {3}
                </button>
              </div>

              {!user ? (
                <button className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                  Login
                </button>
              ) : (
                <div className="relative">
                  <img
                src={assets.profile_icon}
                alt="userIcon"
                className="w-10 h-10 opacity-80 hover:opacity-100 transition cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
                  />
                  {open && (
                <ul className="absolute top-12 right-0 bg-white shadow-md rounded-md text-sm z-10 w-48">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <span className="text-sm">{user.name}</span>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <NavLink to={"/orders"}>My Orders</NavLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <button
                      onClick={() => {
                    setUser(null);
                    Logout();
                      }}
                      className="w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => (open ? setOpen(false) : setOpen(true))}
              aria-label="Menu"
              className="sm:hidden"
            >
          <img src={assets.menu_icon} alt="menuIcon" className="w-6 h-6" />
        </button>

        {/* Mobile Menu */}
        {open && (
          <div
            className={`${
              open ? "flex" : "hidden"
            } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
          >
            <NavLink to={"/"} onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink to={"/products"} onClick={() => setOpen(false)}>
              All Products
            </NavLink>

            {user && (
              <NavLink to={"/orders"} onClick={() => setOpen(false)}>
                My Orders
              </NavLink>
            )}

            <NavLink to={"/"}>Contact</NavLink>
            {user ? (
              <button
                onClick={() => {
                  setUser(null);
                  setOpen(false);
                  Logout();
                }}
                className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to={"/login"}
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
