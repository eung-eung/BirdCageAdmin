import { TextField } from "@mui/material";
import * as React from 'react';
import "./LoginForm.css"
// import logo from "./images/a.png"
// import logo from "../../../public/images/a.png"
import logo from "../../images/bird-cage.png"
import { Link, useNavigate } from "react-router-dom";
import UseToken from '../handleToken/UseToken'
import { useState } from "react";

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const { setToken } = UseToken()
  const [isLoading, setLoading] = useState(false)
  const [checkValidPhoneNum, setValidPhoneNum] = useState(true)
  const navigate = useNavigate();

  const regexPhoneNumber = phone => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return phone.match(regexPhoneNumber) ? true : false
  }
  const handleChangePhone = e => {
    setPhoneNumber(e.target.value.trim())
    regexPhoneNumber(e.target.value.trim()) ? setValidPhoneNum(true) : setValidPhoneNum(false)
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!phoneNumber || !password) {
      setMessage("We need your phone number and password")
      return
    }
    const data = {
      phoneNumber: phoneNumber,
      password: password
    }
    setLoading(true)
    fetch(
      "http://localhost:5000/api/v1/account/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        setLoading(false)
        if (res.status == "success") {
          console.log(res);
          sessionStorage.setItem('phoneNum', res.data.account.phoneNumber);
          sessionStorage.setItem('role', res.data.account.role);

          if (res.data.account.role === "admin" ||
            res.data.account.role === "staff" ||
            res.data.account.role === "manager") {
            setToken(res.data.token);
            navigate('/dashboard');
          } else {
            setMessage("This account has not been authorized!");
          }
        } else {
          setMessage(res.message)
        }

      })

      .catch(error => {
        throw error
      })
  }

  return (
    <>
      <form id="login-form">
        <img className="logo" src={logo} />
        <p style={{ fontSize: "30px", fontWeight: "500" }}>Sign in</p>
        <div className="input-container">
          <p className="label-input">Phone number</p>
          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            value={phoneNumber}
            onChange={handleChangePhone}
            type='text'
            placeholder='Phone number'
          />
          <span style={{ color: "red" }}>{checkValidPhoneNum ? "" : "Invalid phone number format"}</span>
        </div>

        <div className="input-container">
          <p className="label-input">Your password</p>

          <TextField
            id="outlined-basic"
            variant="outlined"
            style={{ width: "100%" }}
            value={password}
            onChange={handleChangePassword}
            type='password'
            placeholder='Password'
          />
        </div>
        <div className="input-container">
          <button to="/dashboard" onClick={handleLogin} id="login-submit">Log in</button>
          <div style={{ color: "red", marginTop: "10px" }}>{message}</div>
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
