import { motion } from "framer-motion";
import loadingIcon from "../../public/favicon__.ico";

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh", // Full view height
  fontSize: "2rem",

  width: "100vw", // Set width to 100% of the viewport width
  overflow: "hidden", // Prevent scrolling
  margin: 0,
  position: "fixed", // Fix position to the viewport
  top: 0,
  left: 0,
};

const Loading = () => (
  <motion.div
    style={loadingStyle}
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity }}
  >
    <img
      src={loadingIcon}
      alt="Loading"
      style={{ width: "50px", height: "50px" }}
    />
  </motion.div>
);

export default Loading;
