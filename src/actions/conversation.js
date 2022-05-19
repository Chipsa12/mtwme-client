import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { setConversations } from '../components/reducers/conversationReducer';
import uniqid from 'uniqid';
import { getDatabase, ref, set, get} from "firebase/database";
import { sendMessage } from './messenger';

export const createConversation = (senderId, receiverId, text) => {
    return async dispatch => {
        try {
            const db = getDatabase();
            const conversationId = uniqid();
            get(ref(db), `conversations/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { conversations } = snapshot.val();
                    if (!conversations) {
                        set(ref(db, 'conversations/' + conversationId), {
                            id: conversationId,
                            members: `${senderId} ${receiverId}`
                        })
                        .then(() => {
                            dispatch(sendMessage(senderId, conversationId, text))
                        })
                        .catch(err =>  {return err})
                        return;
                    }
                    for(const [key, value] of Object.entries(conversations)) {
                        const members = value.members.split(' ')
                        if (members.includes(senderId) && members.includes(receiverId)) {
                            dispatch(sendMessage(senderId, key, text))
                            return;
                        }
                    }
                    set(ref(db, 'conversations/' + conversationId), {
                        id: conversationId,
                        members: `${senderId} ${receiverId}`
                    })
                    .then(() => {
                        dispatch(sendMessage(senderId, conversationId, text))
                    })
                    .catch(err =>  {return err})
                    return;
                } else {
                    return
                }
            })
            .catch((err) => {return err})
        } catch (e) {
            return e;
        }
    }
}

export const getConversations = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            get(ref(db), `conversations/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { conversations } = snapshot.val();
                    if (!conversations) {
                        dispatch(setConversations([]))
                        return
                    }
                    let conversationsArray = [];
                    for(const [key, value] of Object.entries(conversations)) {
                        value['members'] = value.members.split(' ')
                        conversationsArray.push(value)
                    }
                    dispatch(setConversations(conversationsArray))
                } else {
                    dispatch(loaderOff())
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