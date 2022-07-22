import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export const SiteMenuItem = props => (
    <NavItem >
        <NavLink onClick={() => props.open(props.name)} tag={Link} to={props.path} className="d-flex align-items-center">
            {/* <FontAwesomeIcon icon="home" /> */}
            <span style={{ color: "#FFFFFF" }}>
                {props.name}
            </span>
        </NavLink>
    </NavItem>
);
