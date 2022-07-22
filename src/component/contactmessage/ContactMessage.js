import { Field, Formik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import client from "../service/SureBankClient";
import { toastError } from "../../util/Toast";
import "./contact.css";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  subject: "",
  body: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please provide  Name")
    .max(30, "Must be max 30 characters"),

  subject: Yup.string()
    .required("Please provide subject")
    .min(5, "Must be min 5 characters")
    .max(20, "Must be max 20 characters"),

  email: Yup.string()
    .email("Please provide valid email")
    .required("Please provide email"),

  body: Yup.string()
    .required("Please provide message body")
    .min(20, "Must be max 20 characters")
    .max(200, "Must be max 200 characters"),


});

const submitForm = async (values, action) => {
  try {
    const response = await client.sendMessage(values);
    if (response.status === 201 && response.data.success) {
      toast.success(response.data.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (err) {
    toastError(err);
  }

  action.setSubmitting(false);
};

const ContactMessageForm = (props) => (
  <Container className="contact">
    <Form>
      <Row className="justify-content-start">
        <Col lg="3" className="text-center p-3">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              tag={Field}
              name="name"
              type="text"
              invalid={props.errors.name && props.touched.name}
            />

            <FormFeedback>{props.errors.name}</FormFeedback>
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

      <Row>
        <Col lg="3" className="text-center p-3">
          <FormGroup>
            <Label for="phoneNumber"> Phone Number</Label>
            <Input
              tag={Field}
              name="phoneNumber"
              type="text"
              invalid={props.errors.phoneNumber && props.touched.phoneNumber}
            />

            <FormFeedback>{props.errors.phoneNumber}</FormFeedback>
          </FormGroup>
        </Col>

        <Col lg="3" className="text-center p-3">
          <FormGroup>
            <Label for="Subject"> Subject</Label>
            <Input
              tag={Field}
              name="subject"
              type="text"
              invalid={props.errors.subject && props.touched.subject}
            />

            <FormFeedback>{props.errors.subject}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>

      <Row className="justify-content-start">
        <Col lg="6" className="text-center p-3">
          <FormGroup>
            <Label for="body">Message Body</Label>
            <Input
              tag={Field}
              name="body"
              component="textarea"
              rows="2"
              invalid={props.errors.body && props.touched.body}
            />
            <FormFeedback>{props.errors.body}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>

      <Row>
        <Col lg="6" className="text-center p-3">
          <Button onClick={props.submitForm}>Send Message</Button>
        </Col>
      </Row>

      <Row className="justify-content-start">
        {props.isSubmitting && <Spinner> </Spinner>}
      </Row>
    </Form>
  </Container>
);

const ContactMessage = () => {
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        component={ContactMessageForm}
      ></Formik>
    </div>
  );
};

export default ContactMessage;
