'use client';

import { Container, Row, Col } from "react-bootstrap";
import DaySelector from "../components/dayselector/DaySelector";
import { useEffect, useState } from "react";
import RichTextEditor from "../components/richtexteditor/RichTextEditor";
import { getReportByDate, updateReportForDate, createDefaultReportForDate } from "../actions/reports";
import Pomodoro from "../components/pomodoro/Pomodoro";

export default function WorkReports() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [html, setHtml] = useState<string>("");


    useEffect(() => {
        const fetchReport = async () => {
            const report = await getReportByDate(selectedDate);
            if (report === null) {
                await createDefaultReportForDate(selectedDate);
                const defaultReport = await getReportByDate(selectedDate);
                setHtml(defaultReport ?? `<h2>Work Report for ${selectedDate}</h2><p>No report available.</p>`);
                return;
            } else {
                setHtml(report);
            }
        };
        fetchReport();

    }, [selectedDate]);


    useEffect(() => {
        if (html === "") return;
        updateReportForDate(selectedDate, html);
    }, [html]);

    return (
        <Container fluid className="h-100 p-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Row >
                <Col md={12}>
                    <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </Col>
            </Row>
            <Row>
                <Col md={12} >
                    <RichTextEditor initialHtml={html} onChange={setHtml} hasBorder={true} />
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Pomodoro />
                </Col>
            </Row>
        </Container>
    );
}