import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from 'reactstrap';
import { toastError } from '../../util/Toast';
import client from '../service/SureBankClient';
import account from "../images/dashboard/account.png";
import deposit from "../images/dashboard/deposit.png";
import withdraw from "../images/dashboard/withdraw.png";
import transfer from "../images/dashboard/transfer.png";
import './card.css';


const CustomerDashboard = () => {
    //taking a hook that shows our bank statement
    const [statement, setStatement] = useState({});

    //taking a hook that set the date
    const [dates, setDates] = useState({});

    //here we are making a function that handles the date of our app
    const getStatement = async () => {
        try {
            const date = new Date();
            const today = moment(date).format("YYYY-MM-DD");
            const before = moment(date.setDate(date.getDate() - 14)).format("YYYY-MM-DD");
            setDates({ startDate: before, endDate: today });

            //calling the api 
            const response = await client.getCustomerStatement(before, today);
            if (response && response.status === 200) {
                setStatement(response.data);
            }
        } catch (error) {
            toastError(error);
        }
    }

    useEffect(() => {
        getStatement();
    })
    return (
        <div>
            {statement ? (
                <Row>
                    <Col lg="3" className='p-3'>
                        <Card className='card'>
                            <CardImg className='cardimg account'
                                src={account}
                            />
                            <CardBody>
                                <CardTitle className='cardtitle'>Account Number</CardTitle>
                                <CardText className='cardtext'>
                                    {statement?.account?.accountNumber ? statement.account.accountNumber : ""}
                                </CardText>
                                <CardText className='cardtext'>
                                    {statement?.account?.accountBalance ? statement.account.accountBalance + "$" : ""}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="3" className='p-3'>
                        <Card className='card'>
                            <CardImg className='cardimg deposit'
                                src={deposit}
                            />
                            <CardBody>
                                <CardTitle className='cardtitle'>Total Deposit</CardTitle>
                                <CardText>Last 15 days</CardText>
                                <CardText className='cardtext'>
                                    {statement?.totalDeposit ? statement.totalDeposit + "$" : ""}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="3" className='p-3'>
                        <Card className='card'>
                            <CardImg className='cardimg withdraw'
                                src={withdraw}
                            />
                            <CardBody>
                                <CardTitle className='cardtitle'>Total Withdraw</CardTitle>
                                <CardText>Last 15 days</CardText>
                                <CardText className='cardtext'>
                                    {statement?.totalWithdraw ? statement.totalWithdraw + "$" : ""}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="3" className='p-3'>
                        <Card className='card'>
                            <CardImg className='cardimg transfer'
                                src={transfer}
                            />
                            <CardBody>
                                <CardTitle className='cardtitle'>Total Transfer</CardTitle>
                                <CardText>Last 15 days</CardText>
                                <CardText className='cardtext'>
                                    {statement?.totalTransfer ? statement.totalTransfer + "$" : ""}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>


                </Row>
            ) : null}
        </div>
    )
}

export default CustomerDashboard