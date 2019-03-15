# Wheelsky :beer:

[Subset](https://github.com/kissu/wheelsky/blob/v0.7/src/data/whiskyFlavors.json) of useful data.
[Initial arc path](https://codepen.io/osublake/pen/OmgMNm) inspiration.

Time to clean the whole thing...

### Interesting stuff
[`xlink:href`]([https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#Browser_compatibility)) is deprecated but I keep it for compatibility issues
_meh safari..._

Very interesting topic on [SVG transformations](https://css-tricks.com/transforms-on-svg-elements).

### Todo
- [x] check if doing a negative `viewBox` may be useful or not for rotation w/ `Draggable` (aka `-40 -40 80 80`)
- [x] variabilize all the stuff
- [ ] find how to multi line split `textPath`, or doing it the ugly way by some length and split of the string
- [ ] find out how to make the text length a bit more dynamic
- [ ] try out the GSAP rotation
- [ ] move the whole SVG to make it half wheel-ed
- [ ] see what should we do when we do only have 1 flavour (still need a half wheel)
- [ ] what to do in case we only have 1 flavour ?
- [ ] make the stop points on each entry

#### Bonus features
- [ ] find some nice themed effects, like [submit success on a form](https://codepen.io/andrewmillen/pen/MoKLob) or [beautiful form](https://codepen.io/ainalem/pen/EQXjOR)
- [ ] make staggery animation on the flavours mount
