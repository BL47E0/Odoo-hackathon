import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// TODO: point these two at your actual files.
// useAuth() -> should expose a `login(data)` that stores the token/user
//   (context + localStorage, however you've set that up).
// loginUser / registerUser -> your API calls, each returning a promise
//   that resolves on success and throws (with a readable `.message`) on failure.
import { useAuth } from "./context/AuthContext";
import { loginUser, registerUser } from "./api/auth";

function Login({ onAuthSuccess }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
    if (nextMode === "signup") {
      setJustRegistered(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      login(data); // stores token + user in context/localStorage
      if (onAuthSuccess) onAuthSuccess();
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerUser(email, password);
      setSuccess(true);
      setJustRegistered(true);
      setTimeout(() => {
        setMode("signin");
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page">

      {/* Left brand / badge panel */}
      <aside className="login-brand">

        <div className="login-brand-top">
          <div className="logo">
            <div className="logo-icon">O</div>
            <div>
              <h2>odoo</h2>
              <span>Employee Portal</span>
            </div>
          </div>
        </div>

        <div className="login-brand-body">

          <div className="badge-card">
            <div className="badge-stripe" />
            <div className="badge-row">
              <div className="badge-avatar">PS</div>
              <div className="badge-id">
                <span>EMP ID</span>
                <strong>0428-KA</strong>
              </div>
            </div>
            <div className="badge-barcode">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} style={{ height: `${(i * 13) % 24 + 10}px` }} />
              ))}
            </div>
          </div>

          <h1>
            Clock in to <span>your workday</span>.
          </h1>
          <p>
            Attendance, leave, tasks and payroll — one badge for
            your whole team.
          </p>

          <div className="brand-stats">
            <div className="brand-stat">
              <strong>12</strong>
              <span>Leave days left</span>
            </div>
            <div className="brand-stat">
              <strong>8</strong>
              <span>Tasks this week</span>
            </div>
            <div className="brand-stat">
              <strong>92%</strong>
              <span>Performance</span>
            </div>
          </div>
        </div>

        <div className="login-brand-footer">
          <span>© 2026 Odoo Employee Portal</span>
        </div>

      </aside>

      {/* Perforated stub divider */}
      <div className="stub-divider" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* Right form panel */}
      <main className="login-form-panel">

        <div className="mobile-logo">
          <div className="logo-icon">O</div>
          <strong>odoo</strong>
        </div>

        <div className="login-card">

          <div className="mode-tabs">
            <button
              type="button"
              className={mode === "signin" ? "active" : ""}
              onClick={() => switchMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => switchMode("signup")}
            >
              Create account
            </button>
            <span
              className={`tab-indicator ${mode === "signup" ? "right" : ""}`}
            />
          </div>

          {mode === "signin" ? (
            <>
              <p className="login-eyebrow">Welcome back</p>
              <h2 className="login-title">Sign in to your account</h2>
              <p className="login-subtitle">
                {justRegistered
                  ? "Account created — sign in to continue."
                  : "Enter your work email to access the portal."}
              </p>

              <form onSubmit={handleSignIn} className="login-form">

                <label className="field">
                  <span>Work email</span>
                  <input
                    type="email"
                    placeholder="punit@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Password</span>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <div className="field-row">
                  <label className="checkbox-label">
                    <input type="checkbox" defaultChecked />
                    <span>Remember me</span>
                  </label>

                  <a href="#" className="forgot-link">
                    Forgot password?
                  </a>
                </div>

                {error && (
                  <p style={{ color: "#D96C4F", fontSize: "11px", margin: 0 }}>
                    {error}
                  </p>
                )}

                <button type="submit" className="login-submit">
                  Sign in
                </button>

              </form>
            </>
          ) : (
            <>
              <p className="login-eyebrow">New here</p>
              <h2 className="login-title">Create your account</h2>
              <p className="login-subtitle">
                Set up access with your work email.
              </p>

              <form onSubmit={handleSignUp} className="login-form">

                <label className="field">
                  <span>Full name</span>
                  <input
                    type="text"
                    placeholder="Punit Sharma"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Work email</span>
                  <input
                    type="email"
                    placeholder="punit@company.com"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="field">
                  <span>Password</span>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </label>

                <label className="checkbox-label terms-row">
                  <input type="checkbox" required />
                  <span>
                    I agree to the <a href="#">Terms</a> and{" "}
                    <a href="#">Privacy Policy</a>
                  </span>
                </label>

                {error && (
                  <p style={{ color: "#D96C4F", fontSize: "11px", margin: 0 }}>
                    {error}
                  </p>
                )}

                {success && (
                  <p style={{ color: "#2F6F5E", fontSize: "11px", margin: 0 }}>
                    Account created! Redirecting to sign in…
                  </p>
                )}

                <button type="submit" className="login-submit">
                  Create account
                </button>

              </form>
            </>
          )}

          <div className="login-divider">
            <span>or continue with</span>
          </div>

          <div className="sso-row">
            <button type="button" className="sso-button">
              <span className="sso-icon">⌘</span>
              Google
            </button>
            <button type="button" className="sso-button">
              <span className="sso-icon">▤</span>
              Microsoft
            </button>
          </div>

          <p className="signup-hint">
            {mode === "signin" ? (
              <>
                New to the portal?{" "}
                <a href="#" onClick={() => switchMode("signup")}>
                  Create an account
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="#" onClick={() => switchMode("signin")}>
                  Sign in
                </a>
              </>
            )}
          </p>

        </div>

      </main>

    </div>
  );
}

export default Login;