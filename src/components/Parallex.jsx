import React, { useRef } from "react";
import "../styles/parallex.scss";
import planetImage from "../assets/planets.png";
import sunImage from "../assets/sun.png";
import stars from "../assets/stars-bg.png";

import { motion, useScroll, useTransform } from "framer-motion";

function Parallex({ type, heading }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "500%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="parallex"
      ref={ref}
      style={{
        background:
          type === "services"
            ? "linear-gradient(180deg, #f0fdf4, #f0fdf4)"
            : "linear-gradient(180deg,#11011d, #11011d)"
      }}
    >
      <img src={stars} alt="" />
      <motion.h1 style={{ y: yText }}>{heading}</motion.h1>
      <motion.div className="mountains"></motion.div>
      <motion.div
        className="planets"
        style={{
          x: yBg,
          backgroundImage: `url(${type === "services" ? planetImage : sunImage})`
        }}
      ></motion.div>
      <motion.div className="stars" style={{ x: yBg }}></motion.div>
    </div>
  );
}

export default Parallex;
