'use client';

import { useState } from "react";
import { Col, Row, Container, ListGroup, InputGroup, Button, Form } from "react-bootstrap";
import RichTextEditor from "../components/richtexteditor/RichTextEditor";
import Stopwatch from "../components/stopwatch/Stopwatch";

export default function Workouts() {

    const [inputTextValue, setInputTextValue] = useState<string>("");
    const [html, setHtml] = useState<string>("");

    function addWorkout(content: string) {
        // Placeholder function for adding a workout
        console.log("Adding workout:", content);
        setInputTextValue(content);
    }

    return (
        <Container>
            <Row className="mt-3 gap-3">
                <Col md={3} className="pt-3 border rounded " style={{ height: '80vh' }} >
                    <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Placeholder checkbox" style={{ visibility: 'hidden' }} disabled />
                        <Form.Control
                            placeholder="Workout name"
                            aria-label="Workout name"
                            aria-describedby="basic-addon2"
                            value={inputTextValue}
                            onChange={(e) => setInputTextValue(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="button-addon2" onClick={() => addWorkout(inputTextValue)}>
                            Add Workout
                        </Button>
                    </InputGroup>
                    <ListGroup>
                        <ListGroup.Item  >
                            Link 1
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Link 2
                        </ListGroup.Item>
                        <ListGroup.Item>
                            This one is a button
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col className="pt-3 border rounded " style={{ height: '80vh', overflowY: 'scroll' }} >
                    <Row>
                        <Stopwatch />
                    </Row>
                    <Row>
                        <RichTextEditor initialHtml={html} onChange={setHtml} />
                    </Row>
                </Col>
            </Row>


        </Container >
    );
}