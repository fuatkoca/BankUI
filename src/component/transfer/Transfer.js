import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import client from '../service/SureBankClient';
import { toast } from "react-toastify";
import { toastError } from '../../util/Toast';

const TransferSchema = Yup.object().shape({
    recipientNumber: Yup.number().required("Please provide a recipient"),
    amount: Yup.number().test("is-decimal", "invalid decimal", (value) =>
        (value + "").match(/^\d+(\.\d{1,2})?$/)
    ),
    comment: Yup.string().required("Please provide a comment")
});

const Transfer = () => {
    //making hook for getting all the recipients 
    const [recipients, setRecipients] = useState([]);

    async function getRecipients() {
        try {
            const response = await client.getRecipients();
            if (response && response.status === 200) {
                //getting the response data
                const data = response.data;
                setRecipients(data.recipients);
            }
        } catch (error) {
            toastError(error);
        }
    }

    useEffect(() => {
        getRecipients();
    }, []);

    const TransferForm = (props) => (
        <Container style={{ marginTop: '100px' }}>
            <Form>
                <h1>Transfer Amount</h1>
                <Row className='justify-content-center'>
                    <Col md="4" className='P-3'>
                        <FormGroup>
                            <Label>Recipients List</Label>
                            <Input
                                name="recipientNumber"
                                type="select"
                                tag={Field}
                                component="select"
                                invalid={props.errors.recipientNumber && props.touched.recipientNumber}
                            >
                                <option value="" key="0" />
                                {
                                    recipients &&
                                    recipients.map((r) => (
                                        <option value={r.accountNumber} key={r.id}>
                                            {" "}
                                            {r.firstName + " " + r.lastName + " " + r.accountNumber}
                                        </option>
                                    ))
                                }
                            </Input>
                            <FormFeedback>{props.errors.recipientNumber}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md="4" className='P-3'>
                        <FormGroup>
                            <Label>Enter Amount:</Label>
                            <Input
                                type="text"
                                name="amount"
                                tag={Field}
                                invalid={props.errors.amount && props.touched.amount} />
                            <FormFeedback>{props.errors.amount}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="4" className='P-3'>
                        <FormGroup>
                            <Label>Comment:</Label>
                            <Input
                                type="text"
                                name="comment"
                                tag={Field}
                                invalid={props.errors.comment && props.touched.comment} />
                            <FormFeedback>{props.errors.comment}</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md="4" className='p-3 mt-3'>
                        <Button
                            color="primary"
                            disabled={props.isSubmitting}
                            onClick={props.submitForm}
                        >Deposit Amount</Button>
                    </Col>
                </Row>
                <Row className='text-align-center'>
                    <Col className='text-center'>
                        {props.isSubmitting && <Spinner></Spinner>}
                    </Col>
                </Row>
            </Form>
        </Container>
    )
    return (
        <div>
            <Formik
                initialValues={{ recipientNumber: "", amount: "", comment: "" }}
                validationSchema={TransferSchema}
                component={TransferForm}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await client.transfer(values);
                        if (response && response.status === 201) {

                            toast.success(response.data.message, {
                                position: toast.POSITION.TOP_CENTER,
                            });
                            actions.resetForm();
                        }
                    } catch (error) {
                        toast.error("Transfered Failed!");
                    }
                }}
            >

            </Formik>
        </div>
    )
}

export default Transfer