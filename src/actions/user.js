import {setUser, logoutUser, setAllUsers} from "../components/reducers/userReducer";
import { loaderOn, loaderOff } from '../components/reducers/appReducer';
import uniqid from 'uniqid';
import bcrypt from "react-native-bcrypt";
import { getDatabase, ref, set, get } from "firebase/database";
import { DEFAULT_AVATAR_URL } from "../config/config";


export const registration = async ( login, password, firstName, lastName) => {
    try {
        const dbRef = ref(getDatabase());
        await get(dbRef, `users/`).then((snapshot) => {
            if (snapshot.exists()) {
                const {users} = snapshot.val();
                for (const [id, user] of Object.entries(users)) {
                    if (user.login === login) {
                        throw new Error('Пользователь с данным логином существует'); 
                    }
                }
                const db = getDatabase();
                const userId = uniqid();
                const hashPassword = bcrypt.hashSync(password, 4);
                set(ref(db, 'users/' + userId), {
                    id: userId,
                    name: firstName,
                    surname: lastName,
                    login,
                    password: hashPassword,
                    token: '',
                    created_at: new Date().toISOString(),
                    avatar: DEFAULT_AVATAR_URL
                })
                .then(() => {})
                .catch(e => {throw new Error(e)})
                return;
            } else {
                const db = getDatabase();
                const userId = uniqid();
                const hashPassword = bcrypt.hashSync(password, 4);
                set(ref(db, 'users/' + userId), {
                    id: userId,
                    name: firstName,
                    surname: lastName,
                    login,
                    password: hashPassword,
                    token: '',
                    created_at: new Date().toISOString(),
                    avatar: DEFAULT_AVATAR_URL
                })
                .then(() => {})
                .catch(e => {throw new Error(e)})
            }
            }).catch((error) => {
                throw new Error(error);
            });
    } catch (error) {
        throw new Error(error);
    }
}
export const getUsers = () => {
    return async dispatch => {
        const dbRef = ref(getDatabase());
        await get(dbRef, `users/`).then((snapshot) => {
            if (snapshot.exists()) {
                const {users} = snapshot.val();
                dispatch(setAllUsers(users));
            } else {
                return
            }
            }).catch((error) => {
                console.log(error);
            });
    }
}

export const login = (login, password) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const dbRef = ref(getDatabase());
            get(dbRef, `users/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const {users} = snapshot.val();
                    for (const [id, user] of Object.entries(users)) {
                        if (user.login === login) {
                            const isPassword = bcrypt.compareSync(password, user.password)
                            if (isPassword) {
                                const token = uniqid();
                                const currentUser = {
                                    id,
                                    login: user.login, 
                                    token,
                                    avatar: user.avatar,
                                    created_at: user.created_at,
                                    surname: user.surname,
                                    name: user.name,
                                };
                                const db = getDatabase();
                                user['token'] = token;
                                set(ref(db, 'users/' + id), user)
                                .then(() => {
                                    localStorage.setItem('token', token);
                                    dispatch(setUser(currentUser));
                                })
                                dispatch(loaderOff())
                            }
                        }
                    }
                    dispatch(loaderOff())
                    throw new Error('User not found');
                } else {
                    return
                }
                }).catch((error) => {
                    return error;
                });
        } catch (error) {
            throw new Error(error)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            if (!localStorage.getItem('token')) {return;}
            dispatch(loaderOn())
            const db = getDatabase();
            await get(ref(db), 'users/')
            .then(snapshot => {
                if (snapshot.exists()) {
                   const {users} = snapshot.val();
                   for (const [id, user] of Object.entries(users)) {
                       if (user.token === localStorage.getItem('token')) {
                            dispatch(setUser(users[id]))
                            dispatch(setAllUsers(users));
                            dispatch(loaderOff())
                            return;
                       }
                   }
                   dispatch(loaderOff())
                   throw new Error('User not found')
                } else {
                    dispatch(loaderOff())
                    return
                }
            })
            .catch(error => {
                dispatch(loaderOff())
                return error
            })
        } catch (e) {
            return e;
        }
    }
}

export const logout = (userId) => {
    return async dispatch => {
        try {
            const db = getDatabase();
            await get(ref(db), 'users/')
            .then(snapshot => {
                if (snapshot.exists()) {
                   const {users} = snapshot.val();
                   for (const [id, user] of Object.entries(users)) {
                       if (id === userId) {
                            user['token'] = '';
                            set(ref(db, 'users/' + userId), user)
                            dispatch(logoutUser())
                            return;
                       }
                   }
                   dispatch(loaderOff())
                   throw new Error('User not found')
                } else {
                    dispatch(loaderOff())
                    return
                }
            })
            .catch(error => {
                dispatch(loaderOff())
                return error
            })
        } catch (e) {
            throw new Error(e)
        }
    }
}

export const updateUserAvatarById = (userId, avatar) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            const dbRef = ref(db);
            await get(dbRef, `users/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const {users} = snapshot.val();
                    for (const [id, user] of Object.entries(users)) {
                        if (id === userId) {
                            user.avatar = avatar;
                            set(ref(db, 'users/' + userId), user)
                            dispatch(setUser(user));
                            users[id].avatar = avatar;
                            dispatch(setAllUsers(users));
                            return;
                        }
                    }
                } else {
                    dispatch(loaderOff());
                    return
                }
                }).catch((error) => {
                    dispatch(loaderOff());
                   return error;
                });
            dispatch(loaderOff());
        } catch (e) {
            dispatch(loaderOff());
            throw new Error(e)
        }
    }
}