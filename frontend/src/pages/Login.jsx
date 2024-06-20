import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { loginRoute } from '../utils/Apiroute';


const login = () => {
  const navigate = useNavigate();
  const [value, setvalue] = useState({
    username: "",
    password: "",
  })

  var toastoption = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(()=>{
    if(localStorage.getItem("chat-app-user"))
      {
        navigate("/")
      }
  },[])
  

  const handlesubmit = async (event) => {
    try {
      event.preventDefault();
      if (handleValidition()) {
        console.log("click")
        const { username, password } = value;
        const { data } = await axios.post("http://localhost:5000/api/auth/login", {
          username, password
        })
        if (data.status === false) {
          console.log("no")
          toast.error(data.msg, toastoption)
        }

        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          navigate("/")

        }
      }
    } catch (error) {
      console.log(error)
    }
  }



  const handleValidition = () => {
    const { username, password } = value;
    if (password === "") {
      toast.error("Username and password is required", toastoption)
      return false;
    }
    else if (username === "") {
      toast.error("Username and password is required", toastoption)
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
            type="password"
            placeholder='Password'
            name="password"
            onChange={(e) => handlechange(e)}
          />

          <button type='submit'>Login In</button>
          <span>Already have account?<Link to="/Register">Register</Link></span>
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
export default login
