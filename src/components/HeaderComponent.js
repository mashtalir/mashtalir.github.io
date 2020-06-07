import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.withCredentials = true


class Header extends Component {
    handleSubmit(event) {
        event.preventDefault();
        console.log(document.cookie);
        alert(Object.keys(sessionStorage))
        axios.post('http://127.0.0.1:8000/log-out/', {
            credentials: 'same-origin'
        },
        ).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error)
        }
        );
    }


    render() {
        return (
            <header>
                <nav class="navbar navbar-expand-lg">
                    <NavLink className="navbar-brand" to="/home" >MashMusic</NavLink>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="line"></span>
                        <span class="line"></span>
                        <span class="line"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav mr-auto ml-5">
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/library" >Playlists</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/profile" >Profile</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/contactus" >Contacts</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/login" >Login</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" to="/registration">Register</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink className="nav-link" onClick={this.handleSubmit} to="/login">Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;