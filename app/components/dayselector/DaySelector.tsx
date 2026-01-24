'use client';

import { Col, Container, Form, Row } from "react-bootstrap";

export default function DaySelector({ selectedDate, onDateChange }: { selectedDate: string; onDateChange: (date: string) => void }) {

    return (
        <Container>
            <Row>
                <Col className="p-3">
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => onDateChange(e.target.value)}
                    />
                </Col>
            </Row>
        </Container>
    );
}