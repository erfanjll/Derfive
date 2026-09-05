/** 2D atmosphere used under the WebGL scene, and alone when WebGL is unavailable. */
export function HeroFallback({ showShape }: { showShape?: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[45%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(200,245,66,0.10)_0%,rgba(200,245,66,0)_60%)] md:left-[68%]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)]">
        <div className="dot-grid h-full w-full opacity-70 [background-size:44px_44px]" />
      </div>
      {showShape && (
        <svg viewBox="0 0 200 200" className="absolute left-1/2 top-[45%] w-[46vmin] -translate-x-1/2 -translate-y-1/2 md:left-[68%]" fill="none" stroke="#c8f542" strokeWidth="0.8" strokeOpacity="0.5">
          <polygon points="100,12 178,68 148,164 52,164 22,68" />
          <polygon points="100,52 142,82 126,132 74,132 58,82" />
          <path d="M100 12v40M178 68l-36 14M148 164l-22-32M52 164l22-32M22 68l36 14" />
        </svg>
      )}
    </div>
  );
}
