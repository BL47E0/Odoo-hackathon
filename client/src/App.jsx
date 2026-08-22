import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [page, setPage] = useState("login"); // "login" | "dashboard"
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [checkedIn, setCheckedIn] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Employees", icon: "♙" },
    { name: "Attendance", icon: "◷" },
    { name: "Leave", icon: "▣" },
    { name: "Tasks", icon: "✓" },
    { name: "Payroll", icon: "₹" },
  ];

  const activities = [
    {
      icon: "✓",
      title: "Task completed",
      description: "Employee portal design",
      time: "10:42 AM",
    },
    {
      icon: "◷",
      title: "Checked in",
      description: "Office attendance",
      time: "09:08 AM",
    },
    {
      icon: "◆",
      title: "Meeting completed",
      description: "Daily team stand-up",
      time: "09:30 AM",
    },
  ];

  const team = [
    { initials: "AS", name: "Ananya Sharma", role: "UI Designer" },
    { initials: "RK", name: "Rahul Kumar", role: "Backend Developer" },
    { initials: "MP", name: "Meera Patel", role: "Product Manager" },
    { initials: "VK", name: "Vikram Singh", role: "Software Engineer" },
  ];

  // Show Login until the user signs in / creates an account
  if (page === "login") {
    return <Login onAuthSuccess={() => setPage("dashboard")} />;
  }

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">O</div>
          <div>
            <h2>odoo</h2>
            <span>Employee Portal</span>
          </div>
        </div>

        <div className="menu-section">
          <p className="menu-title">MAIN MENU</p>

          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activeMenu === item.name ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="menu-section bottom-menu">
          <p className="menu-title">SYSTEM</p>

          <button className="menu-item">
            <span className="menu-icon">⚙</span>
            <span>Settings</span>
          </button>

          <button className="menu-item">
            <span className="menu-icon">?</span>
            <span>Help & Support</span>
          </button>
        </div>

        <div className="sidebar-profile">
          <div className="avatar">PS</div>
          <div className="profile-info">
            <strong>Punit</strong>
            <span>Employee</span>
          </div>
          <span
            className="profile-more"
            onClick={() => setPage("login")}
            style={{ cursor: "pointer" }}
            title="Sign out"
          >
            •••
          </span>
        </div>

      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Header */}
        <header className="header">

          <div className="mobile-logo">
            <div className="logo-icon">O</div>
            <strong>odoo</strong>
          </div>

          <div className="breadcrumb">
            <span>Workspace</span>
            <span>/</span>
            <strong>{activeMenu}</strong>
          </div>

          <div className="header-actions">

            <div className="search-box">
              <span>⌕</span>
              <input placeholder="Search..." />
              <kbd>⌘ K</kbd>
            </div>

            <button className="icon-button notification">
              🔔
              <span className="notification-dot"></span>
            </button>

            <div className="header-avatar">PS</div>

          </div>
        </header>

        {/* Dashboard */}
        <section className="dashboard">

          {/* Welcome */}
          <div className="welcome-section">

            <div>
              <p className="date">
                Saturday, August 22, 2026
              </p>

              <h1>
                Good morning, Punit <span>👋</span>
              </h1>

              <p className="welcome-text">
                Here's what's happening with your work today.
              </p>
            </div>

            <button className="primary-button">
              <span>＋</span>
              New Request
            </button>

          </div>

          {/* Statistics */}
          <div className="stats-grid">

            <div className="stat-card attendance-stat">
              <div className="stat-top">
                <div>
                  <span className="stat-label">Attendance</span>
                  <h2>{checkedIn ? "Checked In" : "Not Checked In"}</h2>
                </div>

                <div className="stat-icon green">◷</div>
              </div>

              <div className="attendance-bottom">
                <div>
                  <span className="small-label">Today's hours</span>
                  <strong>{checkedIn ? "04h 32m" : "00h 00m"}</strong>
                </div>

                <button
                  className={`check-button ${
                    checkedIn ? "checked" : ""
                  }`}
                  onClick={() => setCheckedIn(!checkedIn)}
                >
                  {checkedIn ? "Check Out" : "Check In"}
                </button>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <span className="stat-label">Leave Balance</span>
                  <h2>12 Days</h2>
                </div>

                <div className="stat-icon purple">▣</div>
              </div>

              <div className="progress-container">
                <div className="progress-label">
                  <span>Used 6 of 18 days</span>
                  <span>67%</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill leave"></div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <span className="stat-label">My Tasks</span>
                  <h2>8 Tasks</h2>
                </div>

                <div className="stat-icon orange">✓</div>
              </div>

              <div className="progress-container">
                <div className="progress-label">
                  <span>5 completed</span>
                  <span>62%</span>
                </div>

                <div className="progress-bar">
                  <div className="progress-fill task"></div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <div>
                  <span className="stat-label">Performance</span>
                  <h2>92%</h2>
                </div>

                <div className="stat-icon blue">↗</div>
              </div>

              <div className="performance">
                <span className="up">↑ 8.4%</span>
                <span>vs last month</span>
              </div>
            </div>

          </div>

          {/* Main Grid */}
          <div className="content-grid">

            {/* Activity */}
            <div className="card activity-card">

              <div className="card-header">
                <div>
                  <h3>Today's Activity</h3>
                  <p>Your recent work activity</p>
                </div>

                <button className="view-button">
                  View all →
                </button>
              </div>

              <div className="timeline">

                {activities.map((activity, index) => (
                  <div className="activity-item" key={index}>

                    <div className={`activity-icon icon-${index}`}>
                      {activity.icon}
                    </div>

                    <div className="activity-content">
                      <strong>{activity.title}</strong>
                      <span>{activity.description}</span>
                    </div>

                    <time>{activity.time}</time>

                  </div>
                ))}

              </div>

            </div>

            {/* Upcoming */}
            <div className="card upcoming-card">

              <div className="card-header">
                <div>
                  <h3>Upcoming</h3>
                  <p>Don't miss what's next</p>
                </div>

                <button className="more-button">•••</button>
              </div>

              <div className="events">

                <div className="event">
                  <div className="calendar-icon">
                    <span>AUG</span>
                    <strong>23</strong>
                  </div>

                  <div className="event-info">
                    <strong>Team Meeting</strong>
                    <span>Tomorrow · 10:00 AM</span>
                  </div>

                  <span className="event-arrow">→</span>
                </div>

                <div className="event">
                  <div className="calendar-icon">
                    <span>AUG</span>
                    <strong>25</strong>
                  </div>

                  <div className="event-info">
                    <strong>Project Review</strong>
                    <span>Monday · 02:30 PM</span>
                  </div>

                  <span className="event-arrow">→</span>
                </div>

                <div className="event">
                  <div className="calendar-icon">
                    <span>AUG</span>
                    <strong>28</strong>
                  </div>

                  <div className="event-info">
                    <strong>Performance Review</strong>
                    <span>Thursday · 11:00 AM</span>
                  </div>

                  <span className="event-arrow">→</span>
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Grid */}
          <div className="bottom-grid">

            {/* Quick Actions */}
            <div className="card">

              <div className="card-header">
                <div>
                  <h3>Quick Actions</h3>
                  <p>Frequently used actions</p>
                </div>
              </div>

              <div className="quick-actions">

                <button>
                  <span className="quick-icon blue-bg">▣</span>
                  <span>
                    <strong>Apply Leave</strong>
                    <small>Submit a leave request</small>
                  </span>
                </button>

                <button>
                  <span className="quick-icon green-bg">◷</span>
                  <span>
                    <strong>Attendance</strong>
                    <small>View attendance history</small>
                  </span>
                </button>

                <button>
                  <span className="quick-icon purple-bg">✓</span>
                  <span>
                    <strong>My Tasks</strong>
                    <small>Manage your tasks</small>
                  </span>
                </button>

                <button>
                  <span className="quick-icon orange-bg">▤</span>
                  <span>
                    <strong>Documents</strong>
                    <small>Access company documents</small>
                  </span>
                </button>

              </div>

            </div>

            {/* Team */}
            <div className="card team-card">

              <div className="card-header">
                <div>
                  <h3>My Team</h3>
                  <p>People you're working with</p>
                </div>

                <button className="view-button">
                  View team →
                </button>
              </div>

              <div className="team-list">

                {team.map((member, index) => (
                  <div className="team-member" key={index}>

                    <div className={`team-avatar avatar-${index}`}>
                      {member.initials}
                    </div>

                    <div className="team-info">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </div>

                    <div className="online-dot"></div>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;