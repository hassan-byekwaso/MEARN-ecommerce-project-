import React, { useState, useContext, useEffect } from "react"; // Added useContext and useEffect
import axios from "axios";
import { ShopContext } from "../context/ShopContext"; // Import your context

const Login = () => {
  // --- ADDED: Access setToken and token from context ---
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const endpoint = currentState === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = currentState === "Login" 
        ? { email, password } 
        : { name, email, password };

      // Use backendUrl from context for consistency
      const response = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (response.data.success) {
        // --- MODIFIED: Update BOTH state and localStorage ---
        setToken(response.data.token); 
        localStorage.setItem("token", response.data.token);
        
        // No need for alert if you want a smooth transition
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "An error occurred.";
      console.error("Login error:", error);
      alert(errorMsg);
    }
  };

  // --- ADDED: If user is already logged in, send them to home immediately ---
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form 
      onSubmit={onSubmitHandler} 
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create a new account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      <button className="px-8 py-2 mt-4 font-light text-white bg-black">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;