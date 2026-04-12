'use client';

import { Container, Row, Col } from "react-bootstrap";
import MonthSelector from "../components/monthselector/MonthSelector";
import { useState, useEffect } from "react";
import PaymentList from "../components/paymentlist/PaymentList";
import { Payment } from "../interfaces/payments";
import LoadingSpinner from "../components/loading/LoadingSpinner";

export default function Payments() {
    const today = new Date().toISOString().slice(0, 7);
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [payments, setPayments] = useState<Payment[] | null>(null);

    const togglePayment = (id: number) => {
        setPayments(prev => prev?.map(p => p.id === id ? { ...p, done: !p.done } : p) ?? null);
    };

    const deletePayment = (id: number) => {
        setPayments(prev => prev?.filter(p => p.id !== id) ?? null);
    };

    useEffect(() => {
        setPayments([
            { id: 1, content: "Rent", done: false },
            { id: 2, content: "Electricity", done: true },
            { id: 3, content: "Internet", done: false },
            { id: 4, content: "Water", done: true },
            { id: 5, content: "Insurance", done: false },
        ]);
    }, []);

    return (
        <Container fluid className="h-100 p-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Row className="g-0">
                <Col md={12}>
                    <MonthSelector selectedMonth={selectedDate} onMonthChange={setSelectedDate} />
                </Col>
            </Row>
            <Row className="g-0">
                <Col md={12}>
                    {payments === null ? <LoadingSpinner /> : <PaymentList payments={payments} onToggle={togglePayment} onDelete={deletePayment} />}
                </Col>
            </Row>
        </Container>
    );
}