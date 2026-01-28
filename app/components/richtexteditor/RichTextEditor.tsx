"use client";

import { Container, Col, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface RichTextEditorProps {
    initialHtml?: string;
    onChange?: (html: string) => void;
}

export default function RichTextEditor({ initialHtml = "", onChange }: RichTextEditorProps) {

    const handleChange = (content: string) => {
        if (onChange) onChange(content);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <SunEditor
                        setContents={initialHtml}
                        onChange={handleChange}
                        setOptions={{
                            defaultStyle: "font-family: Arial; font-size: 16px; color: #000000;",
                            buttonList: [
                                ["undo", "redo"],
                                ["font", "fontSize"],
                                ["bold", "italic", "underline", "strike"],
                                ["fontColor", "hiliteColor"],
                                ["list", "align", "lineHeight"],
                                ["link", "image", "video"],
                                ["fullScreen"],
                            ],
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}
