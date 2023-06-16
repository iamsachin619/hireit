import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHost from "../env";
import "./login.css";
import axios from 'axios'
export default function LoginPage({setUser}) {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState(null)
  const login = () => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    
    fetch(apiHost + 'user/userlogin',{
      credentials:'include',
      method: 'POST',
      headers: myHeaders,
      body: raw,
    })
      .then(res=> res.json())
      .then((res) => {
        console.log({res})
        if(res.err){
          //error notif

          setErr(res.err)

        }else{
          setUser(res)
          console.log(res)
          navigation('/')
           //success notif
        }
      })
  };
  return (
    <div>
      <div class="sidenav">
        <div class="login-main-text">

          <h2>
            Welcome to Books Library <br />
            Login Page
          </h2>
          {/* <p>Login or register from here to access.</p> */}
        </div>
      </div>
      <div class="main">
        <div class="col-md-6 col-sm-12">
          <div class="login-form mx-3">
            {err && <div className=" alert alert-danger">{err}</div>}
            <>
              <div class="form-group mt-1">
                <label>User Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="User Name"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div class="form-group mt-1">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>
              {/* <div class="form-group mt-1">
                <label for="exampleFormControlSelect1">Select Role :</label>
                <select class="form-control" id="exampleFormControlSelect1">
                  <option>User</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </select>
              </div> */}
              <button
                class="btn btn-black my-3"
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Login
              </button>
              <button
                class="btn btn-secondary ms-2 my-3"
                onClick={() => {
                  navigation("/register");
                }}
              >
                Register
              </button>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
