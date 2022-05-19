import {Cancel} from "@material-ui/icons";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'timeago-react';
import { NavLink } from 'react-router-dom';
import { setCommentFromPost, getComments, deleteCommentFromPost } from '../../actions/post';

import styles from './Comment.module.css'

const Component = ({postId, props}) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    useEffect(()=>{
        dispatch(getComments())
    },[dispatch])
    const {comments} = useSelector(state => state.comment)
    const posts = useSelector(state => state.post.posts)
    const currentComments = comments.filter(comment => comment.post_id === postId)
    const {currentUser, users} = useSelector(state => state.user)
    const styleCancelBtn = {
        color: 'tomato', 
        width: '15px', 
        height: '15px', 
        cursor: 'pointer',
        position: 'absolute',
        top: '9px',
        right: '24px'
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!comment) {
            return;
        }
        dispatch(setCommentFromPost(postId, currentUser.id, comment))
        setComment('')
    }
    return (
        <div className={styles.container}>
            {
                currentComments.length
                ? currentComments.map(comment => {
                   return <div key={comment.id} className={styles.comment}>
                        <NavLink to={`/profile/${comment.user_id}`}>
                            <img 
                                className={styles.avatarComment}
                                src={ users[comment.user_id].avatar} 
                                alt="avatar" 
                            />
                        </NavLink>
                        <div className={styles.wrapperComment}>
                            <div className={styles.textComment}>{comment.comment}</div>
                            <div className={styles.date}>
                                <TimeAgo datetime={comment.created_at}/>
                            </div>
                        </div>
                        {
                            users[comment.user_id].token === localStorage.getItem('token')
                            ||
                            posts.filter(post => post.id === postId)[0].user_id === currentUser.id
                            ?
                            <Cancel 
                                style={styleCancelBtn} 
                                onClick={() => dispatch(deleteCommentFromPost(comment.id))}
                            />
                            : null
                        }
                    </div>
                })
                : <div className={styles.notComments}>Нет комментарий</div>
            }
            <div className={styles.wrapper}>
                <img 
                    className={styles.avatar} 
                    src={currentUser.avatar} 
                    alt="" 
                />
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input 
                        value={comment} 
                        onChange={e => setComment(e.target.value)} 
                        className={styles.input} 
                        type="text" 
                        placeholder='Написать комментарий...'
                    />
                    <button type="submit"className={styles.btnSend} onClick={handleSubmit}>
                        <img 
                            src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fsend-btn.svg?alt=media&token=cf5274d8-282f-4332-8f8c-a3f5270830cb' 
                            alt="send btn" 
                        />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Component;