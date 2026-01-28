'use client';

import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import RichTextEditor from "../components/richtexteditor/RichTextEditor";
import Stopwatch from "../components/stopwatch/Stopwatch";
import WorkoutSelector from "../components/workoutselector/WorkoutSelector";
import { getWorkouts, updateWorkout, addWorkout, deleteWorkout } from "../actions/workouts";
import { WorkoutDbDto } from "../interfaces/workouts";
import Pomodoro from "../components/pomodoro/Pomodoro";

export default function Workouts() {

    const [inputTextValue, setInputTextValue] = useState<string>("");
    const [html, setHtml] = useState<string>("");
    const [workouts, setWorkouts] = useState<WorkoutDbDto[]>([]);
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutDbDto | null>(null);

    function manageAddWorkout(id: string) {
        if (!id.trim() || workouts.map(w => w._id).includes(id)) return;
        setInputTextValue("");
        addWorkout("", id);
        setWorkouts([...workouts, { _id: id, content: "" }]);
    }

    function manageDeleteWorkout(id: string) {
        deleteWorkout(id);
        const updatedWorkouts = workouts.filter(w => w._id !== id);
        setWorkouts(updatedWorkouts);
        if (selectedWorkout?._id === id) {
            setSelectedWorkout(updatedWorkouts[0] || null);
        }
    }

    useEffect(() => {
        const fetchWorkouts = async () => {
            const initialWorkouts = await getWorkouts();
            setWorkouts(initialWorkouts);
            setSelectedWorkout(initialWorkouts[0] || null);
        };
        fetchWorkouts();
    }, []);

    useEffect(() => {
        if (selectedWorkout) {
            setHtml(selectedWorkout.content);
        }
    }, [selectedWorkout]);


    useEffect(() => {
        if (selectedWorkout) {
            updateWorkout(selectedWorkout._id, html);
            const updatedWorkouts = workouts.map(w =>
                w._id === selectedWorkout._id ? { ...w, content: html } : w
            );
            setWorkouts(updatedWorkouts);
        }

    }, [html]);

    return (
        <Container>
            <Row className="mt-3 gap-3">
                <Col md={3} className="pt-3 border rounded ">
                    <WorkoutSelector
                        inputTextValue={inputTextValue}
                        setInputTextValue={setInputTextValue}
                        addWorkout={manageAddWorkout}
                        workouts={workouts}
                        setSelectedWorkout={setSelectedWorkout}
                        selectedWorkout={selectedWorkout}
                        deleteWorkout={manageDeleteWorkout}
                    />
                </Col>
                <Col className="pt-3 border rounded " style={{ height: '80vh', overflowY: 'scroll' }} >
                    <Row className="justify-content-center">
                        <Stopwatch />
                    </Row>
                    <Row className="justify-content-center">
                        <RichTextEditor initialHtml={html} onChange={setHtml} />
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}