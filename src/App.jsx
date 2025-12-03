import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./features/home/HomePage";
import React from "react";

const App = () => {
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>;
};

export default App;
