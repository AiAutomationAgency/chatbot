import { motion } from "framer-motion";

const Dot = ({ delay }) => {
  return (
    <motion.span
      style={{
        display: "inline-block",
        width: "4px",
        height: "4px",
        backgroundColor: "#202123",
        borderRadius: "50%",
        margin: "0 2px",
      }}
      animate={{
        y: ["0%", "-50%", "0%"],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.3,
        delay: delay,
      }}
    />
  );
};

export default Dot;
