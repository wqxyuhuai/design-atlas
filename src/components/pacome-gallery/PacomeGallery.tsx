import { useEffect, useState } from "react";
import { galleryProjects } from "./galleryData";
import { PacomeGalleryCanvas } from "./PacomeGalleryCanvas";
import { PacomeGalleryUI, type GalleryMode } from "./PacomeGalleryUI";
import { useVirtualScroll } from "./useVirtualScroll";
import "./pacome-gallery.css";

export function PacomeGallery() {
  const [mode, setMode] = useState<GalleryMode>("spiral");
  const { scrollRef, isDragging, handlers } = useVirtualScroll();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={`pacome-gallery${isDragging ? " is-dragging" : ""}`} {...handlers}>
      <PacomeGalleryCanvas projects={galleryProjects} mode={mode} scrollRef={scrollRef} />
      <PacomeGalleryUI mode={mode} onModeChange={setMode} />
    </div>
  );
}
