import React from 'react'
import { Button, Col, Container, Row, Table } from 'reactstrap'

const RecipientList = (props) => {
    return (

        <Container>
            <Row>
                <Col className="text-center p-3">
                    <h1>Recipients</h1>

                    <Table responsive striped hover>

                        <thead>
                            <tr>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>E-mail</th>
                                <th>Phone Number</th>
                                <th>Account Number</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                props.recipients.map((r, i) =>
                                    <tr key={i}>
                                        <td>{r.firstName}</td>
                                        <td>{r.lastName}</td>
                                        <td>{r.email}</td>
                                        <td>{r.phoneNumber}</td>
                                        <td>{r.accountNumber}</td>

                                        <td>
                                            <Button color="danger"
                                                onClick={() => props.dialogHandler(r)}
                                            >Delete</Button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>


                    </Table>

                </Col>
            </Row>

        </Container>

    )
}

export default RecipientList