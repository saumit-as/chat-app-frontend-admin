import React from "react";
import { Menu } from "@headlessui/react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const MobileNav = () => {
  return (
    <div className="p-3 flex justify-between bg-[#181818]">
      <button className="text-white">Admin</button>
      <div>
        <Menu>
          <Menu.Button>
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Menu.Button>
          <Menu.Items>
            <div className="flex flex-col fixed bg-[#181818] left-0 w-full p-2 top-14 gap-2 border-t-2">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className="block lg:inline-block   hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline"
                    to="/analysis"
                  >
                    Dashboard
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    className="block lg:inline-block   hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline"
                    to="/"
                  >
                    Chat
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                <Link
                  className="block lg:inline-block   hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline"
                  to="/emotions"
                >
                  Detailed View
                </Link>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="hover:text-white mr-4 flex-1 ml-3 whitespace-nowrap text-white no-underline bg-rose-800 w-fit p-2 rounded"
                  onClick={() => signOut(auth)}
                >
                  logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
      </div>
    </div>
  );
};

export default MobileNav;
