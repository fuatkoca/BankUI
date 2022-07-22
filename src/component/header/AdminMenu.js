import React from 'react'
import { Link } from 'react-router-dom'
import { DropdownItem } from 'reactstrap'
import { NavDropdown } from './MenuComponent'

const AdminMenu = () => {
    return (
        <NavDropdown

            name="Actions (Admin)"
            style={{ maxHeight: "80vh", overflow: "auto" }}
        >

            <DropdownItem
                tag={Link}
                to="/admin-dashboard"
            >
                Dashboard
            </DropdownItem>

            <DropdownItem
                tag={Link}
                to="/alltransactions"
                state={{ isAdmin: true }}
            >
                Transaction Query
            </DropdownItem>

            <DropdownItem
                tag={Link}
                to="/users-management"
            >
                User Managment
            </DropdownItem>

            <DropdownItem
                tag={Link}
                to="/messages"
            >
                Messages
            </DropdownItem>

        </NavDropdown>
    )
}

export default AdminMenu