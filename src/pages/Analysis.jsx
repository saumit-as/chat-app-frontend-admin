import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";

const Analysis = () => {
  const [emoteCount, setEmoteCount] = useState({});
  const [unResolved, setUnresolved] = useState(0);
  const [resolved, setResolved] = useState(0);
  // const [emotions, setEmotions] = useState([]);
  const getData = async () => {
    const s = await axios.get(
      "https://backend-chat-app.azurewebsites.net/db/emotions/count"
    );
    const data = await axios.get(
      "https://backend-chat-app.azurewebsites.net/db/emotions/unresoleved"
    );
    setUnresolved(data.data.UnResolvedCount);
    setResolved(data.data.resolvedCount);
    setEmoteCount(s.data);
  };
  useEffect(() => {
    getData();
  }, []);
  const handleClick = () => {};
  return (
    <div>
      <div className="hidden lg:block">
        <Nav />
      </div>
      <div className="lg:hidden">
        <MobileNav />
      </div>
      <div>
        <div className="flex mt-2 sm:w-fit flex-col sm:flex-row mx-auto">
          {Object.keys(emoteCount).map((obj, i) => {
            return (
              <div>
                <div
                  onClick={() => {
                    handleClick();
                  }}
                  className="emoteButton bg-neutral-900 text-white cursor-pointer p-3 m-2 rounded-xl text-center"
                  key={i}
                >
                  {obj} : {emoteCount[obj]}
                </div>
                <div></div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-1  sm:grid-cols-2 gap-3 w-full h-full mt-4">
          <div className="bg-rose-200 mx-5 rounded p-3 drop-shadow-xl">
            <h1>Unresolved</h1>
            <p>Count {unResolved}</p>
          </div>
          <div className="bg-green-200 mx-5 rounded p-3 drop-shadow-xl">
            <h1>Resolved</h1>
            <p>Count {resolved}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
