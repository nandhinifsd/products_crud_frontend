import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 
import api from "../api/apiinstance";



const Login = () => {
    // http://localhost:8080/tasks/create
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", loginData);
            const token = response.data.token;
            localStorage.setItem("token", token);
            const decodetoken = jwtDecode(token);
            if (decodetoken.role == "admin")
            {
                navigate("/dashboard");

            }
            else
            {
                navigate("/home");

            }
        }
        catch (err)
        {
            console.log(err,"login failed")
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

                    <h2 className="text-3xl font-bold text-center mb-8">
                        Login
                    </h2>

                    <form 
                    onSubmit={handleSubmit}
                     className="space-y-5">

                        <div>
                            <label className="block mb-2 font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={loginData.email}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({
                                        ...loginData,
                                        password: e.target.value,
                                    })
                                }
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                        >
                            Login
                        </button>

                    </form>

                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-black font-semibold"
                        >
                            Register
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;   