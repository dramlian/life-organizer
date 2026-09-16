'use client';

import { Container, Row, Col } from "react-bootstrap";
import DaySelector from "../components/dayselector/DaySelector";
import { useEffect, useState } from "react";
import MarkdownEditor from "../components/markdowneditor/MarkdownEditor";
import LoadingSpinner from "../components/loading/LoadingSpinner";
import { getReportByDate, updateReportForDate, createDefaultReportForDate } from "../actions/reports";
import Pomodoro from "../components/pomodoro/Pomodoro";

export default function WorkReports() {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState<string>(today);
    const [markdown, setMarkdown] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchReport = async () => {
            setIsLoading(true);
            const report = await getReportByDate(selectedDate);
            if (report === null) {
                await createDefaultReportForDate(selectedDate);
                const defaultReport = await getReportByDate(selectedDate);
                setMarkdown(defaultReport ?? `## Work Report for ${selectedDate}\n\nNo report available.`);
            } else {
                setMarkdown(report);
            }
            setIsLoading(false);
        };
        fetchReport();

    }, [selectedDate]);


    useEffect(() => {
        if (markdown === "") return;
        updateReportForDate(selectedDate, markdown);
    }, [markdown]);

    return (
        <Container fluid className="h-100 p-0" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Row >
                <Col md={12}>
                    <DaySelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
                </Col>
            </Row>
            <Row>
                <Col md={12} >
                    {isLoading ? <LoadingSpinner /> : <MarkdownEditor value={markdown} onChange={setMarkdown} hasBorder={true} />}
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