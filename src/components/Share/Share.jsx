import {
  PermMedia,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../config/config";
import Button from "../UI/button/Button";
import { uploadImgPost } from "../../actions/uploadFile";
import Picker from 'emoji-picker-react';

import "./Share.css";


const Share = () => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const [description, setDescription] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const onEmojiClick = (event, emojiObject) => {
        setDescription(prev => prev + emojiObject.emoji)
    };
    const [file, setFile] = useState('');
    const submitHandler = async (e) => {
        e.preventDefault();
        if (file || description) {
            dispatch(uploadImgPost(currentUser.id, description, file))
            setDescription('')
            setFile('')
            setShowPicker(false)
        } else {
            return;
        }
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        setShowPicker(false)
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={currentUser.avatar}
                        alt=""
                    />
                    <input
                        placeholder={"Что нового " + currentUser.surname + " " + currentUser.name + "?"}
                        className="shareInput"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Фото</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" onClick={() => setShowPicker(prev => !prev)}/>
                            <span className="shareOptionText" onClick={() => setShowPicker(prev => !prev)}>Эмоции</span>
                            <div className='shareContainerPicker'>
                               {
                                    showPicker && <Picker onEmojiClick={onEmojiClick} />
                                } 
                            </div>
                            
                        </div>
                    </div>
                    <Button type="submit">Поделиться</Button>
                </form>
            </div>
        </div>
    );
}

export default Share;