import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Col, Container, Row, Table } from 'reactstrap';
import client from '../service/SureBankClient';
import { toastError } from '../../util/Toast';

const ContactMessageList = () => {
    const [messageList, setMessageList] = useState([]);


    async function getMessageList() {
        try {
            const messageResponse = await client.getMessages();
            if (messageResponse && messageResponse.status === 200) {
                const messages = messageResponse.data;
                setMessageList(messages);
            }

        } catch (error) {
            toastError(error);
        }
    }

    useEffect(() => {
        getMessageList();
    }, [])

    return (
        <Container>
            <Row>
                <Col className="text-center p-3">
                    <h1>Customers Messages</h1>
                    {
                        messageList && messageList.length > 0 ? (
                            <Table responsive striped hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Subject</th>
                                        <th>Body</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messageList.map((m, i) => (
                                        <tr key={i}>
                                            <td>{m.name}</td>
                                            <td>{m.email}</td>
                                            <td>{m.phoneNumber}</td>
                                            <td>{m.subject}</td>
                                            <td>{m.body}</td>
                                        </tr>
                                    ))}
                                </tbody>

                            </Table>
                        ) : (<p>Message List Empty</p>)

                    }
                </Col>
            </Row>
        </Container>
    )
}

export default ContactMessageList