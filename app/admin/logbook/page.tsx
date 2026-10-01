"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Destination = {
    id: string;
    name: string;
    location: string | null;
    visitor_capacity: number;
    operational_status: string;
};

type Visitor = {
    id: string;
    destination_id: string;
    full_name: string;
    contact_number: string | null;
    email: string | null;
    group_size: number;
    purpose: string | null;
    emergency_contact_name: string | null;
    emergency_contact_number: string | null;
    check_in: string;
    check_out: string | null;
};

export default function LogbookPage() {
    const supabase = createClient();

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState(true);

    const [destinationId, setDestinationId] = useState("");
    const [fullName, setFullName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [groupSize, setGroupSize] = useState("1");
    const [purpose, setPurpose] = useState("");
    const [emergencyName, setEmergencyName] = useState("");
    const [emergencyNumber, setEmergencyNumber] = useState("");
    const [saving, setSaving] = useState(false);

    async function loadData() {
        setLoading(true);

        const { data: destinationData } = await supabase
            .from("destinations")
            .select("id, name, location, visitor_capacity, operational_status")
            .eq("is_active", true)
            .order("name");

        const { data: visitorData } = await supabase
            .from("visitors")
            .select("*")
            .order("check_in", { ascending: false });

        setDestinations(destinationData ?? []);
        setVisitors(visitorData ?? []);

        if (!destinationId && destinationData?.length) {
            setDestinationId(destinationData[0].id);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleCheckIn(e: React.FormEvent) {
        e.preventDefault();

        if (!destinationId || !fullName.trim()) {
            alert("Please select a destination and enter the visitor's name.");
            return;
        }

        const selectedDestination = destinations.find(
            (destination) => destination.id === destinationId
        );

        if (!selectedDestination) {
            alert("Unable to find the selected destination.");
            return;
        }

        const currentVisitors = visitors
            .filter(
                (visitor) =>
                    visitor.destination_id === destinationId &&
                    visitor.check_out === null
            )
            .reduce(
                (total, visitor) => total + visitor.group_size,
                0
            );

        const requestedGroupSize = Number(groupSize) || 1;

        const availableCapacity =
            selectedDestination.visitor_capacity - currentVisitors;

        if (requestedGroupSize > availableCapacity) {
            alert(
                `${selectedDestination.name} does not have enough available capacity.\n\n` +
                `Current visitors: ${currentVisitors}\n` +
                `Available capacity: ${Math.max(availableCapacity, 0)}\n` +
                `Requested group size: ${requestedGroupSize}\n` +
                `Total capacity: ${selectedDestination.visitor_capacity}`
            );
            return;
        }

        if (selectedDestination.operational_status === "closed") {
            alert(
                `${selectedDestination.name} is currently closed. New visitor check-ins are not allowed.`
            );
            return;
        }

        if (selectedDestination.operational_status === "limited") {
            const proceed = confirm(
                `${selectedDestination.name} currently has limited access.\n\n` +
                `Available capacity: ${availableCapacity}\n\n` +
                `Do you want to continue with this visitor check-in?`
            );

            if (!proceed) {
                return;
            }
        }

        if (selectedDestination?.operational_status === "closed") {
            alert(
                `${selectedDestination.name} is currently closed. New visitor check-ins are not allowed.`
            );
            return;
        }

        if (selectedDestination?.operational_status === "limited") {
            const proceed = confirm(
                `${selectedDestination.name} currently has limited access.\n\nDo you want to continue with this visitor check-in?`
            );

            if (!proceed) {
                return;
            }
        }
        setSaving(true);

        const { error } = await supabase.from("visitors").insert({
            destination_id: destinationId,
            full_name: fullName.trim(),
            contact_number: contactNumber.trim() || null,
            email: email.trim() || null,
            group_size: Number(groupSize) || 1,
            purpose: purpose.trim() || null,
            emergency_contact_name: emergencyName.trim() || null,
            emergency_contact_number: emergencyNumber.trim() || null,
        });

        if (error) {
            console.error(error);
            alert("Unable to check in visitor.");
            setSaving(false);
            return;
        }

        setFullName("");
        setContactNumber("");
        setEmail("");
        setGroupSize("1");
        setPurpose("");
        setEmergencyName("");
        setEmergencyNumber("");

        await loadData();

        setSaving(false);
    }

    async function handleCheckOut(visitorId: string) {
        const confirmed = confirm("Mark this visitor as checked out?");

        if (!confirmed) return;

        const { error } = await supabase
            .from("visitors")
            .update({
                check_out: new Date().toISOString(),
            })
            .eq("id", visitorId);

        if (error) {
            console.error(error);
            alert("Unable to check out visitor.");
            return;
        }

        await loadData();
    }

    function getDestinationName(destinationId: string) {
        return (
            destinations.find((destination) => destination.id === destinationId)
                ?.name ?? "Unknown Destination"
        );
    }

    const currentlyInside = visitors.filter(
        (visitor) => visitor.check_out === null
    );

    return (
        <main className="min-h-screen bg-slate-50 p-6">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <div>
                    <p className="text-sm font-medium text-blue-600">
                        ADMIN DASHBOARD
                    </p>

                    <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                        Digital Logbook
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage visitor check-ins and check-outs for Daranak Falls and
                        Tinipak River.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">Total Records</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">
                            {visitors.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">Currently Inside</p>
                        <p className="mt-2 text-3xl font-bold text-blue-600">
                            {currentlyInside.reduce(
                                (total, visitor) => total + visitor.group_size,
                                0
                            )}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">Active Destinations</p>
                        <p className="mt-2 text-3xl font-bold text-emerald-600">
                            {destinations.length}
                        </p>
                    </div>
                </div>

                {/* Check-in form */}
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Visitor Check-In
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Record the visitor information before allowing entry.
                        </p>
                    </div>

                    <form onSubmit={handleCheckIn} className="space-y-5">
                        <div className="grid gap-5 md:grid-cols-2">
                            {/* Destination */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Destination
                                </label>

                                <select
                                    value={destinationId}
                                    onChange={(e) => setDestinationId(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    {destinations.map((destination) => (
                                        <option key={destination.id} value={destination.id}>
                                            {destination.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Full Name *
                                </label>

                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Juan Dela Cruz"
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Contact */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Contact Number
                                </label>

                                <input
                                    type="tel"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    placeholder="09XXXXXXXXX"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="visitor@email.com"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Group Size */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Group Size *
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={groupSize}
                                    onChange={(e) => setGroupSize(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Purpose */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Purpose of Visit
                                </label>

                                <select
                                    value={purpose}
                                    onChange={(e) => setPurpose(e.target.value)}
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">Select purpose</option>
                                    <option value="Leisure">Leisure</option>
                                    <option value="Swimming">Swimming</option>
                                    <option value="Hiking">Hiking</option>
                                    <option value="Sightseeing">Sightseeing</option>
                                    <option value="Research">Research</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Emergency Contact */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Emergency Contact Name
                                </label>

                                <input
                                    type="text"
                                    value={emergencyName}
                                    onChange={(e) => setEmergencyName(e.target.value)}
                                    placeholder="Emergency contact"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Emergency Number */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Emergency Contact Number
                                </label>

                                <input
                                    type="tel"
                                    value={emergencyNumber}
                                    onChange={(e) => setEmergencyNumber(e.target.value)}
                                    placeholder="09XXXXXXXXX"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving ? "Checking In..." : "Check In Visitor"}
                        </button>
                    </form>
                </section>

                {/* Visitor list */}
                <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-6">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Visitor Records
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            View active and completed visitor records.
                        </p>
                    </div>

                    {loading ? (
                        <div className="p-6 text-sm text-slate-500">
                            Loading visitor records...
                        </div>
                    ) : visitors.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="font-medium text-slate-700">
                                No visitor records yet.
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Checked-in visitors will appear here.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[900px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4">Visitor</th>
                                        <th className="px-6 py-4">Destination</th>
                                        <th className="px-6 py-4">Group</th>
                                        <th className="px-6 py-4">Check In</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {visitors.map((visitor) => (
                                        <tr key={visitor.id} className="hover:bg-slate-50">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">
                                                    {visitor.full_name}
                                                </div>

                                                {visitor.contact_number && (
                                                    <div className="mt-1 text-xs text-slate-500">
                                                        {visitor.contact_number}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {getDestinationName(visitor.destination_id)}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {visitor.group_size}
                                            </td>

                                            <td className="px-6 py-4 text-slate-700">
                                                {new Date(visitor.check_in).toLocaleString()}
                                            </td>

                                            <td className="px-6 py-4">
                                                {visitor.check_out === null ? (
                                                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                        Currently Inside
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                                                        Checked Out
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4">
                                                {visitor.check_out === null && (
                                                    <button
                                                        onClick={() => handleCheckOut(visitor.id)}
                                                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                                                    >
                                                        Check Out
                                                    </button>
                                                )}
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