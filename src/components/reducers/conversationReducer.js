const SET_CONVERSATION = "SET_CONVERSATION"
const ADD_CONVERSATION = "ADD_CONVERSATION"

const defaultState = {
    currentChat: {},
    conversations: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CONVERSATION:
            return {
                ...state,
                conversations: action.payload
            }
        case ADD_CONVERSATION:
            return {
                ...state,
                currentChat: action.payload
            }
        default:
            return state
    }
}


export const setConversations = conversations => ({type: SET_CONVERSATION, payload: conversations})
export const addConversation = conversation => ({type: ADD_CONVERSATION, payload: conversation})