const SET_MESSAGES = "SET_MESSAGES"
const ADD_MESSAGE = "ADD_MESSAGE"

const defaultState = {
    currentMessages: [],
    messages: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload
            }
        case ADD_MESSAGE:
            return {
                ...state,
                currentMessages: action.payload
            }
        default:
            return state
    }
}


export const setMessages = messages => ({type: SET_MESSAGES, payload: messages})
export const addMessage = messages => ({type: ADD_MESSAGE, payload: messages})