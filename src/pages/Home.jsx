import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";

const Home = () => {
  return (
    <div>
      <div className="hidden md:block">
        <Nav />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
      <div className="home">
        <div className="containerNB">
          {/* <div className="w-full"> */}
          <Sidebar />
          {/* </div> */}
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;
