'use client';

import InputGroup from "react-bootstrap/esm/InputGroup";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Col, Container, Row } from "react-bootstrap";
import { Payment } from "../../interfaces/payments"
import { useState } from "react";

export default function PaymentList({ payments, onToggle, onDelete, onAdd }: { payments: Payment[], onToggle: (id: number) => void, onDelete: (id: number) => void, onAdd: (content: string) => void }) {
    const [newItem, setNewItem] = useState<string>("");

    const handleAdd = () => {
        const trimmed = newItem.trim();
        if (!trimmed) return;
        onAdd(trimmed);
        setNewItem("");
    };

    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="New payment item"
                            value={newItem}
                            onChange={e => setNewItem(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleAdd()}
                        />
                        <Button variant="outline-secondary" onClick={handleAdd}>
                            Add
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul style={{ padding: 0, listStyle: 'none' }}>
                        {payments.map((payment) => (
                            <li key={payment.id}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        readOnly
                                        value={payment.content}
                                        className={payment.done ? "border-success" : "border-warning"}
                                    />
                                    <Button
                                        variant={payment.done ? "outline-success" : "outline-warning"}
                                        onClick={() => onToggle(payment.id)}
                                    >
                                        {payment.done ? "Mark as not payed" : "Mark as payed"}
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => onDelete(payment.id)}
                                    >
                                        Delete
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