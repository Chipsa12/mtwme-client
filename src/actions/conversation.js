import axios from 'axios'
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { API_URL } from '../config/config';
import { setConversations, addConversation } from '../components/reducers/conversationReducer';


export const createConversation = async (senderId, receiverId) => {
    try {
        const response = await axios.post(`${API_URL}api/conversation`, {senderId, receiverId}, 
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
        )
        return response.data.currentConversation
    } catch (e) {
        console.log(e)
    }    
}

export const createdConversation = (senderId, receiverId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.post(`${API_URL}api/conversation`, {senderId, receiverId}, 
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setConversations(response.data.conversations))
            dispatch(addConversation(response.data.currentConversation))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e)
            dispatch(loaderOff())
        }
    }
    
}

export const getConversations = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.get(`${API_URL}api/conversation`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setConversations(response.data.conversations))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e)
            dispatch(loaderOff())
        }
    }
    
}