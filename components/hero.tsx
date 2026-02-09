"use client";

import React, { useEffect, useMemo } from "react";

export default function HeroSection() {
  const mediaId = "4qwvscrza1";

  // Build-safe embed HTML (no JSX custom element typing issues)
  const embedHtml = useMemo(() => {
    return `
      <style>
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
        wistia-player[media-id='${mediaId}']{
          width: 100%;
          height: 100%;
          display: block;
        }
      </style>
      <wistia-player media-id="${mediaId}" aspect="1.7777777777777777"></wistia-player>
    `;
  }, [mediaId]);

  // Load scripts ONCE (avoid duplicates)
  useEffect(() => {
    const playerSrc = "https://fast.wistia.com/player.js";
    const embedSrc = `https://fast.wistia.com/embed/${mediaId}.js`;

    if (!document.querySelector(`script[src="${playerSrc}"]`)) {
      const s = document.createElement("script");
      s.src = playerSrc;
      s.async = true;
      document.body.appendChild(s);
    }

    if (!document.querySelector(`script[src="${embedSrc}"]`)) {
      const s2 = document.createElement("script");
      s2.src = embedSrc;
      s2.async = true;
      s2.type = "module";
      document.body.appendChild(s2);
    }
  }, [mediaId]);

  return (
    <section className="w-full bg-white mt-35 md:mt-25">
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

      {/* Video Block (Wistia) */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mx-auto w-full overflow-hidden rounded-2xl bg-black shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
          <div className="relative w-full">
            <div
              className="h-[240px] sm:h-[320px] md:h-[470px] lg:h-[590px]"
              dangerouslySetInnerHTML={{ __html: embedHtml }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}