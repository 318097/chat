/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { TextArea, Button, Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import uuid from "uuid/v1";
import { connect } from "react-redux";

import Message from "./Message";
import { Header, Actions } from "../styled";
import { findSelectedUser } from "../store/actions";

import socket, { USER_INFO, MESSAGE, NEW_MESSAGE } from "../socket";

const UserChat = ({ dispatch, history, match, selectedUser, session }) => {
  const [chat, setChat] = useState([]);
  const [inputBox, setInputBox] = useState("");
  const [receiverId, setReceiverId] = useState("");

  useEffect(() => {
    socket.on(NEW_MESSAGE, data => setChat(prevState => [...prevState, data]));
  }, []);

  useEffect(() => {
    if (!session || !session.userId) return;
    socket.emit(USER_INFO, { userId: session.userId });
  }, [session]);

  useEffect(() => {
    const { id: receiver } = match.params;
    setTimeout(() => dispatch(findSelectedUser(receiver)), 1000);
    setReceiverId(receiver);

    const fetchUserChat = async () => {
      const {
        data: { chat: messages }
      } = await axios.get(`/chat/user-chat/${receiver}`);
      setChat(messages);
    };
    if (session) fetchUserChat();
  }, [match, session]);

  const sendMessage = () => {
    const data = {
      message: inputBox,
      sender: session.userId,
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
        <span> {selectedUser && selectedUser.name} </span>
      </Header>
      <div className="chat-container">
        {chat.map(item => (
          <div
            key={item._id || item.tempId}
            style={{
              display: "flex",
              justifyContent:
                item.sender === session.userId ? "flex-end" : "flex-start"
            }}
          >
            <Message data={item} />
          </div>
        ))}
      </div>
      <Actions>
        <TextArea
          autoFocus
          rows="1"
          placeholder="Message.."
          value={inputBox}
          onChange={({ target: { value } }) => setInputBox(value)}
          onKeyPress={({ which }) => (which === 13 ? sendMessage() : null)}
        />
        <Button onClick={sendMessage}>Send</Button>
      </Actions>
    </section>
  );
};

const mapStateToProps = ({ selectedUser, session }) => ({
  selectedUser,
  session
});

export default connect(mapStateToProps)(withRouter(UserChat));
