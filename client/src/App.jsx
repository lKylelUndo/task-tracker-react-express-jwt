import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";
import Homepage from "./pages/Homepage";
import { AuthProvider } from "./context/AuthContext"; // import your provider
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
