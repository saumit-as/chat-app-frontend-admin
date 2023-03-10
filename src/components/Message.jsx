import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

import axios from "axios";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [res, setRes] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const reg = async (text) => {
    const res = await axios.post(
      "https://backend-chat-app.azurewebsites.net/translate",
      { string: text }
    );
    console.log(res.data);
    return res;
  };
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
      </div>
      <div className="messageContent">
        {message.text && (
          <div>
            <p>{message.text}</p>
            {/* <button className="translate" onClick={(async()=>{
          setRes( await reg(message.text))
        })}>translate</button> */}
            <Button
              variant="primary"
              onClick={async () => {
                handleShow();
                let r = await reg(message.text);
                setRes(r.data);
              }}
            >
              Translate
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Translation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {res ? (
                  res
                ) : (
                  <Spinner animation="border" role="status"></Spinner>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        )}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
