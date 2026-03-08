"use client";

import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function StoreCarousel({ stores, duration = 24, className = "" }) {
  // `className` allows callers to constrain width (eg. max-w-4xl mx-auto) or apply additional styling
  const trackRef = useRef(null);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      // once the element is rendered we can measure its scrollWidth
      // it contains two copies of the logo list, so half of that is the
      // distance we want to scroll each cycle.
      const total = trackRef.current.scrollWidth;
      setShift(total / 2);
    }
  }, [stores]);

  return (
    // caller can pass classes to limit width
    // mask-edges applies a gradient mask at container sides for fading
    <div className={`relative overflow-hidden mask-edges ${className}`}> 
      <div
        ref={trackRef}
        className="flex"
        style={{
          animation: shift
            ? `scroll ${duration}s linear infinite`
            : "none",
          "--shift": `${shift}px`,
        }}
      >
        {[...stores, ...stores].map((logo, idx) => (
          <img
            key={idx}
            src={logo.src}
            alt={logo.alt}
            className="h-25 w-auto mx-8 shrink-0"
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(var(--shift) * -1)); }
        }

        .mask-edges {
          /* container mask so contents fade at left & right
             adjust 15%/85% stops as needed for wider/narrower fades */
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }
      `}</style>
    </div>
  );
}

StoreCarousel.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
  duration: PropTypes.number,
};
