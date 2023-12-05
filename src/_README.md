Idea of this animation:

- each image also renders a svg, gives this svg an id and sets this is in it's clip-path
- the svg consists of 3 rectangels that are big enough to cover the whole screen
- css's clip path makes everything visible that is covered by a rectangle
- to trigger the animation, scale down the rectangels (e.g. `.rect1{scale(0.12)}`)
- animate this with framer-motion using `<motion.rect>`

The implementation is making use of css
