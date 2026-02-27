'use client';

import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import RichTextEditor from "../richtexteditor/RichTextEditor";
import Stopwatch from "../stopwatch/Stopwatch";
import NoteSelector from "../noteselector/NoteSelector";
import { getNotes, updateNote, addNote, deleteNote } from "../../actions/notes";
import { NotesDbDto } from "../../interfaces/notes";

export default function NotesWrapper({ isWorkoutPage = false }: { isWorkoutPage?: boolean }) {

    const [inputTextValue, setInputTextValue] = useState<string>("");
    const [html, setHtml] = useState<string>("");
    const [notes, setnotes] = useState<NotesDbDto[]>([]);
    const [selectedNote, setSelectedNote] = useState<NotesDbDto | null>(null);
    const collectionName = isWorkoutPage ? "workouts" : "notes";

    function manageAddNote(id: string) {
        if (!id.trim() || notes.map(w => w._id).includes(id)) return;
        setInputTextValue("");
        addNote("", id, collectionName);
        setnotes([...notes, { _id: id, content: "" }]);
    }

    function manageDeleteNote(id: string) {
        deleteNote(id, collectionName);
        const updatednotes = notes.filter(w => w._id !== id);
        setnotes(updatednotes);
        if (selectedNote?._id === id) {
            setSelectedNote(updatednotes[0] || null);
        }
    }

    useEffect(() => {
        const fetchnotes = async () => {
            const initialnotes = await getNotes(collectionName);
            setnotes(initialnotes);
            setSelectedNote(initialnotes[0] || null);
        };
        fetchnotes();
    }, []);

    useEffect(() => {
        if (selectedNote) {
            setHtml(selectedNote.content);
        }
    }, [selectedNote]);

    useEffect(() => {
        if (selectedNote) {
            updateNote(selectedNote._id, html, collectionName);
            const updatednotes = notes.map(w =>
                w._id === selectedNote._id ? { ...w, content: html } : w
            );
            setnotes(updatednotes);
        }

    }, [html]);

    return (
        <Container>
            <Row className="mt-3 gap-3">
                <Col md={3} className="pt-3 border rounded ">
                    <NoteSelector
                        inputTextValue={inputTextValue}
                        setInputTextValue={setInputTextValue}
                        addNote={manageAddNote}
                        notes={notes}
                        setSelectedNote={setSelectedNote}
                        selectedNote={selectedNote}
                        deleteNote={manageDeleteNote}
                        isWorkout={isWorkoutPage}
                    />
                </Col>
                <Col className="pt-3 border rounded " style={{ height: '80vh', overflowY: 'scroll' }} >
                    <Row className="justify-content-center">
                        {isWorkoutPage && <Stopwatch />}
                    </Row>
                    <Row className="justify-content-center">
                        <RichTextEditor initialHtml={html} onChange={setHtml} />
                    </Row>
                </Col>
            </Row>
        </Container >
    );
}