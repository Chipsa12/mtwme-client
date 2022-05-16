const SET_LOGS = "SET_LOGS"
const ADD_LOCATION = "ADD_LOCATION"
const CLEAR_LOCATION = "CLEAR_LOCATION"

const defaultState = {
    logs: [],
    location: {}
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_LOGS:
            return {
                ...state,
                logs: [...action.payload]
            }
        case ADD_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        case CLEAR_LOCATION:
            return {
                ...state,
                location: {}
            }
        default:
            return state
    }
}


export const setLogs = logs => ({type: SET_LOGS, payload: logs})
export const addLocation = location => ({type: ADD_LOCATION, payload: location})
export const clearLocation = () => ({type: CLEAR_LOCATION})