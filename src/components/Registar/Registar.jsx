import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";

const Registar = () => {
  // 3.0 my requirement is showing the error message for password
  const [errorMsg, setErrorMsg] = useState("");

  // 1.1 created handleRegister
  const handleRegistar = (e) => {
    e.preventDefault();
    // 1.5 get the data from the field email and password field
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // 3.3 after error message shownit will auto remove so
    setErrorMsg("");

    // 2.8 in handle register use createUserWithEmailAndPassword with 3 parameter from doc
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        // 3.1 set the error message from doc which is error.message
        setErrorMsg(err.message);
      });
  };
  // 1.0 created two input field email, password
  return (
    <form
      onSubmit={handleRegistar}
      className="space-y-4 mt-6 max-w-2xs mx-auto"
    >
      {/* Email field */}
      <h3 className="text-3xl font-bold">Please Register</h3>
      <div>
        <label className="input validator join-item">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          {/* 1.3 created a attributes called name='email' to get the data */}
          <input
            type="email"
            placeholder="mail@site.com"
            name="email"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
      </div>

      <br />
      {/* Password field */}
      <label className="input validator">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
          </g>
        </svg>
        {/* 1.4 created a attributes called name='password' to get the data */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          minlength="5"
          /* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" */
        />
      </label>
      {/* <p className="validator-hint hidden">
        Must be more than 8 characters, including
        <br />
        At least one number <br />
        At least one lowercase letter <br />
        At least one uppercase letter
      </p> */}
      <br />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      {/* 3.2 show the error message in ui */}
      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
};

export default Registar;
