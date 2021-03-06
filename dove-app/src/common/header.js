import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {THE_APP_NAME} from "../const";
import './header.css';
import project_dove_logo from "../project-dove-logo.jpg";
import Login from "./login";

// Edited by Xiao Lin
// The header will show our logo and branding on the left, and show the tabs on the right
class AppHeader extends Component {
    render() {
        return (
            <header className="App-header">
                <div className="App-header-left">
                    <img src={project_dove_logo} className="Project-logo" alt="project_dove_logo" width={70} length={70}/>
                    <div className="app-branding">
                        <Link to="/" className="app-title">{THE_APP_NAME}</Link>
                    </div>
                </div>
                <div className="App-header-right">
                    <div className="app-options">
                        <nav className="app-nav">
                            <ul>
                                <li>
                                    <NavLink to="/add">Add Store</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/store">Store List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/proxi">Proximity</NavLink>
                                </li>
                                <li className="Login">
                                     <Login />
                                </li>
                                <li>
                                    <a
                                        className="App-link"
                                        href="https://github.com/cooper-ece-366/will-xiao-jaewon"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        About
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;