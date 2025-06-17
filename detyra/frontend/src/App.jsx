import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
