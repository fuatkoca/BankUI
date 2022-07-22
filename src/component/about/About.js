import React from 'react'
import { Col, Container, Row } from 'reactstrap'

import about1 from "../images/about/about1.png";
import about2 from "../images/about/about2.jpg";
import about3 from "../images/about/about3.jpg";

import "./about.css";

const About = () => {
    return (
        <div>
            <Container id="About">
                <h1 className='text-center display-3 mb-4'>About Us</h1>
                <Row>
                    <Col lg={{ size: 4, offset: 1 }} md="6">
                        <img src={about1} className="imgsize" />
                        <h5>About the E-banking</h5>
                        <p>Video provides a powerful way to help you prove your point. When you click Online Video</p>
                    </Col>
                    <Col lg="4" md="6">
                        <img src={about2} className="imgsize" />
                        <h5>About the E-services</h5>
                        <p>
                            To make your document look professionally produced, Word provides header, footer, cover page, and text box designs
                        </p>
                    </Col>
                    <Col lg="3" md="6">
                        <img src={about3} className="imgsize" />
                        <h5>Our Security</h5>
                        <p>Save time in Word with new buttons that show up where you need them. To change the way a picture fits in your document</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About