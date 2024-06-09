import React, { useRef } from 'react'
import "../styles/contact.scss"
import { motion, useInView } from 'framer-motion'
function Contact() {

    const variants = {
        initial: {
            y: 500,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.1,
            }
        }
    }

    const ref = useRef();
    const isInView = useInView(ref, { margin: "-100px" })
    return (
        <motion.div className='contact' variants={variants} initial="initial" animate="animate">
            <motion.div className="textcontainer">
                <motion.h1 variants={variants}>Lets work</motion.h1>
                <motion.div className='item' variants={variants}>
                    <h2>Mail</h2>
                    <span>Chima@innerweb.com</span>
                </motion.div>
                {/* <motion.div className='item' variants={variants}>
                    <h2>Mail</h2>
                    <span>hello@react.dev</span>
                </motion.div> */}
                {/* <motion.div className='item' variants={variants}>
                    <h2>Phone</h2>
                    <span>+1 2345678</span>
                </motion.div> */}
            </motion.div>
            <motion.div className="formcontainer">
                
            <motion.div className='phoneSvg' initial={{ opacity: 1 }} whileInView={{ opacity: 0 }} transition={{ delay: 3, duration: 1 }}>
            <svg width="100%" height="100%" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M24,44c5.343,0,10.365-2.08,14.143-5.858l-2.829-2.828C32.292,38.336,28.274,40,24,40c-8.822,0-16-7.178-16-16
                    S15.178,8,24,8s16,7.178,16,16c0,2.206-1.794,4-4,4s-4-1.794-4-4v-8h-4v1.079C26.822,16.397,25.459,16,24,16c-4.418,0-8,3.582-8,8
                    s3.582,8,8,8c2.394,0,4.536-1.057,6.003-2.723C31.47,30.942,33.611,32,36,32c4.411,0,8-3.589,8-8c0-11.028-8.972-20-20-20
                    S4,12.972,4,24S12.972,44,24,44z M24,28c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S26.206,28,24,28z"
                    fill="none"
                    ref={ref}
                    initial={{ pathLength: 0 }}
                    animate={isInView && { pathLength: 1 }}
                    transition={{ duration: 3 }}
                />
            </svg>
        </motion.div>



                <motion.form action="" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 4, duration: 1 }}>
                    <input type="text" name="" id="" placeholder='Name' required />
                    <input type="email" name="" id="" placeholder='Email' required />
                    <textarea name="" id="" rows="8" placeholder='Message'></textarea>
                    <button>Submit</button>
                </motion.form>
            </motion.div>
        </motion.div>
    )
}

export default Contact