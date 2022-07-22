import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap'
import { DispatchContext } from '../../App'

const Logout = () => {

    const dispatch = useContext(DispatchContext);
    const navigate = useNavigate();

    const handleYes = () => {
        //clearing the token
        sessionStorage.clear("token");
        dispatch({
            type: "LOGOUT",
            item: null,
        });
        //redirecting to login page
        navigate("/login")
    }

    const handleNo = () => {
        navigate(-1);
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h1>Do you really want to logout?</h1>
                        <Button onClick={handleYes} color="primary" style={{ marginRight: '20px' }}>Yes</Button>
                        <Button onClick={handleNo} color="danger">No</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Logout