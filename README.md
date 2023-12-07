# Demo: Puzzle Image Carousel

-   Run with `npm run dev`
-   Stack: vite, react, tailwind

## Design Idea

The design for this component was created by the agcency
<a href="https://www.hellomonday.com/">Hello Monday</a> during an early phase for a larger
project. Even though this component didn&rsquo;t make it to the final website, I had a lot of fun developing it.

## Technical concept

Clip images with <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path">CSS clip-path</a> referencing an svg consisting of multiple rectangles. Animate those rectangles with framer-motion's <a href="https://www.framer.com/motion/component/">`<motion.rect>`</a>.

## Implementation

In this implementation, each of the slides renders a couple of
<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/">`<rect>`</a> elements in
addition to the actual image. Those elements are then referenced by css
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path">`clip-path: url(#id)`</a> to cut
out the corresponding areas of the image.

From here on we can animate the size of the svg
<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/">`<rect>`</a> elements to
create the &ldquo;puzzle&rdquo; effect. In our case this is done with
<a href="https://www.framer.com/motion/component/">`<motion.rect>`</a>. To make it even more
interesting, we apply randomness to the position and size to the
<a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/">`<rect>`</a> elements on every
transition. This way that the animation always look slightly different every time it is executed.
