import Link from "next/link";

export default function TinipakRiverPage() {
  return (
    <main
      id="top"
      className="min-h-screen bg-[#f5f1df] text-[#26351d]"
    >

      {/* HERO */}
      <section className="relative min-h-[78vh] overflow-hidden">

        {/* BACKGROUND IMAGE */}
        <img
          src="/tinipak-river.jpg"
          alt="Tinipak River in Tanay, Rizal"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10180f]/90 via-[#17251b]/55 to-[#17251b]/20" />

        {/* BOTTOM FADE */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f5f1df] to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex min-h-[78vh] flex-col justify-between px-6 py-8 lg:px-12 lg:py-10">

          {/* NAV */}
          <nav className="flex items-center justify-between">

            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:text-[#dce4b0]"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>

              Back to Slaycation
            </Link>

            <div className="rounded-full border border-white/30 bg-black/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md">
              Tanay, Rizal
            </div>

          </nav>


          {/* HERO CONTENT */}
          <div className="pb-16 lg:pb-20">

            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-14 bg-[#dce4b0]" />

              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#dce4b0]">
                Destination 02
              </p>
            </div>


            <h1 className="max-w-5xl text-6xl font-black leading-[0.82] tracking-tight text-white sm:text-7xl lg:text-[9rem]">

              TINIPAK

              <br />

              <span className="italic text-[#dce4b0]">
                RIVER
              </span>

            </h1>


            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

              <div>

                <p className="text-2xl font-medium text-white sm:text-3xl">
                  The Adventure Experience
                </p>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                  Explore limestone landscapes, river scenery, and the
                  adventurous side of Tanay.
                </p>

              </div>


              {/* DESTINATION LABEL */}
              <div className="hidden border-l border-white/30 pl-5 lg:block">

                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                  Explore
                </p>

                <p className="mt-1 text-lg font-bold text-white">
                  Adventure & Nature
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* STICKY DESTINATION NAVIGATION */}
      <div className="sticky top-0 z-40 border-b border-[#26351d]/10 bg-[#f5f1df]/95 backdrop-blur-md">

        <div className="mx-auto flex max-w-7xl items-center justify-between overflow-x-auto px-6 lg:px-12">

          <a
            href="#top"
            className="shrink-0 py-5 text-sm font-black uppercase tracking-[0.15em] text-[#26351d]"
          >
            Tinipak River
          </a>

          <nav className="flex shrink-0 items-center gap-7">

            <a
              href="#discover"
              className="py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#26351d]/60 transition hover:text-[#918b20]"
            >
              Discover
            </a>

            <a
              href="#experience"
              className="py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#26351d]/60 transition hover:text-[#918b20]"
            >
              Experience
            </a>

            <a
              href="#plan"
              className="py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#26351d]/60 transition hover:text-[#918b20]"
            >
              Plan Your Visit
            </a>

            <a
              href="#responsible-tourism"
              className="py-5 text-xs font-bold uppercase tracking-[0.15em] text-[#26351d]/60 transition hover:text-[#918b20]"
            >
              Responsible Travel
            </a>

          </nav>

        </div>

      </div>

      {/* DISCOVER */}
      <section
        id="discover"
        className="bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

          {/* TEXT */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#918b20]">
              Discover Tinipak
            </p>

            <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-[#26351d] sm:text-6xl">
              Where the river
              <br />
              <span className="italic font-medium">
                meets adventure.
              </span>
            </h2>

            <p className="mt-8 max-w-lg text-lg leading-8 text-gray-600">
              Tinipak River offers a different side of Tanay — one shaped by
              limestone formations, flowing waters, and the thrill of exploring
              the outdoors.
            </p>

            <p className="mt-5 max-w-lg text-base leading-7 text-gray-500">
              From the journey toward the river to the landscapes waiting
              along the way, Tinipak invites visitors to slow down, explore,
              and experience Tanay beyond the usual getaway.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <div className="overflow-hidden">
              <img
                src="/tinipak-river4.jpg"
                alt="Tinipak River landscape in Tanay, Rizal"
                className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 hidden bg-[#26351d] px-7 py-5 text-white shadow-xl sm:block">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dce4b0]">
                Tanay, Rizal
              </p>

              <p className="mt-1 text-xl font-black">
                Adventure & Nature
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* LANDSCAPE */}
      <section className="bg-[#26351d] px-6 py-24 text-white lg:px-12 lg:py-32">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#dce4b0]">
                The Landscape
              </p>

              <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
                A journey shaped
                <br />
                by <span className="italic font-medium">nature.</span>
              </h2>
            </div>

            <p className="max-w-md text-base leading-7 text-white/65 lg:text-right">
              Limestone scenery, river landscapes, and the natural character
              of Tanay come together to create an experience made for
              exploration.
            </p>

          </div>


          {/* LARGE PHOTO */}
          <div className="mt-14 overflow-hidden">
            <img
              src="/tinipak-river5.webp"
              alt="Tinipak River and surrounding landscape"
              className="h-[500px] w-full object-cover object-center transition duration-700 hover:scale-[1.02] lg:h-[650px]"
            />
          </div>

        </div>

      </section>


      {/* EXPERIENCE */}
      <section
        id="experience"
        className="bg-white px-6 py-24 lg:px-12 lg:py-32"
      >

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">

            {/* IMAGE */}
            <div className="overflow-hidden">
              <img
                src="/tinipak-river.jpg"
                alt="Exploring Tinipak River"
                className="h-[600px] w-full object-cover object-center transition duration-700 hover:scale-105"
              />
            </div>


            {/* TEXT */}
            <div className="lg:pl-8">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#918b20]">
                The Experience
              </p>

              <h2 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight text-[#26351d] sm:text-6xl">
                Come for the
                <br />
                <span className="italic font-medium">
                  adventure.
                </span>
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-600">
                Tinipak is for travelers who want to experience a more
                adventurous side of Tanay. The journey itself becomes part of
                the destination as visitors move through natural landscapes
                and discover the river along the way.
              </p>


              {/* EXPERIENCE POINTS */}
              <div className="mt-10 border-t border-[#26351d]/15">

                <div className="flex gap-5 border-b border-[#26351d]/15 py-6">

                  <span className="text-sm font-black text-[#918b20]">
                    01
                  </span>

                  <div>
                    <h3 className="font-black text-[#26351d]">
                      Explore
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Discover the natural landscapes surrounding the river.
                    </p>
                  </div>

                </div>


                <div className="flex gap-5 border-b border-[#26351d]/15 py-6">

                  <span className="text-sm font-black text-[#918b20]">
                    02
                  </span>

                  <div>
                    <h3 className="font-black text-[#26351d]">
                      Experience
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Enjoy an outdoor experience surrounded by nature.
                    </p>
                  </div>

                </div>


                <div className="flex gap-5 py-6">

                  <span className="text-sm font-black text-[#918b20]">
                    03
                  </span>

                  <div>
                    <h3 className="font-black text-[#26351d]">
                      Appreciate
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Leave the destination better by practicing responsible
                      tourism.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PLAN YOUR VISIT */}
      <section
        id="plan"
        className="bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#918b20]">
                Plan Your Visit
              </p>

              <h2 className="mt-4 text-5xl font-black leading-[0.95] tracking-tight text-[#26351d] sm:text-6xl">
                Prepare for
                <br />
                the <span className="italic font-medium">journey.</span>
              </h2>
            </div>

            <p className="max-w-xl text-xl font-medium leading-8 text-gray-700 lg:text-2xl lg:leading-9">
              A little preparation can make your Tinipak experience safer,
              smoother, and more enjoyable from the journey to the river
              itself.
            </p>

          </div>


          {/* INFORMATION */}
          <div className="mt-16 grid border-t border-[#26351d]/15 md:grid-cols-3">

            {/* LOCATION */}
            <div className="border-b border-[#26351d]/15 py-8 md:border-b-0 md:border-r md:pr-10">

              <p className="text-2xl font-black text-[#918b20]">
                01
              </p>

              <h3 className="mt-4 text-2xl font-black text-[#26351d]">
                Location
              </h3>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Tinipak River is located in Barangay Daraitan, Tanay,
                Rizal, within the natural landscapes surrounding the
                Sierra Madre.
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Tinipak+River+Daraitan+Tanay+Rizal"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-bold text-[#26351d] transition hover:text-[#918b20]"
              >
                Open in Google Maps
                <span>↗</span>
              </a>

            </div>


            {/* BEFORE YOU GO */}
            <div className="border-b border-[#26351d]/15 py-8 md:border-b-0 md:border-r md:px-10">

              <p className="text-2xl font-black text-[#918b20]">
                02
              </p>

              <h3 className="mt-4 text-2xl font-black text-[#26351d]">
                Before You Go
              </h3>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Wear comfortable outdoor clothing, bring enough water,
                protect your belongings, and prepare for an active
                outdoor experience.
              </p>

            </div>


            {/* SAFETY */}
            <div className="py-8 md:pl-10">

              <p className="text-2xl font-black text-[#918b20]">
                03
              </p>

              <h3 className="mt-4 text-2xl font-black text-[#26351d]">
                Travel Safely
              </h3>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Follow local guidelines, stay with your group, listen to
                guides or local authorities, and check conditions before
                beginning your journey.
              </p>

            </div>

          </div>


          {/* CTA */}
          <div className="mt-12">

            <a
              href="https://www.google.com/maps/search/?api=1&query=Tinipak+River+Daraitan+Tanay+Rizal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#26351d] px-7 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#3b4d2e]"
            >
              Get Directions
              <span className="text-lg">↗</span>
            </a>

          </div>

        </div>
      </section>

      {/* RESPONSIBLE TOURISM */}
      <section
        id="responsible-tourism"
        className="bg-[#26351d] px-6 py-24 text-white lg:px-12 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">

          {/* HEADER */}
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#dce4b0]">
                Responsible Travel
              </p>

              <h2 className="mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-8xl">
                Adventure means
                <br />
                leaving something
                <br />
                <span className="italic font-medium">
                  worth coming back to.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-lg leading-8 text-white/65 lg:pb-2">
              Tinipak's natural landscapes are part of what makes the
              destination special. Every visitor has a role in helping
              protect that experience for the community and future travelers.
            </p>

          </div>


          {/* PRINCIPLES */}
          <div className="mt-20 border-t border-white/20">

            {/* 01 */}
            <div className="grid gap-5 border-b border-white/20 py-8 lg:grid-cols-[120px_0.8fr_1fr] lg:items-start">

              <span className="text-3xl font-black text-[#dce4b0]">
                01
              </span>

              <h3 className="text-2xl font-black">
                Respect the River
              </h3>

              <p className="max-w-xl text-base leading-7 text-white/60">
                Keep the river and surrounding environment clean. Avoid
                damaging natural features and respect designated areas.
              </p>

            </div>


            {/* 02 */}
            <div className="grid gap-5 border-b border-white/20 py-8 lg:grid-cols-[120px_0.8fr_1fr] lg:items-start">

              <span className="text-3xl font-black text-[#dce4b0]">
                02
              </span>

              <h3 className="text-2xl font-black">
                Follow Local Guidance
              </h3>

              <p className="max-w-xl text-base leading-7 text-white/60">
                Respect local rules, guides, communities, and safety
                instructions throughout your visit.
              </p>

            </div>


            {/* 03 */}
            <div className="grid gap-5 border-b border-white/20 py-8 lg:grid-cols-[120px_0.8fr_1fr] lg:items-start">

              <span className="text-3xl font-black text-[#dce4b0]">
                03
              </span>

              <h3 className="text-2xl font-black">
                Leave No Trace
              </h3>

              <p className="max-w-xl text-base leading-7 text-white/60">
                Take your waste with you, minimize your impact, and help
                preserve the natural character of Tinipak.
              </p>

            </div>


            {/* 04 */}
            <div className="grid gap-5 py-8 lg:grid-cols-[120px_0.8fr_1fr] lg:items-start">

              <span className="text-3xl font-black text-[#dce4b0]">
                04
              </span>

              <h3 className="text-2xl font-black">
                Support the Community
              </h3>

              <p className="max-w-xl text-base leading-7 text-white/60">
                Whenever possible, support local guides, services, and
                community-based tourism activities during your visit.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* NEXT DESTINATION */}
      <section className="bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex items-center justify-between">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#918b20]">
              Continue Exploring
            </p>

            <p className="hidden text-sm font-medium text-[#26351d]/50 sm:block">
              Slaycation Exploring Horizons
            </p>
          </div>


          {/* DESTINATION LINK */}
          <Link
            href="/destinations/daranak-falls"
            className="group relative block overflow-hidden"
          >

            {/* IMAGE */}
            <img
              src="/daranak-falls.png"
              alt="Daranak Falls in Tanay, Rizal"
              className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-105 lg:h-[650px]"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10180f]/90 via-[#10180f]/25 to-transparent" />


            {/* CONTENT */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-7 text-white sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#dce4b0]">
                  Destination 01
                </p>

                <h2 className="mt-3 text-5xl font-black leading-none sm:text-6xl lg:text-8xl">
                  DARANAK
                  <br />
                  <span className="italic font-medium">
                    FALLS
                  </span>
                </h2>

                <p className="mt-4 text-lg text-white/75">
                  The Refreshing Escape
                </p>

              </div>


              {/* ARROW */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-2xl backdrop-blur-sm transition duration-300 group-hover:translate-x-2 group-hover:bg-white group-hover:text-[#26351d]">
                →
              </div>

            </div>

          </Link>


          {/* BACK HOME */}
          <div className="mt-10 flex justify-center">

            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.18em] text-[#26351d] transition hover:text-[#918b20]"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>

              Back to Slaycation Home
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}