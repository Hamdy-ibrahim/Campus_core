import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/shared.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    studentid: "",
    email: "",
    course: "",
    year: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (
      form.fullname === "" ||
      form.studentid === "" ||
      form.email === "" ||
      form.course === "" ||
      form.year === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(form.email)) {
      alert("Enter a valid email.");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const student = {
      fullname: form.fullname.trim(),
      studentid: form.studentid.trim(),
      email: form.email.trim(),
      course: form.course,
      year: form.year,
      password: form.password
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      user => user.email === student.email
    );

    if (existingUser) {
      alert("An account with this email already exists.");
      return;
    }

    users.push(student);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Account created successfully!");

    navigate("/login");

  }

  return (
    <div className="signup-page">

      <div className="signup-left">

        <h1>CampusCore</h1>

        <h2>Start Your Campus Journey</h2>

        <p>
          Create your account to access clubs, events,
          marketplace, announcements and everything
          happening around your campus.
        </p>

      </div>

      <div className="signup-right">

        <div className="signup-card">

          <h2>Create Account</h2>

          <p>Register to join CampusCore.</p>

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            <label>Student ID</label>

            <input
              type="text"
              name="studentid"
              value={form.studentid}
              onChange={handleChange}
              placeholder="Enter your student ID"
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Course</label>

            <select
              name="course"
              value={form.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              <option>Computer Science</option>
              <option>Information Technology</option>
              <option>Business Information Systems</option>
              <option>Software Engineering</option>
              <option>Electrical Engineering</option>
              <option>Other</option>
            </select>

            <label>Year of Study</label>

            <select
              name="year"
              value={form.year}
              onChange={handleChange}
            >
              <option value="">Select Year</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
              <option>Postgraduate</option>
            </select>

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
              />

              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>

            </div>

            <label>Confirm Password</label>

            <div className="password-box">

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
              />

              <i
                className={`fa-solid ${showConfirm ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowConfirm(!showConfirm)}
              ></i>

            </div>

            <button type="submit">

              Create Account

            </button>

          </form>

          <p className="signup-link">

            Already have an account?

            <Link to="/login">

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );

}

export default Signup;