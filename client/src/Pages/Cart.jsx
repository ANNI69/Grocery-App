/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const {
    navigate,
    products,
    currency,
    cartItems,
    getCartTotalAmount,
    getCartCount,
    removeFromCart,
    updateCartItem,
    axios,
    user,
    setCart,
    setUser,
    setIsAuthenticated
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState(dummyAddress);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);

  const getCart = () => {
    const cart = [];
    for (const key in cartItems) {
      if (Object.hasOwnProperty.call(cartItems, key)) {
        const product = products.find((item) => item._id === key);
        if (product) {
          cart.push({
            ...product,
            quantity: cartItems[key],
            offerPrice:
              product.price - (product.price * product.discount) / 100,
          });
        }
      }
    }
    setCartArray(cart);
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select a delivery address");
      }
      if (getCartCount() === 0) {
        return toast.error("Your cart is empty!");
      }
      if (!user?._id) {
        return toast.error("Please login to place order");
      }

      if (paymentMethod === "COD") {
        const orderData = {
          userId: user._id,
          items: cartArray.map(item => ({
            product: item._id,
            quantity: item.quantity
          })),
          address: selectedAddress._id,
          amount: Math.round((getCartTotalAmount() * 1.02 + 20) * 100) / 100,
          paymentType: "COD"
        };

        console.log('Order Data:', orderData); // Debug log

        const { data } = await axios.post('/api/order/cod', orderData, { withCredentials: true });

        if (data.success) {
          toast.success(data.message);
          // Clear cart from localStorage and state
          localStorage.removeItem('cartItems');
          setCart({});
          navigate('/my-orders');
        } else {
          toast.error(data.message);
        }
      } else {
        // Handle online payment
        navigate("/payment");
      }
    } catch (error) {
      console.error('Order Error:', error.response?.data || error); // Debug log
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  };

  useEffect(() => {
    if (products.length > 0 && Object.keys(cartItems).length > 0) {
      getCart();
    } else {
      setCartArray([]);
    }
  }, [products, cartItems]);
  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {getCartCount() > 0 ? `(${getCartCount()})` : "0"} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(`/products/${product.category}/${product._id}`);
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select onChange={
                      (e) => {
                        const quantity = parseInt(e.target.value, 10);
                        if (quantity > 0) {
                          updateCartItem(product._id, quantity);
                        }
                      }
                    } className="outline-none">
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img
                src={assets.remove_icon}
                alt="removeIcon"
                className="w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt="arrowRightIcon"
            className="w-4 h-4 group-hover:translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address selected"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                {address.map((add, index) => (
                  <p
                    onClick={() => {
                      selectedAddress(add);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {add.street}, {add.city}, {add.state}, {add.country}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/add-address");
                    scrollTo(0, 0);
                  }}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary hover:text-white"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <select onChange={
            (e) => setPaymentMethod(e.target.value)
          } className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>{currency}{getCartTotalAmount()}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency}{
              Math.round(getCartTotalAmount() * 0.02 * 100) / 100
            }</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:
              {
                currency
              }{
                Math.round(
                  (getCartTotalAmount() * 1.02 + 20) * 100
                ) / 100
              }
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary transition">
          {
            paymentMethod === "COD"
              ? "Place Order (COD)"
              : "Proceed to Payment"
          }
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;
