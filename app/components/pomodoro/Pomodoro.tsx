'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Container } from 'react-bootstrap';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setTimeLeft(25 * 60);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Container>
            <Row>
                <Col className='text-center m-3 border rounded p-3'>
                    <div className="display-1 mb-4 font-monospace">
                        <span>{String(minutes).padStart(2, '0')}</span>:
                        <span>{String(seconds).padStart(2, '0')}</span>
                    </div>
                    <div className="d-flex gap-2 justify-content-center">
                        <Button
                            variant={isRunning ? 'outline-warning' : 'outline-success'}
                            onClick={isRunning ? handlePause : handleStart}
                            size="lg"
                        >
                            {isRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={handleReset}
                            size="lg"
                        >
                            Reset
                        </Button>
                    </div>
                </Col>
            </Row >
        </Container>
    );
}