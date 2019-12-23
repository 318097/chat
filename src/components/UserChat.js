/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { TextArea, Button, Icon, Radio } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import uuid from "uuid/v1";
import { connect } from "react-redux";

import Message from "./Message";
import { Header, Actions } from "../styled";
import { findSelectedUser } from "../store/actions";

import socket, {
  USER_INFO,
  MESSAGE,
  NEW_MESSAGE,
  UPDATE_MESSAGE_REQUEST,
  MESSAGE_UPDATE
} from "../socket";

const UserChat = ({ dispatch, history, match, selectedUser, session }) => {
  const [chat, setChat] = useState([]);
  const [inputBox, setInputBox] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [messageType, setMessageType] = useState("NORMAL");
  const [messageTypesVisibile, setMessageTypesVisibile] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    socket.on(NEW_MESSAGE, data => setChat(prevState => [...prevState, data]));
    socket.on(MESSAGE_UPDATE, updateMessage);
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

  useEffect(() => {}, [selectedMessage]);

  const updateMessage = ({ metaInfo = {}, ...update }) =>
    setChat(prevState => {
      const messages = [...prevState];
      for (let i = messages.length - 1; i >= 0; i--) {
        if (
          messages[i].tempId === update.tempId ||
          messages[i]._id === update._id
        ) {
          messages[i] = {
            ...messages[i],
            ...update,
            metaInfo: { ...messages[i].metaInfo, ...metaInfo }
          };
          break;
        }
      }
      return messages;
    });

  const attachToMessage = () => {
    const data = {
      userId: session.userId,
      message: inputBox.trim(),
      tempId: selectedMessage.tempId,
      _id: selectedMessage._id
    };
    socket.emit(UPDATE_MESSAGE_REQUEST, data);
    setInputBox("");
    setSelectedMessage(null);
    setMessageType("NORMAL");
  };

  const sendMessage = () => {
    if (!inputBox.trim()) return;
    if (selectedMessage) return attachToMessage();

    const tempId = uuid();
    const data = {
      message: inputBox.trim(),
      sender: session.userId,
      receiver: receiverId,
      messageType,
      tempId
    };
    setChat(prevState => [...prevState, data]);

    socket.emit(MESSAGE, data);

    if (messageType === "CONFESS") {
      setSelectedMessage({
        tempId,
        metaInfo: {},
        messageType
      });
    }
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
            <Message
              userId={session.userId}
              data={item}
              selectedMessage={selectedMessage}
              setSelectedMessage={setSelectedMessage}
            />
          </div>
        ))}
      </div>
      {messageTypesVisibile && (
        <div className="message-types">
          {["NORMAL", "CONFESS", "FUTURE"].map(type => (
            <Radio
              key={type}
              label={type}
              name="messageType"
              value={type}
              checked={messageType === type}
              onChange={(e, { value }) => setMessageType(value)}
            />
          ))}
        </div>
      )}
      <Actions>
        <div>
          <TextArea
            autoFocus
            rows="1"
            placeholder="Message.."
            value={inputBox}
            onChange={({ target: { value } }) => setInputBox(value)}
            onKeyPress={({ which }) => (which === 13 ? sendMessage() : null)}
          />
          <Icon
            className="message-types-icon"
            onClick={() => setMessageTypesVisibile(prev => !prev)}
            name={messageTypesVisibile ? "minus" : "plus"}
          />
        </div>
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
