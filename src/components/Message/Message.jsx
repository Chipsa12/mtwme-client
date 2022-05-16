import { format } from "timeago.js";
import { API_URL } from "../../config/config";
import { useSelector } from "react-redux";

import "./Message.css";

const Message = ({ message, own, userId }) => {
  const {users} = useSelector(state => state.user)
  const currentUser = users.find(user => user.id === userId)
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={!currentUser.avatar.includes('default')
            ? API_URL + currentUser.id + '/' + currentUser.avatar
            : API_URL + currentUser.avatar
          }
          alt="avatar"
        />
        <div className="messageText">{message.text}</div>
      </div>
      <div className="messageBottom">{format(message.created_at)}</div>
    </div>
  );
}

export default Message;