import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage";
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import { updateUserAvatarById } from './user';
import { DEFAULT_AVATAR_URL } from '../config/config';
import { createPost } from './post';
import uniqid from 'uniqid';

export const uploadAvatar = (file, userId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const storage = getStorage();
            const storageRef = ref(storage, 'files/' + userId + '/avatar/' + file.name);
            await uploadBytes(storageRef, file)
            .then((snapshot) => {
                getDownloadURL(storageRef)
                .then(url => {
                    dispatch(updateUserAvatarById(userId, url))
                    return;
                })
            })
            .catch((e) => {
                return e;
            })
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error(e)
        }
    }
}

export const deleteAvatar = (userId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const storage = getStorage();
            const listRef = ref(storage, 'files/'+ userId + '/avatar');
            listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    const desertRef = ref(storage, itemRef._location.path);
                    deleteObject(desertRef).then(() => {
                        dispatch(updateUserAvatarById(userId, DEFAULT_AVATAR_URL))
                    }).catch((error) => {
                        dispatch(loaderOff())
                        throw new Error(error)
                    });
                });
            }).catch((error) => {
                dispatch(loaderOff())
                throw new Error(error)
            });
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error(e)
        }
    }
}

export const uploadImgPost = (userId, description='', file='') => {
    return async dispatch => {
        try {
            const postId = uniqid();
            if (!file) {
                dispatch(createPost(postId, userId, description, file))
                return;
            } 
            dispatch(loaderOn())
            const storage = getStorage();
            const storageRef = ref(storage, 'files/' + userId + '/post/' + postId + '/' + file.name);
            await uploadBytes(storageRef, file)
            .then((snapshot) => {
                getDownloadURL(storageRef)
                .then(url => {
                    dispatch(createPost(postId, userId, description, url))
                    return;
                })
            })
            .catch((e) => {
                return e;
            })
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error(e)
        }
    }
}

export const deleteImgPost = (userId, postId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const storage = getStorage();
            const listRef = ref(storage, 'files/'+ userId + '/post/' + postId);
            listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    const desertRef = ref(storage, itemRef._location.path);
                    deleteObject(desertRef).then(() => {
                    }).catch((error) => {
                        dispatch(loaderOff())
                        throw new Error(error)
                    });
                });
            }).catch((error) => {
                dispatch(loaderOff())
                throw new Error(error)
            });
            dispatch(loaderOff())
        } catch (e) {
            dispatch(loaderOff())
            throw new Error(e)
        }
    }
}