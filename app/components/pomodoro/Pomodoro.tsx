'use client';

import { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Container, ButtonGroup } from 'react-bootstrap';

export default function Pomodoro() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [bgColor, setBgColor] = useState('danger');
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

    function handleModeChange(mode: 'pomodoro' | 'shortBreak' | 'longBreak') {
        setIsRunning(false);
        switch (mode) {
            case 'pomodoro':
                setTimeLeft(25 * 60);
                setBgColor('danger');
                break;
            case 'shortBreak':
                setTimeLeft(5 * 60);
                setBgColor('primary');
                break;
            case 'longBreak':
                setTimeLeft(15 * 60);
                setBgColor('info');
                break;
        }
    }

    return (
        <Container className='border rounded p-3 mt-3 bg-light'>

            <Row className="mt-3">
                <ButtonGroup aria-label="Basic example">
                    <Button variant="outline-danger" onClick={() => handleModeChange('pomodoro')}>Pomodoro</Button>
                    <Button variant="outline-primary" onClick={() => handleModeChange('shortBreak')}>Short break</Button>
                    <Button variant="outline-info" onClick={() => handleModeChange('longBreak')}>Long break</Button>
                </ButtonGroup>
            </Row>

            <Row>
                <Col className={`text-center m-3 border rounded p-3 bg-${bgColor} bg-opacity-10`}>
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