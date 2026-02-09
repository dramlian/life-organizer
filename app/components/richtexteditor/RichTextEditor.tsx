"use client";

import { Container, Col, Row } from "react-bootstrap";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), { ssr: false });

interface RichTextEditorProps {
    initialHtml?: string;
    onChange?: (html: string) => void;
    hasBorder?: boolean;
}

export default function RichTextEditor({ initialHtml = "", onChange, hasBorder = false }: RichTextEditorProps) {

    const handleChange = (content: string) => {
        if (onChange) onChange(content);
    };

    return (
        <Container className={hasBorder ? "border rounded p-3" : ""}>
            <Row>
                <Col>
                    <SunEditor
                        setContents={initialHtml}
                        onChange={handleChange}
                        setOptions={{
                            defaultStyle: "font-family: Arial; font-size: 16px; color: #000000;",
                            buttonList: [
                                ["bold", "italic", "underline"],
                                ["fullScreen"],
                            ],
                        }}
                    />
                </Col>
            </Row>
        </Container>
    );
}
