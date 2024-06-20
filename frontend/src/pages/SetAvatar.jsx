import React, { useState, useEffect } from 'react'
import { json, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'
import { setAvatarRoute } from '../utils/Apiroute';
import { Buffer } from 'buffer';

const SetAvatar = () => {
    
    const [avatar, setAvatar] = useState([])
    const [isloading, setIsloading] = useState(true)
    const [selectAvatar, setSelectAvatar] = useState(undefined)
    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();
    var toastoption = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user"))
          {
            navigate("/login")
          }
      },[])


    const setprofilepicture = async() => {
       try {
         console.log("click")
         if(selectAvatar===undefined){
             toast.error("please select an avatar",toastoption)
         }else{
             const user=await JSON.parse(localStorage.getItem("chat-app-user"))
             const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                 image:avatar[selectAvatar]
             })

         if(data.isset){
             user.isAvatarImageSet=true,
             user.avatarImage=data.image
             localStorage.setItem("chat-app-user",JSON.stringify(user))
             navigate("/")
             }else{
               toast.error("Error setting avatar image. please try again ")  
             }
            }
        
       } catch (error) {
        console.log(error)
       }
     }
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = new Buffer(image.data);
                data.push(buffer.toString('base64'));
            }
            setAvatar(data);
            setIsloading(false);
        };
        fetchAvatars();
    }, []);
    return (
        <>
        {
            isloading?<Container>
                <img src={loader} alt="" />
                </Container>:
            <Container>
                <div className="title-container">
                    <h1>Pick an Avatar as your profile picture</h1>
                </div>
                <div className="avatars">
                    {
                        avatar.map((avatar, index) => {
                            return (
                                <div key={index} className={`avatar ${selectAvatar === index ? "selected" : ""}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} key={avatar} onClick={() => setSelectAvatar(index)} />
                                </div>
                            )
                        })
                    }
                </div>
                <button className='submit-btn'  onClick={setprofilepicture}>Set as Profile Picture</button>
            </Container>
}
            <ToastContainer />
                
        </>
    )
}
const Container = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader
    {
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color: white;
        }
    }
    .avatars{
        display: flex;
        gap: 2rem;

        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected
        {
            border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn{
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
`

export default SetAvatar
