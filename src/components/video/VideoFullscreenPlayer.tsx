import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "../../lib/video/videoTypes";
import { CursorBubble } from "./CursorBubble";
import { VideoControls } from "./VideoControls";

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type VideoFullscreenPlayerProps = {
  video: ProjectVideo;
  onClose: () => void;
};

export function VideoFullscreenPlayer({ video, onClose }: VideoFullscreenPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const closeBubbleRef = useRef<HTMLSpanElement | null>(null);
  const cloudRef = useRef<HTMLSpanElement | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const bubbleRef = useRef({ x: 0, y: 0 });
  const auraRef = useRef({ x: 0, y: 0 });
  const [isClosing, setIsClosing] = useState(false);
  const [isDimmed, setIsDimmed] = useState(false);
  const [isMuted, setIsMuted] = useState(video.mutedDefault ?? true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(video.duration || 0);
  const [currentTime, setCurrentTime] = useState(0);

  const closePlayer = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    window.setTimeout(onClose, prefersReducedMotion() ? 0 : 460);
  }, [isClosing, onClose]);

  const togglePlay = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    if (element.paused) {
      void element.play();
    } else {
      element.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const element = videoRef.current;
    if (!element) return;
    element.muted = !element.muted;
    setIsMuted(element.muted);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return undefined;

    element.muted = video.mutedDefault ?? true;
    const playPromise = element.play();
    if (playPromise) playPromise.catch(() => setIsPlaying(false));

    const syncPlayback = () => {
      setIsPlaying(!element.paused);
      setIsMuted(element.muted);
      setCurrentTime(element.currentTime || 0);
      if (Number.isFinite(element.duration)) setDuration(element.duration);
    };
    const syncTime = () => setCurrentTime(element.currentTime || 0);
    const syncDuration = () => {
      if (Number.isFinite(element.duration)) setDuration(element.duration);
    };

    element.addEventListener("play", syncPlayback);
    element.addEventListener("pause", syncPlayback);
    element.addEventListener("loadedmetadata", syncDuration);
    element.addEventListener("timeupdate", syncTime);

    return () => {
      element.pause();
      element.removeEventListener("play", syncPlayback);
      element.removeEventListener("pause", syncPlayback);
      element.removeEventListener("loadedmetadata", syncDuration);
      element.removeEventListener("timeupdate", syncTime);
    };
  }, [video.mutedDefault, video.src]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePlayer();
      }
      if (event.code === "Space") {
        event.preventDefault();
        togglePlay();
      }
      if (event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closePlayer, toggleMute, togglePlay]);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const tick = () => {
      const target = targetRef.current;
      const bubble = bubbleRef.current;
      const aura = auraRef.current;
      bubble.x += (target.x - bubble.x) * 0.12;
      bubble.y += (target.y - bubble.y) * 0.12;
      aura.x += (target.x - aura.x) * 0.06;
      aura.y += (target.y - aura.y) * 0.06;

      if (closeBubbleRef.current) {
        closeBubbleRef.current.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0) translate(-50%, -50%)`;
      }
      if (cloudRef.current) {
        cloudRef.current.style.transform = `translate3d(${aura.x}px, ${aura.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    targetRef.current = { x: event.clientX, y: event.clientY };
    if (bubbleRef.current.x === 0 && bubbleRef.current.y === 0) {
      bubbleRef.current = { x: event.clientX, y: event.clientY };
      auraRef.current = { x: event.clientX, y: event.clientY };
    }
    setIsDimmed(false);
    if (inactivityTimerRef.current !== null) window.clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = window.setTimeout(() => setIsDimmed(true), 2000);
  }

  function seekTo(time: number) {
    const element = videoRef.current;
    if (!element || !Number.isFinite(time)) return;
    element.currentTime = time;
    setCurrentTime(time);
  }

  return (
    <div
      aria-label="Fullscreen video player"
      aria-modal="true"
      className={["videoPlayerOverlay", isClosing ? "is-closing" : "", isDimmed ? "is-idle" : ""].filter(Boolean).join(" ")}
      onClick={closePlayer}
      onPointerMove={handlePointerMove}
      role="dialog"
    >
      <span className="videoPlayerOverlay__backdrop" style={{ backgroundImage: video.poster ? `url(${video.poster})` : undefined }} />
      <span className="videoPlayerOverlay__cloud" ref={cloudRef} />
      <CursorBubble className="videoCursorBubble--close" label="close" ref={closeBubbleRef} visible={!isDimmed} />
      <div className="videoPlayerOverlay__stage">
        <video
          className="videoPlayerOverlay__video"
          controls={false}
          muted={isMuted}
          playsInline
          poster={video.poster}
          ref={videoRef}
          src={video.src}
        />
      </div>
      <VideoControls
        currentTime={currentTime}
        duration={duration}
        isDimmed={isDimmed}
        isMuted={isMuted}
        isPlaying={isPlaying}
        onSeek={seekTo}
        onToggleMute={toggleMute}
        onTogglePlay={togglePlay}
        video={{ ...video, duration }}
      />
    </div>
  );
}
