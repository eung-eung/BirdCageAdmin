import { TextField } from "@mui/material";
import * as React from 'react';
import "./LoginForm.css"
// import logo from "./images/a.png"
// import logo from "../../../public/images/a.png"
import logo from "../../images/bird-cage.png"
import { Link } from "react-router-dom";

export default function LoginForm() {

  return (
    <>
      <form id="login-form">
        <img className="logo" src={logo} />
        <p style={{ fontSize: "30px", fontWeight: "500" }}>Sign in</p>
        <div className="input-container">
          <p className="label-input">Email or mobile phone number</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>

        <div className="input-container">
          <p className="label-input">Your password</p>

          <TextField
            type="password"
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </div>
        <div className="input-container">
          <Link to="/dashboard" id="login-submit">Log in</Link>
          <p className="privacy">By creating an account, you agree to the
            <a className="privacy-link" href="#">Terms of use</a>
            and
            <a className="privacy-link" href="#">Privacy Policy</a>.</p>
        </div>

        <div className="other-actions">
          <p>Other issue with sign in</p>
          <p>Forget your password</p>
        </div>
      </form>
      {/* <div className="create-account">
        <div className="title">
          New to our community
        </div>
        <button id="create-submit">Create an account</button>
      </div> */}
    </>

  )
}
