'use client';

import { Row, ListGroup, InputGroup, Button, Form } from "react-bootstrap";
import { NotesDbDto } from "../../interfaces/notes";

export default function NoteSelector({
    inputTextValue,
    setInputTextValue,
    addNote,
    notes,
    setSelectedNote,
    selectedNote,
    deleteNote,
    isWorkout = false
}: {
    inputTextValue: string;
    setInputTextValue: (value: string) => void;
    addNote: (id: string) => void;
    notes: NotesDbDto[];
    setSelectedNote: (note: NotesDbDto | null) => void;
    selectedNote: NotesDbDto | null;
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
                {notes.map((note, index) => (
                    <ListGroup.Item
                        key={index}
                        action
                        active={selectedNote?._id === note._id}
                        onClick={() => {
                            setSelectedNote(note);
                        }}
                    >
                        {note._id}
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
