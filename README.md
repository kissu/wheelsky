# Wheelsky :beer:

Time to clean the whole thing...

### Interesting stuff
[`xlink:href`]([https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use#Browser_compatibility)) is deprecated but I keep it for compatibility issues
_meh safari..._

Very interesting topic on [SVG transformations](https://css-tricks.com/transforms-on-svg-elements).

### Todo
- [ ] check if doing a negative `viewBox` may be useful or not for rotation w/ `Draggable` (aka `-40 -40 80 80`)
- [ ] find how to multi line split `textPath`, or doing it the ugly way by some length and split of the string
- [ ] find out how to make the text length a bit more dynamic
- [ ] variabilize all the stuff
- [ ] try out the GSAP rotation
- [ ] move the whole SVG to make it half wheel-ed
- [ ] make the stop points on each entry

#### Bonus features
- [ ] find some nice themed effects, like [submit success on a form](https://codepen.io/andrewmillen/pen/MoKLob) or [beautiful form](https://codepen.io/ainalem/pen/EQXjOR)

## Backup of the actual working Codepen

```html
<!-- Learn about this code on MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse -->

<svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg">
<!--   <path d="M 500 200
    A 250 250 0 0 1 500 500
    L 350 350z" transform='rotate(0)'/> -->
<!--     <path d="M 420.71067811865476 279.28932188134524
    A 100 100 0 1 0 420.71067811865476 420.71067811865476
    L 350 350z" fill="orange" /> -->
<!--     <path d="M 420.71067811865476 279.28932188134524
    A 100 100 0 1 1 420.71067811865476 420.71067811865476
    L 350 350z" fill="grey" /> -->
    <path d="M 420.71067811865476 279.28932188134524
    A 100 100 0 0 1 420.71067811865476 420.71067811865476
    L 350 350" fill="teal" />
    <path id="my_path" d="M 420.71067811865476 420.71067811865476
    A 100 100 0 0 0 420.71067811865476 279.28932188134524" fill="red" />
  <!--     <path id="my_path" d="M 385 385
    A 50 50 0 0 0 385 314" fill="red" /> -->
<!--     <path id="my_path" d="M 420.71067811865476 279.28932188134524
    A 100 100 0 0 0 420.71067811865476 420.71067811865476
    L 350 350z" fill="red" /> -->

    <text>
      <textPath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#my_path" text-anchor="middle" startOffset="50%">
        <tspan x="0" dy="-5px">
          Miel de citronnier
        </tspan>
      </textPath>
    </text>
<!--     <path d="M 420.71067811865476 420.71067811865476
    A 100 100 0 0 1 279.28932188134524 420.71067811865476
    L 350 350z" fill="cyan" /> -->

    <circle cx="350" cy="350" r="20" fill="lime"/>
</svg>

<!--
  M ${x1} ${y1}
  A ${rx} ${ry} 0 0 1 ${x2} ${y2}
  L ${cx} ${cy}z`
-->
```

```js
//   // Convert degrees to radians
// //   var a1 = startAngle * Math.PI / 180;
// a1 => 2.356194490192345 = (45 + 90) * Math.PI / 180
// //   var a2 = (startAngle + sweepAngle) * Math.PI / 180;
// a2 => 3.9269908169872414 = (45 + 180) * Math.PI / 180

// // center of the circle
// cx => 350
// cy => 350
// //   // Calculate start and end coords for arc. Starts at 12 o'clock
// rx => 100
// ry => 100
// //   var x1 = cx + rx * Math.sin(a1);
// x1 => 420.71067811865476 = 350 + 100 * Math.sin(2.356194490192345)
// //   var y1 = cy - ry * Math.cos(a1);
// y1 => 279.28932188134524 = 350 - 100 * Math.sin(2.356194490192345)

// //   var x2 = cx + rx * Math.sin(a2);
// x2 => 279.28932188134524 = 350 + 100 * Math.sin(3.9269908169872414)
// //   var y2 = cy - ry * Math.cos(a2);
// y2 => 420.71067811865476 = 350 - 100 * Math.cos(3.9269908169872414)

// ---
// x1 = 385
// y1 = 314
// x2 = 314
// y2 = 385
```
