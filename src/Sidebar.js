import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import RateReviewOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined'

import "./Sidebar.css"
import { RateReviewOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import { selectUser } from './features/userSlice'
import { useSelector } from 'react-redux'
import db, { auth } from "./Firebase"
import { useState } from 'react'
import { useEffect } from 'react'

function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        db.collection("chats").onSnapshot((snapshot) => 
        setChats(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ))
    }, []);

    const addChat = () => {
        const chatName = prompt("please enter chat Room");

        if (chatName) {
            db.collection("chats").add({
                chatName: chatName,
            })
        }
    }
        



    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar_avatar" />
                <div className="sidebar_input">
                    <SearchIcon />
                    <input placeholder="Search" /> 
                </div>
                <IconButton variant="outlined" className="sidebar_inputButtton">
                    <RateReviewOutlinedIcon onClick={addChat} />
                </IconButton>
            </div>
            <div className="sidebar_chats">
                {chats.map(({id, data: { chatName }}) => (
                    <SidebarChat key={id} id={id} chatName={chatName} />    
                ))}
            </div>
        </div>
    );
}

export default Sidebar;