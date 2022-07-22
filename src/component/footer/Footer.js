import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import ContactMessage from "../contactmessage/ContactMessage";
const Footer = () => {

  return (
    <div id="Contact">
      <footer className="footer-area">
        <Container fluid className="footer-area">
          <Row>
            <Col>
              <div className="widget">
                <Link className="widget-title" to={"/"}>
                  <img src={logo} alt="" className="footer_logo" />
                </Link>
                {/* <span className="widget-title pl-1">SUREBank</span> */}
                <ul className="widget-list">
                  <li>112, West Road , F1 456 Tram Town</li>
                  <li>Office No 2312</li>
                  <li>info@surebank.com</li>
                  <li>234-1234568</li>
                </ul>
              </div>
            </Col>

            <Col sm="5">
              <div className="widget">
                 <div className="widget-title">Contact Form</div>
                  <ContactMessage/>
              </div>
            </Col>

            <Col>
              <div className="widget">
                <div className="widget-title">Links</div>
                <ul className="widget-list">
                  <li>
                    <Link to={"/"}>FAQ</Link>
                  </li>
                  <li>
                  <Link  to={"/about"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={"/contact"}>Contact Us</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col>
              <div className="widget">
                <div className="widget-title">About Us</div>
                <ul className="widget-list">
                  <li>
                    <Link to={"/"}>CEO Message</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Blog</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Group</Link>
                  </li>
                  <li>
                    <Link to={"/register"}>Register</Link>
                  </li>
                </ul>
              </div>
            </Col>

            <Col>
              {" "}
              <div className="widget">
                <div className="widget-title">Contact Us</div>
                <p>Please connect with us through following channels</p>
                <ul className="social-area">
                  <li>
                    <Link to={"/"}>
                      <FontAwesomeIcon icon={faTwitter} />
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                  </li>
                  <li>
                    <Link to={"/"}>
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </Link>
                  </li>

                  <li>
                    <Link to={"/"}>
                      <FontAwesomeIcon icon={faPinterestP} />
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <div className="footer-bottom">
        <Container fluid>
          <Row>
            <Col sm="8" className="align-self-start">
              <div className="text-left">
                <ul>
                  <li>
                    <Link to={"/"}>Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to={"/"}>Site Map</Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col sm="4" className="align-self-center pb-3">
              <div className="copy-right text-center">
                <span> <FontAwesomeIcon icon={faCopyright} /></span>
                2022 , SUREBank all right reserved
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
