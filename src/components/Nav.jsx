import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const [unResolved, setUnresolved] = useState(0);
  const getData = async () => {
    const data = await axios.get(
      "https://backend-chat-app.azurewebsites.net/db/emotions/unresoleved"
    );

    setUnresolved(data.data.UnResolvedCount);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <nav className="flex flex-row items-center justify-between flex-wrap bg-[#181818] p-6">
        <div className="flex items-center flex-shrink-0 text-white">
          <span className="font-semibold text-xl tracking-tight ">Admin</span>
        </div>

        <div>
          <div className="w-full block flex-grow">
            <div className="text-sm flex flex-row ">
              <Link
                className="block lg:inline-block   hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline"
                to="/analysis"
              >
                Dashboard
              </Link>
              <Link
                className="block lg:inline-block   hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline"
                to="/"
              >
                Chat
              </Link>
              <Link
                className="block lg:inline-block   hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline"
                to="/emotions"
              >
                Detailed View
              </Link>
            </div>
          </div>
        </div>
        <div>
          {unResolved && (
            <span className="text-white">
              Unresolved :<span className="text-rose-500"> {unResolved}</span>
            </span>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
