import { useState } from "react";

function Login() {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to your auth logic
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
              onClick={() => setMode("signin")}
            >
              Sign in
            </button>
            <button
              type="button"
              className={mode === "signup" ? "active" : ""}
              onClick={() => setMode("signup")}
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
                Enter your work email to access the portal.
              </p>

              <form onSubmit={handleSubmit} className="login-form">

                <label className="field">
                  <span>Work email</span>
                  <input
                    type="email"
                    placeholder="punit@company.com"
                    autoComplete="email"
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

              <form onSubmit={handleSubmit} className="login-form">

                <label className="field">
                  <span>Full name</span>
                  <input
                    type="text"
                    placeholder="Punit Sharma"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="field">
                  <span>Work email</span>
                  <input
                    type="email"
                    placeholder="punit@company.com"
                    autoComplete="email"
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
                <a href="#" onClick={() => setMode("signup")}>
                  Create an account
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="#" onClick={() => setMode("signin")}>
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




const styleTag = document.createElement("style");
styleTag.innerHTML = '@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap");\n\n/* =========================\n   LOGIN / SIGNUP PAGE\n\n   Token system:\n   ink      #101C30  (deep navy-ink, brand panel)\n   amber    #E3A23D  (badge/accent — replaces the\n                       purple used elsewhere, on\n                       purpose, to feel earned by an\n                       ID-badge / punch-clock concept)\n   paper    #FBF8F2  (warm card surface, right panel)\n   moss     #2F6F5E  (secondary / success accent)\n   clay     #D96C4F  (error / destructive accent)\n   ink-60   #4B5568  (muted text on paper)\n========================= */\n\n.login-page {\n  min-height: 100vh;\n  display: flex;\n  background: #101c30;\n  color: #20242d;\n}\n\n/* =========================\n   LEFT BRAND PANEL\n========================= */\n\n.login-brand {\n  width: 46%;\n  min-width: 440px;\n  min-height: 100vh;\n  background: #101c30;\n  color: #ffffff;\n  padding: 40px 48px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  overflow: hidden;\n}\n\n.login-brand::before {\n  content: "";\n  position: absolute;\n  width: 560px;\n  height: 560px;\n  border-radius: 50%;\n  background: radial-gradient(\n    circle,\n    rgba(227, 162, 61, 0.26) 0%,\n    rgba(227, 162, 61, 0) 70%\n  );\n  top: -200px;\n  right: -240px;\n  pointer-events: none;\n}\n\n.login-brand-top .logo {\n  display: flex;\n  align-items: center;\n  gap: 11px;\n}\n\n.login-brand-top .logo-icon {\n  width: 38px;\n  height: 38px;\n  border-radius: 10px;\n  background: #e3a23d;\n  color: #101c30;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 21px;\n  font-weight: 800;\n}\n\n.login-brand-top .logo h2 {\n  margin: 0;\n  font-size: 22px;\n  letter-spacing: -0.5px;\n}\n\n.login-brand-top .logo span {\n  display: block;\n  margin-top: 2px;\n  color: #8f95a8;\n  font-size: 10px;\n}\n\n.login-brand-body {\n  margin-top: auto;\n  margin-bottom: auto;\n  padding-top: 44px;\n  max-width: 420px;\n  position: relative;\n  z-index: 1;\n}\n\n/* ---- signature element: ID badge with barcode ---- */\n\n.badge-card {\n  background: #16233a;\n  border: 1px solid #26314a;\n  border-radius: 14px;\n  padding: 18px 18px 16px;\n  margin-bottom: 30px;\n  position: relative;\n  overflow: hidden;\n  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);\n}\n\n.badge-stripe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 5px;\n  background: linear-gradient(90deg, #e3a23d, #f0c27b);\n}\n\n.badge-row {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-top: 8px;\n}\n\n.badge-avatar {\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  background: #e3a23d;\n  color: #101c30;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 800;\n  font-size: 13px;\n}\n\n.badge-id {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n\n.badge-id span {\n  font-size: 9px;\n  letter-spacing: 1px;\n  color: #7d8399;\n  font-weight: 700;\n}\n\n.badge-id strong {\n  font-size: 14px;\n  letter-spacing: 0.3px;\n}\n\n.badge-barcode {\n  display: flex;\n  align-items: flex-end;\n  gap: 2px;\n  margin-top: 16px;\n  height: 26px;\n  opacity: 0.85;\n}\n\n.badge-barcode span {\n  width: 2px;\n  background: #e3a23d;\n  border-radius: 1px;\n}\n\n.login-brand-body h1 {\n  font-family: "Fraunces", Georgia, serif;\n  font-weight: 600;\n  font-size: 32px;\n  line-height: 1.25;\n  letter-spacing: -0.5px;\n  margin: 0 0 14px;\n}\n\n.login-brand-body h1 span {\n  color: #e3a23d;\n  font-style: italic;\n}\n\n.login-brand-body p {\n  color: #a4a9ba;\n  font-size: 13px;\n  line-height: 1.6;\n  margin: 0;\n}\n\n.brand-stats {\n  display: flex;\n  gap: 28px;\n  margin-top: 32px;\n  padding-top: 26px;\n  border-top: 1px solid #26314a;\n}\n\n.brand-stat {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n\n.brand-stat strong {\n  font-family: "Fraunces", Georgia, serif;\n  font-size: 20px;\n  letter-spacing: -0.2px;\n  color: #e3a23d;\n}\n\n.brand-stat span {\n  font-size: 10px;\n  color: #7d8399;\n}\n\n.login-brand-footer {\n  position: relative;\n  z-index: 1;\n  color: #5c6178;\n  font-size: 10px;\n}\n\n/* =========================\n   PERFORATED STUB DIVIDER\n========================= */\n\n.stub-divider {\n  width: 1px;\n  min-height: 100vh;\n  background: transparent;\n  border-left: 2px dashed #2b3652;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-evenly;\n  align-items: center;\n  position: relative;\n}\n\n.stub-divider span {\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  background: #f6f7fb;\n  margin-left: -8px;\n}\n\n/* =========================\n   RIGHT FORM PANEL\n========================= */\n\n.login-form-panel {\n  flex: 1;\n  background: #fbf8f2;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 40px 24px;\n}\n\n.login-form-panel .mobile-logo {\n  display: none;\n}\n\n.login-card {\n  width: 100%;\n  max-width: 380px;\n}\n\n/* ---- tab switcher ---- */\n\n.mode-tabs {\n  position: relative;\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  background: #f0ebe0;\n  border-radius: 10px;\n  padding: 4px;\n  margin-bottom: 28px;\n}\n\n.mode-tabs button {\n  position: relative;\n  z-index: 1;\n  border: none;\n  background: transparent;\n  padding: 10px 0;\n  font-size: 12px;\n  font-weight: 700;\n  color: #7c8194;\n  border-radius: 7px;\n  transition: color 0.2s ease;\n}\n\n.mode-tabs button.active {\n  color: #101c30;\n}\n\n.tab-indicator {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: calc(50% - 4px);\n  height: calc(100% - 8px);\n  background: #ffffff;\n  border-radius: 7px;\n  box-shadow: 0 3px 8px rgba(16, 28, 48, 0.1);\n  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);\n}\n\n.tab-indicator.right {\n  transform: translateX(100%);\n}\n\n.login-eyebrow {\n  margin: 0 0 6px;\n  font-size: 11px;\n  font-weight: 700;\n  color: #b9782a;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n}\n\n.login-title {\n  font-family: "Fraunces", Georgia, serif;\n  font-weight: 600;\n  margin: 0 0 6px;\n  font-size: 25px;\n  letter-spacing: -0.3px;\n  color: #171d2b;\n}\n\n.login-subtitle {\n  margin: 0 0 26px;\n  font-size: 12px;\n  color: #8a8f9e;\n}\n\n.login-form {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.field {\n  display: flex;\n  flex-direction: column;\n  gap: 7px;\n}\n\n.field > span {\n  font-size: 11px;\n  font-weight: 600;\n  color: #494e5f;\n}\n\n.field input {\n  height: 42px;\n  border: 1px solid #e4ded0;\n  background: #ffffff;\n  border-radius: 8px;\n  padding: 0 13px;\n  font-size: 13px;\n  color: #20242d;\n  outline: none;\n  transition: 0.15s ease;\n}\n\n.field input:focus-visible {\n  border-color: #e3a23d;\n  box-shadow: 0 0 0 3px rgba(227, 162, 61, 0.2);\n}\n\n.password-input {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n\n.password-input input {\n  width: 100%;\n  padding-right: 54px;\n}\n\n.toggle-password {\n  position: absolute;\n  right: 8px;\n  border: none;\n  background: transparent;\n  color: #b9782a;\n  font-size: 10px;\n  font-weight: 700;\n  padding: 6px 8px;\n}\n\n.field-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: -2px;\n}\n\n.checkbox-label {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  font-size: 11px;\n  color: #666b7a;\n}\n\n.checkbox-label input {\n  width: 14px;\n  height: 14px;\n  accent-color: #e3a23d;\n}\n\n.terms-row {\n  align-items: flex-start;\n  line-height: 1.5;\n}\n\n.terms-row input {\n  margin-top: 2px;\n}\n\n.terms-row a {\n  color: #b9782a;\n  font-weight: 600;\n  text-decoration: none;\n}\n\n.terms-row a:hover {\n  text-decoration: underline;\n}\n\n.forgot-link {\n  font-size: 11px;\n  color: #b9782a;\n  font-weight: 600;\n  text-decoration: none;\n}\n\n.forgot-link:hover {\n  text-decoration: underline;\n}\n\n.login-submit {\n  border: none;\n  background: #101c30;\n  color: #ffffff;\n  padding: 12px 17px;\n  border-radius: 8px;\n  font-size: 13px;\n  font-weight: 600;\n  margin-top: 6px;\n  box-shadow: 0 3px 10px rgba(16, 28, 48, 0.22);\n  transition: transform 0.15s ease, background 0.15s ease;\n}\n\n.login-submit:hover {\n  background: #182a47;\n  transform: translateY(-1px);\n}\n\n.login-submit:focus-visible,\n.toggle-password:focus-visible,\n.forgot-link:focus-visible,\n.sso-button:focus-visible,\n.mode-tabs button:focus-visible {\n  outline: 2px solid #e3a23d;\n  outline-offset: 2px;\n}\n\n.login-divider {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin: 26px 0 18px;\n  color: #b3ab98;\n  font-size: 10px;\n}\n\n.login-divider::before,\n.login-divider::after {\n  content: "";\n  flex: 1;\n  height: 1px;\n  background: #e9e2d3;\n}\n\n.sso-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.sso-button {\n  height: 40px;\n  border: 1px solid #e4ded0;\n  background: white;\n  border-radius: 8px;\n  font-size: 11px;\n  font-weight: 600;\n  color: #494e5f;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 7px;\n}\n\n.sso-button:hover {\n  background: #fbf8f2;\n  border-color: #e3a23d;\n}\n\n.sso-icon {\n  font-size: 12px;\n  color: #b9782a;\n}\n\n.signup-hint {\n  margin: 22px 0 0;\n  text-align: center;\n  font-size: 11px;\n  color: #8a8f9e;\n}\n\n.signup-hint a {\n  color: #b9782a;\n  font-weight: 600;\n  text-decoration: none;\n}\n\n.signup-hint a:hover {\n  text-decoration: underline;\n}\n\n/* =========================\n   RESPONSIVE\n========================= */\n\n@media (max-width: 900px) {\n  .login-brand,\n  .stub-divider {\n    display: none;\n  }\n\n  .login-form-panel .mobile-logo {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    margin-bottom: 34px;\n  }\n\n  .login-form-panel .mobile-logo .logo-icon {\n    width: 34px;\n    height: 34px;\n    border-radius: 9px;\n    background: #e3a23d;\n    color: #101c30;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 17px;\n    font-weight: 800;\n  }\n\n  .login-form-panel .mobile-logo strong {\n    font-size: 18px;\n    letter-spacing: -0.4px;\n    color: #20242d;\n  }\n}\n\n@media (max-width: 460px) {\n  .login-form-panel {\n    padding: 28px 18px;\n  }\n}\n';
if (typeof document !== "undefined" && !document.getElementById("login-styles")) {
  styleTag.id = "login-styles";
  document.head.appendChild(styleTag);
}

export default Login;