import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar, deleteAvatar} from '../../actions/uploadFile';
import Button from '../UI/button/Button'
import InputFile from '../UI/inputFile/InputFile'
import InputMessage from '../UI/inputMessage/InputMessage';
import { DEFAULT_AVATAR_URL } from '../../config/config';
import { getUsers } from '../../actions/user';
import { getLogs, deleteLog } from '../../actions/log';
import { Cancel } from "@material-ui/icons";
import { getPosts } from '../../actions/post';
import Post from '../Post/Post';

import styles from './Profile.module.css'

const Profile = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getUsers())
        dispatch(getLogs())
        dispatch(getPosts())
    },[dispatch])
    const { id } = useParams();
    const { users } = useSelector(state => state.user)
    const user = users[id];
    const { posts } = useSelector(state => state.post);
    const currentPost = posts.filter(post => post.user_id === id);
    const [showInputMessage, setShowInputMessage] = useState(false);
    const { logs } = useSelector(state => state.log);
    const currentLogs = logs.length ? logs.filter(log => log.user_id === id) : [];
    const styleCancelBtn = {
        color: 'tomato', 
        width: '20px', 
        height: '20px', 
        cursor: 'pointer',
        position: 'absolute',
        right: '-20px'
    }
    const [activityLogs, setActivityLogs] = useState(true);
    const [activityPosts, setActivityPosts] = useState(false);

    const isVisibleLogs = () => {
        if (activityLogs) {return}
        setActivityLogs(true);
        setActivityPosts(false);
    }

    const isVisiblePosts = () => {
        if (activityPosts) {return}
        setActivityLogs(false);
        setActivityPosts(true);
    }

    const changeHandler = (e) => {
        const file = e.target.files[0]
        if (file) {
            try {
                dispatch(uploadAvatar(file, user.id));
            } catch (e) {
                console.log(e)
            }
        }
    }
    const clickHandle = () => {
        if (user.avatar !== DEFAULT_AVATAR_URL) {
            dispatch(deleteAvatar(user.id))
        }
    }

    const clickDeleteLog = (logId) => {
        dispatch(deleteLog(logId))
        dispatch(getLogs())
    }

    return (
        <>
        {
            showInputMessage && <div className={styles.inputMessage}>
                <InputMessage userId={id} cb={setShowInputMessage}/>
            </div>
        }
        <div className={styles.profile}>
            <div className={styles.profileRight}>
                <div className={styles.profileRightTop}>
                    <div className={styles.profileCover}>
                        <img
                            className={styles.profileCoverImg}
                            src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2FprofileBg.jpg?alt=media&token=73ebbe25-e8be-48b7-aa98-c3bf30dc707f' 
                            alt="background profile"
                        />
                        {
                            <img
                                className={styles.profileUserImg}
                                src={user.avatar} 
                                alt="avatar"
                            />
                        }
                        <div className={user.token ? styles.onLine : styles.offLine}></div>
                    </div>
                    <div className={styles.profileInfo}>
                        <h4 className={styles.profileInfoName}>{user.surname} {user.name}</h4>
                    </div>
                    {
                        user.token === localStorage.getItem('token') 
                        ?
                        <div className={styles.changeAvatar}>
                            <Button onClick={clickHandle}>Удалить аватар</Button>
                            <InputFile onChange={changeHandler}>Загрузить аватар</InputFile> 
                        </div>
                        :
                        <div className={styles.sendMessage}>
                            <Button onClick={()=> setShowInputMessage(prev => !prev)}>Отправить сообщение</Button> 
                        </div>
                    }
                    <div className={styles.logs}>
                        <div>
                            <span onClick={isVisibleLogs} className={styles.titleLogs}>Метки</span>
                            <span> / </span>
                            <span onClick={isVisiblePosts} className={styles.titleLogs}>Посты</span>
                        </div>

                        {
                            activityLogs
                            ? 
                                currentLogs.length
                                ?
                                currentLogs.map(log => {
                                    return <div key={log.id} className={styles.log}>
                                        <svg
                                            className={ user.token === localStorage.getItem('token') ? styles.markerGreen : styles.markerYellow}
                                            style={{
                                                height: `25px`,
                                                width: `25px`,
                                            }}
                                            version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                                            <g>
                                                <g>
                                                <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                                                    c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                                                    c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                                                </g>
                                            </g>
                                        </svg>
                                        <div className={styles.infoLog}>
                                            <span className={styles.titleLog}>{log.title}</span>
                                            <span className={styles.descriptionLog}>{log.description}</span>
                                            <span className={styles.visitedLog}>{log.visit}</span>
                                        </div>
                                        {
                                            user.token === localStorage.getItem('token')
                                            ?<Cancel style={styleCancelBtn} onClick={() => clickDeleteLog(log.id)}/>
                                            : null
                                        }
                                    </div>
                                })
                                : <div className={styles.notLogs}>{user.token === localStorage.getItem('token') ? 'У вас пока нет меток' : `Меток нет`}</div>
                            : 
                                currentPost.length
                                ? currentPost.map(post => {
                                    return <Post 
                                        key={post.id} 
                                        postId={post.id}
                                        userId={post.user_id}
                                        postImg={post.post_img} 
                                        createdAt={post.created_at} 
                                        description={post.description} 
                                        likes={post.likes}
                                    /> 
                                })
                                : <div className={styles.notPosts}>{user.token === localStorage.getItem('token') ? "У вас пока нет новостей" : "Новостей нет"}</div>

                        }
                        
                        
                        
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile;