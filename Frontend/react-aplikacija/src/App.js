import './App.css';
import ErrorPage from "./components/homepages/Error";
import Register from "./components/homepages/Register";
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./components/homepages/Home";
import Login from "./components/homepages/Login";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
  );
}

export default App;
