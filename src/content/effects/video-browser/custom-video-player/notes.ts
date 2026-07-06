export const notes = `Use this for project detail pages where a video should feel like part of the visual system instead of a browser-default embed.

Implementation notes:
- The cover hover label and fullscreen close label are fixed-position cursor pills driven by requestAnimationFrame lerp.
- The fullscreen player does not call the native Fullscreen API and does not expose native video controls.
- The bottom scrubber supports prebuilt sprite sheets and falls back to generated canvas thumbnails when no sprite is supplied.
- Esc closes the player, Space toggles playback, and M toggles mute.
- Body scroll is locked while the overlay is mounted and restored on cleanup.
- Mobile and reduced-motion modes disable the cloud and cursor-following layers.`;
