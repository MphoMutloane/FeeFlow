import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/students/Landing";
import Pending from "./pages/students/Pending";
import Auth from "./pages/students/Auth";
import Dashboard from "./pages/students/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudent from "./pages/admin/ManageStudent";
import StudentLayout from "./components/students/StudentLayout";
import AdminLayout from "./components/admin/AdminLayout";

const App = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Routes>
        {/* student portal routes */}
        <Route element={<StudentLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/pending-approval" element={<Pending />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* admin portal routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/manage-student" element={<ManageStudent />} />
          {/* This route is for editing specific students */}
          <Route path="/manage-student/:id" element={<ManageStudent />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App;
