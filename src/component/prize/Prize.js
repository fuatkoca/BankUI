import React from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";
import "./prize.css";

const Prize = () => {
    return (
        <div>
            <Container id="Packages">
                <Row >
                    <Col className="section-title text-center">
                        <h6 className="subtitle subtitle-thumb">Our Packages</h6>
                        <h2 className="title">Grab Our Package</h2>
                        <p>
                            The right banking package for you. Get the privilege of choosing
                            between our many Banking Packages, and enjoy services that will
                            reward you and fit your lifestyle.
                        </p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="single-price text-center">
                            <div className="pricing-details">
                                <h2 className="pricing-cost">5.50%</h2>
                                <h6 className="pricing-subtitle">For a month</h6>
                                <h4 className="pricing-title">Basic</h4>
                            </div>
                            <div className="pricing-list-parent">
                                <ul className="pricing-list">
                                    <li>
                                        <Link to={"/"}>Minumum Deposit $1000</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Maximum Deposit $10000</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Add upto 5 Users</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Free Internet Banking</Link>
                                    </li>
                                    <li>
                                        <Link className="btn btn-blue" to={"/"}>
                                            Buy Now
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="single-price text-center">
                            <div className="pricing-details">
                                <h2 className="pricing-cost">7.50%</h2>
                                <h6 className="pricing-subtitle">For a month</h6>
                                <h4 className="pricing-title">Premium</h4>
                            </div>
                            <div className="pricing-list-parent">
                                <ul className="pricing-list">
                                    <li>
                                        <Link to={"/"}>Minimum Deposit $500</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Maximum Deposit $20000</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Add upto 10 Users</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Free Internet Banking</Link>
                                    </li>
                                    <li>
                                        <Link className="btn btn-blue " to={"/"}>
                                            Buy Now
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <div className="single-price text-center">
                            <div className="pricing-details">
                                <h2 className="pricing-cost">9.50%</h2>
                                <h6 className="pricing-subtitle">For a month</h6>
                                <h4 className="pricing-title">Advanced Plan</h4>
                            </div>
                            <div className="pricing-list-parent">
                                <ul className="pricing-list">
                                    <li>
                                        <Link to={"/"}>Minimum Deposit $0</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Maximum Deposit $50000</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Add upto 20 Users</Link>
                                    </li>
                                    <li>
                                        <Link to={"/"}>Free Internet Banking</Link>
                                    </li>
                                    <li>
                                        <Link className="btn btn-blue " to={"/"}>
                                            Buy Now
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Prize