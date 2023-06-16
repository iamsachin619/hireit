import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiHost from '../../env';
import '../login.css'
export default function UserRegister({setUser}) {
  const navigation = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [err, setErr] = useState(null)
  const Register = () => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

   

    const config = {
      headers: {
        "Content-type": "application/json"
        
      }}
    
    axios.post( apiHost + 'user/userregister',{
      "firstName": fname,  
	    "lastName": lname,
      email: email,
      password: password,
    },config)
      .then((res) => {
        if(res.data.err){
          
          setErr(res.data.err)
        }else{
          setUser(res.data)
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
          SignUp Page
        </h2>
       
      </div>
    </div>

    <div class="main">
      <div class="col-md-6 col-sm-12">
        <div class="login-form mx-3">
        {err && (<div className=" alert alert-danger">{err}</div>)}
          <form>
            <div class="form-group mt-1">
              <label>User Name / Email</label>
              <input type="text" class="form-control" placeholder="User Name" 
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}/>
            </div>

            <div class="form-group mt-1">
              <label>First Name</label>
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                value={fname}
                  onChange={(e) => {setFname(e.target.value)}}
              />
            </div>

            <div class="form-group mt-1">
              <label>Last Name</label>
              <input type="text" class="form-control" placeholder="Last Name" 
                  value={lname}
                  onChange={(e) => {setLname(e.target.value)}}/>
            </div>

            <div class="form-group mt-1">
              <label>Password</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                value={password}
                  onChange={(e) => {setPass(e.target.value)}}
              />
            </div>
           
            <button  class="btn btn-secondary my-3" onClick={(e)=>{
              e.preventDefault()
              Register()
            }}>Register</button>
            <button
             
              class="btn btn-secondary ms-2 my-3"
              onClick={()=> {navigation('/login')}}
          
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}
