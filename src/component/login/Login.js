import React, { useContext } from 'react'
import { Button, Col, Container, Form, FormFeedback, FormGroup, Input, InputGroup, InputGroupText, Label, Row } from 'reactstrap';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUserLock } from '@fortawesome/free-solid-svg-icons';
import client from "../service/SureBankClient";
import { toast } from "react-toastify";
import { toastError } from '../../util/Toast';
import { useNavigate } from 'react-router-dom';
import { DispatchContext, StateContext } from '../../App';

//fields that requires to get registered to the bank
const initialValues = {
    userName: "",
    password: ""
};

//making a function that contains all the form validations
const LoginSchema = Yup.object().shape({
    userName: Yup.string()
        .required("Please enter the Username")
        .max(20, "Maximum characters are 20")
        .min(5, "Must be 5 characters"),
    password: Yup.string()
        .required("Please enter password")
})


//making a custom function that is used for building the form
const LoginForm = (props) => (
    <Container>
        <fieldset>
            <legend><h1 className='display-3'>Login</h1></legend>
            <Form>
                <Row className="justify-content-start">
                    <Col md="6" className='text-center p-3'>

                        <InputGroup>
                            <InputGroupText>
                                <FontAwesomeIcon icon={faUserCircle} />
                            </InputGroupText>

                            <Input tag={Field}
                                placeholder="Enter Username"
                                name="userName"
                                type="text"
                                invalid={props.errors.userName && props.touched.userName} />
                            <FormFeedback>{props.errors.userName}</FormFeedback>
                        </InputGroup>
                    </Col>
                    <Col md="6" className='text-center p-3'>
                        <InputGroup>
                            <InputGroupText>
                                <FontAwesomeIcon icon={faUserLock} />
                            </InputGroupText>
                            <Input tag={Field}
                                placeholder="Enter Password"
                                name="password"
                                type="password"
                                invalid={props.errors.password && props.touched.password} />
                            <FormFeedback>{props.errors.password}</FormFeedback>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" className='text-center p-3'>
                        <Button
                            onClick={props.submitForm}
                            color='primary'>Login</Button>
                    </Col>
                </Row>
            </Form>
        </fieldset>
    </Container>
)
const Login = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const navigate = useNavigate();

    if (state?.userInfo?.userName) {
        navigate("/");
    }


    //making a function that is connecting our register API with our registration form
    const submitForm = async (values, actions) => {
        try {
            const response = await client.login(values);
            //making the notifications
            if (response && response.status === 200) {
                //getting the token and sending our reponse in token
                const jwt = response.data;
                sessionStorage.setItem("token", JSON.stringify({ token: jwt.token }));
                toast.success("You logged in successfully");
                console.log("logged in successfully")

                //getting the userInfo api
                const userInfoResponse = await client.getUserInfo();
                //if the data in the backend API is working then return us success status
                if (userInfoResponse && userInfoResponse.status === 200) {
                    //here, we are getting the data from API and saving it into userInfo variable
                    const userInfo = userInfoResponse.data;
                    //here we are calling our case of LOGIN from the userReducer file
                    dispatch({
                        type: "LOGIN",
                        item: userInfo.user,
                    });
                    /*check that if we get the userInfo API and LOGIN action then 
                    redirect the user to home page. Otherwise hold the user on login page
                    */
                    if (userInfo && userInfo.user) {
                        navigate("/");
                    } else {
                        navigate("/login");
                    }
                }
            }
            actions.resetForm();
        } catch (err) {
            toastError(err);
        }
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                component={LoginForm}
                LoginSchema={LoginSchema}
                onSubmit={(values, actions) => {
                    submitForm(values, actions);
                }}
            >
            </Formik>
        </div>
    )
}

export default Login