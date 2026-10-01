import Link from "next/link";

export default function DaranakFallsPage() {
    return (
        <main
            id="top"
            className="min-h-screen bg-[#f5f1df] text-[#26351d]"
        >

            {/* HERO */}
            <section className="relative min-h-[78vh] overflow-hidden">

                {/* BACKGROUND IMAGE */}
                <img
                    src="/daranak-falls.png"
                    alt="Daranak Falls in Tanay, Rizal"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#10180f]/90 via-[#17251b]/55 to-[#17251b]/25" />

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
                                Destination 01
                            </p>
                        </div>

                        <h1 className="max-w-5xl text-6xl font-black leading-[0.82] tracking-tight text-white sm:text-7xl lg:text-[9rem]">

                            DARANAK

                            <br />

                            <span className="italic text-[#dce4b0]">
                                FALLS
                            </span>

                        </h1>

                        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                            <div>
                                <p className="text-2xl font-medium text-white sm:text-3xl">
                                    The Refreshing Escape
                                </p>

                                <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                                    Discover one of Tanay's natural attractions and experience
                                    the refreshing side of Rizal.
                                </p>
                            </div>

                            {/* DESTINATION LABEL */}
                            <div className="hidden border-l border-white/30 pl-5 lg:block">
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                                    Explore
                                </p>

                                <p className="mt-1 text-lg font-bold text-white">
                                    Nature & Recreation
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* DESTINATION NAVIGATION */}
            <div className="sticky top-0 z-40 border-b border-[#26351d]/10 bg-[#f5f1df]/95 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between overflow-x-auto px-6 lg:px-12">

                    <a
                        href="#top"
                        className="shrink-0 py-5 text-sm font-black uppercase tracking-[0.15em] text-[#26351d]"
                    >
                        Daranak Falls
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

            {/* STORY INTRO */}
            <section
                id="discover"
                className="relative overflow-hidden bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-36"
            >                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-16 lg:grid-cols-12 lg:items-center">

                        {/* LARGE TYPOGRAPHY */}
                        <div className="lg:col-span-6">

                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#918b20]">
                                Discover Daranak
                            </p>

                            <h2 className="mt-6 text-6xl font-black leading-[0.88] tracking-tight sm:text-7xl lg:text-[7rem]">
                                A NATURAL
                                <br />
                                <span className="italic text-[#918b20]">
                                    ESCAPE.
                                </span>
                            </h2>

                            <div className="mt-10 flex items-start gap-5">
                                <span className="mt-2 h-px w-16 bg-[#26351d]" />

                                <p className="max-w-md text-lg leading-8 text-gray-700">
                                    Discover the refreshing side of Tanay through cascading
                                    waters, forest surroundings, and an outdoor experience
                                    shaped by nature.
                                </p>
                            </div>

                        </div>

                        {/* IMAGE */}
                        <div className="relative lg:col-span-6">

                            <div className="absolute -right-5 -top-5 h-32 w-32 border-r-2 border-t-2 border-[#918b20]" />

                            <img
                                src="/daranak-waterfall-2.png"
                                alt="Daranak Falls surrounded by lush greenery"
                                className="relative z-10 h-[520px] w-full object-cover"
                            />

                            <div className="absolute -bottom-5 -left-5 z-20 bg-[#202617] px-6 py-5 text-white">
                                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#dce4b0]">
                                    Tanay, Rizal
                                </p>

                                <p className="mt-1 text-lg font-black">
                                    Nature & Recreation
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* FULL WIDTH PHOTO MOMENT */}
            <section className="relative h-[75vh] min-h-[520px] overflow-hidden">

                <img
                    src="/daranak-falls.png"
                    alt="Daranak Falls in Tanay, Rizal"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/35" />

                <div className="relative z-10 flex h-full items-end px-6 pb-12 lg:px-12 lg:pb-16">

                    <div className="max-w-4xl">

                        <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#dce4b0]">
                            The Falls
                        </p>

                        <h2 className="mt-3 text-6xl font-black leading-[0.9] text-white sm:text-7xl lg:text-[8rem]">
                            DARANAK
                            <br />
                            <span className="italic text-[#dce4b0]">
                                IN MOTION.
                            </span>
                        </h2>

                    </div>

                    <div className="ml-auto hidden max-w-xs text-right lg:block">
                        <p className="text-sm leading-6 text-white/75">
                            Water, forest, and open space come together to create a
                            refreshing nature experience in Tanay.
                        </p>
                    </div>

                </div>
            </section>


            {/* THE JOURNEY */}
            <section className="bg-[#202617] px-6 py-24 text-white lg:px-12 lg:py-36">
                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-16 lg:grid-cols-12 lg:items-start">

                        {/* TITLE */}
                        <div className="lg:col-span-4">

                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#dce4b0]">
                                01 — The Journey
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] sm:text-6xl">
                                THE
                                <br />
                                JOURNEY
                                <br />
                                <span className="italic text-[#dce4b0]">
                                    BEGINS.
                                </span>
                            </h2>

                        </div>

                        {/* BRIDGE IMAGE */}
                        <div className="lg:col-span-5">

                            <div className="relative">

                                <img
                                    src="/daranak-bridge.png"
                                    alt="Wooden bridge surrounded by forest greenery at Daranak Falls"
                                    className="h-[620px] w-full object-cover"
                                />

                                <div className="absolute bottom-6 left-6 bg-[#f5f1df] px-6 py-5 text-[#26351d]">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#918b20]">
                                        First Impression
                                    </p>

                                    <p className="mt-1 text-xl font-black">
                                        Into the forest.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* TEXT */}
                        <div className="flex items-end lg:col-span-3 lg:pb-8">

                            <div>

                                <p className="text-5xl font-black text-[#dce4b0]">
                                    01
                                </p>

                                <h3 className="mt-5 text-3xl font-black">
                                    Walk into nature.
                                </h3>

                                <p className="mt-5 leading-7 text-white/65">
                                    The experience begins before reaching the falls. Walk
                                    through the surrounding greenery and take in the changing
                                    scenery along the way.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* EXPERIENCE */}
            <section
                id="experience"
                className="bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-36"
            >                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-16 lg:grid-cols-12 lg:items-center">

                        {/* IMAGE */}
                        <div className="relative lg:col-span-7">

                            <div className="absolute -left-5 -top-5 h-24 w-24 border-l-2 border-t-2 border-[#918b20]" />

                            <img
                                src="/daranak-experience.png"
                                alt="Visitor enjoying the waters of Daranak Falls"
                                className="relative z-10 h-[620px] w-full object-cover"
                            />

                            <div className="absolute -bottom-6 right-6 z-20 bg-[#918b20] px-7 py-5 text-white">
                                <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                    Experience
                                </p>

                                <p className="mt-1 text-xl font-black">
                                    Refresh. Explore. Remember.
                                </p>
                            </div>

                        </div>

                        {/* TEXT */}
                        <div className="lg:col-span-5">

                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#918b20]">
                                02 — The Experience
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] sm:text-6xl">
                                MORE THAN
                                <br />
                                A
                                <br />
                                <span className="italic text-[#918b20]">
                                    WATERFALL.
                                </span>
                            </h2>

                            <p className="mt-8 text-lg leading-8 text-gray-700">
                                Daranak is not only about the destination itself. The
                                surrounding landscape, refreshing waters, and outdoor
                                atmosphere form part of the experience.
                            </p>

                            <div className="mt-10 space-y-7">

                                <div className="flex gap-5 border-t border-[#26351d]/20 pt-5">
                                    <span className="text-sm font-black text-[#918b20]">
                                        01
                                    </span>

                                    <div>
                                        <h3 className="font-black">
                                            Natural surroundings
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Lush greenery creates a peaceful backdrop throughout
                                            the destination.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-5 border-t border-[#26351d]/20 pt-5">
                                    <span className="text-sm font-black text-[#918b20]">
                                        02
                                    </span>

                                    <div>
                                        <h3 className="font-black">
                                            Refreshing waters
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            The cascading falls provide the destination's defining
                                            natural experience.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* TRAVELER'S EYE */}
            <section className="bg-[#10180f] px-6 py-24 text-white lg:px-12 lg:py-36">
                <div className="mx-auto max-w-7xl">

                    <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                        <div>

                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#dce4b0]">
                                03 — Traveler's Eye
                            </p>

                            <h2 className="mt-4 text-5xl font-black leading-[0.9] sm:text-6xl lg:text-7xl">
                                MOMENTS
                                <br />
                                WORTH
                                <br />
                                <span className="italic text-[#dce4b0]">
                                    REMEMBERING.
                                </span>
                            </h2>

                        </div>

                        <p className="max-w-md text-base leading-7 text-white/60">
                            Every visit creates a different perspective of the destination.
                            See Daranak through the experience of the people who explore it.
                        </p>

                    </div>

                    <div className="grid gap-5 lg:grid-cols-12">

                        {/* VERTICAL PHOTO */}
                        <div className="lg:col-span-5">
                            <div className="relative overflow-hidden">

                                <img
                                    src="/daranak-traveler.png"
                                    alt="Visitor experiencing Daranak Falls"
                                    className="h-[650px] w-full object-cover"
                                />

                                <div className="absolute left-6 top-6 border border-white/40 bg-black/30 px-4 py-2 backdrop-blur-sm">
                                    <p className="text-xs font-bold uppercase tracking-[0.2em]">
                                        Visitor Perspective
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* SECONDARY IMAGE */}
                        <div className="flex flex-col gap-5 lg:col-span-7">

                            <div className="relative overflow-hidden">
                                <img
                                    src="/daranak-waterfall-2.png"
                                    alt="Daranak Falls waterfall and natural pool"
                                    className="h-[390px] w-full object-cover"
                                />

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-7">
                                    <p className="text-2xl font-black">
                                        Find your own moment.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-1 items-center border-l-2 border-[#dce4b0] pl-7 lg:pl-10">

                                <div>

                                    <p className="text-4xl font-black text-[#dce4b0]">
                                        “
                                    </p>

                                    <p className="max-w-xl text-2xl font-semibold leading-9">
                                        A refreshing escape surrounded by the natural beauty
                                        of Tanay.
                                    </p>

                                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                                        Slaycation Perspective
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* WELCOME TO TANAY */}
            <section className="relative overflow-hidden bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-32">

                <div className="mx-auto max-w-7xl">

                    <div className="relative overflow-hidden">

                        <img
                            src="/tanay-welcome.png"
                            alt="Welcome to Tanay sign surrounded by greenery"
                            className="h-[650px] w-full object-cover object-[center_80%]"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 p-8 lg:p-14">

                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#dce4b0]">
                                Welcome to Tanay
                            </p>

                            <h2 className="mt-3 max-w-4xl text-5xl font-black leading-[0.9] text-white sm:text-6xl lg:text-8xl">
                                HOME OF
                                <br />
                                <span className="italic text-[#dce4b0]">
                                    ADVENTURE.
                                </span>
                            </h2>

                        </div>

                    </div>

                    <div className="mt-8 flex flex-col justify-between gap-6 border-t border-[#26351d]/20 pt-7 lg:flex-row">

                        <p className="max-w-2xl text-lg leading-8 text-gray-700">
                            Daranak Falls is part of Tanay's wider nature and adventure
                            experience — a destination where the journey, landscape, and
                            natural surroundings come together.
                        </p>

                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#918b20]">
                            Tanay · Rizal · Philippines
                        </p>

                    </div>

                </div>
            </section>

            {/* PLAN YOUR VISIT */}
            <section
                id="plan"
                className="bg-white px-6 py-24 lg:px-12 lg:py-32"
            >
                <div className="mx-auto max-w-7xl">

                    {/* HEADER */}
                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#918b20]">
                                Before You Go
                            </p>

                            <h2 className="mt-4 text-5xl font-black leading-[0.9] sm:text-6xl lg:text-7xl">
                                PLAN YOUR
                                <br />
                                <span className="italic text-[#918b20]">
                                    VISIT.
                                </span>
                            </h2>
                        </div>

                        <p className="max-w-xl text-xl font-medium leading-8 text-gray-700 lg:text-2xl lg:leading-9">
                            A little preparation can make your Daranak experience smoother,
                            more comfortable, and more responsible.
                        </p>

                    </div>


                    {/* VISITOR INFORMATION */}
                    <div className="mt-16 grid gap-0 border-t border-[#26351d]/20 lg:grid-cols-3">

                        {/* LOCATION */}
                        <div className="border-b border-[#26351d]/20 py-8 lg:border-b-0 lg:border-r lg:pr-10">

                            <p className="text-5xl font-black leading-none text-[#918b20]">
                                01
                            </p>

                            <h3 className="mt-5 text-3xl font-black">
                                Location
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Daranak Falls is located in Tanay, Rizal, making it part of
                                Tanay's nature and recreation attractions.
                            </p>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Daranak+Falls+Tanay+Rizal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex items-center gap-3 font-bold text-[#26351d] transition hover:text-[#918b20]"
                            >
                                Open in Google Maps
                                <span>↗</span>
                            </a>

                        </div>


                        {/* BEFORE YOU GO */}
                        <div className="border-b border-[#26351d]/20 py-8 lg:border-b-0 lg:border-r lg:px-10">

                            <p className="text-5xl font-black leading-none text-[#918b20]">
                                02
                            </p>

                            <h3 className="mt-5 text-3xl font-black">
                                Before You Go
                            </h3>

                            <ul className="mt-4 space-y-3 text-gray-600">

                                <li className="flex gap-3">
                                    <span className="font-bold text-[#918b20]">—</span>
                                    Check current visitor guidelines.
                                </li>

                                <li className="flex gap-3">
                                    <span className="font-bold text-[#918b20]">—</span>
                                    Prepare water and personal essentials.
                                </li>

                                <li className="flex gap-3">
                                    <span className="font-bold text-[#918b20]">—</span>
                                    Wear comfortable clothing and footwear.
                                </li>

                                <li className="flex gap-3">
                                    <span className="font-bold text-[#918b20]">—</span>
                                    Check conditions before travelling.
                                </li>

                            </ul>

                        </div>


                        {/* TRAVEL RESPONSIBLY */}
                        <div className="py-8 lg:pl-10">

                            <p className="text-5xl font-black leading-none text-[#918b20]">
                                03
                            </p>

                            <h3 className="mt-5 text-3xl font-black">
                                Travel Responsibly
                            </h3>

                            <p className="mt-3 leading-7 text-gray-600">
                                Help preserve the destination by keeping the area clean,
                                respecting nature, and following local regulations.
                            </p>

                            <a
                                href="#responsible-tourism"
                                className="mt-6 inline-flex items-center gap-3 font-bold text-[#26351d] transition hover:text-[#918b20]"
                            >
                                Responsible travel
                                <span>↓</span>
                            </a>

                        </div>

                    </div>


                    {/* CTA */}
                    <div className="mt-16 overflow-hidden bg-[#202617]">

                        <div className="flex flex-col justify-between gap-8 px-8 py-10 lg:flex-row lg:items-center lg:px-12 lg:py-12">

                            <div>

                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#dce4b0]">
                                    Ready to explore?
                                </p>

                                <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                                    Make Daranak part of your Tanay journey.
                                </h3>

                            </div>

                            <a
                                href="https://www.google.com/maps/search/?api=1&query=Daranak+Falls+Tanay+Rizal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex shrink-0 items-center justify-center gap-4 bg-[#dce4b0] px-7 py-4 font-black text-[#202617] transition hover:bg-white"
                            >
                                GET DIRECTIONS

                                <span className="transition-transform group-hover:translate-x-1">
                                    →
                                </span>
                            </a>

                        </div>

                    </div>

                </div>
            </section>

            {/* RESPONSIBLE TOURISM */}
            <section
                id="responsible-tourism"
                className="bg-[#202617] px-6 py-24 text-white lg:px-12 lg:py-32"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="grid gap-16 lg:grid-cols-12">

                        <div className="lg:col-span-5">

                            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#dce4b0]">
                                04 — Responsible Travel
                            </p>

                            <h2 className="mt-5 text-5xl font-black leading-[0.9] sm:text-6xl">
                                LEAVE A
                                <br />
                                POSITIVE
                                <br />
                                <span className="italic text-[#dce4b0]">
                                    TRACE.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-md leading-7 text-white/60">
                                Enjoy the destination while helping protect the natural
                                environment for future visitors.
                            </p>

                        </div>

                        <div className="lg:col-span-7">

                            <div className="border-t border-white/20">

                                <div className="grid gap-6 border-b border-white/20 py-7 sm:grid-cols-[80px_1fr]">
                                    <p className="text-3xl font-black text-[#dce4b0]">
                                        01
                                    </p>

                                    <div>
                                        <h3 className="text-2xl font-black">
                                            Keep It Clean
                                        </h3>

                                        <p className="mt-2 max-w-xl text-white/60">
                                            Take your waste with you and help maintain the
                                            destination's natural surroundings.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-6 border-b border-white/20 py-7 sm:grid-cols-[80px_1fr]">
                                    <p className="text-3xl font-black text-[#dce4b0]">
                                        02
                                    </p>

                                    <div>
                                        <h3 className="text-2xl font-black">
                                            Respect Nature
                                        </h3>

                                        <p className="mt-2 max-w-xl text-white/60">
                                            Avoid damaging plants, rocks, and other natural
                                            features.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-6 border-b border-white/20 py-7 sm:grid-cols-[80px_1fr]">
                                    <p className="text-3xl font-black text-[#dce4b0]">
                                        03
                                    </p>

                                    <div>
                                        <h3 className="text-2xl font-black">
                                            Follow Local Rules
                                        </h3>

                                        <p className="mt-2 max-w-xl text-white/60">
                                            Follow current visitor guidelines and instructions
                                            from local authorities.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* NEXT DESTINATION */}
            <section className="relative overflow-hidden bg-[#f5f1df] px-6 py-24 lg:px-12 lg:py-32">

                <div className="mx-auto max-w-7xl">

                    <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#918b20]">
                        Continue Exploring
                    </p>

                    <div className="mt-5 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

                        <h2 className="text-6xl font-black leading-[0.85] sm:text-7xl lg:text-[8rem]">
                            YOUR NEXT
                            <br />
                            <span className="italic text-[#918b20]">
                                ADVENTURE.
                            </span>
                        </h2>

                        <Link
                            href="/"
                            className="group inline-flex shrink-0 items-center gap-5 text-lg font-black uppercase tracking-wider"
                        >
                            Explore Tanay

                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#202617] text-2xl text-white transition group-hover:translate-x-2">
                                →
                            </span>
                        </Link>

                    </div>

                    <div className="mt-16 border-t border-[#26351d]/20 pt-6">

                        <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.2em] text-[#26351d]/50">

                            <span>
                                Slaycation Exploring Horizons
                            </span>

                            <span>
                                Daranak Falls · 01
                            </span>

                        </div>

                    </div>

                </div>

            </section>
            {/* BACK TO DESTINATIONS */}
            <section className="px-6 py-16 text-center lg:px-12">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#918b20]">
                    Continue Exploring
                </p>

                <h2 className="mt-3 text-4xl font-black">
                    DISCOVER MORE OF TANAY
                </h2>

                <Link
                    href="/"
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#202617] px-7 py-4 font-bold text-white transition hover:bg-[#918b20]"
                >
                    Back to Destinations
                    <span>→</span>
                </Link>
            </section>

        </main>
    );
}