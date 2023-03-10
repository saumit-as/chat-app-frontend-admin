import React, { useEffect, useState, useContext } from "react";
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

      <div className=" mx-auto mt-2 relative overflow-x-auto shadow-md sm:rounded-lg w-2/3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                Emotion
              </th>
              <th scope="col" className="px-6 py-3">
                Emoji
              </th>
              <th scope="col" className="px-6 py-3">
                Uid
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* className={emotion.attended ? "bg-green-500": "bg-rose-500"} */}
            {emotions.map((emotion, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4">{emotion.name}</td>
                  <td className="px-6 py-4">{emotion.emotion}</td>
                  <td className="px-6 py-4">{emotion.emoji}</td>
                  <td className="px-6 py-4">{emotion.uid}</td>

                  <td>
                    <button
                      className={
                        emotion.attended
                          ? "bg-green-400 p-2 rounded text-white"
                          : "bg-rose-400 p-2 rounded text-white"
                      }
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
        </table>
      </div>
    </div>
  );
};

export default Emotions;
