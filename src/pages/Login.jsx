import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/shared.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  async function handleLogin(e) {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }


    // ---------- ADMIN LOGIN ----------

    if (
      email.trim() === "admin@campuscore.com" &&
      password.trim() === "admin123"
    ) {

      const admin = {
        fullname: "System Administrator",
        email: "admin@campuscore.com",
        role: "admin"
      };

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(admin)
      );

      navigate("/admin");

      return;
    }


    // ---------- STUDENT LOGIN ----------

    try {

      const response = await fetch(
        "http://localhost:5000/api/signup/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password.trim()
          })
        }
      );


      const data = await response.json();


      if (!response.ok) {

        alert(
          data.error ||
          "Incorrect email or password."
        );

        return;
      }


      // Save logged-in student
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );


      // Go to student dashboard
      navigate("/dashboard");


    } catch (err) {

      console.error(err);

      alert(
        "Could not connect to the server. Is the backend running?"
      );
    }
  }


  return (
    <div className="login-page">

      {/* LEFT */}

      <div className="login-left">

        <h1>CampusCore</h1>

        <h2>
          Your Campus.
          <br />
          One Platform.
        </h2>

        <p>
          Join clubs, discover events, buy and sell items,
          receive announcements and manage your campus life
          all in one place.
        </p>

      </div>


      {/* RIGHT */}

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <p>Sign in to continue.</p>


          <form onSubmit={handleLogin}>

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />


            <label>Password</label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <i
                className={`fa-solid ${
                  showPassword
                    ? "fa-eye-slash"
                    : "fa-eye"
                }`}
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  cursor: "pointer"
                }}
              ></i>

            </div>


            <div className="login-options">

              <label>

                <input type="checkbox" />

                Remember Me

              </label>


              <a href="#">
                Forgot Password?
              </a>

            </div>


            <button type="submit">
              Login
            </button>

          </form>


          <p className="signup-link">

            Don't have an account?

            <Link to="/signup">
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;