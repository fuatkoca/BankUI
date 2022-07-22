import React, { useState } from 'react'
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import client from "../service/SureBankClient";
import { toast } from "react-toastify";
import { toastError } from '../../util/Toast';
import { useNavigate, useParams } from 'react-router-dom';

//fields that requires to get registered to the bank
const initialValues = {
    firstName: "",
    lastName: "",
    ssn: "",
    dateOfBirth: "",
    email: "",
    address: "",
    phoneNumber: "",
    userName: "",
    roles: ["Customer"],
};

//making a function that contains all the form validations
const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("Please enter the First Name")
        .max(15, "Must be 15 characters"),

    lastName: Yup.string()
        .required("Please enter the Last Name")
        .max(15, "Must be 15 characters"),

    ssn: Yup.string()
        .required("Please provide SSN")
        .matches(/^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/, "SSN format must be 000-00-0000"),

    dateOfBirth: Yup.string()
        .required("Please coose your Date of Birth")
        .test(
            "dateOfBirth",
            "Please choose different date of birth. Your age must be equals or greater than 18",
            (value) => {
                return moment().diff(moment(value), "years") >= 18;
            }
        ),
    email: Yup.string()
        .required("Please enter the Email")
        .email("Please provide a valid email"),

    address: Yup.string()
        .required("Please enter the Address")
        .max(200, "Maximum characters are 200")
        .min(5, "Must be 5 characters"),

    phoneNumber: Yup.string()
        .required("Please provide Phone Number")
        .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Phone Number must be 000-000-0000"),


})

const UserEdit = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

    function changeHandler(e) {
        setDate(e.target.value);
    }


    async function getUser(id) {
        try {
            const response = await client.getUser(id);
            if (response && response.status === 200) {
                const dateStr = response.data.dateOfBirth;
                const date = moment(dateStr).format("YYYY-MM-DD");
                setDate(date);
                setUser(response.data);
            }
        } catch (error) {
            toastError(error);
        }
    }

    const UserForm = (props) => {
        return (
            <Container>
                <fieldset>
                    <legend>User Edit</legend>
                    <Form>
                        <Row className="justify-content-start">
                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label for="firstName"> First Name</Label>
                                    <Input
                                        tag={Field}
                                        name="firstName"
                                        type="text"
                                        invalid={props.errors.firstName && props.touched.firstName}
                                    />

                                    <FormFeedback>{props.errors.firstName}</FormFeedback>
                                </FormGroup>
                            </Col>

                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label for="lastName"> Last Name</Label>
                                    <Input
                                        tag={Field}
                                        name="lastName"
                                        type="text"
                                        invalid={props.errors.lastName && props.touched.lastName}
                                    />

                                    <FormFeedback>{props.errors.lastName}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="justify-content-start">
                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label for="ssn">SSN</Label>
                                    <Input
                                        tag={Field}
                                        name="ssn"
                                        type="text"
                                        invalid={props.errors.ssn && props.touched.ssn}
                                    />

                                    <FormFeedback>{props.errors.ssn}</FormFeedback>
                                </FormGroup>
                            </Col>

                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label for="phoneNumber"> Phone Number</Label>
                                    <Input
                                        tag={Field}
                                        name="phoneNumber"
                                        type="text"
                                        invalid={
                                            props.errors.phoneNumber && props.touched.phoneNumber
                                        }
                                    />

                                    <FormFeedback>{props.errors.phoneNumber}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="justify-content-start">
                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label for="dateOfBirth">Date of Birth</Label>
                                    <Input
                                        tag={Field}
                                        name="dateOfBirth"
                                        type="date"
                                        value={date}
                                        onChange={changeHandler}
                                        invalid={
                                            props.errors.dateOfBirth && props.touched.dateOfBirth
                                        }
                                    />

                                    <FormFeedback>{props.errors.dateOfBirth}</FormFeedback>
                                </FormGroup>
                            </Col>

                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        tag={Field}
                                        name="email"
                                        type="email"
                                        invalid={props.errors.email && props.touched.email}
                                    />

                                    <FormFeedback>{props.errors.email}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="justify-content-start">
                            <Col lg="6" className="text-center p-3">
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        tag={Field}
                                        name="address"
                                        component="textarea"
                                        rows="2"
                                        invalid={props.errors.address && props.touched.address}
                                    />

                                    <FormFeedback>{props.errors.address}</FormFeedback>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="justify-content-start">
                            <Col lg="3" className="text-center p-3">
                                <FormGroup>
                                    <Label>Roles</Label>
                                    <Input
                                        tag={Field}
                                        multiple
                                        component="select"
                                        type="text"
                                        name="roles"
                                        invalid={props.errors.userName && props.touched.userName}
                                    >
                                        <option value="Customer">Customer</option>
                                        <option value="Admin">Admin</option>
                                    </Input>
                                </FormGroup>
                            </Col>

                            <Col lg="3" className="text-center p-3">
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>User Name</Label>
                                            <Input tag={Field} disabled type="text" name="userName" />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="p-3">
                                        <FormGroup>
                                            <Label>Enabled</Label>
                                            <Input tag={Field} type="checkbox" name="enabled" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6" className="text-center p-3">
                                <Button color="primary" onClick={props.submitForm}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                        <Row className="justify-content-start">
                            {props.isSubmitting && <Spinner> </Spinner>}
                        </Row>
                    </Form>
                </fieldset>
            </Container>
        );
    };

    const submitForm = async (values, action) => {
        try {
            const strDate = moment(date).format("YYYY-MM-DD").toString();
            values.dateOfBirth = strDate;
            const response = await client.updateUser(id, values);
            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                });
                navigate(-1);
                action.resetForm();
            }
        } catch (error) {
            toastError(error);
        }

        action.setSubmitting(false);
    };

    return (
        <div>
            <Formik
                initialValues={user || initialValues}
                validationSchema={validationSchema}
                onSubmit={submitForm}
                component={UserForm}
                enableReinitialize
            ></Formik>
        </div>
    );
};

export default UserEdit;
