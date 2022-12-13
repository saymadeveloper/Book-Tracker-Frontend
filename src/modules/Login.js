import React from 'react';
import axios from 'axios';
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../asset/AssetHelper";
import { Link } from 'react-router-dom';
import { showError, showSuccess } from "../pages/Alert";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";

export default function Login() {
  const history = useHistory();
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  const save = () => {
    let obj = {}
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    obj.email = email;
    obj.password = password;
    const URL = `${process.env.REACT_APP_API_URL}/user/sign-in`;
    axios.post(URL, obj).then(response => {
      if (response.data.status === 200) {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("isLoggedIn", true);
        showSuccess(response.data.message);
        history.push("/my-book");
      } else {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        showError(response.data.message);
        history.push("/");
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
              <span className='title'>Sign in to your account</span>
            </div>

            {/* SIGN UP DIV */}
            <div className='mt-3'>
              <span className='mr-1 font-style'>Don't have an account ?</span>
              <span className='font-style'><Link to='/signup'>Sign up</Link></span>
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
            <div className="mt-3">
              <button
                type="button"
                onClick={save}
                className="btn submit-btn w-100"
              >
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
}