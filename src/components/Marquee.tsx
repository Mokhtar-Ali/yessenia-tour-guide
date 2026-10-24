type MarqueeProps = {
  items: string[];
};

/** Slow, endless scrolling ribbon of place names. Pure CSS so it costs no JavaScript. */
export function Marquee({ items }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-line bg-blush py-5" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
        {[...row, ...row].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-10 font-display text-3xl font-semibold text-burgundy">
            {item}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
