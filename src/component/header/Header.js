import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import "./header.css"
import {
    Navbar, NavbarBrand, NavbarToggler,
    Collapse, Nav, NavItem, NavLink, NavbarText, Button
} from 'reactstrap'
import { useState } from 'react'
import { SiteMenuItem } from './SiteMenuItem'
import AdminMenu from './AdminMenu'
import CustomerMenu from './CustomerMenu'
import { useContext } from 'react'
import { StateContext } from '../../App'
import { hasAnyRole } from '../../util/Util'

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const state = useContext(StateContext);
    const navigate = useNavigate();

    let isCustomer;
    let isAdmin;

    if (state && state.userInfo) {
        isCustomer = hasAnyRole(state.userInfo.roles, ["Customer"]);
        isAdmin = hasAnyRole(state.userInfo.roles, ["Admin"]);
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }


    const openPage = (name) => {
        debugger;
        navigate("/" + name);
        const element = document.getElementById(name);

        if (element) {

            element.scrollIntoView({ behavior: "smooth" });
        }
    }



    return (
        <div>
            <Navbar
                light
                expand="lg"
            >
                <NavbarBrand tag={Link} to="/">
                    <img src={logo} style={{ width: 200 }} />
                </NavbarBrand>
                <NavbarToggler onClick={toggleMenu} />
                <Collapse isOpen={menuOpen} navbar>
                    <Nav
                        className="me-auto"
                        navbar
                    >
                        <SiteMenuItem open={openPage} onClick={() => navigate("/")} path="/about" name="About" />
                        <SiteMenuItem open={openPage} path="/product" name="Products" />
                        <SiteMenuItem open={openPage} path="/package" name="Packages" />
                        <SiteMenuItem open={openPage} path="/contact" name="Contact" />


                        <NavbarText>


                        </NavbarText>

                        {isAdmin ? <AdminMenu /> : null}
                        {isCustomer ? <CustomerMenu /> : null}


                    </Nav>
                    <NavbarText>
                        {state && state.userInfo && state.userInfo.userName ? (
                            <NavLink tag={Link} to="/logout">{"Logout " + state.userInfo.firstName + " " + state.userInfo.lastName}
                            </NavLink>
                        ) : (
                            <>
                                <NavLink tag={Link} to="/register">Register</NavLink>
                                <NavLink tag={Link} to="/login">Login</NavLink>
                            </>
                        )}

                    </NavbarText>
                </Collapse>
            </Navbar>


        </div>
    )
}

export default Header