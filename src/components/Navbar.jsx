import "../styles/navbar.scss"
import facebook from "../assets/facebook.png"
import instagram from  "../assets/instagram.png"
import youtube from  "../assets/youtube.png"
import dribble from  "../assets/dribble.png"

import { motion } from "framer-motion"
import { Sidebar } from "./Sidebar"

 
function Navbar() {
  return (
   <div className="navbar">
   <Sidebar/>

    <div className='wrapper'>
        <motion.span 
        initial={{opacity:0, scale:0.2}}  
        animate={{opacity:1, scale:1}}  
        transition={{duration:0.5}}
        
        
        >Inner Web</motion.span>
        <div className="socials">
            <a href="#"><img src={facebook} alt="" /></a>
            <a href="#"><img src={instagram} alt="" /></a>
            <a href="#"><img src={youtube} alt="" /></a>
            <a href="#"><img src={dribble} alt="" /></a>
           
            
             
        </div>
    </div>
   </div>
  )
}

export default Navbar