import React from 'react'
import { Col, Container, Row } from 'reactstrap'

const Product = ({ benefit, type, price, image }) => {
    return (
        <Container>

            <Row>
                <Col>
                    <h1>{type}</h1>
                    <p>{benefit}</p>
                    <p className='product_price'><strong>{price}$</strong></p>
                </Col>
                <Row>
                    <Col className='text-center'>
                        <img src={image} className="card_img img-fluid" />
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default Product