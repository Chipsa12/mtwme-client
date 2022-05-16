import { API_URL } from "../../config/config";
import { useDispatch, useSelector } from "react-redux";
import { addConversation } from "../reducers/conversationReducer";
import { getMessagesByRoomId } from "../../actions/messenger";
import {format} from 'timeago.js';
import { useNavigate } from 'react-router-dom';

import "./Conversation.css";

const Conversation = ({ socket, conversation, currentUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const memberId = conversation.members.find(m => m !== currentUser.id)
  const {users} = useSelector(state => state.user)
  const member = users.find(user => user.id === memberId)

  const {messages} = useSelector(state => state.messenger)

  const currentMessages = messages.filter(m => m.conversation_id === conversation.id)

  const handleClick = async () => {
    await socket.emit("join_room", {roomId:conversation.id, userId: currentUser.id});
    dispatch(addConversation(conversation))
    dispatch(getMessagesByRoomId(conversation.id))
    navigate(`/messenger/${conversation.id}`, {replace: true})
  }

  return (
    <div className="conversation" onClick={handleClick}>
      {
        member && <img
          className="conversationImg"
          src={ !member.avatar.includes('default') 
            ? API_URL + member.id + '/' + member.avatar
            : API_URL + member.avatar
          }
          alt="avatar"
        />
      }
      <div className="conversationWrapper">
        <span className="conversationName">{member.surname} {member.name}</span>
        {
          currentMessages.length
          ?
          <div className="conversationLast">
            <span className="conversationLastMessage">{currentMessages[currentMessages.length - 1]?.text}</span>
            <span className="conversationLastMessageTime">{format(currentMessages[currentMessages.length - 1]?.created_at)}</span>
          </div>
          : null
        }
      </div>
    </div>
  );
}

export default Conversation;