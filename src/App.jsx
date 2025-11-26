import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/home/HomePage";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
