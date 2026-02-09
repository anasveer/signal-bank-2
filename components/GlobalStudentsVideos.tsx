"use client";

import React, { useEffect, useState } from "react";
import { Play, X } from "lucide-react";

// ✅ Client-provided Wistia video IDs (same order)
const wistiaVideos = [
  { id: "zuiyqothgc", aspect: "0.5625" },
  { id: "kh0l7jgfbr", aspect: "0.5660377358490566" },
  { id: "d2ghybfjp5", aspect: "0.565625" },
  { id: "tzph98ssw0", aspect: "0.5555555555555556" },
  { id: "9rsfpoe0mf", aspect: "0.565625" },
  { id: "lrsknsyqvg", aspect: "0.565625" },
];

export default function GlobalStudentsVideos() {
  const [active, setActive] = useState<string | null>(null);
  const [activeAspect, setActiveAspect] = useState<string>("0.5625");

  // Load Wistia core player once
  useEffect(() => {
    const playerSrc = "https://fast.wistia.com/player.js";
    if (!document.querySelector(`script[src="${playerSrc}"]`)) {
      const s = document.createElement("script");
      s.src = playerSrc;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // Load embed script when modal opens
  useEffect(() => {
    if (!active) return;

    const embedSrc = `https://fast.wistia.com/embed/${active}.js`;
    if (!document.querySelector(`script[src="${embedSrc}"]`)) {
      const s = document.createElement("script");
      s.src = embedSrc;
      s.async = true;
      s.type = "module";
      document.body.appendChild(s);
    }
  }, [active]);

  const renderEmbed = (id: string, aspect: string) => `
    <style>
      wistia-player[media-id='${id}']:not(:defined) {
        background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/${id}/swatch');
        display: block;
        filter: blur(5px);
        padding-top: ${100 / Number(aspect)}%;
      }
      wistia-player[media-id='${id}'] {
        width: 100%;
        height: 100%;
        display: block;
      }
    </style>
    <wistia-player media-id="${id}" aspect="${aspect}"></wistia-player>
  `;

  return (
    <section className="w-full bg-white py-14">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold tracking-wide text-gray-900 sm:text-2xl">
            STUDENTS FROM ALL AROUND THE WORLD SAY
          </h2>
          <div className="mx-auto mt-3 h-[2px] w-40 bg-emerald-500" />
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wistiaVideos.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => {
                setActive(v.id);
                setActiveAspect(v.aspect);
              }}
              className="group relative overflow-hidden rounded-2xl bg-gray-200 shadow-md"
            >
              <div className="relative aspect-[3/4] w-full">
                {/* Thumbnail */}
                <img
                  src={`https://fast.wistia.com/embed/medias/${v.id}/swatch`}
                  alt="Student video"
                  className="h-full w-full object-cover"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition group-hover:scale-105">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="w-full"
              dangerouslySetInnerHTML={{
                __html: renderEmbed(active, activeAspect),
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}