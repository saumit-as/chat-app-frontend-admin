import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Nav from '../components/Nav'

const Home = () => {
  return (
      <div>
        <Nav/>
            <div className='home'>
        <div className="containerNB">
          <Sidebar/>
          <Chat/>
        </div>
            </div>
      </div>
  )
}

export default Home