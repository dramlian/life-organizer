'use client';

import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Col, Container, Row } from "react-bootstrap";
import { Payment } from "../../interfaces/payments"

export default function PaymentList({ payments, onToggle }: { payments: Payment[], onToggle: (id: number) => void }) {
    return (
        <Container>
            <Row>
                <Col>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        {payments.map((payment) => (
                            <li key={payment.id}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        readOnly
                                        value={payment.content}
                                        className={payment.done ? "border-success" : "border-danger"}
                                    />
                                    <Button
                                        variant={payment.done ? "outline-success" : "outline-danger"}
                                        onClick={() => onToggle(payment.id)}
                                    >
                                        {payment.done ? "Mark as not payed" : "Mark as payed"}
                                    </Button>
                                </InputGroup>
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}