import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router";

// 8. create login page and add the functionality same as Registar.jsx but with signInWithEmailAndPassword. Then sign in with the created account from registar.
const LogIn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setErrorMsg("");
    setSuccess(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
                <p>
                  Don't have account? Please{" "}
                  <span className="text-blue-500">
                    <Link to="/registar">Sign up</Link>
                  </span>
                </p>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {success && (
              <p className="text-green-500">Successfully Logged In</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
