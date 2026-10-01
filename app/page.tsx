"use client";

import Link from "next/link";
import { useState } from "react";

const destinations = [
  {
    title: "DARANAK FALLS",
    subtitle: "The Refreshing Escape",
    description:
      "Cool waters, lush greenery, and a peaceful retreat await in Daranak Falls.",
    image: "/daranak-falls.png",
  },
  {
    title: "TINIPAK RIVER",
    subtitle: "The Adventure Experience",
    description:
      "Limestone landscapes, crystal-clear waters, and an unforgettable adventure in Tinipak River.",
    image: "/tinipak-river.png",
  },
  {
    title: "PLAN YOUR VISIT",
    subtitle: "Prepare for the Journey",
    description:
      "Travel information, tips, safety reminders, and responsible tourism practices for a worry-free Tanay experience.",
    image: "/plan-your-visit.png",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#17251b] text-white">

      {/* HERO */}
      <section
        className="relative min-h-screen overflow-x-hidden overflow-y-visible bg-cover bg-center"
        style={{
          backgroundImage: "url('/tanay-background.png')",
        }}
      >

        {/* NAVBAR */}
        <nav className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-12">

          {/* LOGO */}
          <a href="#" className="shrink-0">
            <div className="h-24 w-40 overflow-hidden lg:h-28 lg:w-48">
              <img
                src="/slaycation-logo.png"
                alt="Slaycation Exploring Horizons"
                className="h-full w-full object-contain scale-[1.7]"
              />
            </div>
          </a>

          {/* NAVIGATION */}
          <div className="hidden items-center gap-8 lg:flex">
            <a
              href="#"
              className="font-semibold text-white transition hover:text-[#d9dc91]"
            >
              Home
            </a>

            <a
              href="#destinations"
              className="text-white transition hover:text-[#d9dc91]"
            >
              Destinations
            </a>

            <a
              href="#plan"
              className="text-white transition hover:text-[#d9dc91]"
            >
              Plan Your Visit
            </a>

            <a
              href="#about"
              className="text-white transition hover:text-[#d9dc91]"
            >
              About Tanay
            </a>

            <a
              href="#contact"
              className="text-white transition hover:text-[#d9dc91]"
            >
              Contact
            </a>
          </div>

          {/* SEARCH */}
          <div className="hidden lg:block">
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const query = search.toLowerCase().trim();

                if (query.includes("daranak")) {
                  window.location.href = "/destinations/daranak-falls";
                } else if (query.includes("tinipak")) {
                  window.location.href = "/destinations/tinipak-river";
                } else if (query.includes("plan")) {
                  document.getElementById("plan")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              className="flex w-72 items-center rounded-full bg-white/90 px-2 py-1.5 shadow-lg backdrop-blur-sm"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Daranak Falls, Tinipak River..."
                className="w-full bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

              <button
                type="submit"
                aria-label="Search"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#202617] text-sm text-white transition hover:bg-[#918b20]"
              >
                →
              </button>
            </form>
          </div>

          {/* MOBILE MENU */}
          <button
            className="rounded-full bg-black/60 px-4 py-2 text-sm lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
        </nav>

        {/* MAIN CONTENT */}
        <div className="relative z-10 flex min-h-[calc(100vh-110px)] flex-col justify-between px-6 pb-10 pt-10 lg:flex-row lg:px-12 lg:pb-14 lg:pt-16">

          {/* LEFT SIDE */}
          <div className="flex max-w-2xl flex-col justify-center lg:w-[46%]">

            <div className="mb-5 text-4xl font-bold tracking-[0.3em] text-white">
              »»»»»
            </div>

            <div className="border-l-[5px] border-white pl-6">

              <h1 className="text-6xl font-black leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl">
                EXPLORE
              </h1>

              <h2 className="mt-1 text-7xl font-black italic leading-[0.85] tracking-tight text-[#dce4b0] sm:text-8xl lg:text-[7.5rem]">
                TANAY
              </h2>

              <p className="mt-6 text-2xl font-medium sm:text-3xl">
                Two experiences. One Tanay.
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-white/90 sm:text-lg">
                Discover the refreshing waters of Daranak Falls and the
                adventure of Tinipak River. Experience nature, culture, and
                unforgettable landscapes just outside the metro.
              </p>

              <a
                href="#destinations"
                className="mt-7 inline-flex w-fit items-center gap-5 rounded-full bg-[#918b20] px-7 py-4 text-base font-bold transition hover:bg-[#aaa32c]"
              >
                EXPLORE DESTINATIONS

                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-xl">
                  →
                </span>
              </a>

            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div
            id="featured-destinations"
            className="mt-12 grid gap-5 lg:mt-20 lg:w-[52%] lg:grid-cols-3 lg:items-center"
          >

            {destinations.map((destination, index) => (
              <Link
                key={destination.title}
                href={
                  index === 0
                    ? "/destinations/daranak-falls"
                    : index === 1
                      ? "/destinations/tinipak-river"
                      : "#plan"
                }
                className={`relative block overflow-hidden bg-[#f5f1df] text-[#26351d] shadow-2xl ${index === 0
                  ? "z-10 lg:translate-x-5 lg:translate-y-2"
                  : index === 1
                    ? "z-30 lg:-translate-y-10"
                    : "z-10 lg:-translate-x-5 lg:translate-y-2"
                  }`}
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-xl font-black leading-tight">
                    {destination.title}
                  </h3>

                  <p className="mt-1 font-serif text-base italic font-bold">
                    {destination.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-5 text-gray-700">
                    {destination.description}
                  </p>

                  <div className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-[#202617] px-5 py-2.5 text-sm text-white transition hover:bg-[#918b20]">
                    Read More

                    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* TOURISM PARTNERS */}
        <div className="relative z-[100] mx-6 mt-12 mb-8 flex w-fit items-center gap-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm lg:absolute lg:bottom-6 lg:left-12 lg:mx-0 lg:mt-0 lg:mb-0">
          <img
            src="/dot-logo.webp"
            alt="Department of Tourism"
            className="h-12 w-12 object-contain"
          />

          <div className="h-10 w-px bg-gray-300" />

          <img
            src="/tpb-logo.png"
            alt="Tourism Promotions Board Philippines"
            className="h-10 w-auto object-contain"
          />

          <div className="h-10 w-px bg-gray-300" />

          <img
            src="/love-the-philippines-logo.png"
            alt="Love the Philippines"
            className="h-14 w-auto object-contain"
          />
        </div>
      </section>

      {/* DESTINATIONS SECTION */}
      <section
        id="destinations"
        className="bg-[#f5f1df] px-6 pt-12 pb-20 text-[#26351d] lg:px-12 lg:pt-16 lg:pb-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#918b20]">
              Discover Tanay
            </p>

            <h2 className="text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
              PLACES WORTH
              <br />
              <span className="italic text-[#918b20]">
                EXPLORING.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
              From refreshing waterfalls to dramatic limestone landscapes,
              discover the natural experiences that make Tanay a memorable
              destination.
            </p>
          </div>

          {/* DESTINATION CARDS */}
          <div className="grid gap-8 lg:grid-cols-2">

            {/* DARANAK FALLS */}
            <article className="group overflow-hidden bg-white shadow-xl">
              <div className="relative overflow-hidden">
                <img
                  src="/daranak-falls.png"
                  alt="Daranak Falls"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 lg:h-96"
                />

                <div className="absolute left-5 top-5 rounded-full bg-[#202617] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  Nature Escape
                </div>
              </div>

              <div className="p-7 lg:p-9">

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#918b20]">
                  Destination 01
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  Daranak Falls
                </h3>

                <p className="mt-2 font-serif text-xl italic font-bold">
                  The Refreshing Escape
                </p>

                <p className="mt-5 leading-7 text-gray-700">
                  Cool waters, lush greenery, and a peaceful natural setting
                  make Daranak Falls one of the featured experiences in Tanay.
                </p>

                <Link
                  href="/destinations/daranak-falls"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#202617] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#918b20]"
                >
                  Explore Daranak Falls

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white">
                    →
                  </span>
                </Link>

              </div>
            </article>

            {/* TINIPAK RIVER */}
            <article className="group overflow-hidden bg-white shadow-xl">
              <div className="relative overflow-hidden">
                <img
                  src="/tinipak-river.png"
                  alt="Tinipak River"
                  className="h-72 w-full object-cover transition duration-500 group-hover:scale-105 lg:h-96"
                />

                <div className="absolute left-5 top-5 rounded-full bg-[#202617] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                  Adventure
                </div>
              </div>

              <div className="p-7 lg:p-9">

                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#918b20]">
                  Destination 02
                </p>

                <h3 className="mt-2 text-4xl font-black">
                  Tinipak River
                </h3>

                <p className="mt-2 font-serif text-xl italic font-bold">
                  The Adventure Experience
                </p>

                <p className="mt-5 leading-7 text-gray-700">
                  Limestone landscapes, clear waters, and an adventurous
                  outdoor experience await at Tinipak River.
                </p>

                <Link
                  href="/destinations/tinipak-river"
                  className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#202617] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#918b20]"
                >
                  Explore Tinipak River

                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white">
                    →
                  </span>
                </Link>

              </div>
            </article>

          </div>

        </div>
      </section>

      {/* OFFICIAL TOURISM RESOURCES */}
      <section
        id="official-resources"
        className="bg-[#202617] px-6 py-20 text-white"
      >
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#dce4b0]">
            Official Tourism Resources
          </p>

          <h2 className="mt-3 text-4xl font-black">
            EXPLORE TANAY
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Find more information through official tourism resources.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <a
              href="https://www.bettertanay.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#f5f1df] p-7 text-left text-[#26351d] transition hover:-translate-y-1"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-[#918b20]">
                Local Tourism
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Municipality of Tanay
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-700">
                Official local tourism information and attractions in Tanay.
              </p>

              <p className="mt-5 font-bold">
                Visit Website →
              </p>
            </a>

            <a
              href="https://www.tourism.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#f5f1df] p-7 text-left text-[#26351d] transition hover:-translate-y-1"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-[#918b20]">
                National Tourism
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Department of Tourism
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-700">
                Official tourism information about destinations across the Philippines.
              </p>

              <p className="mt-5 font-bold">
                Visit Website →
              </p>
            </a>

            <a
              href="https://tpb.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-[#f5f1df] p-7 text-left text-[#26351d] transition hover:-translate-y-1"
            >
              <p className="text-sm font-bold uppercase tracking-wider text-[#918b20]">
                Tourism Promotion
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Tourism Promotions Board
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-700">
                Official tourism marketing and promotional information.
              </p>

              <p className="mt-5 font-bold">
                Visit Website →
              </p>
            </a>

          </div>
        </div>
      </section>

      {/* PLAN YOUR VISIT */}
      <section
        id="plan"
        className="bg-[#f5f1df] px-6 py-20 text-[#26351d] lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#918b20]">
              Plan Your Visit
            </p>

            <h2 className="mt-3 text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
              READY FOR
              <br />
              <span className="italic text-[#918b20]">
                TANAY?
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg">
              Make the most of your Tanay adventure with a little preparation.
              Know what to expect, what to bring, and how to travel responsibly.
            </p>
          </div>

          {/* PLANNING CARDS */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* HOW TO GET THERE */}
            <div className="bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202617] text-xl text-white">
                →
              </div>

              <p className="mt-6 text-3xl font-bold uppercase tracking-[0.2em] text-[#918b20]">
                01
              </p>

              <h3 className="mt-2 text-2xl font-black">
                How to Get There
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-700">
                Plan your route and transportation before heading to your
                chosen destination in Tanay.
              </p>
            </div>

            {/* WHAT TO BRING */}
            <div className="bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202617] text-xl text-white">
                +
              </div>

              <p className="mt-6 text-3xl font-bold uppercase tracking-[0.2em] text-[#918b20]">
                02
              </p>

              <h3 className="mt-2 text-2xl font-black">
                What to Bring
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-700">
                Prepare practical essentials such as water, sun protection,
                comfortable clothing, and other personal necessities.
              </p>
            </div>

            {/* TRAVEL TIPS */}
            <div className="bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202617] text-xl text-white">
                *
              </div>

              <p className="mt-6 text-3xl font-bold uppercase tracking-[0.2em] text-[#918b20]">
                03
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Travel Tips
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-700">
                Check destination conditions, plan your schedule, and allow
                enough time for travel and outdoor activities.
              </p>
            </div>

            {/* RESPONSIBLE TRAVEL */}
            <div className="bg-white p-7 shadow-lg transition duration-300 hover:-translate-y-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#202617] text-xl text-white">
                ♡
              </div>

              <p className="mt-6 text-3xl font-bold uppercase tracking-[0.2em] text-[#918b20]">
                04
              </p>

              <h3 className="mt-2 text-2xl font-black">
                Responsible Travel
              </h3>

              <p className="mt-4 text-sm leading-6 text-gray-700">
                Respect local communities, protect natural areas, and leave
                destinations clean for future visitors.
              </p>
            </div>

          </div>

          {/* DESTINATION CTA */}
          <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#202617] p-8 text-white lg:flex-row lg:items-center lg:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dce4b0]">
                Start Exploring
              </p>

              <h3 className="mt-2 text-3xl font-black sm:text-4xl">
                Choose your Tanay experience.
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                Discover refreshing waterfalls, limestone landscapes, and
                outdoor experiences through Slaycation.
              </p>
            </div>

            <a
              href="#destinations"
              className="inline-flex shrink-0 items-center gap-4 rounded-full bg-[#918b20] px-6 py-3 text-sm font-bold transition hover:bg-[#aaa32c]"
            >
              VIEW DESTINATIONS

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white">
                →
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#202617] px-6 py-12 text-white lg:px-12">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 lg:grid-cols-3">

            {/* BRAND */}
            <div>
              <img
                src="/slaycation-logo.png"
                alt="Slaycation Exploring Horizons"
                className="h-24 w-auto object-contain object-left"
              />

              <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                Discover Tanay through refreshing waters, dramatic landscapes,
                meaningful experiences, and responsible travel.
              </p>
            </div>

            {/* QUICK LINKS */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dce4b0]">
                Explore
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a
                  href="#"
                  className="text-white/70 transition hover:text-white"
                >
                  Home
                </a>

                <a
                  href="#destinations"
                  className="text-white/70 transition hover:text-white"
                >
                  Destinations
                </a>

                <a
                  href="#plan"
                  className="text-white/70 transition hover:text-white"
                >
                  Plan Your Visit
                </a>

                <a
                  href="#official-resources"
                  className="text-white/70 transition hover:text-white"
                >
                  Tourism Resources
                </a>
              </div>
            </div>

            {/* DESTINATIONS */}
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#dce4b0]">
                Featured Destinations
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <Link
                  href="/destinations/daranak-falls"
                  className="text-white/70 transition hover:text-white"
                >
                  Daranak Falls →
                </Link>

                <Link
                  href="/destinations/tinipak-river"
                  className="text-white/70 transition hover:text-white"
                >
                  Tinipak River →
                </Link>
              </div>
            </div>

          </div>

          {/* DIVIDER */}
          <div className="my-10 h-px bg-white/10" />

          {/* BOTTOM */}
          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Slaycation Exploring Horizons.
              All rights reserved.
            </p>

            <p>
              Tanay, Rizal · Philippines
            </p>
          </div>

        </div>
      </footer>

    </main>
  );
}
