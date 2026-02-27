'use client';

import { Row, ListGroup, InputGroup, Button, Form, Modal } from "react-bootstrap";
import { NotesDbDto } from "../../interfaces/notes";
import Accordion from 'react-bootstrap/Accordion';
import "./noteselector.module.css";
import { useState } from "react";

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
    addNote: (id: string, folderName?: string) => void;
    notes: NotesDbDto[];
    setSelectedNote: (note: NotesDbDto | null) => void;
    selectedNote: NotesDbDto | null;
    deleteNote: (id: string) => void;
    isWorkout?: boolean;
}) {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [newFolderName, setNewFolderName] = useState<string>("");

    const folderToNotesMap = notes.reduce((acc, note) => {
        const folder = note.folderName || "Default";
        if (!acc[folder]) acc[folder] = [];
        acc[folder].push(note._id);
        return acc;
    }, {} as Record<string, string[]>);

    const existingFolders = Object.keys(folderToNotesMap);

    function openModal(id: string) {
        if (!id.trim() || notes.map(w => w._id).includes(id)) return;
        setNewFolderName("");
        setIsModalOpen(true);
    }

    function confirmAddNote(folder: string) {
        addNote(inputTextValue, folder);
        setIsModalOpen(false);
        setInputTextValue("");
    }

    return (
        <>
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
                        onClick={() => openModal(inputTextValue)}
                    >
                        Add {isWorkout ? "Workout" : "Note"}
                    </Button>
                </InputGroup>
                <ListGroup className="px-2">
                    {Object.entries(folderToNotesMap).map(([folder, noteIds], index) => (
                        <Accordion key={index}>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{folder}</Accordion.Header>
                                <Accordion.Body className="p-0">
                                    {noteIds.map((id, idx) => {
                                        const note = notes.find(n => n._id === id);
                                        if (!note) return null;
                                        return (
                                            <ListGroup.Item
                                                key={idx}
                                                action
                                                active={selectedNote?._id === note._id}
                                                onClick={() => setSelectedNote(selectedNote?._id === note._id ? null : note)}
                                            >
                                                {note._id}
                                            </ListGroup.Item>
                                        );
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}
                </ListGroup>
                <div className="px-2 mt-3">
                    <Button
                        variant="outline-danger"
                        className="w-100 fw-bold shadow-sm"
                        disabled={!selectedNote}
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
            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {existingFolders.length > 0 && (
                        <ListGroup className="mb-3">
                            {existingFolders.map((folder, idx) => (
                                <ListGroup.Item
                                    key={idx}
                                    action
                                    onClick={() => confirmAddNote(folder)}
                                >
                                    {folder}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                    <InputGroup>
                        <Form.Control
                            placeholder="New folder name"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            disabled={!newFolderName.trim()}
                            onClick={() => confirmAddNote(newFolderName.trim())}
                        >
                            Create & Add
                        </Button>
                    </InputGroup>
                </Modal.Body>
            </Modal>
        </>
    );
}
