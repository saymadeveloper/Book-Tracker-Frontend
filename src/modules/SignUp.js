import React from 'react';
import axios from 'axios';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../asset/AssetHelper";
import { Link } from 'react-router-dom';
import { showError, showSuccess } from "../pages/Alert";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

export default function SignUp() {
  const history = useHistory();
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  const save = () => {
    let obj = {}
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    obj.name = name;
    obj.email = email;
    obj.password = password;
    const URL = `${process.env.REACT_APP_API_URL}/user/sign-up`;
    axios.post(URL, obj).then(response => {
      if (response.data.status === 200) {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        showSuccess(response.data.message);
        history.push("/");
      } else {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        showError(response.data.message);
        history.push("/signup");
      }
    }).catch(err => {
      showError(err);
    });
  }
  return (
    <div>
      <div><Navbar isLoggedIn={isLoggedIn} /></div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            {/* LOGO DIV  */}
            <div className='d-flex'>
              <div className="logo-space">
                <SVG src={toAbsoluteUrl("/images/logo.svg")} />
              </div>
              <div className="logo-title">Book Tracker</div>
            </div>

            {/* TITLE DIV */}
            <div className='mt-3'>
              <span className='title'>Create free account</span>
            </div>

            {/* SIGN UP DIV */}
            <div className='mt-3'>
              <span className='mr-1 font-style'>Going to login page.</span>
              <span className='font-style'><Link to='/'>Sign in</Link></span>
            </div>
            <div className="mt-3">
              <label className='form-level-font-size font-style'><span className='mr-1'>Full Name</span><strong className='text-danger'>*</strong></label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label className='form-level-font-size font-style'><span className='mr-1'>Email</span><strong className='text-danger'>*</strong></label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label className='form-level-font-size font-style'><span className='mr-1'>Password</span><strong className='text-danger'>*</strong></label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
              />
            </div>
            <div className='mt-3'>
              <small className='form-level-font-size font-style'>By signing up, you agree with our privacy and usage terms.</small>
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={save}
                className="btn submit-btn w-100"
              >
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}