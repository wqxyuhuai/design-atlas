export const prompt = `Create a React text reveal component for product headlines and editorial tool surfaces. The effect should reveal each text segment with configurable split type, duration, stagger delay, easing, blur, and direction while keeping the visual tone quiet, precise, and Apple-like rather than flashy.

Configurable props: text, splitType, duration, staggerDelay, ease, direction, blur.

Requirements:
- Split text into word, character, or line spans.
- Use CSS variables for timing and transform.
- Support reduced-motion.
- Avoid layout shift as segments animate in.
- Do not introduce a large animation dependency unless the host app already uses one.
- Keep the final component reusable in landing pages, workbench headers, and case-study intros.`;
