'use client';

const WaveAnimation = () => {
  return (
    <div className="relative h-[180px] w-full overflow-visible bg-transparent">
      {/* Wave SVG with an infinite horizontal motion. */}
      <svg
        className="absolute inset-x-0 top-0 h-full w-full drop-shadow-[0_-8px_18px_rgba(15,23,42,0.25)]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 18 150 34"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.92)" />
          <use href="#gentle-wave" x="48" y="5" fill="rgba(233,244,255,0.75)" />
          <use href="#gentle-wave" x="48" y="10" fill="rgba(199,226,255,0.58)" />
          <use href="#gentle-wave" x="48" y="15" fill="#cfe8ff" />
        </g>
      </svg>

      <style jsx>{`
        .parallax > use {
          animation-name: wave-move;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform;
        }

        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }

        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }

        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }

        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 18s;
        }

        @keyframes wave-move {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default WaveAnimation;
