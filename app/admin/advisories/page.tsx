"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Destination = {
    id: string;
    name: string;
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

export default function AdvisoriesPage() {
    const supabase = createClient();

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [advisories, setAdvisories] = useState<Advisory[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [destinationId, setDestinationId] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("info");
    const [expiresAt, setExpiresAt] = useState("");

    async function loadData() {
        setLoading(true);

        const [{ data: destinationData }, { data: advisoryData }] =
            await Promise.all([
                supabase
                    .from("destinations")
                    .select("id, name")
                    .eq("is_active", true)
                    .order("name"),

                supabase
                    .from("advisories")
                    .select("*")
                    .order("created_at", { ascending: false }),
            ]);

        setDestinations(destinationData ?? []);
        setAdvisories(advisoryData ?? []);

        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!title.trim() || !message.trim()) {
            alert("Please enter an advisory title and message.");
            return;
        }

        setSaving(true);

        const { error } = await supabase.from("advisories").insert({
            destination_id: destinationId || null,
            title: title.trim(),
            message: message.trim(),
            severity,
            is_active: true,
            expires_at: expiresAt
                ? new Date(expiresAt).toISOString()
                : null,
        });

        if (error) {
            console.error(error);
            alert(`Unable to create advisory: ${error.message}`);
            setSaving(false);
            return;
        }

        setDestinationId("");
        setTitle("");
        setMessage("");
        setSeverity("info");
        setExpiresAt("");

        await loadData();

        setSaving(false);
    }

    async function toggleAdvisory(
        advisoryId: string,
        currentStatus: boolean
    ) {
        const { error } = await supabase
            .from("advisories")
            .update({
                is_active: !currentStatus,
            })
            .eq("id", advisoryId);

        if (error) {
            console.error(error);
            alert(`Unable to update advisory: ${error.message}`);
            return;
        }

        await loadData();
    }

    function getDestinationName(destinationId: string | null) {
        if (!destinationId) {
            return "All Destinations";
        }

        return (
            destinations.find(
                (destination) => destination.id === destinationId
            )?.name ?? "Unknown Destination"
        );
    }

    function getSeverityStyle(severity: string) {
        switch (severity) {
            case "danger":
                return "bg-red-100 text-red-700";

            case "warning":
                return "bg-amber-100 text-amber-700";

            case "info":
                return "bg-blue-100 text-blue-700";

            default:
                return "bg-slate-100 text-slate-600";
        }
    }

    const activeAdvisories = advisories.filter(
        (advisory) => advisory.is_active
    );

    return (
        <main className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-600">
                            ADMIN DASHBOARD
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            Advisories
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Create and manage safety notices for Tanay destinations.
                        </p>
                    </div>

                    <nav className="flex flex-wrap items-center gap-2">
                        <Link
                            href="/admin"
                            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/logbook"
                            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            Logbook
                        </Link>

                        <Link
                            href="/admin/water-conditions"
                            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            Water
                        </Link>

                        <Link
                            href="/admin/advisories"
                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600"
                        >
                            Advisories
                        </Link>

                        <Link
                            href="/admin/reports"
                            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            Reports
                        </Link>
                    </nav>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Advisories
                        </p>

                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {advisories.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Active Advisories
                        </p>

                        <p className="mt-2 text-3xl font-bold text-red-600">
                            {activeAdvisories.length}
                        </p>
                    </div>
                </div>

                {/* Create Advisory */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Create Advisory
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Publish a safety notice for a destination or all
                            destinations.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Destination */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Destination
                                </label>

                                <select
                                    value={destinationId}
                                    onChange={(e) =>
                                        setDestinationId(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        All Destinations
                                    </option>

                                    {destinations.map((destination) => (
                                        <option
                                            key={destination.id}
                                            value={destination.id}
                                        >
                                            {destination.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Severity */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Severity
                                </label>

                                <select
                                    value={severity}
                                    onChange={(e) =>
                                        setSeverity(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="info">Information</option>
                                    <option value="warning">Warning</option>
                                    <option value="danger">Danger</option>
                                </select>
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Advisory Title *
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Strong Current Advisory"
                                required
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Message */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Message *
                            </label>

                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                rows={5}
                                placeholder="Enter the safety advisory message..."
                                required
                                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Expiration */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Expiration Date & Time
                            </label>

                            <input
                                type="datetime-local"
                                value={expiresAt}
                                onChange={(e) =>
                                    setExpiresAt(e.target.value)
                                }
                                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? "Publishing..." : "Publish Advisory"}
                        </button>
                    </form>
                </section>

                {/* Advisory Records */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Advisory Records
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage published safety notices.
                        </p>
                    </div>

                    {loading ? (
                        <div className="p-6 text-sm text-slate-500">
                            Loading advisories...
                        </div>
                    ) : advisories.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="font-medium text-slate-700">
                                No advisories yet.
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Published advisories will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {advisories.map((advisory) => (
                                <div
                                    key={advisory.id}
                                    className="p-6 transition hover:bg-slate-50"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div className="min-w-0">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold text-slate-900">
                                                    {advisory.title}
                                                </h3>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getSeverityStyle(
                                                        advisory.severity
                                                    )}`}
                                                >
                                                    {advisory.severity}
                                                </span>

                                                {advisory.is_active ? (
                                                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-2 text-sm font-medium text-slate-600">
                                                {getDestinationName(
                                                    advisory.destination_id
                                                )}
                                            </p>

                                            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                                                {advisory.message}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                                                <span>
                                                    Created:{" "}
                                                    {new Date(
                                                        advisory.created_at
                                                    ).toLocaleString()}
                                                </span>

                                                {advisory.expires_at && (
                                                    <span>
                                                        Expires:{" "}
                                                        {new Date(
                                                            advisory.expires_at
                                                        ).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                toggleAdvisory(
                                                    advisory.id,
                                                    advisory.is_active
                                                )
                                            }
                                            className="shrink-0 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                        >
                                            {advisory.is_active
                                                ? "Deactivate"
                                                : "Activate"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}