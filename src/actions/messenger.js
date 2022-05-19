import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { setMessages, addMessage } from '../components/reducers/messengerReducer';

import uniqid from 'uniqid';
import { getDatabase, ref, set, get} from "firebase/database";

export const sendMessage = (senderId, conversationId, text) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            const messageId = uniqid();
            set(ref(db, 'messages/' + messageId), {
                id: messageId,
                created_at: new Date().toISOString(),
                sender: senderId,
                conversation_id: conversationId,
                text
            })
            .then(() => {})
            .catch(err =>  {return err})
            dispatch(loaderOff())
        } catch (error) {
            dispatch(loaderOff())
            return error
        }
    }
}

export const getMessagesByRoomId = (roomId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            get(ref(db), `messages/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { messages } = snapshot.val();
                    if (!messages) {
                        dispatch(addMessage([]))
                        return
                    }
                    let messagesArray = [];
                    for(const [key, value] of Object.entries(messages)) {
                        if (value.conversation_id === roomId) {
                            messagesArray.push(value)
                        }
                    }
                    dispatch(addMessage(messagesArray))
                } else {
                    return
                }
            })
            .catch((err) => {return err})
            dispatch(loaderOff())
        } catch (e) {
            console.log(e)
            dispatch(loaderOff())
        }
    }
}

export const getMessages = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            get(ref(db), `messages/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { messages } = snapshot.val();
                    if (!messages) {
                        dispatch(setMessages([]))
                        return
                    }
                    let messagesArray = [];
                    for(const [key, value] of Object.entries(messages)) {
                        messagesArray.push(value)
                    }
                    dispatch(setMessages(messagesArray))
                } else {
                    return
                }
            })
            .catch((err) => {return err})
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            return e;
        }
    }   
}