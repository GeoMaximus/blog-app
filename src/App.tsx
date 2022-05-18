import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/Menu";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <div className="container">
      <Menu />
      <Router>
        <div>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/details/:articleId" element={<Details />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;


