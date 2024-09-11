import React from "react";
import { Container, Row, Col, Stack, Image, Form, Button } from "react-bootstrap";
import Logo from "../../NavBarComponents/Logo";
import "./footer.css"

const Footer = () => {
  
  return (
    <footer className="footer mt-auto py-3   ">
      <Container fluid>
        <Row className=" text-white p-4">
          {/* Column 1: Logo and Description */}
          <Col>
            <Stack>
              <Logo />
              <div>Your centralized hub for all things RPI</div>
            </Stack>
          </Col>

          {/* Column 2: Social Media Links */}
          <Col>
            <Stack>
              <h5>Find us on social media</h5>
              <a href="#" className="text-white d-flex align-items-center">
                <i className="bi bi-facebook me-2"></i>Facebook
              </a>
              <a href="#" className="text-white d-flex align-items-center">
                <i className="bi bi-twitter me-2"></i>Twitter
              </a>
              <a href="#" className="text-white d-flex align-items-center">
                <i className="bi bi-instagram me-2"></i>Instagram
              </a>
            </Stack>
          </Col>

          {/* Column 3: Subscribe to Newsletter */}
          <Col>
            <Stack>
              <h5>Subscribe</h5>
              <Form>
                <Form.Group>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Button variant="light" type="submit">Subscribe</Button>
              </Form>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
