import React, { Component } from "react";
import { MenuItems } from "./MenuItems"
import './Navbar.css';
import Button from 'react-bootstrap/Button'
import Identicon from 'react-identicons';
class Navbar extends Component {
    state = { clicked: false }
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">FitCrypt <i className="fab fa-react"> </i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>

                </ul>
                <Button variant="light">{this.props.account}</Button>
                <div class="divider" />

                {this.props.account
                    ? <span><Identicon string={this.props.account} size={50} bg="white" fg="transparent" /> <div class='spacer' /></span>
                    : <span></span>
                }
            </nav>
        );
    }
}

export default Navbar;