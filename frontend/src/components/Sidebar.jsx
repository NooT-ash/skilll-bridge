
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  Brain,
  ClipboardCheck,
  BriefcaseBusiness,
  BookOpen,
  Bookmark,
  LockKeyhole,
  Trash2,
  LogOut,
  Menu,
  X
} from "lucide-react";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sidebar menu items
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "My Profile",
      path: "/profile",
      icon: UserRound
    },
    {
      name: "My Skills",
      path: "/skills",
      icon: Brain
    },
    {
      name: "Assessment Results",
      path: "/assessment-results",
      icon: ClipboardCheck
    },
    {
      name: "Career Opportunities",
      path: "/jobs",
      icon: BriefcaseBusiness
    },
    {
      name: "Learning Resources",
      path: "/learning",
      icon: BookOpen
    },
    {
      name: "Saved Jobs",
      path: "/saved-jobs",
      icon: Bookmark
    },
    {
      name: "Change Password",
      path: "/change-password",
      icon: LockKeyhole
    },
    {
      name: "Delete Account",
      path: "/delete-account",
      icon: Trash2
    }
  ];

  // Logout function
  function handleLogout() {
    localStorage.removeItem("skillbridgeToken");
    localStorage.removeItem("skillbridgeUser");

    navigate("/login", { replace: true });
  }

  // Close sidebar
  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="sidebar-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? (
          <X size={25} />
        ) : (
          <Menu size={25} />
        )}
      </button>

      {/* Background Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`skill-sidebar ${
          sidebarOpen ? "sidebar-visible" : ""
        }`}
      >

        {/* Sidebar Logo */}
        <div className="sidebar-brand">
          <div className="sidebar-logo">S</div>

          <div>
            <h2>SkillBridge</h2>
            <span>STUDENT PORTAL</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="sidebar-menu">
          <p className="sidebar-heading">MAIN MENU</p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `sidebar-link ${
                    isActive ? "active" : ""
                  } ${
                    item.path === "/delete-account"
                      ? "delete-sidebar-link"
                      : ""
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Sidebar Bottom */}
        <div className="sidebar-bottom">

          {/* Help Section */}
          <div className="sidebar-help">
            <div className="help-icon">?</div>

            <div>
              <h4>Need Help?</h4>
              <p>Contact our support team</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className="sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>

          {/* Footer */}
          <div className="sidebar-footer">
            © 2026 SkillBridge
          </div>

        </div>
      </aside>
    </>
  );
}

export default Sidebar;
