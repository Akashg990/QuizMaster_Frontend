import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Navbar from "../components/Navbar";

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    await API.post("/auth/register",{name,email,password});
    navigate("/login");
  };

//   return(
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>
//       <input onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
//       <input onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
//       <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
//       <button type="submit">Register</button>
//     </form>
//   )

  return (

    <>
    <Navbar/>
   
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg w-96"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <input
       className="w-full mb-4 p-3 border rounded"
       placeholder="Name"
       type="text"
       onChange={(e)=>setName(e.target.value)}
      />
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
        SignUp
      </button>
    </form>
  </div>
   </>
);
}

export default Register;