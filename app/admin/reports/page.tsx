"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Destination = {
    id: string;
    name: string;
    location: string | null;
    visitor_capacity: number;
};

type Visitor = {
    id: string;
    destination_id: string;
    group_size: number;
    check_in: string;
    check_out: string | null;
};

type Advisory = {
    id: string;
    destination_id: string | null;
    title: string;
    severity: string;
    is_active: boolean;
    created_at: string;
};

type WaterCondition = {
    id: string;
    destination_id: string;
    overall_status: string | null;
    recorded_at: string;
};

export default function ReportsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [advisories, setAdvisories] = useState<Advisory[]>([]);
    const [waterConditions, setWaterConditions] = useState<
        WaterCondition[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [visitorPeriod, setVisitorPeriod] = useState<
        "week" | "month" | "year"
    >("week");

    useEffect(() => {
        async function loadReports() {
            const supabase = createClient();

            setLoading(true);
            setError(null);

            const [
                { data: destinationData, error: destinationError },
                { data: visitorData, error: visitorError },
                { data: advisoryData, error: advisoryError },
                { data: waterConditionData, error: waterConditionError },
            ] = await Promise.all([
                supabase
                    .from("destinations")
                    .select(
                        "id, name, location, visitor_capacity"
                    )
                    .eq("is_active", true)
                    .order("name"),

                supabase
                    .from("visitors")
                    .select(
                        "id, destination_id, group_size, check_in, check_out"
                    )
                    .order("check_in", { ascending: false }),

                supabase
                    .from("advisories")
                    .select(
                        "id, destination_id, title, severity, is_active, created_at"
                    )
                    .order("created_at", { ascending: false }),

                supabase
                    .from("water_conditions")
                    .select(
                        "id, destination_id, overall_status, recorded_at"
                    )
                    .order("recorded_at", { ascending: false }),
            ]);

            if (destinationError) {
                setError(destinationError.message);
                setLoading(false);
                return;
            }

            if (visitorError) {
                setError(visitorError.message);
                setLoading(false);
                return;
            }

            if (advisoryError) {
                setError(advisoryError.message);
                setLoading(false);
                return;
            }

            if (waterConditionError) {
                setError(waterConditionError.message);
                setLoading(false);
                return;
            }

            setDestinations(destinationData ?? []);
            setVisitors(visitorData ?? []);
            setAdvisories(advisoryData ?? []);
            setWaterConditions(waterConditionData ?? []);
            setLoading(false);
        }

        loadReports();
    }, []);

    const visitorTrendData = (() => {
        const now = new Date();

        if (visitorPeriod === "week") {
            const startOfWeek = new Date(now);
            const day = startOfWeek.getDay();

            // Monday = start of week
            const diff = day === 0 ? -6 : 1 - day;

            startOfWeek.setDate(startOfWeek.getDate() + diff);
            startOfWeek.setHours(0, 0, 0, 0);

            return Array.from({ length: 7 }, (_, index) => {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + index);

                const nextDate = new Date(date);
                nextDate.setDate(date.getDate() + 1);

                const total = visitors
                    .filter((visitor) => {
                        const checkIn = new Date(visitor.check_in);

                        return (
                            checkIn >= date &&
                            checkIn < nextDate
                        );
                    })
                    .reduce(
                        (sum, visitor) => sum + visitor.group_size,
                        0
                    );

                return {
                    label: date.toLocaleDateString("en-US", {
                        weekday: "short",
                    }),
                    visitors: total,
                };
            });
        }

        if (visitorPeriod === "month") {
            const year = now.getFullYear();
            const month = now.getMonth();

            const daysInMonth = new Date(
                year,
                month + 1,
                0
            ).getDate();

            const weeks: {
                label: string;
                visitors: number;
            }[] = [];

            for (
                let startDay = 1;
                startDay <= daysInMonth;
                startDay += 7
            ) {
                const endDay = Math.min(
                    startDay + 6,
                    daysInMonth
                );

                const startDate = new Date(
                    year,
                    month,
                    startDay
                );
                startDate.setHours(0, 0, 0, 0);

                const endDate = new Date(
                    year,
                    month,
                    endDay + 1
                );
                endDate.setHours(0, 0, 0, 0);

                const total = visitors
                    .filter((visitor) => {
                        const checkIn = new Date(visitor.check_in);

                        return (
                            checkIn >= startDate &&
                            checkIn < endDate
                        );
                    })
                    .reduce(
                        (sum, visitor) => sum + visitor.group_size,
                        0
                    );

                weeks.push({
                    label: `${startDay}-${endDay}`,
                    visitors: total,
                });
            }

            return weeks;
        }

        // Year
        const year = now.getFullYear();

        return Array.from({ length: 12 }, (_, index) => {
            const startDate = new Date(
                year,
                index,
                1
            );

            const endDate = new Date(
                year,
                index + 1,
                1
            );

            const total = visitors
                .filter((visitor) => {
                    const checkIn = new Date(visitor.check_in);

                    return (
                        checkIn >= startDate &&
                        checkIn < endDate
                    );
                })
                .reduce(
                    (sum, visitor) => sum + visitor.group_size,
                    0
                );

            return {
                label: startDate.toLocaleDateString("en-US", {
                    month: "short",
                }),
                visitors: total,
            };
        });
    })();

    const totalVisitors = visitors.reduce(
        (total, visitor) => total + visitor.group_size,
        0
    );

    const currentlyInside = visitors
        .filter((visitor) => visitor.check_out === null)
        .reduce(
            (total, visitor) => total + visitor.group_size,
            0
        );

    const activeAdvisories = advisories.filter(
        (advisory) => advisory.is_active
    ).length;

    const totalWaterRecords = waterConditions.length;

    /*
     * Visitors by destination
     */
    const visitorChartData = destinations.map((destination) => {
        const visitorsForDestination = visitors
            .filter(
                (visitor) =>
                    visitor.destination_id === destination.id
            )
            .reduce(
                (total, visitor) => total + visitor.group_size,
                0
            );

        return {
            name: destination.name,
            visitors: visitorsForDestination,
        };
    });

    return (
        <main className="min-h-screen bg-slate-950 text-white print:bg-white print:text-black">
            {/* Header */}
            <header className="border-b border-white/10 bg-slate-950/95 print:border-b print:border-slate-300 print:bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <p className="text-sm font-medium text-emerald-400 print:text-emerald-700">
                            SLAYCATION DMS
                        </p>

                        <h1 className="mt-1 text-2xl font-bold print:text-slate-900">
                            Reports & Statistics
                        </h1>

                        <p className="mt-1 text-sm text-slate-400 print:text-slate-600">
                            Destination Management System
                        </p>

                        <p className="mt-2 text-xs text-slate-500 print:text-slate-500">
                            Report Date:{" "}
                            {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 print:hidden">
                        <button
                            onClick={() => window.print()}
                            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                        >
                            Print Report
                        </button>

                        <a
                            href="/admin"
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10"
                        >
                            Back to Dashboard
                        </a>
                    </div>
                </div>
            </header>

            {/* Main */}
            <div className="mx-auto max-w-7xl px-6 py-8">
                <section>
                    <p className="text-sm text-slate-400">
                        Tanay, Rizal
                    </p>

                    <h2 className="mt-1 text-3xl font-bold">
                        Destination Reports
                    </h2>

                    <p className="mt-2 max-w-2xl text-slate-400">
                        Review visitor activity, destination occupancy,
                        advisories, and recorded water conditions.
                    </p>
                </section>

                {loading && (
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
                        Loading reports...
                    </div>
                )}

                {error && (
                    <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                        <p className="font-semibold text-red-400">
                            Unable to load reports
                        </p>

                        <p className="mt-2 text-sm text-red-300">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Summary Cards */}
                        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Total Visitors
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {totalVisitors}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    All recorded visitor groups
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Currently Inside
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {currentlyInside}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Visitors without check-out
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Active Advisories
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {activeAdvisories}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Current safety notices
                                </p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                                <p className="text-sm text-slate-400">
                                    Water Records
                                </p>

                                <p className="mt-2 text-3xl font-bold">
                                    {totalWaterRecords}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                    Recorded conditions
                                </p>
                            </div>
                        </section>

                        {/* Visitor Trends */}
                        <section className="mt-10">
                            <div className="flex flex-col items-end gap-3 print:hidden">
                                <nav className="flex flex-wrap items-center justify-end gap-2">
                                    <Link
                                        href="/admin"
                                        className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        href="/admin/logbook"
                                        className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Logbook
                                    </Link>

                                    <Link
                                        href="/admin/water-conditions"
                                        className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Water
                                    </Link>

                                    <Link
                                        href="/admin/advisories"
                                        className="rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
                                    >
                                        Advisories
                                    </Link>

                                    <Link
                                        href="/admin/reports"
                                        className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white"
                                    >
                                        Reports
                                    </Link>
                                </nav>

                                <button
                                    onClick={() => window.print()}
                                    className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                                >
                                    Print Report
                                </button>
                            </div>

                            {/* Period Selector */}
                            <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
                                <button
                                    onClick={() => setVisitorPeriod("week")}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${visitorPeriod === "week"
                                        ? "bg-emerald-500 text-slate-950"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Week
                                </button>

                                <button
                                    onClick={() => setVisitorPeriod("month")}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${visitorPeriod === "month"
                                        ? "bg-emerald-500 text-slate-950"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Month
                                </button>

                                <button
                                    onClick={() => setVisitorPeriod("year")}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${visitorPeriod === "year"
                                        ? "bg-emerald-500 text-slate-950"
                                        : "text-slate-400 hover:text-white"
                                        }`}
                                >
                                    Year
                                </button>
                            </div>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="flex h-72 items-end gap-2 sm:gap-4">
                                {visitorTrendData.map((item) => {
                                    const maxVisitors = Math.max(
                                        ...visitorTrendData.map(
                                            (entry) => entry.visitors
                                        ),
                                        1
                                    );

                                    const height =
                                        item.visitors === 0
                                            ? 4
                                            : Math.max(
                                                (item.visitors / maxVisitors) * 100,
                                                8
                                            );

                                    return (
                                        <div
                                            key={item.label}
                                            className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                                        >
                                            <span className="mb-2 text-xs font-semibold text-slate-300">
                                                {item.visitors}
                                            </span>

                                            <div
                                                className="w-full max-w-12 rounded-t-lg bg-emerald-500/80 print:bg-emerald-500 print:opacity-100 transition-all duration-500"
                                                style={{
                                                    height: `${height}%`,
                                                }}
                                            />

                                            <span className="mt-3 max-w-16 truncate text-center text-[10px] text-slate-500 sm:text-xs">
                                                {item.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                {/* Destination Occupancy */}
                <section className="mt-10">
                    <p className="text-sm text-slate-400">
                        Capacity Monitoring
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Destination Occupancy
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Current visitor occupancy compared with each destination&apos;s
                        configured capacity.
                    </p>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        {destinations.map((destination) => {
                            const currentVisitors = visitors
                                .filter(
                                    (visitor) =>
                                        visitor.destination_id === destination.id &&
                                        visitor.check_out === null
                                )
                                .reduce(
                                    (total, visitor) => total + visitor.group_size,
                                    0
                                );

                            const occupancy =
                                destination.visitor_capacity > 0
                                    ? Math.round(
                                        (currentVisitors /
                                            destination.visitor_capacity) *
                                        100
                                    )
                                    : 0;

                            const chartHeight = Math.min(
                                Math.max(occupancy, 4),
                                100
                            );

                            let occupancyStatus = "Low";

                            if (occupancy >= 80) {
                                occupancyStatus = "High";
                            } else if (occupancy >= 50) {
                                occupancyStatus = "Moderate";
                            }

                            return (
                                <div
                                    key={destination.id}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {destination.name}
                                            </h3>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Current occupancy
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-2xl font-bold">
                                                {occupancy}%
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {occupancyStatus} occupancy
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex h-48 items-end justify-center">
                                        <div className="flex h-full w-20 items-end rounded-t-xl bg-white/5">
                                            <div
                                                className="w-full rounded-t-xl bg-emerald-500/80 transition-all duration-500"
                                                style={{
                                                    height: `${chartHeight}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-between text-xs text-slate-500">
                                        <span>
                                            {currentVisitors} visitors
                                        </span>

                                        <span>
                                            Capacity: {destination.visitor_capacity}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Destination Statistics */}
                <section className="mt-10">
                    <p className="text-sm text-slate-400">
                        Visitor Statistics
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Destination Overview
                    </h2>

                    <div className="mt-5 grid gap-5 md:grid-cols-2">
                        {destinations.map((destination) => {
                            const destinationVisitors = visitors
                                .filter(
                                    (visitor) =>
                                        visitor.destination_id ===
                                        destination.id
                                )
                                .reduce(
                                    (total, visitor) =>
                                        total + visitor.group_size,
                                    0
                                );

                            const currentVisitors = visitors
                                .filter(
                                    (visitor) =>
                                        visitor.destination_id ===
                                        destination.id &&
                                        visitor.check_out === null
                                )
                                .reduce(
                                    (total, visitor) =>
                                        total + visitor.group_size,
                                    0
                                );

                            const occupancy =
                                destination.visitor_capacity > 0
                                    ? Math.round(
                                        (currentVisitors /
                                            destination.visitor_capacity) *
                                        100
                                    )
                                    : 0;

                            const latestWaterCondition =
                                waterConditions.find(
                                    (condition) =>
                                        condition.destination_id ===
                                        destination.id
                                );

                            const destinationAdvisories =
                                advisories.filter(
                                    (advisory) =>
                                        advisory.is_active &&
                                        (advisory.destination_id ===
                                            destination.id ||
                                            advisory.destination_id === null)
                                ).length;

                            return (
                                <div
                                    key={destination.id}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                {destination.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-slate-400">
                                                {destination.location}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Total Visitors
                                            </p>

                                            <p className="mt-1 text-2xl font-bold">
                                                {destinationVisitors}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Currently Inside
                                            </p>

                                            <p className="mt-1 text-2xl font-bold">
                                                {currentVisitors}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Capacity
                                            </p>

                                            <p className="mt-1 text-lg font-semibold">
                                                {destination.visitor_capacity}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs text-slate-500">
                                                Occupancy
                                            </p>

                                            <p className="mt-1 text-lg font-semibold">
                                                {occupancy}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 border-t border-white/10 pt-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Water Status
                                                </p>

                                                <p className="mt-1 text-sm font-semibold capitalize">
                                                    {latestWaterCondition?.overall_status ??
                                                        "No Data"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500">
                                                    Active Advisories
                                                </p>

                                                <p className="mt-1 text-sm font-semibold">
                                                    {destinationAdvisories}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Advisory History */}
                <section className="mt-10">
                    <p className="text-sm text-slate-400">
                        Safety Monitoring
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        Recent Advisories
                    </h2>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {advisories.length === 0 ? (
                            <p className="p-6 text-sm text-slate-500">
                                No advisories have been recorded yet.
                            </p>
                        ) : (
                            <div className="divide-y divide-white/10">
                                {advisories.slice(0, 5).map((advisory) => {
                                    const destinationName =
                                        destinations.find(
                                            (destination) =>
                                                destination.id ===
                                                advisory.destination_id
                                        )?.name ?? "All Destinations";

                                    return (
                                        <div
                                            key={advisory.id}
                                            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
                                        >
                                            <div>
                                                <p className="font-semibold">
                                                    {advisory.title}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    {destinationName}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold capitalize text-slate-300">
                                                    {advisory.severity}
                                                </span>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${advisory.is_active
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-white/5 text-slate-500"
                                                        }`}
                                                >
                                                    {advisory.is_active
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </>
                )}
        </div>
        </main >
    );
}