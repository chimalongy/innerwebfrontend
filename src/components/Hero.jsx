import React, {useState, useEffect} from 'react';
import "../styles/hero.scss";
import heroImg from "../assets/hero.png";
import scrollIcon from "../assets/scroll.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Hero() {
    const navmove=useNavigate()
    const textVariants = {
        initial: {
            x: -500,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.1
            }
        }
    };

    const childVariants = {
        initial: {
            x: -500,
            opacity: 0
        },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 1
            },
        },

        scrollButton:{
            opacity:0,
            y:10,
            transition:{
                duration:2,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    const sliderVariants = {
        initial: {
            x: "100%",
            opacity: 1
        },
        animate: {
            x: "-100%",
            opacity: 1,
            transition: {
                repeat: Infinity,
                repeatType: "mirrow",
                duration: 20,
                ease: "linear"
            }
        }
    };


    const texts = ["Design Your Next Website", "Build Your Next Mobile App", "Build Your Online Store", "Improve Your SEO"];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    const typingSpeed = 100; // typing speed in milliseconds
    const erasingSpeed = 50; // erasing speed in milliseconds
    const delayBetweenTexts = 1000; // delay between typing and erasing
    const delayAfterErasing = 500; // delay after erasing before typing next text
   
    useEffect(() => {
        let timeout;
        if (isTyping) {
            if (charIndex < texts[currentIndex].length) {
                timeout = setTimeout(() => {
                    setCharIndex(charIndex + 1);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, delayBetweenTexts);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setCharIndex(charIndex - 1);
                }, erasingSpeed);
            } else {
                setCurrentIndex((currentIndex + 1) % texts.length);
                setIsTyping(true);
                timeout = setTimeout(() => {
                    setCharIndex(0);
                }, delayAfterErasing);
            }
        }
        return () => clearTimeout(timeout);
    }, [charIndex, isTyping]);


    return (
        <div className='hero'>
            <div className='bgImage'>

            </div>
            <div className="wrapper">
                <motion.div className="textContainer" variants={textVariants} initial="initial" animate="animate">
                    {/* <motion.h2 variants={childVariants}>CHIMA LONGY</motion.h2> */}
                    {/* <motion.h1 variants={childVariants}>Web Developer and UI designer</motion.h1> */}
                    <h1>Let's <span className="servicetext">{texts[currentIndex].substring(0, charIndex)}</span></h1>
                    
                    
                    <motion.div variants={childVariants} className="buttons">
                        <motion.button variants={childVariants} >See the Latest Works</motion.button>
                        <motion.button variants={childVariants} >Contact Me</motion.button>
                    </motion.div>
                    <motion.img variants={childVariants} src={scrollIcon} animate="scrollButton" alt="" />
                </motion.div>
                <motion.div className="slidingTextContainer" variants={sliderVariants} initial="initial" animate="animate">
                    Writer Content Creator Influencer
                </motion.div>
            </div>

            <div className="imageContainer"> 
                <img src={heroImg} alt='heroImg' />
            </div>
        </div>
    );
}

export default Hero;
