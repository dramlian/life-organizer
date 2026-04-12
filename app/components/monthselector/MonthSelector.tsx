'use client';

import { Col, Container, Form, Row } from "react-bootstrap";

export default function MonthSelector({ selectedMonth, onMonthChange }: { selectedMonth: string; onMonthChange: (month: string) => void }) {

    return (
        <Container>
            <Row>
                <Col className="p-3">
                    <Form.Control
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => onMonthChange(e.target.value)}
                    />
                </Col>
            </Row>
        </Container>
    );
}