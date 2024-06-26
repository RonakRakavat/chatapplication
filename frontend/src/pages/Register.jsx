import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { registerRoute } from '../utils/Apiroute';


const register = () => {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
  })

  var toastoption = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handlesubmit = async (event) => {
    event.preventDefault();
    if (handleValidition()) {
      const { password, username, email } = value;
      const {data} = await axios.post(registerRoute, {
        username, email, password
      })
      if (data.status == false) {
        toast.error(data.msg, toastoption)
      }

      if (data.status == true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate("/")
      }


    }
  }

useEffect(()=>{
  if(localStorage.getItem("chat-app-user"))
    {
      navigate("/")
    }
},[])

  const handleValidition = () => {
    const { password, confirmpassword, username, email } = value;
    if (password != confirmpassword) {
      toast.error("password and confirm password should be same.", toastoption)
      return false;
    }
    else if (username.length < 3) {
      toast.error("Username should be greater than 3.", toastoption)
      return false;
    }
    else if (password.length < 8) {
      toast.error("Password must be greater than or equal to 8 characters.", toastoption)
      return false;
    }
    return true;
  }

  const handlechange = (event) => {
    setvalue({ ...value, [event.target.name]: event.target.value })
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={handlesubmit}>
          <div className="brand">
            <img src={logo} alt="" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder='Username'
            name="username"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="email"
            placeholder='Email'
            name="email"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="password"
            placeholder='Password'
            name="password"
            onChange={(e) => handlechange(e)}
          />
          <input
            type="password"
            placeholder='Confirm Password'
            name="confirmpassword"
            onChange={(e) => handlechange(e)}
          />

          <button type='submit'>Create User</button>
          <span>Already have account?<Link to="/Login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );

}

const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;

.brand{
display:flex;
align-items:center;
gap:1.5rem;
justify-content:center;
img{
height:5rem;
}
h1{
color:white;
text-transform:uppercase;
}
}
form
{
width:500px;
display:flex;
flex-direction:column;
gap:1.5rem;
background-color:#00000076;
border-radius:2rem;
padding:3rem 6rem;
input{
background-color:transparent;
padding:1rem;
border:0.1rem solid #4e0eff;
border-radius:0.4rem;
color:white;
width:100%;
font-size:1rem;
&:focus{
border:0.1rem solid #997af0;
outline:none;
}
}
button{
background-color:#997af0;
color:white;
padding: 1rem 2rem;
border:none;
font-weight:bold;
cursor:pointer;
border-radius:0.4rem;
font-size:1rem;
text-transform:uppercase;
transition:0.5s ease-in-out;
&:hover
{
background-color:#4e0eff;
}
}
span{
color:white;
text-transform:uppercase;
a{
color:#4e0eff;
text-decoration:none;
font-weight:bold;
}
}
}
`
  ;
export default register
