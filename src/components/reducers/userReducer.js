const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_ALL_USERS = "SET_ALL_USERS"

const defaultState = {
    users: [],
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case SET_ALL_USERS: 
            return {
                ...state,
                users: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                users: action.payload
            }
        default:
            return state
    }
}


export const setUser = user => ({type: SET_USER, payload: user})
export const logoutUser = () => ({type: LOGOUT})
export const setAllUsers = users => ({type: SET_ALL_USERS, payload: users}) 