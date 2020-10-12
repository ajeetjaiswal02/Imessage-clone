import { IconButton } from '@material-ui/core';
import React, {useState} from 'react'
import "./Chat.css";
import MicNoneIcon from '@material-ui/icons/MicNone'

function Chat() {
    const [input, setInput] = useState("")
    const sendMessage = (e) => {
        e.preventDefault();


        // Firebase magic here
        setInput("")
    }
    return (
        <div className="chat">
            {/* that header */}
            <div className="chat_header">
                <h4>
                    To: <span className="chat_name">Channel Name</span>
                </h4>
                <strong>Details</strong>

            </div>

            {/* chat messages */}
            <div className="chat_message">
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
                <h1>I am a Message</h1>
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
