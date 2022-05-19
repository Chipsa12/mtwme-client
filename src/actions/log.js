import {setLogs} from "../components/reducers/logReducer";
import { loaderOn, loaderOff } from "../components/reducers/appReducer";
import uniqid from 'uniqid';
import { getDatabase, ref, set, get} from "firebase/database";

export const createdLog = (userId, data) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            const logId = uniqid();
            data['id'] = logId;
            data['created_at'] = new Date().toISOString();
            data['user_id'] = userId;
            set(ref(db, 'logs/' + logId), data)
            .then(() => {
                get(ref(db), `logs/`).then((snapshot) => {
                    if (snapshot.exists()) {
                        const { logs } = snapshot.val();
                        let logsArray = [];
                        for(const [key, value] of Object.entries(logs)) {
                            logsArray.push(value)
                        }
                        dispatch(setLogs(logsArray))
                    } else {
                        return
                    }
                })
                .catch((err) => {return err})
            })
            .catch(e => {throw new Error(e)})
            dispatch(loaderOff())
        } catch (error) {
            dispatch(loaderOff())
            throw new Error(error);
        }
    }
}

export const getLogs = () => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            await get(ref(db), `logs/`).then((snapshot) => {
                if (snapshot.exists()) {
                    const { logs } = snapshot.val();
                    let logsArray = [];
                    for(const [key, value] of Object.entries(logs)) {
                        logsArray.push(value)
                    }
                    dispatch(setLogs(logsArray))
                } else {
                    return
                }
            })
            .catch((err) => {return err})
            dispatch(loaderOff())
        } catch (error) {
            dispatch(loaderOff())
            throw new Error(error)
        }
    }
}

export const deleteLog = (logId) => {
    return async dispatch => {
        try {
            dispatch(loaderOn())
            const db = getDatabase();
            set(ref(db, 'logs/' + logId), null)
                .then(() => {
                    get(ref(db), `logs/`).then((snapshot) => {
                        if (snapshot.exists()) {
                            const { logs } = snapshot.val();
                            let logsArray = [];
                            for(const [key, value] of Object.entries(logs)) {
                                logsArray.push(value)
                            }
                            dispatch(setLogs(logsArray))
                        } else {
                            return
                        }
                    })
                    .catch((err) => {return err})
                })
                .catch(e => {throw new Error(e)})
                dispatch(loaderOff())
            dispatch(loaderOff())
        } catch (err) {
            dispatch(loaderOff())
            return err;
        }
    }
}