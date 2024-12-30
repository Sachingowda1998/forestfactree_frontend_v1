import { Routes, Route, Navigate } from "react-router-dom";
import UserApp from "./UserApp";
import AdminApp from "./Admin/AdminApp";
import { BrowserRouter } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import AdminLogin from "./Admin/AdminLogin";

const AdminAuthContext = createContext();

// Context Provider Component
const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("adminToken") // Check token in localStorage
  );

  const login = (token) => {
    localStorage.setItem("adminToken", token); // Store token
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken"); // Remove token
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Hook to use AdminAuthContext
const useAdminAuth = () => useContext(AdminAuthContext);

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAdminAuth();

  // If not authenticated, redirect to login page
  return isAuthenticated ? element : <Navigate to="/admin/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          {/* Root path - Render UserApp */}
          <Route path="/*" element={<UserApp />} />

          {/* Admin login path */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin path - Secure Routes */}
          <Route path="/admin/*" element={<PrivateRoute element={<AdminApp />} />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};

export { useAdminAuth };
export default App;
