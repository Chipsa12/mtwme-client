import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react'
import {Cancel} from "@material-ui/icons";
import Button from '../button/Button';
import { createConversation } from '../../../actions/conversation';
import { addConversation } from '../../reducers/conversationReducer';
import { sendMessage } from '../../../actions/messenger'

import styles from './InputMessage.module.css'

const InputMessage = ({userId, cb, socket}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.users).filter(user => user.id === userId)[0]
    const {currentUser} = useSelector(state => state.user)
    const {conversations} = useSelector(state => state.conversation)
    const [message, setMessage] = useState('');
    const handleChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) {
            return;
        }
        const conversation = conversations.filter(conversation => 
            (conversation.members[0] === currentUser.id || conversation.members[1] === currentUser.id) && (conversation.members[0] === userId || conversation.members[1] === userId)
        )
        if (conversation.length) {
            const messageData = {
                roomId: conversation.id,
                sender: currentUser.id,
                text: message,
                created_at: new Date(),
            };
            dispatch(addConversation(conversation))
            socket.emit('join_room', {roomId: conversation.id, userId: currentUser.id})
            await socket.emit("send_message", messageData);
            cb(prev=> !prev);
            setMessage('');
            return;
        }
        const res = createConversation(currentUser.id, userId)
        res.then(conversationCreated => {
            const messageData = {
                roomId: conversationCreated.id,
                sender: currentUser.id,
                text: message,
                created_at: new Date(),
            };
            sendMessage(conversationCreated.id, message)
            socket.emit('join_room', {roomId: conversationCreated.id, userId: currentUser.id})
            socket.emit("send_message", messageData);
            cb(prev=> !prev);
            setMessage('');
        })
    }
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <span className={styles.text}>Сообщение {user?.surname} {user?.name}</span>
            <Cancel className={styles.shareCancelImg} onClick={() => cb(prev => !prev)}/>
            <textarea onChange={handleChange} value={message} className={styles.input} placeholder='Написать сообщениие...'></textarea>
            <Button onClick={handleSubmit}>Отправить</Button>
        </form>
    )
}

export default InputMessage;