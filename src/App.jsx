import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Layout from "./pages/Layout";
import Orders from "./pages/Orders";
import Opinions from "./pages/Opinions";
import Quality from "./pages/Quality";
import { ThemeContext } from "./contexts/theme-context";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/opinions" element={<Opinions />} />
              <Route path="/quality" element={<Quality />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
