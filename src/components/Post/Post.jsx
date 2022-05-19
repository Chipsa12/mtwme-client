import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import TimeAgo from 'timeago-react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {setLikes, deletePost} from "../../actions/post";
import Comment from '../Comment/Comment';
import { getUsers } from "../../actions/user";

import './Post.css'

const likeImgActivity = 'https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fheart.svg?alt=media&token=f29d3668-5fce-4783-9267-06f7c38a298a';
const likeImgNotActivity = 'https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fheart-icon-not-activity.svg?alt=media&token=a8c803fe-a941-43be-97a8-a35fc511e870';

const Post = ({ postId, userId, postImg, createdAt, description, likes, props }) => {
    const dispatch = useDispatch();
    const [like, setLike] = useState(likes?.length ?? 0);
    const [isLike, setIsLike] = useState(false)
    const [setting, setSetting] = useState(false);
    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])
    const {users, currentUser} = useSelector(state => state.user);
    const authorPost = users[userId];
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
                                src={authorPost.avatar}
                                alt="avatar"
                            />
                            <span className="postUsername">{authorPost.surname} {authorPost.name}</span>
                        </NavLink>
                        <span className="postDate">
                            <TimeAgo datetime={createdAt}/>
                        </span>
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
                    {description && <span className="postText">{description}</span>}
                    {
                        postImg
                        ? <img className="postImg" src={postImg} alt="post img" />
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