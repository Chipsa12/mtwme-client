import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { format } from "timeago.js";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import likeImgActivity from './img/heart.svg'
import likeImgNotActivity from './img/heart-icon-not-activity.svg'
import { API_URL } from "../../config/config";
import {setLikes, deletePost} from "../../actions/post"
import Comment from '../Comment/Comment'

import './Post.css'

const Post = ({ postId, userId, postImg, createdAt, description, likes, props }) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(likes?.length ?? 0);
    const [isLike, setIsLike] = useState(false)
    const [setting, setSetting] = useState(false);
    
    const {users, currentUser} = useSelector(state => state.user);
    const authorPost = users.find(user => user.id === userId);
    
    useEffect(()=>{
        setIsLike(likes?.includes(currentUser.id))
    }, [likes, currentUser.id])

    const likeHandler = () => {
        if (isLike) {return;}
        setLike(prev => prev + 1);
        setIsLike(true)
        dispatch(setLikes(currentUser.id, postId));
    };
    const handleSettingsClick = () => {
        setSetting(prev => !prev);
    }
    const deleteSettingsClick = () => {
        dispatch(deletePost(postId))
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <NavLink to={`/profile/${userId}`} className="nav-link">
                            <img
                                className="postProfileImg"
                                src={!authorPost.avatar.includes('default') 
                                    ? API_URL + authorPost.id + '/' + authorPost.avatar
                                    : API_URL + authorPost.avatar
                                }
                                alt="avatar"
                            />
                            <span className="postUsername">{authorPost.surname} {authorPost.name}</span>
                        </NavLink>
                        <span className="postDate">{format(createdAt)}</span>
                    </div>
                    {
                        authorPost.token === localStorage.getItem('token')
                        ?
                        <div className="postTopRight" onClick={handleSettingsClick}>
                            <MoreVert />
                            {
                                setting
                                ?
                                <div className="postSettings" onClick={deleteSettingsClick}>
                                    <span className="postSettingsDelete">Удалить</span>
                                </div>
                                : null
                            }
                        </div>
                        : null
                    }
                    
                </div>
                <div className="postCenter">
                    <span className="postText">{description ? description : null}</span>
                    {
                        postImg
                        ? <img className="postImg" src={API_URL + authorPost.id + '/' + postImg} alt="post img" />
                        : null
                    }
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img
                        className="likeIcon"
                        src={!isLike ? likeImgNotActivity : likeImgActivity}
                        onClick={likeHandler}
                        alt="heart"
                        />
                        <span className="postLikeCounter">{like} Нравится</span>
                    </div>
                </div>
            </div>
            <Comment postId={postId}/>
        </div>
    );
}

export default Post;