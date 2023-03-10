import React, { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import Nav from "../components/Nav";

const Emotions = () => {
  const { dispatch } = useContext(ChatContext);
  const router = useNavigate();
  const handleClick = (emotion) => {
    axios.post(
      "https://backend-chat-app.azurewebsites.net/db/emotions/attended",
      { uid: emotion.uid, attended: true }
    );
    dispatch({ type: "CHANGE_USER", payload: emotion.details });
    router("/");
    console.log(emotion);
  };
  const [emotions, setEmotions] = useState([]);
  const getData = async () => {
    const s = await axios.get(
      "https://backend-chat-app.azurewebsites.net/db/emotions"
    );
    console.log(s.data);
    setEmotions(s.data.emotions);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Nav />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Emotion</th>
              <th>Emoji</th>
              <th>User Id</th>
              <th>Attended</th>
            </tr>
          </thead>
          <tbody>
            {emotions.map((emotion, index) => {
              return (
                <tr
                  key={index}
                  className={emotion.attended ? "bg-green-500" : "bg-rose-500"}
                >
                  <td>{emotion.name}</td>
                  <td>{emotion.emotion}</td>
                  <td>{emotion.emoji}</td>
                  <td>{emotion.uid}</td>

                  <td>
                    <button
                      onClick={() => {
                        handleClick(emotion);
                      }}
                    >
                      Visit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Emotions;
