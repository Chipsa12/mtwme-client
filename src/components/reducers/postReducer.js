const SET_POSTS = "SET_POSTS"
const DELETE_POST = "DELETE_POST"
const CREATE_POST = "CREATE_POST"
const UPDATE_LIKES = "UPDATE_LIKES"

const defaultState = {
    currentPost: {},
    posts: []
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_POSTS:  
            return {
                ...state,
                posts: action.payload.sort(function(a, b) {
                    return b.id - a.id;
                })
            }
        case CREATE_POST:
            return {
                ...state,
                currentPost: action.payload
            }
        case DELETE_POST:
            return {
                ...state,
                posts: action.payload.sort(function(a, b) {
                    return b.id - a.id;
                })
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: action.payload.sort(function(a, b) {
                    return b.id - a.id;
                })
            }
        default:
            return state
    }
}


export const setPosts = posts => ({type: SET_POSTS, payload: posts})
export const setCurrentPost = post => ({type: CREATE_POST, payload: post})
export const deletePost = posts => ({type: DELETE_POST, payload: posts})
export const updateLikes = posts => ({type: UPDATE_LIKES, payload: posts})