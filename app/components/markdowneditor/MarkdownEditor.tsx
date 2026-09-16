"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./markdown.css";

type EditorMode = "view" | "edit";

type ToolbarAction =
    | { kind: "wrap"; before: string; after: string; placeholder: string }
    | { kind: "line"; prefix: string; placeholder: string; strip?: RegExp }
    | { kind: "orderedLine"; placeholder: string }
    | { kind: "block"; text: string };

interface ToolbarButton {
    label: string;
    title: string;
    action: ToolbarAction;
}

const TOOLBAR: ToolbarButton[][] = [
    [
        { label: "H1", title: "Heading 1", action: { kind: "line", prefix: "# ", placeholder: "Heading", strip: /^#{1,6}\s+/ } },
        { label: "H2", title: "Heading 2", action: { kind: "line", prefix: "## ", placeholder: "Heading", strip: /^#{1,6}\s+/ } },
        { label: "H3", title: "Heading 3", action: { kind: "line", prefix: "### ", placeholder: "Heading", strip: /^#{1,6}\s+/ } },
    ],
    [
        { label: "B", title: "Bold (Ctrl+B)", action: { kind: "wrap", before: "**", after: "**", placeholder: "bold" } },
        { label: "I", title: "Italic (Ctrl+I)", action: { kind: "wrap", before: "*", after: "*", placeholder: "italic" } },
        { label: "S", title: "Strikethrough", action: { kind: "wrap", before: "~~", after: "~~", placeholder: "strike" } },
        { label: "</>", title: "Inline code", action: { kind: "wrap", before: "`", after: "`", placeholder: "code" } },
    ],
    [
        { label: "UL", title: "Bullet list", action: { kind: "line", prefix: "- ", placeholder: "item", strip: /^(?:[-*+]|\d+\.)\s+(?:\[[ x]\]\s+)?/ } },
        { label: "OL", title: "Numbered list", action: { kind: "orderedLine", placeholder: "item" } },
        { label: "[ ]", title: "Task list", action: { kind: "line", prefix: "- [ ] ", placeholder: "task", strip: /^(?:[-*+]|\d+\.)\s+(?:\[[ x]\]\s+)?/ } },
        { label: '"', title: "Quote", action: { kind: "line", prefix: "> ", placeholder: "quote" } },
    ],
    [
        { label: "Link", title: "Link", action: { kind: "wrap", before: "[", after: "](https://)", placeholder: "text" } },
        { label: "Img", title: "Image", action: { kind: "wrap", before: "![", after: "](https://)", placeholder: "alt" } },
        { label: "Code", title: "Code block", action: { kind: "block", text: "```\ncode\n```" } },
        { label: "Table", title: "Table", action: { kind: "block", text: "| Column | Column |\n| --- | --- |\n| cell | cell |" } },
        { label: "---", title: "Divider", action: { kind: "block", text: "---" } },
    ],
];

interface EditResult {
    text: string;
    start: number;
    end: number;
}

function applyWrap(text: string, start: number, end: number, before: string, after: string, placeholder: string): EditResult {
    const alreadyWrapped =
        text.slice(start - before.length, start) === before &&
        text.slice(end, end + after.length) === after;

    if (alreadyWrapped) {
        return {
            text: text.slice(0, start - before.length) + text.slice(start, end) + text.slice(end + after.length),
            start: start - before.length,
            end: end - before.length,
        };
    }

    const selected = text.slice(start, end) || placeholder;
    return {
        text: text.slice(0, start) + before + selected + after + text.slice(end),
        start: start + before.length,
        end: start + before.length + selected.length,
    };
}

function applyLinePrefix(text: string, start: number, end: number, prefix: string, placeholder: string, strip?: RegExp): EditResult {
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const newlineAfter = text.indexOf("\n", end);
    const lineEnd = newlineAfter === -1 ? text.length : newlineAfter;

    const lines = (text.slice(lineStart, lineEnd) || placeholder).split("\n");
    const removing = lines.every(line => line.startsWith(prefix));

    const updated = lines
        .map(line => (removing ? line.slice(prefix.length) : prefix + (strip ? line.replace(strip, "") : line)))
        .join("\n");

    return {
        text: text.slice(0, lineStart) + updated + text.slice(lineEnd),
        start: lineStart,
        end: lineStart + updated.length,
    };
}

function applyOrderedList(text: string, start: number, end: number, placeholder: string): EditResult {
    const lineStart = text.lastIndexOf("\n", start - 1) + 1;
    const newlineAfter = text.indexOf("\n", end);
    const lineEnd = newlineAfter === -1 ? text.length : newlineAfter;

    const lines = (text.slice(lineStart, lineEnd) || placeholder).split("\n");
    const removing = lines.every(line => /^\d+\.\s+/.test(line));

    const updated = lines
        .map((line, index) => (removing ? line.replace(/^\d+\.\s+/, "") : `${index + 1}. ${line.replace(/^(?:[-*+]|\d+\.)\s+(?:\[[ x]\]\s+)?/, "")}`))
        .join("\n");

    return {
        text: text.slice(0, lineStart) + updated + text.slice(lineEnd),
        start: lineStart,
        end: lineStart + updated.length,
    };
}

function applyInsert(text: string, start: number, end: number, insert: string): EditResult {
    return {
        text: text.slice(0, start) + insert + text.slice(end),
        start: start + insert.length,
        end: start + insert.length,
    };
}

function applyBlock(text: string, start: number, end: number, block: string): EditResult {
    const before = text.slice(0, start);
    const after = text.slice(end);
    const lead = before === "" || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
    const trail = after.startsWith("\n") ? "\n" : "\n\n";

    return {
        text: before + lead + block + trail + after,
        start: start + lead.length,
        end: start + lead.length + block.length,
    };
}

function runAction(text: string, start: number, end: number, action: ToolbarAction): EditResult {
    switch (action.kind) {
        case "wrap":
            return applyWrap(text, start, end, action.before, action.after, action.placeholder);
        case "line":
            return applyLinePrefix(text, start, end, action.prefix, action.placeholder, action.strip);
        case "orderedLine":
            return applyOrderedList(text, start, end, action.placeholder);
        case "block":
            return applyBlock(text, start, end, action.text);
    }
}

interface MarkdownEditorProps {
    value?: string;
    onChange?: (markdown: string) => void;
    hasBorder?: boolean;
}

export default function MarkdownEditor({ value = "", onChange, hasBorder = false }: MarkdownEditorProps) {

    const [mode, setMode] = useState<EditorMode>("view");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const pendingSelection = useRef<[number, number] | null>(null);

    // Toolbar edits rewrite the whole document, so the caret has to be restored once
    // the parent has echoed the new value back into the textarea. The textarea also
    // grows with its content, keeping the page as the only scroll container.
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;

        if (!pendingSelection.current) return;

        const [start, end] = pendingSelection.current;
        pendingSelection.current = null;
        textarea.focus();
        textarea.setSelectionRange(start, end);
    });

    function apply(result: EditResult) {
        if (!onChange) return;
        pendingSelection.current = [result.start, result.end];
        onChange(result.text);
    }

    function dispatch(action: ToolbarAction) {
        const textarea = textareaRef.current;
        if (!textarea) return;
        apply(runAction(value, textarea.selectionStart, textarea.selectionEnd, action));
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const textarea = event.currentTarget;

        if (event.key === "Tab") {
            event.preventDefault();
            apply(applyInsert(value, textarea.selectionStart, textarea.selectionEnd, "  "));
            return;
        }

        if (!event.ctrlKey && !event.metaKey) return;

        const key = event.key.toLowerCase();
        if (key === "b") {
            event.preventDefault();
            dispatch({ kind: "wrap", before: "**", after: "**", placeholder: "bold" });
        } else if (key === "i") {
            event.preventDefault();
            dispatch({ kind: "wrap", before: "*", after: "*", placeholder: "italic" });
        }
    }

    return (
        <Container className={hasBorder ? "border rounded p-3" : ""}>
            <Row className="align-items-center gap-2 mb-2">
                <Col xs="auto">
                    <ButtonGroup size="sm">
                        <Button
                            variant={mode === "view" ? "secondary" : "outline-secondary"}
                            onClick={() => setMode("view")}
                            title="Preview the rendered markdown"
                        >
                            View
                        </Button>
                        <Button
                            variant={mode === "edit" ? "secondary" : "outline-secondary"}
                            onClick={() => setMode("edit")}
                            title="Edit the markdown source"
                        >
                            Edit
                        </Button>
                    </ButtonGroup>
                </Col>
                {mode === "edit" && TOOLBAR.map((group, groupIndex) => (
                    <Col xs="auto" key={groupIndex}>
                        <ButtonGroup size="sm">
                            {group.map(button => (
                                <Button
                                    key={button.label}
                                    variant="outline-secondary"
                                    title={button.title}
                                    onMouseDown={event => event.preventDefault()}
                                    onClick={() => dispatch(button.action)}
                                >
                                    {button.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    {mode === "edit" ? (
                        <textarea
                            ref={textareaRef}
                            className="md-source"
                            value={value}
                            spellCheck={false}
                            placeholder="# Write markdown here"
                            onChange={event => onChange?.(event.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <div className="md-preview" onDoubleClick={() => setMode("edit")}>
                            {value.trim() === "" ? (
                                <p className="md-empty">Nothing here yet — hit Edit to start writing.</p>
                            ) : (
                                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                                    {value}
                                </Markdown>
                            )}
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
