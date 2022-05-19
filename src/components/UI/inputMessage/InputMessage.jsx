import { useDispatch, useSelector } from "react-redux";
import {useState} from 'react'
import {Cancel} from "@material-ui/icons";
import Button from '../button/Button';
import { createConversation } from '../../../actions/conversation';
import { addConversation } from '../../reducers/conversationReducer';
import { sendMessage } from '../../../actions/messenger';

import styles from './InputMessage.module.css'

const InputMessage = ({userId, cb}) => {
    const dispatch = useDispatch();
    const {users, currentUser} = useSelector(state => state.user)
    const user = users[userId];
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
            (conversation.members[0] === currentUser.id || conversation.members[1] === currentUser.id) 
            && 
            (conversation.members[0] === userId || conversation.members[1] === userId)
        )
        if (conversation.length) {
            dispatch(addConversation(conversation))
            dispatch(sendMessage(currentUser.id, conversation[0].id, message))
            cb(prev=> !prev);
            setMessage('');
            return;
        }
        dispatch(createConversation(currentUser.id, userId, message))
        cb(prev=> !prev);
        setMessage('');
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