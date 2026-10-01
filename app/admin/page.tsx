"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Destination = {
    id: string;
    name: string;
    location: string | null;
    visitor_capacity: number;
    description: string | null;
    operational_status: string;
};

type Visitor = {
    id: string;
    destination_id: string;
    group_size: number;
    check_in: string;
    check_out: string | null;
};

type WaterCondition = {
    id: string;
    destination_id: string;
    water_level: string | null;
    turbidity: string | null;
    water_temperature: number | null;
    rainfall: string | null;
    current_condition: string | null;
    overall_status: string | null;
    notes: string | null;
    recorded_at: string;
};

type Advisory = {
    id: string;
    destination_id: string | null;
    title: string;
    message: string;
    severity: string;
    is_active: boolean;
    created_at: string;
    expires_at: string | null;
};

export default function AdminDashboard() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [waterConditions, setWaterConditions] = useState<
        WaterCondition[]
    >([]);
    const [advisories, setAdvisories] = useState<Advisory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadDashboard() {
            const supabase = createClient();

            setLoading(true);
            setError(null);

            const [
                { data: destinationData, error: destinationError },
                { data: visitorData, error: visitorError },
                { data: waterConditionData, error: waterConditionError },
                { data: advisoryData, error: advisoryError },
            ] = await Promise.all([
                supabase
                    .from("destinations")
                    .select("*")
                    .eq("is_active", true)
                    .order("name"),

                supabase
                    .from("visitors")
                    .select(
                        "id, destination_id, group_size, check_in, check_out"
                    )
                    .order("check_in", { ascending: false }),

                supabase
                    .from("water_conditions")
                    .select("*")
                    .order("recorded_at", { ascending: false }),

                supabase
                    .from("advisories")
                    .select("*")
                    .order("created_at", { ascending: false }),
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

            if (waterConditionError) {
                setError(waterConditionError.message);
                setLoading(false);
                return;
            }

            if (advisoryError) {
                setError(advisoryError.message);
                setLoading(false);
                return;
            }

            setDestinations(destinationData ?? []);
            setVisitors(visitorData ?? []);
            setWaterConditions(waterConditionData ?? []);
            setAdvisories(advisoryData ?? []);
            setLoading(false);
        }

        loadDashboard();
    }, []);

    async function updateOperationalStatus(
        destinationId: string,
        status: string
    ) {
        const supabase = createClient();

        const { error } = await supabase
            .from("destinations")
            .update({
                operational_status: status,
            })
            .eq("id", destinationId);

        if (error) {
            alert(`Unable to update status: ${error.message}`);
            return;
        }

        setDestinations((current) =>
            current.map((destination) =>
                destination.id === destinationId
                    ? {
                        ...destination,
                        operational_status: status,
                    }
                    : destination
            )
        );
    }

    // Today's date
    const today = new Date();

    const startOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
    );

    const endOfToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
    );

    // Today's Visitors
    const todaysVisitors = visitors
        .filter((visitor) => {
            const checkInDate = new Date(visitor.check_in);

            return (
                checkInDate >= startOfToday &&
                checkInDate <= endOfToday
            );
        })
        .reduce(
            (total, visitor) => total + visitor.group_size,
            0
        );

    // Currently Inside
    const currentlyInside = visitors
        .filter((visitor) => visitor.check_out === null)
        .reduce(
            (total, visitor) => total + visitor.group_size,
            0
        );

    // Active Advisories
    const activeAdvisories = advisories.filter(
        (advisory) => advisory.is_active
    ).length;

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-slate-950/95">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div>
                        <p className="text-sm font-medium text-emerald-400">
                            SLAYCATION DMS
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Destination Management
                        </h1>
                    </div>

                    <nav className="flex items-center gap-2 text-sm">
                        <Link
                            href="/admin"
                            className="rounded-lg bg-white/10 px-3 py-2 text-white transition hover:bg-white/15"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/logbook"
                            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        >
                            Logbook
                        </Link>

                        <Link
                            href="/admin/water-conditions"
                            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        >
                            Water
                        </Link>

                        <Link
                            href="/admin/advisories"
                            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        >
                            Advisories
                        </Link>

                        <Link
                            href="/admin/reports"
                            className="rounded-lg px-3 py-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                        >
                            Reports
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Main */}
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Welcome */}
                <section>
                    <p className="text-sm text-slate-400">
                        Tanay, Rizal
                    </p>

                    <h2 className="mt-1 text-3xl font-bold">
                        Destination Overview
                    </h2>

                    <p className="mt-2 max-w-2xl text-slate-400">
                        Monitor visitor activity, destination capacity, water
                        conditions, and safety advisories for Tanay&apos;s key
                        destinations.
                    </p>
                </section>

                {/* KPI Cards */}
                <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Today's Visitors */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <p className="text-sm text-slate-400">
                            Today&apos;s Visitors
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {todaysVisitors}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Total visitors checked in today
                        </p>
                    </div>

                    {/* Currently Inside */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <p className="text-sm text-slate-400">
                            Currently Inside
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {currentlyInside}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Active visitors
                        </p>
                    </div>

                    {/* Destinations */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <p className="text-sm text-slate-400">
                            Destinations
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                            {destinations.length}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Active destinations
                        </p>
                    </div>

                    {/* Active Advisories */}
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
                </section>

                {/* Destination Capacity */}
                <section className="mt-10">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-sm text-slate-400">
                                Visitor Monitoring
                            </p>

                            <h2 className="mt-1 text-2xl font-bold">
                                Destination Capacity
                            </h2>
                        </div>
                    </div>

                    {loading && (
                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-400">
                            Loading dashboard data...
                        </div>
                    )}

                    {error && (
                        <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
                            <p className="font-semibold text-red-400">
                                Unable to load dashboard data
                            </p>

                            <p className="mt-2 text-sm text-red-300">
                                {error}
                            </p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="mt-5 grid gap-5 md:grid-cols-2">
                            {destinations.map((destination) => {
                                /*
                                 * Current visitors for this destination.
                                 * Uses group_size so a group of 7 counts as 7 visitors.
                                 */
                                const currentVisitors = visitors
                                    .filter(
                                        (visitor) =>
                                            visitor.destination_id === destination.id &&
                                            visitor.check_out === null
                                    )
                                    .reduce(
                                        (total, visitor) =>
                                            total + visitor.group_size,
                                        0
                                    );

                                /*
                                 * Capacity percentage.
                                 */
                                const percentage =
                                    destination.visitor_capacity > 0
                                        ? Math.round(
                                            (currentVisitors /
                                                destination.visitor_capacity) *
                                            100
                                        )
                                        : 0;

                                /*
                                 * Remaining capacity.
                                 */
                                const available = Math.max(
                                    destination.visitor_capacity -
                                    currentVisitors,
                                    0
                                );

                                /*
                                 * Latest water condition for this destination.
                                 */
                                const latestWaterCondition =
                                    waterConditions.find(
                                        (condition) =>
                                            condition.destination_id ===
                                            destination.id
                                    );

                                return (
                                    <div
                                        key={destination.id}
                                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                                    >
                                        {/* Destination Header */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {destination.name}
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-400">
                                                    {destination.location}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${destination.operational_status === "open"
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : destination.operational_status === "limited"
                                                            ? "bg-amber-500/10 text-amber-400"
                                                            : "bg-red-500/10 text-red-400"
                                                        }`}
                                                >
                                                    {destination.operational_status === "open"
                                                        ? "OPEN"
                                                        : destination.operational_status === "limited"
                                                            ? "LIMITED ACCESS"
                                                            : "CLOSED"}
                                                </span>

                                                <select
                                                    value={destination.operational_status}
                                                    onChange={(event) =>
                                                        updateOperationalStatus(
                                                            destination.id,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white"
                                                >
                                                    <option value="open">Open</option>
                                                    <option value="limited">Limited Access</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Capacity */}
                                        <div className="mt-7">
                                            <div className="flex items-end justify-between">
                                                <div>
                                                    <p className="text-sm text-slate-400">
                                                        Current Visitors
                                                    </p>

                                                    <p className="mt-1 text-3xl font-bold">
                                                        {currentVisitors}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-sm text-slate-400">
                                                        Capacity
                                                    </p>

                                                    <p className="mt-1 text-lg font-semibold">
                                                        {destination.visitor_capacity}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Capacity Bar */}
                                            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                                                <div
                                                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                                                    style={{
                                                        width: `${Math.min(
                                                            percentage,
                                                            100
                                                        )}%`,
                                                    }}
                                                />
                                            </div>

                                            <div className="mt-2 flex justify-between text-xs text-slate-500">
                                                <span>
                                                    {percentage}% capacity
                                                </span>

                                                <span>
                                                    {available} available
                                                </span>
                                            </div>

                                            {/* Water Status */}
                                            <div className="mt-5 border-t border-white/10 pt-5">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-slate-300">
                                                        Water Status
                                                    </p>

                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${latestWaterCondition?.overall_status ===
                                                            "safe"
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : latestWaterCondition?.overall_status ===
                                                                "caution"
                                                                ? "bg-amber-500/10 text-amber-400"
                                                                : latestWaterCondition?.overall_status ===
                                                                    "danger"
                                                                    ? "bg-red-500/10 text-red-400"
                                                                    : "bg-white/5 text-slate-400"
                                                            }`}
                                                    >
                                                        {latestWaterCondition?.overall_status ??
                                                            "No Data"}
                                                    </span>
                                                </div>

                                                {latestWaterCondition ? (
                                                    <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                                                        <div>
                                                            <p className="text-slate-500">
                                                                Water Level
                                                            </p>

                                                            <p className="mt-1 text-slate-300">
                                                                {latestWaterCondition.water_level ??
                                                                    "—"}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-slate-500">
                                                                Turbidity
                                                            </p>

                                                            <p className="mt-1 text-slate-300">
                                                                {latestWaterCondition.turbidity ??
                                                                    "—"}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-slate-500">
                                                                Rainfall
                                                            </p>

                                                            <p className="mt-1 text-slate-300">
                                                                {latestWaterCondition.rainfall ??
                                                                    "—"}
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p className="text-slate-500">
                                                                Condition
                                                            </p>

                                                            <p className="mt-1 text-slate-300">
                                                                {latestWaterCondition.current_condition ??
                                                                    "—"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="mt-3 text-xs text-slate-500">
                                                        No water condition has been recorded
                                                        yet.
                                                    </p>
                                                )}

                                                {latestWaterCondition && (
                                                    <p className="mt-3 text-[11px] text-slate-500">
                                                        Last updated{" "}
                                                        {new Date(
                                                            latestWaterCondition.recorded_at
                                                        ).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Management Modules */}
                <section className="mt-10">
                    <p className="text-sm text-slate-400">
                        Management Tools
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                        System Modules
                    </h2>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Digital Logbook */}
                        <a
                            href="/admin/logbook"
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
                        >
                            <p className="text-lg font-semibold">
                                Digital Logbook
                            </p>

                            <p className="mt-2 text-sm text-slate-400">
                                Register and manage visitor check-ins and
                                check-outs.
                            </p>
                        </a>

                        {/* Water Conditions */}
                        <a
                            href="/admin/water-conditions"
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
                        >
                            <p className="text-lg font-semibold">
                                Water Conditions
                            </p>

                            <p className="mt-2 text-sm text-slate-400">
                                Record and monitor current water and weather
                                conditions.
                            </p>
                        </a>

                        {/* Advisories */}
                        <a
                            href="/admin/advisories"
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
                        >
                            <p className="text-lg font-semibold">
                                Advisories
                            </p>

                            <p className="mt-2 text-sm text-slate-400">
                                Publish safety notices and destination
                                advisories.
                            </p>
                        </a>

                        <a
                            href="/admin/reports"
                            className="block rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
                        >
                            <p className="text-lg font-semibold">
                                Reports
                            </p>

                            <p className="mt-2 text-sm text-slate-400">
                                Review visitor trends and destination
                                statistics.
                            </p>
                        </a>
                    </div>
                </section>
            </div>
        </main>
    );
}