import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import client from '../service/SureBankClient';
import { toastError } from '../../util/Toast';
import './card.css'
import account from '../images/dashboard/account.png'

import TransactionList from '../transaction/TransactionList';
import { useContext } from 'react';
import { hasAnyRole } from '../../util/Util';
import { StateContext } from '../../App';

const AdminDashboard = () => {
    const [statement, setStatement] = useState({});
    const [dates, setDates] = useState({});

    const state = useContext(StateContext);

    let isAdmin = false;
    debugger;

    if (state && state.userInfo && state.userInfo.userName) {
        isAdmin = hasAnyRole(state.userInfo.roles, ["Admin"]);
    }

    const getStatement = async () => {
        try {
            const date = new Date();
            const today = moment(date).format("YYYY-MM-DD");
            const before = moment(date.setDate(date.getDate() - 14)).format("YYYY-MM-DD");

            setDates({ startDate: before, endDate: today });

            const response = await client.getBankStatement(before, today);
            if (response && response.status === 200) {
                setStatement(response.data);
            }
        } catch (error) {
            toastError(error);
        }
    }

    useEffect(() => {
        getStatement();
    }, [])



    return (
        <div>
            {statement ? (
                <Container>
                    <fieldset>
                        <Row>
                            <Col lg="3" className="p-3">
                                <Card className="card">
                                    <CardImg
                                        className="cardimg account"
                                        src={account}
                                        alt="bank balance"
                                    />
                                    <CardBody>
                                        <CardTitle className="cardtitle">BANK TOTAL BALANCE</CardTitle>
                                        <CardText className="cardtext">
                                            {statement?.totalBalance ? statement.totalBalance + "$" : ""}
                                        </CardText>
                                    </CardBody>

                                </Card>
                            </Col>

                        </Row>

                    </fieldset>

                    <Row>
                        <Col>
                            <TransactionList isAdmin={isAdmin} dates={dates} transactions={statement.list} />
                        </Col>
                    </Row>

                </Container>
            ) : null}
        </div>
    )
}

export default AdminDashboard