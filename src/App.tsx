import React, { ChangeEvent } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/Menu";
import Details from "./pages/Details";
import Home, { ArticleModel } from "./pages/Home";
import Notfound from "./pages/Notfound";
import "./index.css";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

type Props = {}


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
      <Footer />
    </div>
  );
}

export default App;


