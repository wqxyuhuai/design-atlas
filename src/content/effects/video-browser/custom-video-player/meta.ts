import projectVideoCardSource from "../../../../components/video/ProjectVideoCard.tsx?raw";
import cursorBubbleSource from "../../../../components/video/CursorBubble.tsx?raw";
import videoFullscreenPlayerSource from "../../../../components/video/VideoFullscreenPlayer.tsx?raw";
import videoControlsSource from "../../../../components/video/VideoControls.tsx?raw";
import videoScrubTimelineSource from "../../../../components/video/VideoScrubTimeline.tsx?raw";
import videoPlayerStyles from "../../../../components/video/video-player.css?raw";
import videoTypesSource from "../../../../lib/video/videoTypes.ts?raw";
import { CustomVideoPlayerDemo } from "./CustomVideoPlayerDemo";
import { code } from "./code";
import { notes } from "./notes";
import { prompt } from "./prompt";
import { source } from "./source";
import type { DesignEffect } from "../../../../types/effect";

export const customVideoPlayerEffect: DesignEffect = {
  id: "custom-video-player",
  slug: "custom-video-player",
  title: "Custom Video Player",
  type: "Fullscreen Player / Thumbnail Timeline",
  componentName: "ProjectVideoCard",
  category: "video-browser",
  status: "implemented",
  description: "A project video cover that opens a custom fullscreen player with delayed cursor labels, a soft cursor aura, keyboard shortcuts, and a thumbnail scrub timeline.",
  tags: ["video", "fullscreen", "player", "thumbnail-timeline", "cursor", "portfolio", "project-detail"],
  useCases: ["Project detail hero video", "Portfolio case study media", "Immersive video browser", "Campaign film preview"],
  sourceUrl: "https://pacomepertant.com/projects/paths-of-life",
  author: "Design Atlas",
  licenseNote: "Original Design Atlas implementation inspired by the supplied reference screenshots and local Carl Wang Studio resource. No third-party source code is copied.",
  note: notes,
  visualStyle: "Black immersive video stage with small green cursor pills, a soft purple-red cursor cloud, a centered translucent white control capsule, and a thumbnail-based scrub track.",
  motionLogic: "Pointer labels and cloud positions are driven by requestAnimationFrame lerp. Opening uses opacity and transform only; controls dim after two seconds of pointer inactivity.",
  reusable: {
    componentName: "ProjectVideoCard",
    componentPath: "src/components/video/ProjectVideoCard.tsx",
    demoPath: "/workbench/video-browser/custom-video-player",
    codeType: "react"
  },
  previewComponent: CustomVideoPlayerDemo,
  defaultProps: {
    mutedDefault: true
  },
  controls: [
    {
      key: "mutedDefault",
      label: "Muted By Default",
      type: "boolean",
      defaultValue: true,
      description: "Start fullscreen playback muted so autoplay is allowed consistently.",
      level: "primary"
    }
  ],
  parameters: [
    {
      key: "mutedDefault",
      label: "Muted By Default",
      type: "boolean",
      defaultValue: true,
      description: "Start fullscreen playback muted so autoplay is allowed consistently.",
      level: "primary"
    }
  ],
  propsDocs: [
    { property: "video.src", type: "string", defaultValue: "/video.mp4", description: "Video file URL." },
    { property: "video.poster", type: "string", defaultValue: "/poster.webp", description: "Poster shown on the card and blurred fullscreen backdrop." },
    { property: "video.spriteSrc", type: "string", defaultValue: "/sprite.jpg", description: "Optional sprite sheet for the thumbnail timeline." },
    { property: "video.spriteFrameCount", type: "number", defaultValue: 8, description: "Number of frames to show in the scrubber." },
    { property: "video.spriteColumns", type: "number", defaultValue: 8, description: "Sprite sheet column count." },
    { property: "video.spriteRows", type: "number", defaultValue: 1, description: "Sprite sheet row count." },
    { property: "video.duration", type: "number", defaultValue: 21, description: "Optional known duration for immediate progress calculations." },
    { property: "video.mutedDefault", type: "boolean", defaultValue: true, description: "Initial muted state for fullscreen playback." }
  ],
  dependencies: [{ name: "Phosphor Icons", packageName: "@phosphor-icons/react", url: "https://phosphoricons.com/" }],
  codeFiles: [
    { filename: "ProjectVideoCard.tsx", language: "tsx", code: projectVideoCardSource },
    { filename: "VideoFullscreenPlayer.tsx", language: "tsx", code: videoFullscreenPlayerSource },
    { filename: "VideoControls.tsx", language: "tsx", code: videoControlsSource },
    { filename: "VideoScrubTimeline.tsx", language: "tsx", code: videoScrubTimelineSource },
    { filename: "CursorBubble.tsx", language: "tsx", code: cursorBubbleSource },
    { filename: "videoTypes.ts", language: "tsx", code: videoTypesSource },
    { filename: "video-player.css", language: "css", code: videoPlayerStyles }
  ],
  code,
  prompt,
  notes,
  source,
  createdAt: "2026-07-06"
};
