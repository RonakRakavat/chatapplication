import React,{useEffect, useState,useRef} from 'react'
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios'
import styled from 'styled-components'
import { allUsersRoute,host } from '../utils/Apiroute';
import Contact from '../components/Contact';
import Welcome from '../components/Welcome';
import Chatcontainer from '../components/Chatcontainer';
import {io} from 'socket.io-client'



const chat = () => {
  const socket=useRef();
  const [contacts, setcontacts] = useState([])
  const [currentUser, setcurrentUser] = useState(undefined)
  const [currentChat, setcurrentChat] = useState(undefined)
  const [isLoaded, setisLoaded] = useState(false)
  const navigate=useNavigate()

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host)
      socket.current.emit("add-user",currentUser._id)
    }
  })
  
  useEffect(()=>{
    const checkuser=async()=>{
    if(!localStorage.getItem("chat-app-user"))
      {
        navigate("/login")
      }
      else
      {
        setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
        setisLoaded(true)
      }
    }
      checkuser()
  },[])

  useEffect(()=>{   
   const fetchuser=async()=>{ 
    if(currentUser)
      {
        if(currentUser.isAvatarImageSet)
          {
            const data=await axios.get(`${allUsersRoute}/${currentUser._id}`)
            setcontacts(data.data)
          }
          else{
            navigate("/setavatar")
          }
      }
      }
    fetchuser()
   
  },[currentUser])

  const handleChangeChat=(chat)=>{
    setcurrentChat(chat)
  }

  return (
    <>
    <Container>
      <div className="container" >
        <Contact contacts={contacts} currentuser={currentUser} changechat={handleChangeChat}/>
        {
          isLoaded && currentChat===undefined?
        < Welcome currentuser={currentUser}/>:
        <Chatcontainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        }
      </div>
    </Container>
    </>
  )
}

const Container=styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .container{
    width: 85vw;
    height: 85vh;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width:720px)and(max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
export default chat
