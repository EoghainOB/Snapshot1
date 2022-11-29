import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatList = ({ user }) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchChatList = async () => {
      console.log(user);
      const res = await axios.get(`/api/chats/${user.googleId}`);
      setChatList(res.data);
    };
    fetchChatList();
  }, [user]);

  console.log(chatList);
  return (
    <div>
      <h1>Chat List</h1>
      <ul>
        {chatList.map((chat, i) => 
        <li key={i}>
            <Link to={`/chats/${chat.chatRoomId}`}>
            <img alt={i} src={chat.users.map(x => x.name !== user.name ? x.img : '')}/>
            <p>{chat.users.map(x => x.name !== user.name ? x.name : '')}</p>
            </Link>
        </li> 
        )}
      </ul>
    </div>
  );
};

export default ChatList;
