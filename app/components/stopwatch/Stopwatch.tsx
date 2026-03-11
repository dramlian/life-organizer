'use client';

import { useState, useEffect, useRef } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { Button, Row, Col } from 'react-bootstrap';

export default function Stopwatch() {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: false });

    const [milliseconds, setMilliseconds] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isRunning) {
            const startTime = Date.now() - milliseconds;
            intervalRef.current = setInterval(() => {
                setMilliseconds(Date.now() - startTime);
            }, 10);
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
    }, [isRunning]);

    const handleReset = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setMilliseconds(0);
        reset(undefined, false);
    };

    const ms = Math.floor((milliseconds % 1000) / 10);

    return (
        <Row>
            <Col className='text-center m-3 border rounded p-3'>
                <div className="display-1 mb-4" style={{ fontFamily: 'var(--font-press-start)' }}>
                    <span>{String(hours).padStart(2, '0')}</span>:
                    <span>{String(minutes).padStart(2, '0')}</span>:
                    <span>{String(seconds).padStart(2, '0')}</span>
                    <span className="text-muted" style={{ fontSize: '0.6em' }}>
                        .{String(ms).padStart(2, '0')}
                    </span>
                </div>
                <div className="d-flex gap-2 justify-content-center">
                    <Button
                        variant={isRunning ? 'outline-warning' : 'outline-success'}
                        onClick={isRunning ? pause : start}
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
    );
}