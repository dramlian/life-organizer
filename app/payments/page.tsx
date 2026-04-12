'use client';

import { Container, Row, Col } from "react-bootstrap";
import MonthSelector from "../components/monthselector/MonthSelector";
import { useState, useEffect, useRef } from "react";
import PaymentList from "../components/paymentlist/PaymentList";
import { Payment } from "../interfaces/payments";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { getPaymentsByMonth, updatePaymentsForMonth, createDefaultPaymentsForMonth } from "../actions/payments";

export default function Payments() {
    const today = new Date().toISOString().slice(0, 7);
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [payments, setPayments] = useState<Payment[] | null>(null);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        const fetchPayments = async () => {
            isLoadingRef.current = true;
            setPayments(null);
            const fetched = await getPaymentsByMonth(selectedDate);
            if (fetched.length === 0) {
                await createDefaultPaymentsForMonth(selectedDate);
                const defaultFetched = await getPaymentsByMonth(selectedDate);
                setPayments(defaultFetched);
            } else {
                setPayments(fetched);
            }
            isLoadingRef.current = false;
        };

        fetchPayments();
    }, [selectedDate]);

    useEffect(() => {
        if (payments !== null && !isLoadingRef.current) {
            updatePaymentsForMonth(selectedDate, payments);
        }
    }, [payments]);

    const togglePayment = (id: number) => {
        setPayments(prev => prev?.map(p => p.id === id ? { ...p, done: !p.done } : p) ?? null);
    };

    const deletePayment = (id: number) => {
        setPayments(prev => prev?.filter(p => p.id !== id) ?? null);
    };

    const addPayment = (content: string) => {
        setPayments(prev => [...(prev ?? []), { id: Date.now(), content, done: false }]);
    };

    return (
        <Container fluid className="h-100 p-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Row className="g-0">
                <Col md={12}>
                    <MonthSelector selectedMonth={selectedDate} onMonthChange={setSelectedDate} />
                </Col>
            </Row>
            <Row className="g-0">
                <Col md={12}>
                    {payments === null ? <LoadingSpinner /> : <PaymentList payments={payments} onToggle={togglePayment} onDelete={deletePayment} onAdd={addPayment} />}
                </Col>
            </Row>
        </Container>
    );
}