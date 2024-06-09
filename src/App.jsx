import { useState } from 'react'
import "./app.scss"

import './App.css'


import VideoModal from './components/VideoModal';

import Home from './routes/Home'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


import OutboundDasboard from "./routes/OutboundDasboard"
import UnsubscribeFromOutbound from "./routes/UnsubscribeFromOutbound"
import New from './routes/New'




function App() {
  const [count, setCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoSrc, setVideoSrc]= useState("")

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Router>
       

        <Routes>
          <Route path="/" element={
           
             
              <Home isModalOpen={isModalOpen} handleCloseModal={handleCloseModal} handleOpenModal= {handleOpenModal} setVideoSrc={setVideoSrc} />
           
            
            } />
          <Route path="/outbound" element={<OutboundDasboard />} />
          <Route path="/outboundunsub" element={<UnsubscribeFromOutbound />} />
          
        </Routes>
      </Router>

     
      <VideoModal
        show={isModalOpen}
        onClose={handleCloseModal}
        videoSrc={videoSrc}
      />












    </div>
  )
}

export default App
