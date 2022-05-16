import axios from 'axios'
import {setLogs} from "../components/reducers/logReducer";
import { loaderOn, loaderOff } from "../components/reducers/appReducer";
import { API_URL } from '../config/config';

export const createdLog = (data) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/log`, data, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(loaderOn())
            dispatch(setLogs(response.data))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e)
            dispatch(loaderOff())
        }
    }
    
}

export const getLogs = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.get(`${API_URL}api/log`, {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
            dispatch(setLogs(response.data))
            dispatch(loaderOff())
        } catch (error) {
            console.log(error)
            dispatch(loaderOff())
        }
    }
}