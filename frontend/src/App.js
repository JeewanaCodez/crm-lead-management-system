import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import CreateLead from "./pages/CreateLead";
import EditLead from "./pages/EditLead";
import LeadDetails from "./pages/LeadDetails";

import ProtectedRoute from "./components/ProtectedRoute";

import "./styles/main.css";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-lead"
          element={
            <ProtectedRoute>
              <CreateLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-lead/:id"
          element={
            <ProtectedRoute>
              <EditLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lead/:id"
          element={
            <ProtectedRoute>
              <LeadDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;