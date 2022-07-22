import React from 'react'
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import client from '../service/SureBankClient';
import { toast } from "react-toastify";

const DepositSchema = Yup.object().shape({
    amount: Yup.number().test("is-decimal", "invalid decimal", (value) =>
        (value + "").match(/^\d+(\.\d{1,2})?$/)
    ),
    comment: Yup.string().required("Please provide a comment")
});

const DepositForm = (props) => (
    <Container style={{ marginTop: '100px' }}>
        <Form>
            <Row className='justify-content-center'>
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
const Deposit = () => {
    return (
        <div>
            <Formik
                initialValues={{ amount: "", comment: "" }}
                validationSchema={DepositSchema}
                component={DepositForm}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await client.deposit(values);
                        if (response.status === 201) {
                            if (response.data.success) {
                                toast.success(response.data.message, {
                                    position: toast.POSITION.TOP_CENTER,
                                });
                            }

                            actions.resetForm();
                        }
                    } catch (error) {
                        toast.error("Deposit Failed!");
                    }

                    actions.setSubmitting(false);
                }}
            >

            </Formik>
        </div>
    )
}

export default Deposit