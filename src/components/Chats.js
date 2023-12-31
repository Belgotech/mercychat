import React, { useRef, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from "../Firebase";
// import Img from "../Asset/Pink Dark Blue Modern Elegant Letter B Logo (1).png";

import { useAuth } from "../Context/AuthContext";
import axios from "axios";


const Chats = () =>{

    const history = useHistory()
    const { user } = useAuth
    const [loading, setLoading] = useState(true);

    const handleLogOut = async () =>{
        await auth.signOut()

        history.push('/')
    }

    const getFile = async (url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpeg", {type: 'Image/jpeg'})
    }

    useEffect (() =>{
        if (!user) {
          history.push('/')  

          return;
        }
        axios.get('https://api.cchatengine.io/users/me', {
            headers: {
                "project-Id":process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid)

            getFile(user.photoUrl)
            .then((avatar) =>{
                formdata.append('avatar', avatar, avatar.name)

                axios.post('https://api/chatengine.io/users',
                formdata,
                { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY} }
                )
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, history])

    if(!user || loading) return 'Loading... '

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    {/* <img src={Img} alt="logo" /> */}
                    MercyChat
                </div>

                <div onClick={handleLogOut} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                height="cal(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats