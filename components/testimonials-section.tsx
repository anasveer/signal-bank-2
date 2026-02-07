"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

type Review = {
  stars: 4 | 5;
  title: string;
  text: string;
  name: string;
  date: string;
};

const reviews: Review[] = [
  {
    stars: 5,
    title: "Just insane how accurate they can be!",
    text:
      "Just insane how accurate they can be. Both Fred and YVM. I had blown my account a few times for greediness and in moments i didn't follow the right signals but i can say that...",
    name: "Rafael Belo.",
    date: "13 hours ago",
  },
  {
    stars: 5,
    title: "I thought it was too good to be true but it's LEGIT.",
    text:
      "I literally thought it was too good to be true but these guys are LEGIT! Harje AKA YVM is the most awesome gold...",
    name: "Laura Rose.",
    date: "19 hours ago",
  },
  {
    stars: 5,
    title: "Waqasqureshi",
    text:
      "Very smooth experience overall. The guidance and structure is clear...",
    name: "Waqasqureshi.",
    date: "December 25",
  },
  {
    stars: 5,
    title: "19 year old Australian making 5k/week minimum",
    text:
      "The community support alone makes this worth it. Everyone helps each other...",
    name: "Kai Callaway.",
    date: "December 24",
  },
  {
    stars: 4,
    title: "I stay in Cyprus how can I start I.",
    text: "I stay in Cyprus how can I start I don't have...",
    name: "Sanie Mansaray.",
    date: "January 3",
  },
  {
    stars: 5,
    title: "How to trade",
    text:
      "Well the company doesn't make things hard for new traders that wants to pop up...",
    name: "Lechuti Lehlohonolo.",
    date: "3 days ago",
  },
  {
    stars: 5,
    title: "Great training and signals",
    text:
      "I recently joined the community and the amount of training and value provided for free is amazing...",
    name: "Jessica.",
    date: "January 8",
  },
];

const REVIEW_LINK = "https://www.trustpilot.com/review/signals2trade.com";

/* ⭐ Stars */
function StarsRow({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <span
            key={i}
            className={`h-6 w-6 rounded-[2px] flex items-center justify-center ${
              filled ? "bg-emerald-500" : "bg-emerald-500/20"
            }`}
          >
            <Star
              className={filled ? "h-4 w-4 text-white" : "h-4 w-4 text-emerald-500"}
              fill={filled ? "currentColor" : "none"}
            />
          </span>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);

  // responsive cards count
  useEffect(() => {
    const handleResize = () => {
      setPerView(window.innerWidth >= 1024 ? 3 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - perView);

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const translate = perView === 3 ? index * 33.333 : index * 100;

  return (
    <section className="relative w-full bg-white py-12">
      {/* background */}
      <div aria-hidden className="absolute inset-0">
        <GridPattern
          width={28}
          height={28}
          strokeDasharray="3"
          className="stroke-gray-300/40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/70 to-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-4">
            <h2 className="text-4xl font-extrabold text-gray-900">
              Excellent
            </h2>
            <StarsRow value={4} />
          </div>

          <p className="mt-2 text-sm text-gray-700">
            Rated <span className="font-semibold">4.4</span> / 5 on{" "}
            <a
              href={REVIEW_LINK}
              className="font-semibold text-emerald-600 underline"
            >
              Trustpilot
            </a>
          </p>
        </div>

        {/* ===== Carousel ===== */}
        <div className="relative mt-12">
          {/* Arrows */}
          <div className="pointer-events-none absolute inset-y-0 -left-6 -right-6 flex items-center justify-between lg:-left-14 lg:-right-14 z-20">
            <button
              onClick={prev}
              disabled={index === 0}
              className={`pointer-events-auto h-10 w-10 lg:h-16 lg:w-16 rounded-full 
                bg-white/95 backdrop-blur border border-gray-300 shadow-lg 
                flex items-center justify-center transition
                ${
                  index === 0
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:scale-110 hover:bg-gray-50"
                }`}
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6 text-gray-800" />
            </button>

            <button
              onClick={next}
              disabled={index === maxIndex}
              className={`pointer-events-auto h-10 w-10 lg:h-16 lg:w-16 rounded-full 
                bg-white/95 backdrop-blur border border-gray-300 shadow-lg 
                flex items-center justify-center transition
                ${
                  index === maxIndex
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:scale-110 hover:bg-gray-50"
                }`}
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6 text-gray-800" />
            </button>
          </div>

          {/* viewport */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex -mx-3"
              animate={{ x: `-${translate}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className={`shrink-0 px-3 w-full ${
                    perView === 3 ? "lg:w-1/3" : ""
                  }`}
                >
                  <article className="h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <StarsRow value={r.stars} />

                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {r.name}
                      </span>
                      <span>{r.date}</span>
                    </div>

                    <h3 className="mt-3 font-extrabold text-gray-900">
                      {r.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-700">
                      {r.text}
                    </p>

                    <a
                      href={REVIEW_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm font-semibold text-emerald-600 underline"
                    >
                      Read more
                    </a>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>

          {/* dots */}
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition ${
                  i === index
                    ? "w-7 bg-emerald-500"
                    : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}