import {setPosts, addPost, deletePostById, updateLikes} from "../components/reducers/postReducer";
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { setComments, addComment, deleteComment } from '../components/reducers/commentReducer';
import uniqid from 'uniqid';
import { getDatabase, ref, set, get} from "firebase/database";
import { deleteImgPost } from './uploadFile';

export const createPost = (postId, userId, description, file) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            const created_at = new Date().toISOString();
            set(ref(db, 'posts/' + postId), {
                id: postId,
                user_id: userId,
                post_img: file,
                description,
                created_at,
                likes: ''
            })
            .then(() => {
                get(ref(db), `posts/`).then((snapshot) => {
                    if (snapshot.exists()) {
                        const { posts } = snapshot.val();
                        let postsArray = [];
                        for(const [key, value] of Object.entries(posts)) {
                            postsArray.push(value)
                        }
                        dispatch(addPost(postsArray))
                    } else {
                        return
                    }
                })
                .catch((err) => {return err})
            })
            .catch(e => {throw new Error(e)})
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
            const db = getDatabase();
            get(ref(db), `posts/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { posts } = snapshot.val();
                    let postsArray = [];
                    for(const [key, post] of Object.entries(posts)) {
                        post.likes = !post.likes ? post.likes : post.likes.split(' ');
                        postsArray.push(post)
                    }
                    dispatch(setPosts(postsArray))
                } else {
                    return
                }
            })
            .catch((err) => {return err})
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error(e)
        }
    }
}

export const deletePost = (postId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            await get(ref(db), `posts/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { posts } = snapshot.val();
                    for(const [id, post] of Object.entries(posts)) {
                        if (id === postId) {
                            if (post.post_img) { dispatch(deleteImgPost(post.user_id, postId))}
                            get(ref(db), `comments/`).then((snapshot) => {
                                if (snapshot.exists()) {
                                    const { comments } = snapshot.val();
                                    if (comments) {
                                        for(const [id, comment] of Object.entries(comments)) {
                                            if (comment.post_id === postId) {
                                                set(ref(db, 'comments/' + id), null)
                                                get(ref(db), 'comments/').then((snapshot) => {
                                                    if (snapshot.exists()) {
                                                        const { comments } = snapshot.val();
                                                        if (!comments) {
                                                            deleteComment([])
                                                        } else {
                                                            let commentsArray = [];
                                                            for(const [id, comment] of Object.entries(comments)) {
                                                                commentsArray.push(comment)
                                                            }
                                                            dispatch(deleteComment(commentsArray))
                                                        }
                                                    } else {
                                                        console.log('DB empty')
                                                    }
                                                })
                                                .catch(error => {
                                                    dispatch(loaderOff())
                                                    return error
                                                })
                                            }
                                        }
                                    }
                                    set(ref(db, 'posts/' + postId), null)
                                    get(ref(db), `posts/`).then((snapshot) => {
                                        if (snapshot.exists()) {
                                            const { posts } = snapshot.val();
                                            if (!posts) {
                                                dispatch(deletePostById([]))
                                                dispatch(loaderOff())
                                                return;
                                            }
                                            let postsArray = [];
                                            for(const [id, post] of Object.entries(posts)) {
                                                post.likes = !post.likes ? post.likes : post.likes.split(' ');
                                                postsArray.push(post)
                                            }
                                            dispatch(deletePostById(postsArray))
                                        } else {
                                            console.log('DB empty')
                                        }
                                    })
                                    .catch((err) => {
                                        dispatch(loaderOff())
                                        return err
                                    })
                                } else {
                                    console.log('DB empty');
                                }
                            })
                            .catch((error) => {
                                dispatch(loaderOff())
                                return error
                            })
                        }
                    }
                } else {
                    return
                }
            })
            .catch((err) => {
                dispatch(loaderOff())
                return err
            })
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            return e
        }
    }
}

export const setLikes = (userId, postId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            get(ref(db), `posts/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { posts } = snapshot.val();
                    let postsArray = [];
                    for(const [id, post] of Object.entries(posts)) {
                        if (id === postId) {
                            post.likes = post.likes ? post.likes + ` ${userId}` : userId; 
                            set(ref(db, 'posts/' + postId), post)
                        }
                        post.likes = !post.likes ? post.likes : post.likes.split(' ');  
                        postsArray.push(post)
                    }
                    dispatch(updateLikes(postsArray))
                } else {
                    return
                }
            })
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error(e)
        }
    }
}

export const getComments = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            get(ref(db), 'comments/').then((snapshot) => {
                if (snapshot.exists()) {
                    const { comments } = snapshot.val();
                    if (!comments) {
                        dispatch(setComments([]));
                        dispatch(loaderOff())
                        return;
                    } else {
                        let commentsArray = [];
                        for(const [id, comment] of Object.entries(comments)) {
                            commentsArray.push(comment)
                        }
                        dispatch(setComments(commentsArray))
                    }
                } else {
                    return
                }
            })
            .catch(error => {
                dispatch(loaderOff())
                return error
            })
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            return e;
        }
    }
}

export const setCommentFromPost = (postId, userId, comment) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            const commentId = uniqid();
            set(ref(db, 'comments/' + commentId), {
                id: commentId,
                post_id: postId,
                user_id: userId,
                created_at: new Date().toISOString(),
                comment
            })
            .then(() => {
                get(ref(db), 'comments/').then((snapshot) => {
                    if (snapshot.exists()) {
                        const { comments } = snapshot.val();
                        if (!comments) {
                            dispatch(setComments([]));
                            dispatch(loaderOff())
                            return;
                        } else {
                            let commentsArray = [];
                            for(const [id, comment] of Object.entries(comments)) {
                                commentsArray.push(comment)
                            }
                            dispatch(addComment(commentsArray))
                        }
                    } else {
                        return
                    }
                })
                .catch(error => {
                    dispatch(loaderOff())
                    return error
                })
            })
            .catch(e => {return e})
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            return e;
        }
    }
}

export const deleteCommentFromPost = (commentId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            set(ref(db, 'comments/' + commentId), null)
            .then(() => {
                get(ref(db), 'comments/').then((snapshot) => {
                    if (snapshot.exists()) {
                        const { comments } = snapshot.val();
                        if (!comments) {
                            dispatch(setComments([]));
                            dispatch(loaderOff())
                            return;
                        } else {
                            let commentsArray = [];
                            for(const [id, comment] of Object.entries(comments)) {
                                commentsArray.push(comment)
                            }
                            dispatch(deleteComment(commentsArray))
                        }
                    } else {
                       return
                    }
                })
                .catch(error => {
                    dispatch(loaderOff())
                    return error
                })
            })
            .catch(e => {return e})
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            return e;
        }
    }
}