import { Pause, Play, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import type { ProjectVideo } from "../../lib/video/videoTypes";
import { VideoScrubTimeline } from "./VideoScrubTimeline";

type VideoControlsProps = {
  currentTime: number;
  duration: number;
  isDimmed: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onTogglePlay: () => void;
  video: ProjectVideo;
};

export function VideoControls({
  currentTime,
  duration,
  isDimmed,
  isMuted,
  isPlaying,
  onSeek,
  onToggleMute,
  onTogglePlay,
  video
}: VideoControlsProps) {
  return (
    <div
      className={["videoControls", isDimmed ? "is-dimmed" : ""].filter(Boolean).join(" ")}
      onClick={(event) => event.stopPropagation()}
    >
      <button aria-label={isPlaying ? "Pause video" : "Play video"} className="videoControlButton" onClick={onTogglePlay} type="button">
        {isPlaying ? <Pause aria-hidden="true" size={18} weight="fill" /> : <Play aria-hidden="true" size={18} weight="fill" />}
      </button>
      <button aria-label={isMuted ? "Unmute video" : "Mute video"} className="videoControlButton" onClick={onToggleMute} type="button">
        {isMuted ? <SpeakerSlash aria-hidden="true" size={18} weight="fill" /> : <SpeakerHigh aria-hidden="true" size={18} weight="fill" />}
      </button>
      <VideoScrubTimeline currentTime={currentTime} duration={duration} onSeek={onSeek} video={video} />
    </div>
  );
}
