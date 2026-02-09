import { createHashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTask from "./pages/CreateTask";
import EditTask from "./pages/EditTask";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/user/dashboard",
    element: (
      <ProtectedRoute role="user">
        <UserDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/create",
    // Assuming create is only for users for now, or shared. 
    // If strict, wrap in ProtectedRoute role="user"
    element: (
      <ProtectedRoute role="user">
        <CreateTask />
      </ProtectedRoute>
    )
  },
  {
    path: "/edit/:id",
    element: (
      <ProtectedRoute role="user">
        <EditTask />
      </ProtectedRoute>
    )
  }
]);

export default router;
