import React, { useRef } from 'react';
import "../styles/portfolio.scss";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Slider from './Slider';
// import videoSrc from "../assets/react.mp4"
import videosrc from "../assets/react.mp4"
import image1 from "../assets/wrk1.png"
import image2 from "../assets/wrk2.png"
import image3 from "../assets/wrk3.png"
import image4 from "../assets/wrk4.png"


function Portfolio({isModalOpen, handleOpenModal,handleCloseModal, setVideoSrc}) {

    const items = [
        {
            id: 1,
            title: "Financial App",
            img: image1,
            description: "A comprehensive financial management application designed to help users track expenses, create budgets, and monitor their financial health. The app provides real-time analytics, personalized financial advice, and integration with various banking platforms to ensure users have a holistic view of their finances.",
            videoSrc:("/assets/react.mp4")
        },
        {
            id: 2,
            title: "Forex App",
            img: image2,
            description: "A dynamic Forex trading application that offers real-time currency exchange rates, advanced charting tools, and automated trading options. Users can access market news, set up alerts for rate changes, and utilize sophisticated trading strategies to maximize their investment potential in the foreign exchange market.",
            videoSrc:("./assets/react.mp4"),
        },
        {
            id: 3,
            title: "Email Schedule App",
            img: image3,
            description: "A streamlined email scheduling solution designed to optimize your inbox management. Schedule emails to be sent at the most opportune times, set reminders for follow-ups, and organize your communication effortlessly. With intuitive features and seamless integration with popular email services, staying on top of your correspondence has never been easier.",
            videoSrc:("/assets/react.mp4"),
        },
        {
            id: 4,
            title: "School Website",
            img: image4,
            description: "An innovative educational platform aimed at enhancing learning experiences for students of all ages. The app features interactive lessons, quizzes, and progress tracking across a wide range of subjects. It also includes resources for teachers to create customized curriculums and for parents to monitor their child's educational development.",
            videoSrc:("/assets/react.mp4")
        },
        {
            id: 5,
            title: "slider",
            element: <Slider/>,
        }
    ];

    const Single = ({ item }) => {
        const ref2 = useRef();
        const { scrollYProgress } = useScroll({
            target: ref2,
            // offset: ["start start", "end end"]
        });

        const y = useTransform(scrollYProgress, [0, 1], [-300, 300]);
        return (
            <section >
                {item.title ==="slider"?(
                    
                     <div className="container">
                    <div className="wrapper" style={{paddingTop:"200px"}}>
                        <div  className="slidecontainer">
                        <div className="slidewrapper">
                        {item.element}
                        </div>
                        <h2>in a glance</h2>
                        </div>
                        
                    </div>
                     </div>
                    
                  
                ):(
                    <div className="container">
                    <div className="wrapper">
                        <div className="ImageContainer" ref={ref2}>
                            <img src={item.img} alt={item.title} />
                        </div>
                        <motion.div className='textContainer' style={{ y }}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                             <button onClick={()=>{
                                setVideoSrc(item.videoSrc)
                                handleOpenModal()
                               
                                
                                }}>See Demo</button> 
                        </motion.div>
                    </div>
                </div>
                )}
                
            </section>
        );
    };

    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    return (
        <div className='portfolio' ref={ref}>

            <div className="progress">
                <h1>Featured Works</h1>
                <motion.div className="progress-bar" style={{ scaleX }}></motion.div>
            </div>
            {items.map((item) => {
                
                    return <Single item={item} key={item.id} />;
               
            })}
        </div>
    );
}

export default Portfolio;
