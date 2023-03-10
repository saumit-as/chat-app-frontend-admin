import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import axios from "axios";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState("");
  const [emotion, setEmotion] = useState("");
  const chooseMessage = (messages) => {
    setMessages(messages);
  };
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          {emotion && <p>{emotion}</p>}
          {data.user?.displayName && (
            <Button
              className="rounded"
              onClick={async () => {
                console.log(data.user);
                let messagesText = [];
                messages.forEach((message) => {
                  messagesText.push(message.text);
                });
                let res = await axios.post(
                  "https://backend-chat-app.azurewebsites.net/db/emotions/",
                  { message: messagesText, details: data.user }
                );
                setEmotion(res.data.emoji);
                console.log(res.data.emoji);
              }}
              variant="primary"
            >
              Get emotion
            </Button>
          )}
        </div>
      </div>
      <Messages chooseMessage={chooseMessage} />
      <Input />
    </div>
  );
};

export default Chat;
