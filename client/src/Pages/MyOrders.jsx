import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user", { withCredentials: true });
      setMyOrders(data.orders || []);
    } catch (err) {
      setMyOrders([]);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div className="mt-16 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-semibold uppercase text-center mb-6">
          My Orders
        </p>
        <div className="w-16 h-0.5 bg-primary rounded mx-auto"></div>
      </div>
      {myOrders.map((order, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg p-4 mb-4 py-5"
        >
          <p className=" flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
            <span className="font-semibold">Order ID: {order._id} </span>
            <span className="text-gray-500">Payment: {order.paymentType}</span>
            <span className="text-gray-500">
              Total Amount: {currency} {order.amount}
            </span>
          </p>
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className={`relative bg-white text-grey-500/70 ${
            order.items.length !== index + 1 && "border-b" } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py5 md:gap-16 w-full max-w-4xl}`}>
              
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.name}
                    className="w-16 h-16"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-medium">{item.product.name}</h2>
                  <h2>Category: {item.product.category}</h2>
                </div>
              </div>
              <div className="text-primary text-lg font-medium mb-2">
                <p className="text-gray-500">Quantity: {item.quantity}</p>
                <p className="text-gray-500">Staus: {order.status}</p>
                <p className="text-gray-500">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <p>
                <span className="text-primary text-lg font-medium">
                  Amount: {" "}
                </span>
                {currency}{item.product.price * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
