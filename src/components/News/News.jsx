import { useEffect } from "react";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../actions/post";
import { getUsers } from "../../actions/user"; 

import "./News.css"

const News = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getPosts())
        dispatch(getUsers())
    }, [dispatch])
    const posts = useSelector(state => state.post.posts)
    return (
        <div className='container'>
            <Share/>
            {
                posts.length 
                ? posts.map(post => {
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
                : <div className="notPosts">Новостей нет</div>
            }
        </div>
    )
}

export default News;