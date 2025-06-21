import { useState } from "react";

const MainContent = ({ showAuth, showSignup, toggleForms }) => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    loginEmail: "",
    loginPassword: "",
  });
  const [isLoading, setIsLoading] = useState({ login: false, signup: false });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, signup: true });

    const exists = users.find((u) => u.email === formData.email);
    if (exists) {
      setError("This email is already registered.");
      setIsLoading({ ...isLoading, signup: false });
      return;
    }

    // Assign role automatically
    const newUser = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.email === "admin@gmail.com" ? "admin" : "user", // auto role
    };

    setUsers([...users, newUser]);
    setError("");
    setIsLoading({ ...isLoading, signup: false });

    alert("Signup successful!");
    toggleForms(); // move to login
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading({ ...isLoading, login: true });

    const matchedUser = users.find(
      (u) =>
        u.email === formData.loginEmail &&
        u.password === formData.loginPassword
    );

    if (matchedUser) {
      setError("");

      // Store logged in user
      localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
      window.location.href = "/page";
   
    } else {
      setError("Invalid email or password.");
    }

    setIsLoading({ ...isLoading, login: false });
  };

  return (
    <main>
      {!showAuth ? (
        <div className="homepage-main">
          <h1>WELCOME TO THE CLUB</h1>
          <p>Join us and be part of something extraordinary.</p>
        </div>
      ) : (
        <div className="auth-main">
          {error && (
            <div
              className="error-message"
              style={{
                color: "red",
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#ffeeee",
                borderRadius: "5px",
              }}
            >
              {error}
            </div>
          )}

          {showSignup ? (
            <div className="form-container" id="signup-container">
              <h2>Create Account</h2>
              <form id="signup-form" onSubmit={handleSignupSubmit}>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                  />
                </div>
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading.signup}
                >
                  {isLoading.signup ? "Creating Account..." : "Sign Up"}
                </button>
                <p className="form-link">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setError("");
                      toggleForms();
                    }}
                  >
                    Already have an account? Login
                  </a>
                </p>
              </form>
            </div>
          ) : (
            <div className="form-container" id="login-container">
              <h2>Member Login</h2>
              <form id="login-form" onSubmit={handleLoginSubmit}>
                <div className="input-group">
                  <label htmlFor="loginEmail">Email Address</label>
                  <input
                    type="email"
                    id="loginEmail"
                    name="loginEmail"
                    value={formData.loginEmail}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="loginPassword">Password</label>
                  <input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    value={formData.loginPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="login-button"
                  disabled={isLoading.login}
                >
                  {isLoading.login ? "Logging in..." : "Login"}
                </button>
                <p className="form-link">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setError("");
                      toggleForms();
                    }}
                  >
                    Don't have an account? Sign Up
                  </a>
                </p>
              </form>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default MainContent;
