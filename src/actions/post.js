import axios from 'axios'
import {setPosts, setCurrentPost, updateLikes} from "../components/reducers/postReducer";
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { setComments, addComment, deleteComment } from '../components/reducers/commentReducer';
import { API_URL } from '../config/config';

export const createPost = (desc=null, file=null) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const formData = new FormData();
            formData.append('file', file)
            formData.append('desc', desc)
            const response = await axios.post(`${API_URL}api/post`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setCurrentPost(response.data.post))
            dispatch(setPosts(response.data.posts))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.get(`${API_URL}api/post`)
            dispatch(setPosts(response.data.posts))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const deletePost = (postId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.post(`${API_URL}api/post/delete_post`, {postId},
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setPosts(response.data.posts))
            dispatch(deleteComment(response.data.comments))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const setLikes = (userId, postId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.post(`${API_URL}api/post/like`, {userId, postId},
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(updateLikes(response.data.posts))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const getComments = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.get(`${API_URL}api/post/comment`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setComments(response.data.comments))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const setCommentFromPost = (postId, comment) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.post(`${API_URL}api/post/comment`, {postId, comment},
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(addComment(response.data.comments))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}

export const deleteCommentFromPost = (commentId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const response = await axios.post(`${API_URL}api/post/delete_comment`, {commentId},
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(deleteComment(response.data.comments))
            dispatch(loaderOff())
        } catch (e) {
            console.log(e.response.data.message)
            dispatch(loaderOff())
        }
    }
}