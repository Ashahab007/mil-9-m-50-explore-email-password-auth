import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase.init";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Registar = () => {
  // 3.0 my requirement is showing the error message for password that's why define a state
  const [errorMsg, setErrorMsg] = useState("");

  // 4.0 My requirement is showing success message if all condition met
  const [success, setSuccess] = useState(false); //u can also useState('') here

  // 6.0 My requirement is show or hide the password that's why take a state
  const [showPassword, setShowPassword] = useState(false);

  // 1.1 created handleRegister
  const handleRegistar = (e) => {
    e.preventDefault();
    // 1.5 get the data from the field email and password field
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // 7.1 get the checked state value
    const terms = e.target.checkbox.checked;
    console.log(terms);

    if (terms === false) {
      setErrorMsg("Please accept our terms and conditions.");
      return;
    }

    // 5.0 Password validation, it was the task from module (problem as my all condition met it doesn't show the success message that's why not going to firebase server and commented and works with normal password validation below)
    /*  if (password.length < 8) {
      setErrorMsg("Password must be at least 8 character long");
      setSuccess(true);
      return;
    } else if (/(?=.*[A-Z])(?=.*[a-z]).{8,}/.test(password)) {
      setErrorMsg("Password must contain one digit");
      return;
    } else if (/(?=.*\d+)(?=.*[A-Z]).{8,}/.test(password)) {
      setErrorMsg("Password must contain one lowercase letter");
      return;
    } else if (/(?=.*\d+)(?=.*[a-z]).{8,}/.test(password)) {
      setErrorMsg("Password must contain one uppercase letter");
      return;
    } else {
      setSuccess(success);
    } */

    // 5.1 Password validation in simpler way
    const regExpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (regExpPassword.test(password) === false) {
      setErrorMsg(
        "Password must contain one uppercase letter, one lowercase letter and one digit"
      );
      return;
    }

    // 2.8 in handle register use createUserWithEmailAndPassword with 3 parameter from doc
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
        // 3.3 reset error i.e error message is not shown if the requirement is true
        setErrorMsg("");

        // 4.1 setSuccess true
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        // 3.1 set the err.message in setErrorMsg from documentation
        setErrorMsg(err.message);
        // 4.2 if error not occured  nothing will show from success i.e it will remove the shown success message from the ui
        setSuccess(false);
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
            // required
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
        <div className="relative">
          <input
            name="password"
            // 6.2 change the type to text by toggling
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            // minlength="5"
            /* pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" */
          />
          <button
            // 6.3 create a onclick handler to toggle it
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1 left-56"
          >
            {/* 6.1 position the eye icon and change it by toggling conditionally  */}
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>
      </label>
      {/* <p className="validator-hint hidden">
        Must be more than 8 characters, including
        <br />
        At least one number <br />
        At least one lowercase letter <br />
        At least one uppercase letter
      </p> */}
      <br />
      {/* 7.0 My requirement is by tick the checkbox it will submit otherwise show error message. So created the checkbox */}
      <label className="label">
        <input type="checkbox" name="checkbox" className="checkbox" />
        Accept Terms and Conditions
      </label>

      <br />

      <button className="btn btn-primary" type="submit">
        Submit
      </button>
      {/* 3.2 show the error message in ui */}
      {errorMsg && <p className="text-red-500">{errorMsg}</p>}
      {/* 4.3 Show the success message in UI*/}
      {success && (
        <p className="text-green-500">Account Created Successfully</p>
      )}
    </form>
  );
};

export default Registar;
