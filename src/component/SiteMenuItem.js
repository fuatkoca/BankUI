import React from 'react'
import { NavItem, NavLink } from "reactstrap";
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SiteMenuItem = props => {
    return (
        <NavItem>
            {/*using the onClick event, we are getting the name property from the previous component that is Header*/}
            <NavLink onClick={() => props.open(props.name)} tag={Link} to={props.path} className="d-flex align-items-center" >
                <FontAwesomeIcon icon="amazon-pay" />
                <span>
                    {props.name}
                </span>
            </NavLink>
        </NavItem>
    )
}

export default SiteMenuItem