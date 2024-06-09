import React, { useRef , useState} from 'react'
import "../styles/services.scss"
import { animate, motion , useInView} from 'framer-motion'
import peopleImage  from "../assets/people.webp"
import { stagger } from 'framer-motion/dom'


function Services() {

  const ref = useRef()

  const variants={
    initial:{
      // x:-500,
      x:0,
      opacity:0, 
      y:100,
      
    },

    animate:{
      x:0,
      opacity:1,
      y:0,
      transition:{
        duration:1,
        staggerChildren:0.1,
      }

    }
  }

  const isinview = useInView(ref, {margin:"-100px"})
  return (
    <motion.div 
    className='services' 
    variants={variants} 
    initial="initial" 
    // whileInView="animate" 
    ref={ref}
    animate = {isinview && "animate"}
    
    >
      <motion.div className="textContainer"variants={variants}>
        <p>I foucus on helping your brand grow<br/>
        and move forward </p>
      <hr/>
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src={peopleImage} alt="" />
          <h1><motion.b whileHover={{color:"orange"}}>Unique</motion.b> ideas</h1>
        </div>
        <div className="title">
          <h1><motion.b whileHover={{color:"orange"}}>For Your</motion.b> Business.</h1>
          <button>WHAT WE DO?</button>
        </div>
      </motion.div>

      <motion.div className="listContainer" variants={variants}>
      <motion.div className="box" 
      whileHover={{backgroundColor:"#22c55e", color:"black"}}
      > 
          <h2>WEB DESIGN</h2>
          <p>Transform your online presence with our bespoke web design solutions. From sleek aesthetics to seamless functionality, we'll craft a site that reflects your brand and captivates your audience.</p>
          <button >GO</button>
        </motion.div>
        <motion.div className="box"
        whileHover={{backgroundColor:"#22c55e", color:"black"}}
         >
          <h2>WEB DEVELOPEMENT</h2>
          <p>Turn your digital dreams into reality with our professional web development services. From custom solutions to e-commerce platforms, we build websites that are fast, functional, and user-friendly.</p>
          <button>GO</button>
        </motion.div>
        <motion.div className="box" 
        whileHover={{backgroundColor:"#22c55e", color:"black"}}
        >
          <h2>SEO SERVICES</h2>
          <p>We use proven strategies like keyword research, on-page optimization, and link building to boost your search engine rankings and drive organic traffic to your website. Let us help you climb the search engine results pages and reach your target audience effectively.</p>
          <button>GO</button>
        </motion.div>
        <motion.div className="box" 
        whileHover={{backgroundColor:"#22c55e", color:"black"}}
        >
          <h2>DOMAIN FLIPPING</h2>
          <p>Unlock the profit potential of domain flipping with our expert guidance. From identifying valuable domains to maximizing their resale value, we'll help you navigate this lucrative market with ease.</p>
          <button>GO</button>
        </motion.div>


      </motion.div>
      
    </motion.div>
  )
}

export default Services