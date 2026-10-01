"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Destination = {
    id: string;
    name: string;
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

export default function WaterConditionsPage() {
    const supabase = createClient();

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [records, setRecords] = useState<WaterCondition[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [destinationId, setDestinationId] = useState("");
    const [waterLevel, setWaterLevel] = useState("");
    const [turbidity, setTurbidity] = useState("");
    const [waterTemperature, setWaterTemperature] = useState("");
    const [rainfall, setRainfall] = useState("");
    const [currentCondition, setCurrentCondition] = useState("");
    const [overallStatus, setOverallStatus] = useState("safe");
    const [notes, setNotes] = useState("");

    async function loadData() {
        setLoading(true);

        const [{ data: destinationData }, { data: recordData }] =
            await Promise.all([
                supabase
                    .from("destinations")
                    .select("id, name")
                    .eq("is_active", true)
                    .order("name"),

                supabase
                    .from("water_conditions")
                    .select("*")
                    .order("recorded_at", { ascending: false }),
            ]);

        setDestinations(destinationData ?? []);
        setRecords(recordData ?? []);

        if (!destinationId && destinationData?.length) {
            setDestinationId(destinationData[0].id);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!destinationId) {
            alert("Please select a destination.");
            return;
        }

        setSaving(true);

        const { error } = await supabase.from("water_conditions").insert({
            destination_id: destinationId,
            water_level: waterLevel || null,
            turbidity: turbidity || null,
            water_temperature: waterTemperature
                ? Number(waterTemperature)
                : null,
            rainfall: rainfall || null,
            current_condition: currentCondition || null,
            overall_status: overallStatus,
            notes: notes || null,
        });

        if (error) {
            console.error(error);
            alert(`Unable to save water condition: ${error.message}`);
            setSaving(false);
            return;
        }

        setWaterLevel("");
        setTurbidity("");
        setWaterTemperature("");
        setRainfall("");
        setCurrentCondition("");
        setOverallStatus("safe");
        setNotes("");

        await loadData();

        setSaving(false);
    }

    function getDestinationName(destinationId: string) {
        return (
            destinations.find(
                (destination) => destination.id === destinationId
            )?.name ?? "Unknown Destination"
        );
    }

    function getStatusStyle(status: string | null) {
        switch (status) {
            case "safe":
                return "bg-emerald-100 text-emerald-700";

            case "caution":
                return "bg-amber-100 text-amber-700";

            case "danger":
                return "bg-red-100 text-red-700";

            default:
                return "bg-slate-100 text-slate-600";
        }
    }

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
                            Water Conditions
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Record and monitor current water and environmental
                            conditions for Tanay destinations.
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
                            className="rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600"
                        >
                            Water
                        </Link>

                        <Link
                            href="/admin/advisories"
                            className="rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
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

                {/* Record Form */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Record Water Condition
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter the latest observed condition of the destination.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Destination */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Destination *
                                </label>

                                <select
                                    value={destinationId}
                                    onChange={(e) => setDestinationId(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
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

                            {/* Water Level */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Water Level
                                </label>

                                <select
                                    value={waterLevel}
                                    onChange={(e) => setWaterLevel(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select water level</option>
                                    <option value="Low">Low</option>
                                    <option value="Normal">Normal</option>
                                    <option value="High">High</option>
                                    <option value="Very High">Very High</option>
                                </select>
                            </div>

                            {/* Turbidity */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Turbidity
                                </label>

                                <select
                                    value={turbidity}
                                    onChange={(e) => setTurbidity(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select turbidity</option>
                                    <option value="Clear">Clear</option>
                                    <option value="Slightly Turbid">
                                        Slightly Turbid
                                    </option>
                                    <option value="Turbid">Turbid</option>
                                    <option value="Very Turbid">Very Turbid</option>
                                </select>
                            </div>

                            {/* Water Temperature */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Water Temperature (°C)
                                </label>

                                <input
                                    type="number"
                                    step="0.1"
                                    value={waterTemperature}
                                    onChange={(e) =>
                                        setWaterTemperature(e.target.value)
                                    }
                                    placeholder="e.g. 25.5"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Rainfall */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Rainfall
                                </label>

                                <select
                                    value={rainfall}
                                    onChange={(e) => setRainfall(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select rainfall</option>
                                    <option value="None">None</option>
                                    <option value="Light">Light</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="Heavy">Heavy</option>
                                </select>
                            </div>

                            {/* Current Condition */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Current Condition
                                </label>

                                <select
                                    value={currentCondition}
                                    onChange={(e) =>
                                        setCurrentCondition(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select condition</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Calm">Calm</option>
                                    <option value="Fast Current">Fast Current</option>
                                    <option value="Strong Current">
                                        Strong Current
                                    </option>
                                    <option value="Flood Risk">Flood Risk</option>
                                </select>
                            </div>

                            {/* Overall Status */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Overall Status *
                                </label>

                                <select
                                    value={overallStatus}
                                    onChange={(e) => setOverallStatus(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="safe">Safe</option>
                                    <option value="caution">Caution</option>
                                    <option value="danger">Danger</option>
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Notes
                            </label>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={4}
                                placeholder="Additional observations or important notes..."
                                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? "Saving..." : "Save Water Condition"}
                        </button>
                    </form>
                </section>

                {/* Records */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Condition Records
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Latest recorded water conditions.
                        </p>
                    </div>

                    {loading ? (
                        <div className="p-6 text-sm text-slate-500">
                            Loading records...
                        </div>
                    ) : records.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="font-medium text-slate-700">
                                No water condition records yet.
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Your first recorded condition will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4">Destination</th>
                                        <th className="px-6 py-4">Water Level</th>
                                        <th className="px-6 py-4">Turbidity</th>
                                        <th className="px-6 py-4">Temperature</th>
                                        <th className="px-6 py-4">Rainfall</th>
                                        <th className="px-6 py-4">Condition</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Recorded</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {records.map((record) => (
                                        <tr
                                            key={record.id}
                                            className="hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4 font-medium text-slate-900">
                                                {getDestinationName(
                                                    record.destination_id
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {record.water_level || "—"}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {record.turbidity || "—"}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {record.water_temperature !== null
                                                    ? `${record.water_temperature}°C`
                                                    : "—"}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {record.rainfall || "—"}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {record.current_condition || "—"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                                                        record.overall_status
                                                    )}`}
                                                >
                                                    {record.overall_status || "Unknown"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {new Date(
                                                    record.recorded_at
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}