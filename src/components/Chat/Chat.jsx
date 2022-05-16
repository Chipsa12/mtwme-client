import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Picker from 'emoji-picker-react';
import Message from "../Message/Message";
import { sendMessage, getMessagesByRoomIdClone } from "../../actions/messenger"
import iconBtnMessage from './img/btn-send-message.svg';
import iconBtnEmoji from './img/btn-emoji.svg';
import iconBtnMic from './img/btn-mic.svg';
import useSpeechToText from 'react-hook-speech-to-text';

import './Chat.css'

const Chat = ({socket}) => {
    const {
        error,
        interimResult,
        isRecording,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });
    const [newMessage, setNewMessage] = useState("");
    const [micMessage, setMicMessage] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const onEmojiClick = (event, emojiObject) => {
        setNewMessage(prev => prev + emojiObject.emoji)
    };
    const { currentChat } = useSelector(state => state.conversation)
    const { currentUser } = useSelector(state => state.user);
    const [arrivalMessage, setArrivalMessage] = useState([]);
    useEffect(()=>{
        const m = getMessagesByRoomIdClone(currentChat.id)
        m.then(r => setArrivalMessage(prev => [...prev, ...r]))
    }, [])
    const scrollRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.length){
            return;
        }
        const messageData = {
            roomId: currentChat.id,
            sender: currentUser.id,
            text: newMessage,
            created_at: new Date(),
        };
        sendMessage(currentChat.id, newMessage)
        await socket.emit("send_message", messageData);
        setArrivalMessage((list) => [...list, messageData]);
        setNewMessage("");
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setArrivalMessage((list) => [...list, data]);
            sendMessage(currentChat.id, data.text)
        });
    }, [socket, currentChat.id]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [arrivalMessage]);
    
    const handleChange = (e) => {
        e.preventDefault();
        setNewMessage(e.target.value);
    }

    useEffect(() => {
        if (isRecording && interimResult) {
            setMicMessage(interimResult)
        } else {
            setNewMessage(prev => prev + " " + micMessage);
            setMicMessage('')
        }
    }, [interimResult, isRecording, micMessage]);

    return (
            <div className="chatBox">
                <div className="chatBoxWrapper">
                        <div className="chatBoxTop">
                        {
                            arrivalMessage.length &&
                            arrivalMessage.map((m, index) => {
                            return <div key={index} ref={scrollRef}>
                                {
                                    m.sender === currentUser.id
                                    ?
                                    <Message message={m} own={true} userId={currentUser.id}/>
                                    :
                                    <Message message={m} own={false} userId={currentChat.members.find(id => id !== currentUser.id)}/>
                                }
                            </div>
                            })
                        }
                        </div>
                        <form className="chatBoxBottom" onSubmit={handleSubmit}>
                            
                            <input 
                                type="text" 
                                value={newMessage}
                                onChange={handleChange}
                                className="inputMessage"
                                placeholder='Написать сообщение...'
                            />
                            <div className="containerPicker">
                                {
                                showPicker && <Picker onEmojiClick={onEmojiClick} />
                                }
                            </div>
                            <div className='containerBtn'>
                                <img 
                                    className="chatEmojiButton" 
                                    src={iconBtnEmoji} 
                                    alt="emoji btn" 
                                    onClick={() => setShowPicker(prev => !prev)} 
                                />
                                {
                                    !error.length &&
                                    <div>
                                        <img 
                                            className="chatMicButton" 
                                            onClick={isRecording ? stopSpeechToText : startSpeechToText}
                                            src={iconBtnMic} 
                                            alt="mic btn" 
                                        />
                                        {isRecording && <div className='micActivity'></div>}
                                    </div>
                                }
                                <img 
                                    src={iconBtnMessage} 
                                    alt="send message" 
                                    className="chatSubmitButton"
                                    onClick={handleSubmit}
                                />
                            </div>
                            
                        </form>
                </div>
            </div>
    )
}

export default Chat;