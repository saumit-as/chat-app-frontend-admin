import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Popover } from "@headlessui/react";
const Chat = () => {
  const [chats, setChats] = useState([]);

  const { dispatch } = useContext(ChatContext);
  const { data } = useContext(ChatContext);
  const [messages, setMessages] = useState("");
  const [emotion, setEmotion] = useState("");
  const { currentUser } = useContext(AuthContext);
  const chooseMessage = (messages) => {
    setMessages(messages);
  };
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="chat">
      <div className="md:hidden">
        <Popover className="">
          <Popover.Button>
            <div className="flex p-2 gap-2 items-center bg-green-800 rounded m-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#fff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                />
              </svg>
              <p className="text-white inline m-0">Chats</p>
            </div>
          </Popover.Button>

          <Popover.Panel className="absolute z-10 bg-slate-600 w-full">
            <div className="grid p-5">
              {Object.entries(chats)
                ?.sort((a, b) => b[1].date - a[1].date)
                .map((chat) => (
                  <Popover.Button
                    className="userChat p-2"
                    key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}
                  >
                    <div className="userChatInfo">
                      <span>{chat[1].userInfo.displayName}</span>
                    </div>
                  </Popover.Button>
                ))}
            </div>

            <img src="/solutions.jpg" alt="" />
          </Popover.Panel>
        </Popover>
      </div>
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
