import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

 return (
   <>
    <Navbar/>
  
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg w-96"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      <input
        className="w-full mb-4 p-3 border rounded"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-4 p-3 border rounded"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition">
        Login
      </button>
      <div className="w-full bg-fuchsia-600 text-white p-3 mt-1 flex item-center justify-center rounded hover:bg-fuchsia-700 transition">
         <Link to="/register"  >
           SignUp
          </Link>
      </div>

          
    
    </form>
   
  </div>
   </>
);
}

export default Login;