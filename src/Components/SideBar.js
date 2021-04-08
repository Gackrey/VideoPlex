import React from 'react';
import {
    faBook,
    faClock,
    faHistory,
    faHome,
    faIndent,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom'
const SideBar = () => {
    return (
        <div className="sidebar">
            <NavLink
                end
                to="/"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faHome} className='logo' /><span>Home</span></div>
            </NavLink>
            <NavLink
                end
                to="/library"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faBook} className='logo' /><span>Library</span></div>
            </NavLink>
            <NavLink
                to="/history"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faHistory} className='logo' /><span>History</span></div>
            </NavLink>
            <NavLink
                to="/watch-later"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faClock} className='logo' /><span>Watch Later</span></div>
            </NavLink>
            <NavLink
                to="/liked"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faThumbsUp} className='logo' /><span>Liked Videos</span></div>
            </NavLink>
            <NavLink
                to="/playlist"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faIndent} className='logo' /><span>PlayList</span></div>
            </NavLink>
        </div>
    );
}

export default SideBar;