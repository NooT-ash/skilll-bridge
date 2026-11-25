
import { Routes, Route, Navigate } from "react-router-dom";

// Authentication Pages
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Main Pages
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import DeleteAccount from "./pages/DeleteAccount.jsx";
import Skills from "./pages/Skills.jsx";
import Jobs from "./pages/Jobs.jsx";
import Learning from "./pages/Learning.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import AssessmentResults from "./pages/AssessmentResults.jsx";
import SavedJobs from "./pages/SavedJobs.jsx";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Public Routes */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* Edit Profile */}
        <Route
          path="/profile/edit"
          element={<EditProfile />}
        />

        {/* Change Password */}
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        {/* Delete Account */}
        <Route
          path="/delete-account"
          element={<DeleteAccount />}
        />

        {/* Skills */}
        <Route
          path="/skills"
          element={<Skills />}
        />

        {/* Assessment Results */}
        <Route
          path="/assessment-results"
          element={<AssessmentResults />}
        />

        {/* Career Opportunities */}
        <Route
          path="/jobs"
          element={<Jobs />}
        />

        {/* Job Details */}
        <Route
          path="/job-details"
          element={<JobDetails />}
        />

        {/* Saved Jobs */}
        <Route
          path="/saved-jobs"
          element={<SavedJobs />}
        />

        {/* Learning Resources */}
        <Route
          path="/learning"
          element={<Learning />}
        />

      </Route>

      {/* Page Not Found */}
      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />

    </Routes>
  );
}

export default App;
