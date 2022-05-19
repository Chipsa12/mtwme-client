import { useDispatch, useSelector } from "react-redux";
import { addConversation } from "../reducers/conversationReducer";
import { getMessagesByRoomId } from "../../actions/messenger";
import { useNavigate } from 'react-router-dom';
import TimeAgo from 'timeago-react';

import "./Conversation.css";

const Conversation = ({ conversation, currentUser}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const memberId = conversation.members.find(m => m !== currentUser.id)
  const {users} = useSelector(state => state.user)
  const member = users[memberId]

  const {messages} = useSelector(state => state.messenger)

  const currentMessages = messages.filter(m => m.conversation_id === conversation.id)

  const handleClick = async () => {
    dispatch(addConversation(conversation))
    dispatch(getMessagesByRoomId(conversation.id))
    navigate(`/messenger/${conversation.id}`, {replace: true})
  }

  return (
    <div className="conversation" onClick={handleClick}>
      {
        member && <img
          className="conversationImg"
          src={ member.avatar}
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
            <span className="conversationLastMessageTime">
              <TimeAgo datetime={currentMessages[currentMessages.length - 1]?.created_at}/>
            </span>
          </div>
          : null
        }
      </div>
    </div>
  );
}

export default Conversation;