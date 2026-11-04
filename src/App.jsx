import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import ProtectedRoutes from './components/ProtectedRoutes'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<ProtectedRoutes><Home /> </ProtectedRoutes>
            }/>
          <Route path="/dashboard" element={ <Dashboard />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App