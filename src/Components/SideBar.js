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
import { useVideoContext } from '../Context/VideoContext';
const SideBar = () => {
    const { dispatch } = useVideoContext();
    return (
        <div className="sidebar">
            <NavLink
                end
                to="/"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element" onClick={() => dispatch({type:"REGAIN_VIDEOS"})}>
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
                    <FontAwesomeIcon icon={faHistory}/><span>History</span></div>
            </NavLink>
            <NavLink
                to="/watch-later"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faClock}/><span>Watch Later</span></div>
            </NavLink>
            <NavLink
                to="/liked"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faThumbsUp}/><span>Liked Videos</span></div>
            </NavLink>
            <NavLink
                to="/playlist"
                activeClassName="selected"
                style={{ textDecoration: "none" }}
            >
                <div className="sidebar_element">
                    <FontAwesomeIcon icon={faIndent}/><span>PlayList</span></div>
            </NavLink>
        </div>
    );
}

export default SideBar;