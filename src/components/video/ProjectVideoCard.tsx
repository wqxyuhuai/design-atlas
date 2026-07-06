import type { PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "../../lib/video/videoTypes";
import { CursorBubble } from "./CursorBubble";
import { VideoFullscreenPlayer } from "./VideoFullscreenPlayer";
import "./video-player.css";

type ProjectVideoCardProps = {
  video: ProjectVideo;
  className?: string;
  previewMode?: "demo" | "card";
};

function canHover() {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function ProjectVideoCard({ video, className = "", previewMode = "demo" }: ProjectVideoCardProps) {
  const bubbleRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!canHover()) return undefined;

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;

      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function updateTarget(clientX: number, clientY: number) {
    targetRef.current = { x: clientX, y: clientY };
    if (currentRef.current.x === 0 && currentRef.current.y === 0) {
      currentRef.current = { x: clientX, y: clientY };
    }
  }

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    updateTarget(event.clientX, event.clientY);
  }

  return (
    <>
      <button
        aria-label={`Play ${video.title || "project video"}`}
        className={[
          "projectVideoCard",
          previewMode === "card" ? "projectVideoCard--card" : "",
          isHovering ? "is-hovering" : "",
          className
        ].filter(Boolean).join(" ")}
        onClick={() => setIsOpen(true)}
        onPointerEnter={(event) => {
          setIsHovering(true);
          handlePointerMove(event);
        }}
        onPointerLeave={() => setIsHovering(false)}
        onPointerMove={handlePointerMove}
        type="button"
      >
        <video
          aria-hidden="true"
          autoPlay
          className="projectVideoCard__media"
          loop
          muted
          playsInline
          poster={video.poster}
          preload="metadata"
          src={video.src}
        />
        <span className="projectVideoCard__mobilePlay">play !</span>
      </button>
      <CursorBubble className="videoCursorBubble--play" label="play !" ref={bubbleRef} visible={isHovering} />
      {isOpen ? <VideoFullscreenPlayer onClose={() => setIsOpen(false)} video={video} /> : null}
    </>
  );
}
