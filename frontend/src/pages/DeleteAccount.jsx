
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, AlertTriangle, ArrowLeft } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "./DeleteAccount.css";

function DeleteAccount() {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!password) {
      setError("Please enter your current password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("skillbridgeToken");

      const response = await fetch(
        "http://localhost:5000/api/auth/delete-account",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ password })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete account.");
      }

      localStorage.removeItem("skillbridgeToken");
      localStorage.removeItem("skillbridgeUser");

      alert("Your SkillBridge account has been deleted.");

      navigate("/register", { replace: true });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="delete-account-page">
      <Sidebar />

      <main className="delete-account-content">

        <button
          className="delete-back-button"
          onClick={() => navigate("/profile")}
        >
          <ArrowLeft size={18} />
          Back to Profile
        </button>

        <div className="delete-account-card">

          <div className="delete-icon">
            <Trash2 size={32} />
          </div>

          <h1>Delete Account</h1>

          <p>
            Manage your SkillBridge account permanently.
          </p>

          <div className="delete-warning">
            <AlertTriangle size={22} />

            <div>
              <h3>Warning: Permanent Action</h3>
              <p>
                Deleting your account cannot be undone.
                Your account information will be permanently removed.
              </p>
            </div>
          </div>

          {!showConfirm ? (
            <button
              className="delete-account-button"
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 size={18} />
              Delete My Account
            </button>
          ) : (
            <div className="delete-confirm-section">

              <h3>Confirm Account Deletion</h3>

              <p>
                Enter your current password to confirm.
              </p>

              <input
                type="password"
                placeholder="Enter current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <div className="delete-error">
                  {error}
                </div>
              )}

              <button
                className="delete-account-button"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm Permanent Deletion"}
              </button>

              <button
                className="delete-cancel-button"
                onClick={() => {
                  setShowConfirm(false);
                  setPassword("");
                  setError("");
                }}
              >
                Cancel
              </button>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default DeleteAccount;