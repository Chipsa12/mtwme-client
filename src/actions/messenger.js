import axios from 'axios'
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { API_URL } from '../config/config';
import { setMessages, addMessage } from '../components/reducers/messengerReducer';

export const sendMessage = async (conversationId, text) => {
        try {
            const response = await axios.post(`${API_URL}api/message`, {conversationId, text}, 
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
        } catch (e) {
            console.log(e)
        }
}

export const getMessagesByRoomIdClone = async (roomId) => {
    try {
        const response = await axios.post(`${API_URL}api/message/messages`, {roomId},
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
        return response.data.messages
    } catch (e) {
        console.log(e)
    }
}

export const getMessagesByRoomId = (roomId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.post(`${API_URL}api/message/messages`, {roomId},
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(addMessage(response.data.messages))
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
            const response = await axios.get(`${API_URL}api/message/messages`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setMessages(response.data.messages))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e)
            dispatch(loaderOff())
        }
    }   
}