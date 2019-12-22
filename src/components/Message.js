import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const Wrapper = styled.div`
  background: ${({ userId, sender }) =>
    userId === sender ? "orange" : "skyblue"};
  padding: 2px 7px;
  display: inline-block;
  max-width: 60%;
  border-radius: 10px;
  margin: 2px 5px;
  cursor: pointer;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    right: -5px;
    top: calc(50% - 2px);
    background: ${({ messageType }) =>
      messageType === "NORMAL" ? "white" : "grey"};
  }
  & > div {
    padding: 0;
    display: flex;
    flex-direction: column;
    .message {
    }
    .date {
      font-size: 60%;
      font-style: italic;
    }
  }
  .selected-message {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .left {
    left: -20px;
  }
  .right {
    right: -25px;
  }
`;

const findReceiverId = (userId, metaInfo) =>
  Object.keys(metaInfo).find(id => id !== userId);

const Message = ({
  userId,
  data: {
    message,
    createdAt,
    sender,
    receiver,
    messageType = "NORMAL",
    metaInfo = {},
    _id,
    tempId
  },
  selectedMessage,
  setSelectedMessage
}) => {
  const handleClick = () => {
    if (messageType === "CONFESS") {
      setSelectedMessage({
        metaInfo,
        messageType,
        _id,
        tempId
      });
    }
  };

  return (
    <Wrapper
      onClick={handleClick}
      messageType={messageType}
      userId={userId}
      sender={sender}
      _id={_id}
    >
      <div>
        <span className="message">
          {message}
          {messageType === "CONFESS" && (
            <span>
              <br />
              {metaInfo[userId] && <span>You: {metaInfo[userId]}</span>}
              {metaInfo && metaInfo[sender] && metaInfo[receiver] && (
                <span>Other: {metaInfo[findReceiverId(userId, metaInfo)]}</span>
              )}
            </span>
          )}
        </span>
        {/* <span className="date">{createdAt}</span> */}
      </div>
      {messageType === "CONFESS" &&
        selectedMessage &&
        (selectedMessage.tempId === tempId || selectedMessage._id === _id) && (
          <Icon
            className={`selected-message ${
              sender === userId ? "left" : "right"
            }`}
            disabled
            name="reply"
          />
        )}
    </Wrapper>
  );
};

export default Message;
