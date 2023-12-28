import React, { useState } from "react";
import "./navbar.css";
import { useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logoFull from "../../assets/images/images/Graday logo.png";
import logoHead from "../../assets/images/images/logoimg only.png";
import pic from "../../assets/images/images/login-img-1.png";
import i1 from "../../assets/icons/home.png";
import i2 from "../../assets/icons/web.png";
import i3 from "../../assets/icons/comment.png";
import i4 from "../../assets/icons/letter.png";
import i5 from "../../assets/icons/static.png";
import i6 from "../../assets/icons/setting.png";
import { Link } from "react-router-dom";
import HelpIcon from "@mui/icons-material/Help";

const Navbar = ({ progress, isQuize }) => {
  const matches = useMediaQuery("(max-width:1000px)");
  const [isOpen, setIsOpen] = useState(false);

  // const { length } = useSelector((state) => state.quize)
  // const { user } = useSelector((state) => state.auth)

  const user = { username: "taha" };
  const prog = 0;

  // const [prog, setProg] = useState(progress)

  // useEffect(() => {
  //     let isMounted = true;
  //     if (isMounted) {
  //         const pro = Number(progress) * (99 / length)
  //         setProg(pro);
  //     }
  //     return () => {
  //         isMounted = false;
  //     }
  // }, [length, progress]);
  console.log(matches);

  return (
    <div className="main-navbar-navbar-updated">
      <div className="navbar-navbar-updated">
        <Link to={"/home"}>
          <div className="logo-navbar-updated">
            <img src={logoFull} alt="" className="web-navbar-updated" />
            <img src={logoHead} alt="" className="mob-navbar-updated" />
          </div>
        </Link>

        {!isQuize && (
          <div className="search-navbar-updated">
            <input type="text" className="search-bar-navbar-updated" />
            <SearchIcon className="search-icon-navbar-updated" />
          </div>
        )}

        {!matches ? (
          <div className="right-navbar-updated">
            <div className="icons-navbar-updated">
              {/* <FlagDown isMobile={false} /> */}
              {isQuize && <HelpIcon className="search-icon-navbar-updated" />}
            </div>
            <Link to={"/profile"} className="profile-icons-navbar-updated">
              <img
                src={user.image ? user.image : pic}
                alt=""
                className="profile-img-navbar-updated"
              />
              <span className="username-navbar-updated">{user.username}</span>
            </Link>
          </div>
        ) : (
          <div className="right-navbar-updated-two">
            {!isOpen && (
              <MenuIcon
                className="first"
                style={{ fontSize: "2.5rem" }}
                onClick={() => setIsOpen((prev) => !prev)}
              />
            )}
          </div>
        )}

        {progress && (
          <div
            className="progress-bar"
            style={{
              width: `${prog}%`,
              background:
                "radial-gradient(circle at 10% 20%, rgb(111, 111, 219) 0%, rgb(182, 109, 246) 72.4%)",
            }}
          ></div>
        )}
      </div>
      <div
        className={
          isOpen
            ? "burger-menu-navbar-updated"
            : "burger-menu-navbar-updated close"
        }
      >
        {isOpen && (
          <CloseIcon
            className="first"
            style={{
              fontSize: "2.5rem",
              position: "fixed",
              top: "40px",
              right: "40px",
            }}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        )}

        <ul className="burger-menu-nav-ul">
          <Link
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li>
              {/* <FlagDown isMobile={true} /> */}
              <span className="text-navbar-updated">Language</span>
            </li>
          </Link>
          <Link
            to={"/home"}
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li className="item active">
              <img src={i1} alt="" className="ic-navbar-updated" />
              <span className="text-navbar-updated">Dashboard</span>
            </li>
          </Link>
          <Link
            to={"/profile"}
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li>
              <img
                src={i3}
                alt=""
                className="ic-navbar-updated"
                style={{ color: "blue" }}
              />
              <span className="text-navbar-updated">Profile</span>
            </li>
          </Link>
          <Link
            to={"/articles"}
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li>
              <img src={i4} alt="" className="ic-navbar-updated" />
              <span className="text-navbar-updated">Articles</span>
            </li>
          </Link>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li
              onClickCapture={(e) => {
                localStorage.clear();
                window.location.replace("/login");
              }}
            >
              <img src={i5} alt="" className="ic-navbar-updated" />
              <span className="text-navbar-updated">Logout</span>
            </li>
          </Link>
          <Link
            to={"/results"}
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li>
              <img src={i6} alt="" className="ic-navbar-updated" />
              <span className="text-navbar-updated">Results</span>
            </li>
          </Link>
          <Link
            to={"/home"}
            style={{ textDecoration: "none", color: "black" }}
            className="item-navbar-updated "
          >
            <li>
              <img src={i2} alt="" className="ic-navbar-updated" />
              <span className="text-navbar-updated">Help</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
