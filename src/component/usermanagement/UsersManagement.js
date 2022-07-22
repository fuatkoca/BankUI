import React, { useEffect, useState } from 'react'
import { itemsCountPerPage as itemCount } from '../service/SureBankClient';
import client from '../service/SureBankClient';
import { toastError } from '../../util/Toast';
import { Button, Col, Container, Input, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import Pagination from 'react-js-pagination';

const UsersManagement = () => {
    const [usersData, setUsersData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(itemCount);
    const [totalItemsCount, setTotalItemsCount] = useState({});
    const [activePage, setActivePage] = useState(0);

    async function getUsersData(activePage) {
        try {
            const usersDataResponse = await client.getAllUsers(activePage);
            if (usersDataResponse && usersDataResponse.status === 200) {
                const usersData = usersDataResponse.data.content;
                //now passing the response data to the hooks
                setUsersData(usersData);
                setTotalPage(usersDataResponse.data.totalPage);
                setTotalItemsCount(usersDataResponse.data.totalElements);
                setItemsCountPerPage(usersDataResponse.data.size);
            }
        } catch (error) {
            toastError(error);
        }
    }

    //this will show data on first page
    useEffect(() => {
        getUsersData(activePage);
    }, [])

    //this will show data on other pages except first page
    useEffect(() => {
        getUsersData(activePage);
    }, [activePage])

    //function handles the logic of pagination
    function handlePageChange(pageNumber) {
        setActivePage(pageNumber - 1);
        getUsersData(pageNumber - 1);
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col className='text-center p-3'>
                        <h1> All Users</h1>
                        {
                            usersData && usersData.length > 0 ? (
                                <Table>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>SSN</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Roles</th>
                                        <th>Enabled</th>
                                    </tr>

                                    {
                                        usersData.map((user, i) => (
                                            <tr key={i}>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.ssn}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phoneNumber}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    {
                                                        user.roles.map((role, i) => i === user.roles.length - 1 ? role : role + " , ")
                                                    }
                                                </td>
                                                <td>
                                                    <Input type="checkbox" checked={user.enabled} />
                                                    <td><Link to={`/user-edit/${user.id}`} ><Button color="warning">Edit User</Button></Link></td>
                                                </td>
                                            </tr>

                                        ))
                                    }
                                </Table>

                            ) : (
                                <p>User List is Empty</p>
                            )
                        }
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center p-3'>
                        <Pagination
                            activePage={activePage + 1}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            totalPages={totalPage}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default UsersManagement