import { ProjectVideoCard } from "../../../../components/video/ProjectVideoCard";
import type { EffectProps } from "../../../../types/effect";

function stringValue(value: EffectProps[string], fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function booleanValue(value: EffectProps[string], fallback: boolean) {
  return typeof value === "boolean" ? value : fallback;
}

export function CustomVideoPlayerDemo(props: EffectProps) {
  const previewMode = stringValue(props.previewMode, "") === "card" ? "card" : "demo";
  const mutedDefault = booleanValue(props.mutedDefault, true);
  const demoVideo = {
    duration: 21,
    mutedDefault,
    poster: "/effects/video-browser/custom-video-player/poster.webp",
    spriteColumns: 8,
    spriteFrameCount: 8,
    spriteRows: 1,
    spriteSrc: "/effects/video-browser/custom-video-player/sprite.jpg",
    src: "/effects/video-browser/custom-video-player/demo.mp4",
    title: "Custom video browser demo"
  };

  return (
    <div className={["videoBrowserDemo", previewMode === "card" ? "videoBrowserDemo--card" : ""].filter(Boolean).join(" ")}>
      <div className="videoBrowserDemo__shell">
        <p className="videoBrowserDemo__kicker">Project detail module</p>
        <h2 className="videoBrowserDemo__title">Custom video browser</h2>
        {previewMode === "card" ? (
          <div className="projectVideoCard projectVideoCard--card projectVideoCard--static" aria-hidden="true">
            <video autoPlay className="projectVideoCard__media" loop muted playsInline poster={demoVideo.poster} preload="metadata" src={demoVideo.src} />
            <span className="projectVideoCard__mobilePlay is-static">play !</span>
          </div>
        ) : (
          <ProjectVideoCard previewMode={previewMode} video={demoVideo} />
        )}
      </div>
    </div>
  );
}
