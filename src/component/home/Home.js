import React from 'react'
import Banner from '../banner/Banner'
import About from "../about/About";
import Product from "../product/Product";

import basic from "../images/product/basic1.png";
import gold from "../images/product/gold.jpg";
import plat from "../images/product/plat.png";
import { Col, Container, Row } from 'reactstrap';
import Footer from "../footer/Footer";
import Prize from '../prize/Prize';

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <h2 className='text-center display-3'>Our Products</h2>
            <hr />
            <Container id='Products' fluid>

                <Row>
                    <Col lg="4">
                        <Product
                            benefit="Thsi is the basic package that contains less benefits"
                            type="Basic"
                            price={300}
                            image={basic} />
                    </Col>

                    <Col lg="4">
                        <Product
                            benefit="This is the basic package that contains less benefits"
                            type="Gold"
                            price={300}
                            image={basic} />
                    </Col>

                    <Col lg="4">
                        <Product
                            benefit="This is the basic package that contains less benefits"
                            type="Premium"
                            price={300}
                            image={basic} />
                    </Col>
                </Row>
            </Container>
            <Prize />
            <Footer />
        </div>
    )
}

export default Home