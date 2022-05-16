import axios from 'axios'
import {setUser, logoutUser, setAllUsers} from "../components/reducers/userReducer";
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { API_URL } from '../config/config';

export const registration = async (login, password, firstName, lastName) => {
    try {
        const response = await axios.post(`${API_URL}api/auth/registration`, {
            login,
            password,
            firstName, 
            lastName
        })
        return response.data.message
    } catch (e) {
        console.log(e.response.data.message)
        return e.response.data.message
    }
}

export const login = (login, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                login,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
           console.log(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            localStorage.removeItem('token')
            dispatch(loaderOff())
        }
    }
}

export const logout = (token) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/logout`, {
               token
            })
            dispatch(logoutUser())
            dispatch(setAllUsers(response.data.users))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.get(`${API_URL}api/auth/get_users`)
            dispatch(setAllUsers(response.data.users))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const formData = new FormData();
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            dispatch(setAllUsers(response.data.users))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const deleteAvatar = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            dispatch(setAllUsers(response.data.users))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}