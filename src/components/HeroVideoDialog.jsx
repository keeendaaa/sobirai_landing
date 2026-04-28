import { useMemo, useState } from "react";

export default function HeroVideoDialog({
  className = "",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
}) {
  const [open, setOpen] = useState(false);

  const embedSrc = useMemo(() => {
    if (!videoSrc) return "";
    const separator = videoSrc.includes("?") ? "&" : "?";
    return `${videoSrc}${separator}autoplay=1&rel=0`;
  }, [videoSrc]);

  const isMp4 = useMemo(() => /\.mp4($|\?)/i.test(videoSrc || ""), [videoSrc]);

  return (
    <>
      <button
        type="button"
        className={`hero-video-trigger ${className}`.trim()}
        onClick={() => setOpen(true)}
        aria-label="Открыть видео"
      >
        {isMp4 ? (
          <video
            className="hero-video-thumb"
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            aria-label={thumbnailAlt}
          />
        ) : (
          <img src={thumbnailSrc} alt={thumbnailAlt} className="hero-video-thumb" />
        )}
        <span className="hero-video-play">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 6l10 6-10 6V6z" fill="currentColor" />
          </svg>
        </span>
      </button>

      {open && (
        <div className="hero-video-overlay" role="dialog" aria-modal="true">
          <button
            type="button"
            className="hero-video-backdrop"
            onClick={() => setOpen(false)}
            aria-label="Закрыть видео"
          />
          <div className="hero-video-modal">
            <button
              type="button"
              className="hero-video-close"
              onClick={() => setOpen(false)}
              aria-label="Закрыть"
            >
              ×
            </button>
            {isMp4 ? (
              <video
                className="hero-video-iframe"
                src={videoSrc}
                controls
                autoPlay
                playsInline
              />
            ) : (
              <iframe
                className="hero-video-iframe"
                src={embedSrc}
                title="Hero Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

