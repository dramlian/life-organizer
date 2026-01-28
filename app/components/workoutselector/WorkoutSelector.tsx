'use client';

import { Row, ListGroup, InputGroup, Button, Form } from "react-bootstrap";
import { WorkoutDbDto } from "../../interfaces/Workouts";

export default function WorkoutSelector({
    inputTextValue,
    setInputTextValue,
    addWorkout,
    workouts,
    setSelectedWorkout,
    selectedWorkout,
    deleteWorkout
}: {
    inputTextValue: string;
    setInputTextValue: (value: string) => void;
    addWorkout: (id: string) => void;
    workouts: WorkoutDbDto[];
    setSelectedWorkout: (workout: WorkoutDbDto | null) => void;
    selectedWorkout: WorkoutDbDto | null;
    deleteWorkout: (id: string) => void;
}) {
    return (
        <Row>
            <InputGroup className="mb-3">
                <InputGroup.Checkbox style={{ visibility: 'hidden' }} disabled />
                <Form.Control
                    placeholder="Workout name"
                    value={inputTextValue}
                    onChange={(e) => setInputTextValue(e.target.value)}
                />
                <Button
                    variant="outline-secondary"
                    onClick={() => addWorkout(inputTextValue)}
                >
                    Add Workout
                </Button>

            </InputGroup>

            <ListGroup className="px-2">
                {workouts.map((workout, index) => (
                    <ListGroup.Item
                        key={index}
                        action
                        active={selectedWorkout?._id === workout._id}
                        onClick={() => {
                            setSelectedWorkout(workout);
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
                        if (selectedWorkout) {
                            deleteWorkout(selectedWorkout._id);
                        }
                    }}
                >
                    Delete Workout
                </Button>
            </div>

        </Row>
    );
}
