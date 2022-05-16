import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadAvatar, deleteAvatar, getAllUsers } from '../../actions/user';
import Button from '../UI/button/Button'
import InputFile from '../UI/inputFile/InputFile'
import { API_URL } from '../../config/config';
import defaultBgProfile from './img/profileBg.jpg'
import InputMessage from '../UI/inputMessage/InputMessage';

import styles from './Profile.module.css'

const Profile = ({socket}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllUsers())
    },[dispatch])
    let {id} = useParams();
    let user = useSelector(state => state.user.users).filter(user => user.id === id)[0]
    const [showInputMessage, setShowInputMessage] = useState(false);
    const changeHandler = (e) => {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    const clickHandle = () => {
        if (user.avatar !== null) {
            dispatch(deleteAvatar())
        }
    }

    return (
        <div className={styles.profile}>
            {
                showInputMessage && <div className={styles.inputMessage}>
                    <InputMessage socket={socket} userId={id} cb={setShowInputMessage}/>
                </div>
            }
            <div className={styles.profileRight}>
                <div className={styles.profileRightTop}>
                    <div className={styles.profileCover}>
                        <img
                            className={styles.profileCoverImg}
                            src={defaultBgProfile} alt="background profile"
                        />
                        <img
                            className={styles.profileUserImg}
                            src={!user.avatar.includes('default') 
                                ? API_URL + user.id + "/" + user.avatar
                                : API_URL + user.avatar
                            } 
                            alt="avatar"
                        />
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
                </div>
            </div>
        </div>
    )
}

export default Profile;