import { Field, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
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
} from "reactstrap";
import * as Yup from "yup";
import { toastError } from "../../util/Toast";
import ConfirmDialog from "./ConfirmDialog";
import RecipientList from "./RecipientList";
import client from '../service/SureBankClient';

const RecipientSchema = Yup.object().shape({
    name: Yup.string().required("It is required"),
    accountNumber: Yup.number().required("It is required"),
});

const RecipientForm = (props) => (
    <Container>
        <fieldset>
            <legend>Recipient Management</legend>

            <Form>
                <Row className="justify-content-start">
                    <Col md="4" className="text-center p-3">
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                tag={Field}
                                name="name"
                                type="text"
                                invalid={props.errors.name && props.touched.name}
                            ></Input>

                            <FormFeedback>{props.errors.name}</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md="4" className="text-center p-3">
                        <FormGroup>
                            <Label>Account Number</Label>
                            <Input
                                tag={Field}
                                name="accountNumber"
                                type="text"
                                invalid={
                                    props.errors.accountNumber && props.touched.accountNumber
                                }
                            ></Input>

                            <FormFeedback>{props.errors.accountNumber}</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>

                <Row className="justify-content-start">
                    <Col lg={{ size: "2", offset: "2" }} className="text-center p-3">
                        <Button
                            color="primary"
                            disabled={props.isSubmitting}
                            onClick={props.submitForm}
                        >
                            Add Recipient
                        </Button>
                    </Col>
                </Row>
            </Form>
        </fieldset>
    </Container>
);

const RecipientManagement = () => {
    //this hook is dealing all the recipient
    const [recipients, setRecipients] = useState([]);
    //this hook is dealing the current recipient
    const [currentRecipient, setCurrentRecipient] = useState({});
    //this hook is dealing the popup
    const [showModal, setShowModal] = useState(false);

    async function getRecipients() {
        try {
            const response = await client.getRecipients();
            if (response && response.status === 200) {
                const data = response.data;
                //sending the data to the hook
                setRecipients(data.recipients);
            }
        } catch (error) {
            toastError(error);
        }
    }

    //for showing all the recipients instantly
    useEffect(() => {
        getRecipients();
    }, []);

    const deleteRecipient = async () => {
        try {
            const response = await client.deleteRecipient(currentRecipient.id);
            if (response && response.status === 200) {
                //again running this function for rendering the rest of the recipients persons
                await getRecipients();
                toast.success(response.data.message);
            }

            setShowModal(false);
        } catch (error) {
            setShowModal(false);
            toastError(error);
        }
    };

    const openDialogHandler = (recipient) => {
        setCurrentRecipient(recipient);
        setShowModal(true);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    name: "",
                    accountNumber: "",
                }}
                validationSchema={RecipientSchema}
                onSubmit={async (values, actions) => {
                    try {
                        const response = await client.addRecipient(values);
                        if (response.status === 201) {
                            if (response.data.success) {
                                toast.success(response.data.message, {
                                    position: toast.POSITION.TOP_CENTER,
                                });
                            }
                            await getRecipients();
                            actions.resetForm();
                        }
                    } catch (error) {
                        toastError(error);
                    }

                    actions.setSubmitting(false);
                }}
                component={RecipientForm}
            ></Formik>

            <div>
                <RecipientList
                    dialogHandler={openDialogHandler}
                    recipients={recipients}
                />
                <ConfirmDialog
                    recipient={currentRecipient}
                    isOpen={showModal}
                    delete={deleteRecipient}
                    close={setShowModal}
                />
            </div>
        </div>
    );
};

export default RecipientManagement;
