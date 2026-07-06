import { NotionInboxPreview } from "../../_shared/NotionInboxPreview";
import notionInboxPreviewSource from "../../_shared/NotionInboxPreview.tsx?raw";
import {
  bool,
  codeFile,
  color,
  createImportedEffect,
  range,
  select,
  text,
  withRenderer,
  withRendererProps
} from "../../_shared/importedEffectFactory";

export const infiniteCanvasEffect = createImportedEffect({
  ...{
    slug: "infinite-canvas",
    title: "Infinite Canvas",
    category: "media",
    sourceUrl: "https://tympanus.net/Tutorials/InfiniteCanvas/",
    description: "Large draggable-feeling media board with tiled images drifting across an infinite canvas.\nsource: https://tympanus.net/Tutorials/InfiniteCanvas/",
    visualStyle: "A pale WebGL space where upright artwork planes float around a clear central title under a minimal difference-blend frame.",
    motionLogic: "Uses a React Three Fiber scene with deterministic chunked artwork planes, drag-to-pan velocity, unbounded wheel-driven depth travel, fog depth, and distance-based fading.",
    defaultProps: withRendererProps("infinite-canvas", {
      tileCount: 24,
      scale: 1
    }),
    controls: withRenderer("infinite-canvas", [
      range("tileCount", "Tile Count", 24, 10, 32, 1, "Number of artwork textures reused by the infinite canvas."),
      range("scale", "Scale", 1, 0.72, 1.35, 0.01, "Canvas scale.", "primary")
    ]),
    dependencies: []
  },
  previewComponent: NotionInboxPreview,
  codeFiles: [
  codeFile("NotionInboxPreview.tsx", "tsx", notionInboxPreviewSource)
  ]
});
