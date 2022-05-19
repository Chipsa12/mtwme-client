import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Picker from 'emoji-picker-react';
import Message from "../Message/Message";
import { sendMessage, getMessagesByRoomId } from "../../actions/messenger";
import useSpeechToText from 'react-hook-speech-to-text';

import './Chat.css'

const Chat = () => {
    const dispatch = useDispatch();
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
    useEffect(() => {
        dispatch(getMessagesByRoomId(currentChat.id))
    },[dispatch, currentChat.id])
    const { currentUser } = useSelector(state => state.user);
    const { currentMessages } = useSelector(state => state.messenger)
    const [arrivalMessage, setArrivalMessage] = useState([]);
    useEffect(()=>{
        setArrivalMessage(currentMessages)
    }, [currentMessages])
    const scrollRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.length){
            return;
        }
        dispatch(sendMessage(currentUser.id, currentChat.id, newMessage))
        dispatch(getMessagesByRoomId(currentChat.id))
        setArrivalMessage(currentMessages);
        setNewMessage("");
    };

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
                                    src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fbtn-emoji.svg?alt=media&token=e722e6be-5f36-4fb7-9c97-0f353b39c05b' 
                                    alt="emoji btn" 
                                    onClick={() => setShowPicker(prev => !prev)} 
                                />
                                {
                                    !error.length &&
                                    <div>
                                        <img 
                                            className="chatMicButton" 
                                            onClick={isRecording ? stopSpeechToText : startSpeechToText}
                                            src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fbtn-mic.svg?alt=media&token=a27e325c-fa71-466e-a083-01d4ff6a83dc' 
                                            alt="mic btn" 
                                        />
                                        {isRecording && <div className='micActivity'></div>}
                                    </div>
                                }
                                <img 
                                    src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fbtn-send-message.svg?alt=media&token=0b09df6c-351a-4a68-b811-2200bb0bb2ed' 
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