import { useState } from "react";
import chat from "../assets/chat.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("⚠️ Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/register", formData);
      console.log(res.data);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 px-6">
      <div className="w-full sm:max-w-md bg-white shadow-md rounded-lg p-8">
        <div className="flex flex-col items-center">
          <img src={chat} alt="Logo" className="h-20 w-auto" />
          <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
            Create your account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          />
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
}
