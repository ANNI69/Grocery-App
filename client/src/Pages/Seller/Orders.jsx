import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
  const { currency } = useAppContext();
  const [order, setOrder] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/all", { withCredentials: true });
      setOrder(data.orders || []);
    } catch (err) {
      setOrder([]);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {order.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-500/20 bg-white"
          >
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div className="flex flex-col justify-center">
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span className="text-primary text-xs">
                        x {item.quantity}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>


            <p className="font-medium text-base my-auto text-black/70">
              {currency}{order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
