import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ProjectVideo } from "../../lib/video/videoTypes";

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

async function generateVideoThumbs(src: string, count: number) {
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.muted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = src;

  await new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("thumbnail metadata timeout")), 8000);
    video.onloadedmetadata = () => {
      window.clearTimeout(timeout);
      resolve();
    };
    video.onerror = () => {
      window.clearTimeout(timeout);
      reject(new Error("thumbnail metadata failed"));
    };
  });

  const duration = Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 1;
  const canvas = document.createElement("canvas");
  const width = 96;
  const height = 54;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return [];

  const thumbs: string[] = [];
  for (let index = 0; index < count; index += 1) {
    const target = duration * ((index + 0.5) / count);
    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error("thumbnail seek timeout")), 5000);
      video.onseeked = () => {
        window.clearTimeout(timeout);
        resolve();
      };
      video.onerror = () => {
        window.clearTimeout(timeout);
        reject(new Error("thumbnail seek failed"));
      };
      video.currentTime = clamp(target / duration) * duration;
    });
    context.drawImage(video, 0, 0, width, height);
    thumbs.push(canvas.toDataURL("image/jpeg", 0.72));
  }

  video.removeAttribute("src");
  video.load();
  return thumbs;
}

function spriteFrameStyle(video: ProjectVideo, frameIndex: number, frameCount: number): CSSProperties {
  const columns = video.spriteColumns || frameCount;
  const rows = video.spriteRows || 1;
  const column = frameIndex % columns;
  const row = Math.floor(frameIndex / columns);
  const x = columns <= 1 ? 0 : (column / (columns - 1)) * 100;
  const y = rows <= 1 ? 0 : (row / (rows - 1)) * 100;

  return {
    backgroundImage: `url(${video.spriteSrc})`,
    backgroundPosition: `${x}% ${y}%`,
    backgroundSize: `${columns * 100}% ${rows * 100}%`
  };
}

type VideoScrubTimelineProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  video: ProjectVideo;
};

export function VideoScrubTimeline({ currentTime, duration, onSeek, video }: VideoScrubTimelineProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [generatedThumbs, setGeneratedThumbs] = useState<{ items: string[]; src: string } | null>(null);
  const frameCount = video.spriteFrameCount || 8;
  const progress = duration > 0 ? clamp(currentTime / duration) : 0;
  const fallbackThumbs = useMemo(
    () => (!video.spriteSrc && video.poster ? Array.from({ length: frameCount }, () => video.poster as string) : []),
    [frameCount, video.poster, video.spriteSrc]
  );
  const thumbs = generatedThumbs?.src === video.src ? generatedThumbs.items : fallbackThumbs;

  useEffect(() => {
    let cancelled = false;
    if (video.spriteSrc) return undefined;

    generateVideoThumbs(video.src, frameCount)
      .then((items) => {
        if (!cancelled && items.length > 0) setGeneratedThumbs({ items, src: video.src });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [frameCount, video.spriteSrc, video.src]);

  function timeFromClientX(clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect || duration <= 0) return 0;
    return clamp((clientX - rect.left) / rect.width) * duration;
  }

  function seekFromClientX(clientX: number) {
    const nextTime = timeFromClientX(clientX);
    setHoverTime(nextTime);
    onSeek(nextTime);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsScrubbing(true);
    seekFromClientX(event.clientX);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const nextTime = timeFromClientX(event.clientX);
    setHoverTime(nextTime);
    if (isScrubbing) onSeek(nextTime);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsScrubbing(false);
    seekFromClientX(event.clientX);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (duration <= 0) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.shiftKey ? 10 : 2;
    onSeek(clamp((currentTime + (event.key === "ArrowRight" ? step : -step)) / duration) * duration);
  }

  return (
    <div
      aria-label="Video timeline"
      aria-valuemax={duration || 0}
      aria-valuemin={0}
      aria-valuenow={currentTime || 0}
      className="videoScrubTimeline"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerLeave={() => {
        if (!isScrubbing) setHoverTime(null);
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={trackRef}
      role="slider"
      style={{ "--video-progress": `${progress * 100}%` } as CSSProperties}
      tabIndex={0}
    >
      <div className="videoScrubTimeline__strip">
        {video.spriteSrc ? (
          Array.from({ length: frameCount }, (_, index) => (
            <span className="videoScrubTimeline__thumb" key={index} style={spriteFrameStyle(video, index, frameCount)} />
          ))
        ) : thumbs.length > 0 ? (
          thumbs.map((thumb, index) => <span className="videoScrubTimeline__thumb" key={`${thumb}-${index}`} style={{ backgroundImage: `url(${thumb})` }} />)
        ) : (
          Array.from({ length: frameCount }, (_, index) => <span className="videoScrubTimeline__thumb is-loading" key={index} />)
        )}
      </div>
      <span className="videoScrubTimeline__progress" />
      {hoverTime !== null ? <span className="videoScrubTimeline__time">{formatTime(hoverTime)}</span> : null}
    </div>
  );
}
