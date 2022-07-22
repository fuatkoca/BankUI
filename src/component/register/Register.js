import React from 'react'
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import client from "../service/SureBankClient";
import { toast } from "react-toastify";
import { toastError } from '../../util/Toast';
import { useNavigate } from 'react-router-dom';


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
    password: "",
    confirmPassword: "",
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

    userName: Yup.string()
        .required("Please enter the Username")
        .max(20, "Maximum characters are 20")
        .min(5, "Must be 5 characters"),

    password: Yup.string()
        .required("Please enter password"),

    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null], "Password must be match"
    )

})

//making a function that is connecting our register API with our registration form
const submitForm = async (values, action) => {
    try {
        const response = await client.register(values);
        //making the notifications
        if (response.status === 201 && response.data.success) {
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
            });

            action.resetForm();
        }
    } catch (err) {
        toastError(err);
    }
}

//making a custom function that is used for building the form
const RegistrationForm = (props) => (
    <Container>
        <fieldset>
            <legend><h1 className='display-3'>Register</h1></legend>
            <Form>
                <Row className="justify-content-start">
                    <Col md="6" className='text-center p-3'>
                        <FormGroup>

                            <Label for="firstName">First Name:</Label>
                            <Input tag={Field}
                                name="firstName"
                                type="text"
                                invalid={props.errors.firstName && props.touched.firstName} />
                            <FormFeedback>{props.errors.firstName}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="lastName">Last Name:</Label>
                            <Input tag={Field}
                                name="lastName"
                                type="text"
                                invalid={props.errors.lastName && props.touched.lastName} />
                            <FormFeedback>{props.errors.lastName}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="ssn">SSN:</Label>
                            <Input tag={Field}
                                name="ssn"
                                type="text"
                                invalid={props.errors.ssn && props.touched.ssn} />
                            <FormFeedback>{props.errors.ssn}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number:</Label>
                            <Input tag={Field}
                                name="phoneNumber"
                                type="text"
                                invalid={props.errors.phoneNumber && props.touched.phoneNumber} />
                            <FormFeedback>{props.errors.phoneNumber}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="dateOfBirth">Date Of Birth:</Label>
                            <Input tag={Field}
                                name="dateOfBirth"
                                type="date"
                                invalid={props.errors.dateOfBirth && props.touched.dateOfBirth} />
                            <FormFeedback>{props.errors.dateOfBirth}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input tag={Field}
                                name="email"
                                type="email"
                                invalid={props.errors.email && props.touched.email} />
                            <FormFeedback>{props.errors.email}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="address">Address:</Label>
                            <Input tag={Field}
                                name="address"
                                type="text"
                                invalid={props.errors.address && props.touched.address} />
                            <FormFeedback>{props.errors.address}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="userName">Username:</Label>
                            <Input tag={Field}
                                name="userName"
                                type="text"
                                invalid={props.errors.userName && props.touched.userName} />
                            <FormFeedback>{props.errors.userName}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input tag={Field}
                                name="password"
                                type="password"
                                invalid={props.errors.password && props.touched.password} />
                            <FormFeedback>{props.errors.password}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="6" className='text-center p-3'>
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password:</Label>
                            <Input tag={Field}
                                name="confirmPassword"
                                type="password"
                                invalid={props.errors.confirmPassword && props.touched.confirmPassword} />
                            <FormFeedback>{props.errors.confirmPassword}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md="6" className='text-center p-3'>
                        <Button
                            onClick={props.submitForm}
                            color='primary'>Register</Button>
                    </Col>
                </Row>
                <Row className='justify-content-start'>
                    {props.isSubmitting && <Spinner></Spinner>}
                </Row>
            </Form>
        </fieldset>
    </Container>
)
const Register = () => {
    //working on redirecting after the registration
    const navigate = useNavigate();
    navigate("/");
    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={submitForm}
                component={RegistrationForm}
                validationSchema={validationSchema}
            >

            </Formik>
        </div>
    )
}

export default Register