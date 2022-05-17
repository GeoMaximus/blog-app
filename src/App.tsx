import React from "react";
import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/details/:articleId" element={<Details />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


