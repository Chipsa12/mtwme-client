const LOADER_ON = "LOADER_ON"
const LOADER_OFF = "LOADER_OFF"
const ERROR = "ERROR"

const defaultState = {
    loader: false,
    error: ''
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOADER_ON:
            return {
                ...state,
                loader: true
            }
        case LOADER_OFF:
            return {
                ...state,
                loader: false
            }
        default:
            return state
    }
}


export const loaderOn = () => ({type: LOADER_ON})
export const loaderOff = () => ({type: LOADER_OFF})
export const setError = error => ({type: ERROR, payload: error})