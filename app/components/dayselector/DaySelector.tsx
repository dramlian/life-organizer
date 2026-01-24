'use client';

import { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

export default function DaySelector({ days }: { days: string[] }) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    useEffect(() => {
        //this will be deleted
        const today = new Date();

        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const yyyy = today.getFullYear();

        const formatted = `${mm}/${dd}/${yyyy}`;
        if (!days.includes(formatted)) {
            days.push(formatted);
            setSelectedDay(formatted);
        }
    }, []);
    return (
        <Row>
            <Col className="p-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <ListGroup>
                    {days.map((day) => (
                        <ListGroup.Item
                            key={day}
                            active={selectedDay === day}
                            onClick={() => setSelectedDay(day)}
                            style={{ cursor: 'pointer' }}>
                            {day}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        </Row>
    );
}