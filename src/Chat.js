import { IconButton} from '@material-ui/core';
import React, {useEffect, useState} from 'react'
import "./Chat.css";
import MicNoneIcon from '@material-ui/icons/MicNone'
import Message from "./Message"
import { selectchatName, selectChatId } from './features/chatSlice';
import { useSelector } from 'react-redux';
import db from "./Firebase"
import firebase, { firestore } from "firebase"
import { selectUser } from "./features/userSlice"
import FlipMove from "react-flip-move"



function Chat() {
    const user = useSelector(selectUser);
    const [input, setInput] = useState("")
    const chatName = useSelector(selectchatName);
    const chatId = useSelector(selectChatId);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chatId) {
            db.collection("chats")
              .doc(chatId)
              .collection("messages")
              .orderBy("timestamp", "desc")
              .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
        }

    }, [chatId])


    const sendMessage = (e) => {
        e.preventDefault();
        // Firebase magic here
        db.collection("chats").doc(chatId).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName
        })

        
        setInput("")
    }
    return (
        <div className="chat">
            {/* that header */}
            <div className="chat_header">
                <h4>
                    To: <span className="chat_name">{chatName}</span>
                </h4>
                <strong>Details</strong>

            </div>

            {/* chat messages */}
            <div className="chat_message">
                <FlipMove>
                    {messages.map(({ id, data }) => (
                    <Message key={id} contents={data} />
                    ))}
                </FlipMove>  
            </div>

            {/* chat input */}
            <div className="chat_input">
                <form>
                    <input 
                       value={input}
                       onChange={e => setInput(e.target.value)}
                       palaceholder="message"
                       type="text" 
                    />
                    <button onClick={sendMessage}>Send Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon className="chat_mic" />
                </IconButton>

                
            </div>
            
        </div>
    )

}

export default Chat
