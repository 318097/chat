import React, { useState, useEffect } from "react";
import { TextArea, Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import queryString from "query-string";
import uuid from "uuid/v1";

import Message from "./Message";
import { Header, Actions } from "../styled";

import socket, { USER_INFO, MESSAGE, NEW_MESSAGE } from "../socket";

const UserChat = ({ history, match }) => {
  const [chat, setChat] = useState([]);
  const [inputBox, setInputBox] = useState("");
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    socket.on(NEW_MESSAGE, data => setChat(prevState => [...prevState, data]));
  }, []);

  useEffect(() => {
    if (!senderId) return;
    socket.emit(USER_INFO, { userId: senderId });
  }, [senderId]);

  useEffect(() => {
    const { id: receiver } = match.params;
    const { sender } = queryString.parse(history.location.search);
    setSenderId(sender);
    setReceiverId(receiver);

    const fetchUserChat = async () => {
      const {
        data: { chat: messages }
      } = await axios.get(`/chat/user-chat/${receiver}`);
      setChat(messages);
    };

    fetchUserChat();
  }, [match, history]);

  const sendMessage = () => {
    const data = {
      message: inputBox,
      sender: senderId,
      receiver: receiverId,
      tempId: uuid()
    };
    setChat(prevState => [...prevState, data]);
    socket.emit(MESSAGE, data);
    setInputBox("");
  };

  return (
    <section id="chat">
      <Header>
        <span onClick={() => history.push("/home")}>
          <Icon name="angle double left" />
        </span>
        <span> Username </span>
      </Header>
      <div className="chat-container">
        {chat.map(item => (
          <div
            key={item._id || item.tempId}
            style={{
              display: "flex",
              justifyContent:
                item.sender === senderId ? "flex-end" : "flex-start"
            }}
          >
            <Message data={item} />
          </div>
        ))}
      </div>
      <Actions>
        <TextArea
          value={inputBox}
          onChange={({ target: { value } }) => setInputBox(value)}
          rows="1"
          placeholder="Message.."
        />
        <Button onClick={sendMessage}>Send</Button>
      </Actions>
    </section>
  );
};

export default withRouter(UserChat);
