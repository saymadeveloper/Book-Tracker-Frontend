import React from "react";
import { useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../asset/AssetHelper";

export default function Navbar(props) {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
    };
    const handleSignUp = () => {
        history.push("/signup");
    };
    const handleLogin = () => {
        history.push("/");
    };
    const navigateMyBook = () => {
        history.push("/my-book"); 
    }
    const navigateMyFavoriteBook = () => {
        history.push("/my-favorite-books"); 
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="navbar-brand d-flex">
                <div className="home-logo-space"><SVG src={toAbsoluteUrl("/images/logo.svg")} /></div>
                <div className="logo-title">Book Tracker</div>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                {
                            props.isLoggedIn ?
                                <li class="nav-item">
                                    <button class="border-0 bg-none nav-link" onClick={navigateMyBook}>My Books</button>
                                </li>
                                : ""
                        }
                        {
                            props.isLoggedIn ?
                                <li class="nav-item">
                                    <button class="border-0 bg-none nav-link" onClick={navigateMyFavoriteBook}>Favorites</button>
                                </li>
                                : ""
                        }
                </ul>
                <div class="form-inline mx-2 mx-lg-0">
                    <ul class="navbar-nav mr-auto">
                        {
                            !props.isLoggedIn ?

                                <li class="nav-item">
                                    <button class="border-0 bg-none nav-link" onClick={handleLogin}>Login</button>
                                </li>
                                : ""
                        }
                        {
                            !props.isLoggedIn ?
                                <li class="nav-item">
                                    <button class="border-0 bg-none nav-link" onClick={handleSignUp}>Sign up</button>
                                </li>
                                : ""
                        }
                        {
                            props.isLoggedIn ?
                                <li class="nav-item">
                                    <button class="border-0 bg-none nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                                : ""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}