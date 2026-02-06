"use client";

import React, { useEffect, useRef, useState } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [muted, setMuted] = useState(true);
  const [thumb, setThumb] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const videoUrl =
    "https://res.cloudinary.com/dvecd8hh8/video/upload/v1770386157/hero_amjfbp.webm";

  // ✅ Create thumbnail from video's first frames
  useEffect(() => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;

    let rafId: number | null = null;

    const tryCapture = () => {
      if (!v.videoWidth || !v.videoHeight) return;

      const ctx = c.getContext("2d");
      if (!ctx) return;

      c.width = v.videoWidth;
      c.height = v.videoHeight;

      ctx.drawImage(v, 0, 0, c.width, c.height);

      try {
        const dataUrl = c.toDataURL("image/jpeg", 0.85);
        setThumb(dataUrl);
      } catch {
        // ignore
      }
    };

    const onLoadedData = () => {
      // seek a tiny bit to ensure we have a frame (some videos start black at 0)
      try {
        v.currentTime = Math.min(0.1, v.duration || 0.1);
      } catch {}
    };

    const onSeeked = () => {
      // capture after seek
      tryCapture();
    };

    const onCanPlay = () => {
      setReady(true);
      // capture again if not captured
      if (!thumb) {
        rafId = requestAnimationFrame(() => tryCapture());
      }
      // try autoplay
      v.play().catch(() => {});
    };

    v.addEventListener("loadeddata", onLoadedData);
    v.addEventListener("seeked", onSeeked);
    v.addEventListener("canplay", onCanPlay);

    return () => {
      v.removeEventListener("loadeddata", onLoadedData);
      v.removeEventListener("seeked", onSeeked);
      v.removeEventListener("canplay", onCanPlay);
      if (rafId) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    const next = !muted;
    v.muted = next;
    setMuted(next);

    if (!next) v.play().catch(() => {});
  };

  return (
    <section className="w-full bg-white mt-25">
      {/* Top Trust Bar */}
      <div className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <span className="text-sm text-gray-600">Our customers say</span>
            <span className="text-sm font-semibold text-gray-900">Excellent</span>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-flex h-5 w-5 items-center justify-center rounded-[2px] bg-emerald-500 text-white text-[12px] leading-none"
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>

            <span className="text-sm text-gray-600">
              4.5 out of 5 based on 2,386 reviews
            </span>

            <span className="flex items-center gap-1 text-sm font-semibold text-gray-900">
              <span className="text-emerald-500">★</span> Trustpilot
            </span>
          </div>
        </div>
      </div>

      {/* Video Block */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mx-auto w-full overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <div className="relative w-full">
            {/* ✅ Thumbnail overlay from video frame */}
            {thumb && !ready && (
              <img
                src={thumb}
                alt="Video preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Loading overlay text (optional) */}
            {!ready && (
              <div className="absolute inset-0 grid place-items-center bg-black/30">
                <div className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                  Loading video…
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="auto"
              className="block w-full object-cover h-[240px] sm:h-[320px] md:h-[470px] lg:h-[590px]"
              onPlaying={() => setReady(true)}
              onCanPlay={() => setReady(true)}
            />

            {/* Hidden canvas used to capture thumbnail */}
            <canvas ref={canvasRef} className="hidden" />

            {/* Mute/Unmute button */}
            <button
              type="button"
              onClick={toggleMute}
              className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/70"
            >
              {muted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}