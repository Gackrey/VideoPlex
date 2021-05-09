import React, { useEffect, useState } from 'react';
import play from '../Img/play.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthProvider'
import { useNavigate } from 'react-router'
import { useVideoContext } from '../Context/VideoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  const navigate = useNavigate()
  const { isUserLogin } = useAuth()
  const [searchContent, setSearchContent] = useState('')
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const localtheme = localStorage?.getItem('theme')
    if (localtheme === 'light') {
      setTheme('dark')
    }
    else {
      setTheme('light')
    }
  }, []);

  function themeHandler() {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark')
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
    else {
      document.documentElement.setAttribute('data-theme', 'light')
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }
  function searchHandler(e) {
    if (e.keyCode === 13 && searchContent !== "") {
      navigate(`/search?query=${searchContent}`)
      setSearchContent('')
    }
  }
  function btnsearchHandler() {
    if (searchContent !== "") {
      navigate(`/search?query=${searchContent}`)
      setSearchContent('')
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
        {window.innerWidth >= 610 ? (
          <div className="Search">
            <input
              type="text"
              placeholder="Search"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              onKeyDown={searchHandler}
            ></input>
            <button
              onClick={btnsearchHandler}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 17 18"
                className=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#2874F1" fillRule="evenodd">
                  <path
                    className="_34RNph"
                    d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
                  ></path>
                  <path
                    className="_34RNph"
                    d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
                  ></path>
                </g>
              </svg>
            </button>
          </div>) : (
          ""
        )}
        <div className="nav-body-2">
          <div className="theme-box" onClick={themeHandler}>
            <FontAwesomeIcon
              icon={theme === 'light' ? faMoon : faSun}
              style={{ color: "var(--primary)" }}
            />
          </div>
          {isUserLogin ?
            <Link to="/userdetails" style={{ textDecoration: "none" }}>
              <div className="avatar-circleIcon">
                <span><FontAwesomeIcon icon={faUser} /></span>
              </div>
            </Link> :
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="login-btn">Login</button>
            </Link>}
        </div>
      </div>
      {window.innerWidth < 610 ? (
        <div className="Search">
          <input
            type="text"
            placeholder="Search"
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
          ></input>
          <button
            onClick={btnsearchHandler}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 17 18"
              className=""
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#2874F1" fillRule="evenodd">
                <path
                  className="_34RNph"
                  d="m11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"
                ></path>
                <path
                  className="_34RNph"
                  d="m6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
