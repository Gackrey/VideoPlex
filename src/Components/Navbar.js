import React, { useEffect, useState } from "react";
import play from "../Img/play.png";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import searchSvg from "./svg/search.svg";
const Navbar = () => {
  const navigate = useNavigate();
  const { isUserLogin } = useAuth();
  const [searchContent, setSearchContent] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const theme = localStorage?.getItem("theme");
    if (theme) {
      setTheme(theme);
    }
  }, [theme]);

  function themeHandler() {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }
  function searchHandler(e) {
    if (e.keyCode === 13 && searchContent !== "") {
      navigate(`/search?query=${searchContent}`);
      setSearchContent("");
    }
  }
  function btnsearchHandler() {
    if (searchContent !== "") {
      navigate(`/search?query=${searchContent}`);
      setSearchContent("");
    }
  }
  return (
    <nav>
      <div className="nav-body">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img className="logo_icon" src={play} alt="" />
            <div className="logoHeading">VideoPlex</div>
          </div>
        </Link>
        <div className="Search">
          <input
            type="text"
            placeholder="Search"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            onKeyDown={searchHandler}
          ></input>
          <button onClick={btnsearchHandler}>
            <img src={searchSvg} alt="search" />
          </button>
        </div>
        <div className="nav-body-2">
          <div className="theme-box" onClick={themeHandler}>
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              style={{ color: "var(--primary)" }}
            />
          </div>
          {isUserLogin ? (
            <Link to="/userdetails" style={{ textDecoration: "none" }}>
              <div className="avatar-circleIcon">
                <span>
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
      <div className="Search-mobile">
        <input
          type="text"
          placeholder="Search"
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
        ></input>
        <button onClick={btnsearchHandler}>
          <img src={searchSvg} alt="search" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
