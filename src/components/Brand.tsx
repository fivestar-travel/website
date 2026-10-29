import type {ReactNode} from 'react';
import {NEEDLE_COLORS, PATHS, VIEWBOX} from './mark.generated';

/**
 * The FiveStar mark, as the app draws it: a map pin with a ring in its head and a five-point star cut out of it, the
 * star's top point a compass needle in coral and golden. The pin follows the theme (--mark-pin in custom.css: Indigo
 * on light, a lighter indigo on dark); pass `pin` for a mark that always sits on one ground.
 */
const [, , VB_W, VB_H] = VIEWBOX.split(' ').map(Number);
const widthFor = (height: number) => Math.round((height * VB_W) / VB_H);

function Needle(): ReactNode {
  return (
    <>
      <path d={PATHS.needle[0]} fill={NEEDLE_COLORS[0]} />
      <path d={PATHS.needle[1]} fill={NEEDLE_COLORS[1]} />
    </>
  );
}

export function Mark({height = 26, pin = 'var(--mark-pin)', className}: {height?: number; pin?: string; className?: string}): ReactNode {
  return (
    <svg width={widthFor(height)} height={height} viewBox={VIEWBOX} className={className} aria-hidden="true">
      <path d={PATHS.pin} fill={pin} fillRule="evenodd" />
      <Needle />
    </svg>
  );
}

/**
 * "FiveStar is thinking", as in the app: the pin and ring stay put while the star turns, overshoots north, swings
 * back and settles (.markTurn in custom.css; a pulse for reduced motion). The star moves, so it is drawn in `ground`,
 * the color behind the mark, which looks the same as cut out.
 */
export function MarkThinking({height = 26, ground, className}: {height?: number; ground: string; className?: string}): ReactNode {
  return (
    <svg width={widthFor(height)} height={height} viewBox={VIEWBOX} className={className} aria-hidden="true">
      <path d={PATHS.pinNoStar} fill="var(--mark-pin)" fillRule="evenodd" />
      <g className="markTurn">
        <path d={PATHS.star} fill={ground} />
        <Needle />
      </g>
    </svg>
  );
}

/**
 * The logo's star on its own, for buttons and small marks: the five-point star with its needle. The body takes the
 * class `starBody` so a page can color it for its ground.
 */
export function Star({size = 22, className}: {size?: number; className?: string}): ReactNode {
  // The mark's star sits around (100, 83.16) in a box of radius 32.5; frame it with a little air.
  return (
    <svg viewBox="64 47 72 72" width={size} height={size} className={className} aria-hidden="true">
      <path className="starBody" d={PATHS.star} fill="var(--midnight)" />
      <Needle />
    </svg>
  );
}
