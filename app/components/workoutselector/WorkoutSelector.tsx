'use client';

import { Row, ListGroup, InputGroup, Button, Form } from "react-bootstrap";
import { WorkoutDbDto } from "../../interfaces/workouts";

export default function NoteSelector({
    inputTextValue,
    setInputTextValue,
    addNote,
    workouts,
    setSelectedNote,
    selectedNote,
    deleteNote,
    isWorkout = false
}: {
    inputTextValue: string;
    setInputTextValue: (value: string) => void;
    addNote: (id: string) => void;
    workouts: WorkoutDbDto[];
    setSelectedNote: (workout: WorkoutDbDto | null) => void;
    selectedNote: WorkoutDbDto | null;
    deleteNote: (id: string) => void;
    isWorkout?: boolean;
}) {
    return (
        <Row>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox style={{ visibility: 'hidden' }} disabled />
                <Form.Control
                    placeholder={`${isWorkout ? "Workout" : "Note"} name`}
                    value={inputTextValue}
                    onChange={(e) => setInputTextValue(e.target.value)}
                />
                <Button
                    variant="outline-secondary"
                    onClick={() => addNote(inputTextValue)}
                >
                    Add {isWorkout ? "Workout" : "Note"}
                </Button>
            </InputGroup>
            <ListGroup className="px-2">
                {workouts.map((workout, index) => (
                    <ListGroup.Item
                        key={index}
                        action
                        active={selectedNote?._id === workout._id}
                        onClick={() => {
                            setSelectedNote(workout);
                        }}
                    >
                        {workout._id}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="px-2 mt-3">
                <Button
                    variant="outline-danger"
                    className="w-100 fw-bold shadow-sm"
                    onClick={() => {
                        if (selectedNote) {
                            deleteNote(selectedNote._id);
                        }
                    }}
                >
                    Delete {isWorkout ? "Workout" : "Note"}
                </Button>
            </div>
        </Row>
    );
}
