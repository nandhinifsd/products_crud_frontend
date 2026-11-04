import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/apiinstance"
const Register = () => {
    // http://localhost:8080/auth/register
    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        role:""
      
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", registerData);
            alert(response.data.message)
            navigate("/")
        }
        catch (err)
        {
            console.log(err,"registration failed")
        }

    };

    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 relative">
          <img
            src="https://i.pinimg.com/736x/1b/34/89/1b348953de47132d63d4454d0d649af5.jpg"
            alt="login"
            className="w-full h-screen object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Username</label>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={registerData.username}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      username: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block mb-2 font-medium" htmlFor="role">
                  Role
                </label>

                <select
                  id="role"
                  name="role"
                  value={registerData.role}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      role: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Register
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-black font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Register;