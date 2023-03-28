import React, { Component } from "react";
import Logo from '../logo.svg';
import "../css/style.css";

class Header extends Component {
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <nav className="navbar navbar-light animated fadeIn" role="navigation" style={{ backgroundImage: "linear-gradient(to right, #009FE3, #00CADD)" }}>
                <a className="navbar-brand regular" style={{ marginLeft: "17%", color: "white" }} href="/">
                    <img src={Logo} alt="eBRÁNA logo" width="70px" height="50px" style={{ marginRight: "12%", fontSize: "24px" }} />
                    Srovnávač zboží
                </a>
            </nav>
        );
    }
}

export default Header;