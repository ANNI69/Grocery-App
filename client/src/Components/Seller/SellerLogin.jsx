import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSeller(true);
    console.log("Seller logged in with email:", email, password);
    
  };

  return (
    <div>
      <form
        onSubmit={onSubmitHandler}
        className="min-h-screen flex flex-col items-center text-sm"
      >
        <div className="flex flex-col items-start gap-5 m-auto p-8 py12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary text-2xl font-semibold">Seller</span>{" "}
            Login
          </p>
          <div className="w-full">
            <label className="block mb-2 text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <label className="block mt-4 mb-2 text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerLogin;
