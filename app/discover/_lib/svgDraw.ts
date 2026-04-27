import gsap from "gsap";

export function initStrokeDraw(el: SVGGeometryElement) {
  const length = el.getTotalLength();
  gsap.set(el, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });
  return length;
}
