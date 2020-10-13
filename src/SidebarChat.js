import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setChat } from "./features/chatSlice"
import db from "./Firebase"

import "./SidebarChat.css"
import * as timeago from "timeago.js"

function SidebarChat({id, chatName}) {
    const dispatch = useDispatch();
    const [chatinfo, setChatInfo] = useState([]);
    useEffect(() => {
        db.collection('chats')
          .doc(id).collection("messages")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => 
            setChatInfo(snapshot.docs.map((doc) => doc.data()))         
          )
    }, [id])
    return (
        <div 
          onClick={() =>
            dispatch(
                setChat({
                    chatId: id,
                    chatName: chatName
                })
            )
        }
         className="sidebarChat">
            <Avatar src={chatinfo[0]?.photo} />
            <div className="sidebarChat_info">
                <h3>{chatName}</h3>
                <p>{chatinfo[0]?.message}</p>
                <small>{timeago.format(new Date(chatinfo[0]?.timestamp?.toDate()).toLocaleString())}</small>
            </div>
        </div>
    )

}

export default SidebarChat