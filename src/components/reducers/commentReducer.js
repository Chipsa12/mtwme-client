const SET_COMMENTS = "SET_COMMENTS"
const ADD_COMMENT = "ADD_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"

const defaultState = {
    comments: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case ADD_COMMENT:
            return {
                ...state,
                comments: action.payload
            }
        case DELETE_COMMENT: 
            return {
                ...state,
                comments: action.payload
            }
        default:
            return state
    }
}


export const setComments = comments => ({type: SET_COMMENTS, payload: comments})
export const addComment = comments => ({type: ADD_COMMENT, payload: comments})
export const deleteComment = comments => ({type: DELETE_COMMENT, payload: comments})