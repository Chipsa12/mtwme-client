import Conversation from "../Conversation/Conversation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../../actions/conversation"
import { getMessages } from "../../actions/messenger"

import "./Messenger.css";

const Messenger = ({socket}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getConversations())
    dispatch(getMessages())
  },[])
  
  const { currentUser } = useSelector(state => state.user);
  const conversations = useSelector(state => state.conversation.conversations)
  const currentConversations = conversations.filter(
    conversation => 
      (conversation.members[0] === currentUser.id || conversation.members[1] === currentUser.id)
  )
  
  return (
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {
              currentConversations.length
              ?
              currentConversations.map((c) => (
                <div key={c.id}>
                  <Conversation socket={socket} conversation={c} currentUser={currentUser} />
                </div>
              ))
              : <span className="notConversation">У вас пока нет диалогов</span>
            }
          </div>
        </div>  
      </div>
  );
}

export default Messenger;