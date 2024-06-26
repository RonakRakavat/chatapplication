import React from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import { FaPowerOff } from "react-icons/fa6";
const Logout = () => {
    const navigate=useNavigate()
    const handleclick=()=>{
        localStorage.clear();
        navigate('/login')
    }
  return (
    <Button onClick={handleclick}>
      <FaPowerOff />
    </Button>
  )
}
const Button=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`
export default Logout
