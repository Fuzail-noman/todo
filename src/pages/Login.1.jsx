import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("⚠️ Fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", formData);
      if (res.data === "success") {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/home");
      } else {
        setError(res.data);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-300 px-6">
      <div className="w-full sm:max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
