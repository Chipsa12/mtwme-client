import TimeAgo from 'timeago-react';
import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";

import "./Message.css";

const Message = ({ message, own, userId }) => {
  const {users} = useSelector(state => state.user)
  const { currentUser } = useSelector(state => state.user)
  const sender = users[userId]
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {
          currentUser.id !== userId
          ?
          <NavLink to={`/profile/${userId}`}>
            <img
              className="messageImg"
              src={sender.avatar}
              alt="avatar"
            />
          </NavLink>
          :
          <img
              className="messageImg"
              src={sender.avatar}
              alt="avatar"
            />
        }
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">
        <TimeAgo datetime={message.created_at}/>
      </div>
    </div>
  );
}

export default Message;