import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase.init";
import { Link } from "react-router";

// 8. create login page and add the functionality same as Registar.jsx but with signInWithEmailAndPassword. Then sign in with the created account from registar.
const LogIn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // 10.0 now my condition is using forget password to reset the password. from documentation "Send a password reset email" get the code. But u have to know that, the forget password is not linked with onSubmit button. So to get the data from dom we have to use useRef()
  const emailRef = useRef();

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

        // 9.3 if email is not activated u cannot log in. this condition is set in log in page. as we found from console result.user.emailVerified === false.
        if (!result.user.emailVerified) {
          setErrorMsg("Please activate ur email first");
        } else {
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.message);
      });
  };
  // 10.2 use sendPasswordResetEmail from documentation
  const handleForgetPassword = () => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;

    sendPasswordResetEmail(auth, email)
      .then(() => alert("An email has sent."))
      .catch((err) => console.log(err));
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
                // 10.1 set ref
                ref={emailRef}
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
                {/*  10.3 set handleForgetPassword*/}
                <a onClick={handleForgetPassword} className="link link-hover">
                  Forgot password?
                </a>
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
