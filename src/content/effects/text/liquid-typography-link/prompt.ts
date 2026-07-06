export const prompt = `Create a reusable React typography link component inspired by the project-list interaction on thomasmonavon.com.

The component should render a bold uppercase title, an optional right-aligned index, and a stable divider line. It should use CSS clip-path/mask slicing rather than WebGL.

Requirements:
- Entrance: horizontal sliced liquid distortion resolves into sharp text.
- Exit: masked downward cut with a short sliced tear, then re-enter.
- Hover: only the pointer-adjacent text area distorts, with strength driven by pointer velocity.
- OPEN label: small cursor-following label that fades in on hover.
- Reduced motion: no liquid layer or animated transition.
- Performance: only the active row runs requestAnimationFrame and updates DOM style variables, not React state.`;
