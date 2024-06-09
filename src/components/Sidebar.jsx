import React, { useState } from 'react';
import "../styles/sidebar.scss";
import { motion } from 'framer-motion';

export const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const variants = {
        open: {
            clipPath: "circle(1200px at 50px 50px)",
            transition: {
                type: "spring",
                stiffness: 20,
            }
        },
        closed: {
            clipPath: "circle(30px at 50px 50px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40,
            }
        }
    };

    function ToggleButton({ setOpen, open }) {
        return (
            <button onClick={() => setOpen(prevState => !prevState)}>
                {
                    open ? (
                        <motion.div>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                            </svg>
                        </motion.div>
                    ) : (
                        <motion.div>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
                            </svg>
                        </motion.div>
                    )
                }
            </button>
        );
    }

    function PagesLinks({ open }) {
        const linksVariants = {
            open: {
                transition: {
                    staggerChildren: 0.1
                }
            },
            closed: {
                transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                }
            }
        };

        const itemVariants = {
            open: {
                y: 0,
                opacity: 1,
            },
            closed: {
                y: 50,
                opacity: 0,
            }
        };

        const items = ["Homepage", "Services", "Portfolio", "Contact", "About"];

        return (
            <motion.div className='links' variants={linksVariants} initial="closed" animate={open ? "open" : "closed"}>
                {items.map((item) => (
                    <motion.a href={`/#${item}`} key={item} variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={()=>window.location.assign(`/#${item}`)}>
                        {item}
                    </motion.a>
                ))}
            </motion.div>
        );
    }

    return (
        <motion.div className='sidebar' animate={open ? "open" : "closed"}>
            <motion.div className='bg' variants={variants}>
                <PagesLinks open={open} />
            </motion.div>
            <ToggleButton setOpen={setOpen} open={open} />
        </motion.div>
    );
};
