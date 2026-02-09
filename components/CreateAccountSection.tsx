"use client";

import React, { useState } from "react";

const benefits = [
  "Free access to my trading group",
  "Free access to countless trading ideas every week",
  "Free access to my 5-hour trading course",
  "A large community of traders from the DACH region (Germany, Austria, Switzerland).",
];

export default function CreateAccountSection() {
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      firstName,
      lastName,
      email,
      phone,
    };

    console.log("REGISTER SUBMIT:", payload);

    // later:
    // await fetch("/api/register", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Card wrapper */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* dotted background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.10) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
            {/* Left: benefits */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
                ✓ 100% Free access
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                What you get for free
              </h2>

              <ul className="mt-4 space-y-4">
                {benefits.map((text, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
                      ✓
                    </span>
                    <p className="text-sm leading-relaxed text-gray-700 sm:text-base">
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: client's form (country removed only) */}
            <div className="flex flex-col justify-center">
              <h3 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Create account
              </h3>

              <form onSubmit={onSubmit} className="mt-8 flex w-full justify-center">
                <div className="w-full max-w-md space-y-4">
                  {/* First name */}
                  <div className="relative">
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      placeholder="Enter first name..."
                      className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                  </div>

                  {/* Last name */}
                  <div className="relative">
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      placeholder="Enter last name..."
                      className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      type="email"
                      placeholder="Enter email address..."
                      className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                  </div>

                  {/* Phone (simple like image) */}
                  <div className="relative">
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      type="tel"
                      placeholder="Enter phone number..."
                      className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 pr-12 text-sm text-gray-900 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-200"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.2Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-red-500">*</span>
                  </div>

                  {/* Register button */}
                  <button
                    type="submit"
                    className="mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-sky-400 text-base font-semibold text-white shadow-[0_12px_30px_rgba(56,189,248,0.35)] transition hover:brightness-105 active:scale-[0.99]"
                  >
                    Register
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M10 17l5-5-5-5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Footer note */}
                  <p className="pt-2 text-center text-xs leading-relaxed text-gray-500">
                    Your details will be forwarded to the webinar organizer, who might
                    communicate with you regarding this event or their services
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}