const SET_POSTS = "SET_POSTS"
const DELETE_POST = "DELETE_POST"
const ADD_POST = "ADD_POST"
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
                    let timeB = new Date(b.created_at).getTime();
                    let timeA = new Date(a.created_at).getTime();
                    return timeB - timeA;
                })
            }
        case ADD_POST:
            return {
                ...state,
                posts: action.payload.sort(function(a, b) {
                    let timeB = new Date(b.created_at).getTime();
                    let timeA = new Date(a.created_at).getTime();
                    return timeB - timeA;
                })
            }
        case DELETE_POST:
            return {
                ...state,
                posts: action.payload.sort(function(a, b) {
                    let timeB = new Date(b.created_at).getTime();
                    let timeA = new Date(a.created_at).getTime();
                    return timeB - timeA;
                })
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: action.payload.sort(function(a, b) {
                    let timeB = new Date(b.created_at).getTime();
                    let timeA = new Date(a.created_at).getTime();
                    return timeB - timeA;
                })
            }
        default:
            return state
    }
}


export const setPosts = posts => ({type: SET_POSTS, payload: posts})
export const addPost = post => ({type: ADD_POST, payload: post})
export const deletePostById = posts => ({type: DELETE_POST, payload: posts})
export const updateLikes = posts => ({type: UPDATE_LIKES, payload: posts})