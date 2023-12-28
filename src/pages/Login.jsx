import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import logo from "../assets/images/logo__.png";
import "../assets/css/login.css";
import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  // Define a function to handle toggling the showPassword state
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const obj = { username, password };
      await login(obj);
      navigate("/projects");
    } else {
      alert("all fields required!");
    }
  };

  let content;

  if (token) {
    content = <Navigate to={"/projects"} state={{ from: location }} replace />;
  } else {
    content = (
      <div className="login-page-container">
        <div className="login-container">
          <motion.div
            initial={{ flex: 1, width: "100%" }} // Initial state (hidden)
            animate={{ flex: 0.3 }} // Animate to this state (visible)
            transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }} // Animation duration
            className="login-logo-container"
          >
            <motion.img
              initial={{ scale: 3 }} // Initial state (hidden)
              animate={{ scale: 1 }} // Animate to this state (visible)
              transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }} // Animation duration
              src={logo}
              alt=""
              className="login-logo"
            />
          </motion.div>
          <motion.div
            initial={{ flex: 0, width: 0 }} // Initial state (hidden)
            animate={{ flex: 0.7, width: "100%" }} // Animate to this state (visible)
            transition={{ duration: 0.5, delay: 0.6 }} // Animation duration
            className="login-form-container"
          >
            <motion.form
              onSubmit={SubmitHandler}
              initial={{ opacity: 0 }} // Initial state (hidden)
              animate={{ opacity: 1 }} // Animate to this state (visible)
              transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }} // Animation duration
              className="login-form-flex"
            >
              <AccountCircleOutlinedIcon
                sx={{ fontSize: "4rem", color: "#343e8b" }}
                className="icon-login"
              />
              <p className="lf-text">{t("SIGN IN")}</p>
              {/* {responseError && <p className="lf-text-error"><ErrorOutlineOutlinedIcon sx={{ color: "red" }} />{responseError}</p>} */}
              {/* {responseSuccess && <p className="lf-text-success"><CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />{responseSuccess}</p>} */}
              <TextField
                label={t("Username")}
                variant="outlined"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ opacity: 0, visibility: "hidden" }}
                        edge="end"
                      >
                        <VisibilityOff
                          sx={{ opacity: 0, visibility: "hidden" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label={t("Password")}
                variant="outlined"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  color: "#343e8b",
                  borderColor: "#343e8b",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  letterSpacing: ".2rem",
                  ":hover": {
                    color: "#f9f1fe",
                    bgcolor: "#343e8b",
                    scale: "1.1",
                  },
                  transition: "all .3s ease",
                }}
              >
                {t("Login")}
              </Button>
              <Link to={""} style={{ color: "#343e8b" }}>
                {t("Forgot password ?")}
              </Link>
            </motion.form>
          </motion.div>
        </div>
        <div className="copyright">
          &copy; 2023 GloboPeople. All rights reserved.
        </div>
      </div>
    );
  }
  return content;
};

export default Login;
