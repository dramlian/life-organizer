'use client';

import { useEffect, useRef, useState } from "react";
import "./pulltorefresh.css";

const THRESHOLD = 64;
const MAX_PULL = 80;

export default function PullToRefresh() {
    const [pull, setPull] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const startY = useRef<number | null>(null);

    useEffect(() => {
        function hasScrolledAncestor(target: EventTarget | null): boolean {
            let node = target instanceof Element ? target : null;
            while (node && node !== document.documentElement) {
                if (node.scrollTop > 0) return true;
                node = node.parentElement;
            }
            return false;
        }

        function onTouchStart(e: TouchEvent) {
            if (e.touches.length !== 1) return;
            if ((document.scrollingElement?.scrollTop ?? 0) > 0) return;
            if (hasScrolledAncestor(e.target)) return;
            startY.current = e.touches[0].clientY;
        }

        function onTouchMove(e: TouchEvent) {
            if (startY.current === null) return;
            const delta = e.touches[0].clientY - startY.current;
            if (delta < 0 || (document.scrollingElement?.scrollTop ?? 0) > 0) {
                startY.current = null;
                setPull(0);
                return;
            }
            setPull(Math.min(delta / 2, MAX_PULL));
        }

        function onTouchEnd() {
            if (startY.current === null) return;
            startY.current = null;
            setPull(current => {
                if (current >= THRESHOLD) {
                    setRefreshing(true);
                    window.location.reload();
                    return current;
                }
                return 0;
            });
        }

        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: true });
        window.addEventListener("touchend", onTouchEnd);
        window.addEventListener("touchcancel", onTouchEnd);
        return () => {
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
            window.removeEventListener("touchcancel", onTouchEnd);
        };
    }, []);

    if (pull <= 0 && !refreshing) return null;

    const progress = Math.min(pull / THRESHOLD, 1);

    return (
        <div
            className={`ptr-indicator${refreshing ? " ptr-refreshing" : ""}`}
            style={{
                transform: `translateX(-50%) translateY(${pull - 48}px)`,
                opacity: refreshing ? 1 : progress,
            }}
        >
            <span
                className="ptr-arrow"
                style={refreshing ? undefined : { transform: `rotate(${progress * 180}deg)` }}
            >
                {refreshing ? "↻" : "↓"}
            </span>
        </div>
    );
}
