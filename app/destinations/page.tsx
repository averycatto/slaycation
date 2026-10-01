import { createClient } from "@/lib/supabase/server";

type Destination = {
    id: string;
    name: string;
    location: string | null;
    visitor_capacity: number;
    description: string | null;
    operational_status: string;
};

type Visitor = {
    destination_id: string;
    group_size: number;
    check_out: string | null;
};

type WaterCondition = {
    destination_id: string;
    water_level: string | null;
    turbidity: string | null;
    rainfall: string | null;
    current_condition: string | null;
    overall_status: string | null;
    recorded_at: string;
};

type Advisory = {
    destination_id: string | null;
    title: string;
    message: string;
    severity: string;
    is_active: boolean;
    expires_at: string | null;
};

export default async function DestinationsPage() {
    const supabase = await createClient();

    const [
        { data: destinations },
        { data: visitors },
        { data: waterConditions },
        { data: advisories },
    ] = await Promise.all([
        supabase
            .from("destinations")
            .select("*")
            .eq("is_active", true)
            .order("name"),

        supabase
            .from("visitors")
            .select("destination_id, group_size, check_out"),

        supabase
            .from("water_conditions")
            .select(
                "destination_id, water_level, turbidity, rainfall, current_condition, overall_status, recorded_at"
            )
            .order("recorded_at", { ascending: false }),

        supabase
            .from("advisories")
            .select(
                "destination_id, title, message, severity, is_active, expires_at"
            )
            .eq("is_active", true)
            .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
            .order("created_at", { ascending: false }),
    ]);

    const destinationList = (destinations ?? []) as Destination[];
    const visitorList = (visitors ?? []) as Visitor[];
    const waterList = (waterConditions ?? []) as WaterCondition[];
    const advisoryList = (advisories ?? []) as Advisory[];

    return (
        <main className="min-h-screen bg-slate-950 text-white">
            {/* Header */}
            <header className="border-b border-white/10 bg-slate-950/95">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    <p className="text-sm font-medium text-emerald-400">
                        SLAYCATION DMS
                    </p>

                    <h1 className="mt-2 text-3xl font-bold">
                        Destination Status
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        Check the latest visitor capacity, water conditions,
                        and active advisories for selected destinations.
                    </p>
                </div>
            </header>

            {/* Destinations */}
            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid gap-6 md:grid-cols-2">
                    {destinationList.map((destination) => {
                        const currentVisitors = visitorList
                            .filter(
                                (visitor) =>
                                    visitor.destination_id === destination.id &&
                                    visitor.check_out === null
                            )
                            .reduce(
                                (total, visitor) =>
                                    total + Number(visitor.group_size || 0),
                                0
                            );

                        const capacity = destination.visitor_capacity;
                        const available = Math.max(
                            capacity - currentVisitors,
                            0
                        );

                        const occupancy =
                            capacity > 0
                                ? Math.round(
                                    (currentVisitors / capacity) * 100
                                )
                                : 0;

                        const latestWater = waterList.find(
                            (condition) =>
                                condition.destination_id === destination.id
                        );

                        const destinationAdvisories = advisoryList.filter(
                            (advisory) =>
                                advisory.destination_id === destination.id ||
                                advisory.destination_id === null
                        );

                        let occupancyStatus = "Low";

                        if (occupancy >= 80) {
                            occupancyStatus = "High";
                        } else if (occupancy >= 50) {
                            occupancyStatus = "Moderate";
                        }

                        return (
                            <article
                                key={destination.id}
                                className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl"
                            >
                                {/* Destination Header */}
                                <div>
                                    <p className="text-sm font-medium text-emerald-400">
                                        Destination
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold">
                                        {destination.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        {destination.location}
                                    </p>

                                    <div
                                        className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 ${destination.operational_status === "closed"
                                            ? "border border-red-400/20 bg-red-400/10"
                                            : destination.operational_status === "limited"
                                                ? "border border-amber-400/20 bg-amber-400/10"
                                                : "border border-emerald-400/20 bg-emerald-400/10"
                                            }`}
                                    >
                                        <span
                                            className={`h-2 w-2 rounded-full ${destination.operational_status === "closed"
                                                ? "bg-red-400"
                                                : destination.operational_status === "limited"
                                                    ? "bg-amber-400"
                                                    : "bg-emerald-400"
                                                }`}
                                        />

                                        <span
                                            className={`text-sm font-semibold ${destination.operational_status === "closed"
                                                ? "text-red-400"
                                                : destination.operational_status === "limited"
                                                    ? "text-amber-400"
                                                    : "text-emerald-400"
                                                }`}
                                        >
                                            {destination.operational_status === "closed"
                                                ? "CLOSED"
                                                : destination.operational_status === "limited"
                                                    ? "LIMITED ACCESS"
                                                    : "OPEN"}
                                        </span>
                                    </div>

                                    {destination.operational_status === "closed" && (
                                        <div className="mt-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4">
                                            <p className="text-sm font-semibold text-red-300">
                                                Destination Currently Closed
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-red-200/70">
                                                New visitors are currently not being accepted at this destination.
                                            </p>
                                        </div>
                                    )}

                                    {destination.operational_status === "limited" && (
                                        <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
                                            <p className="text-sm font-semibold text-amber-300">
                                                Limited Access
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-amber-200/70">
                                                Access is currently limited. Please check the latest advisories before visiting.
                                            </p>
                                        </div>
                                    )}

                                    {destination.description && (
                                        <p className="mt-4 text-sm leading-6 text-slate-400">
                                            {destination.description}
                                        </p>
                                    )}
                                </div>

                                {/* Capacity */}
                                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
                                    <div className="flex items-center justify-between">
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

                                            <p className="mt-1 text-xl font-semibold">
                                                {capacity}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                                        <div
                                            className="h-full rounded-full bg-emerald-500 transition-all"
                                            style={{
                                                width: `${Math.min(
                                                    occupancy,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-sm">
                                        <span className="text-slate-400">
                                            {available} available
                                        </span>

                                        <span className="font-medium text-emerald-400">
                                            {occupancyStatus} occupancy
                                        </span>
                                    </div>
                                </div>

                                {/* Water Conditions */}
                                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-400">
                                                Water Conditions
                                            </p>

                                            <span
                                                className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${latestWater?.overall_status === "safe"
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : latestWater?.overall_status === "caution"
                                                            ? "bg-amber-500/10 text-amber-400"
                                                            : latestWater?.overall_status === "danger"
                                                                ? "bg-red-500/10 text-red-400"
                                                                : "bg-white/10 text-slate-400"
                                                    }`}
                                            >
                                                {latestWater?.overall_status === "safe"
                                                    ? "SAFE"
                                                    : latestWater?.overall_status === "caution"
                                                        ? "CAUTION"
                                                        : latestWater?.overall_status === "danger"
                                                            ? "DANGER"
                                                            : "NO DATA"}
                                            </span>
                                        </div>

                                        <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                                            {latestWater
                                                ? new Date(
                                                    latestWater.recorded_at
                                                ).toLocaleDateString()
                                                : "No record"}
                                        </div>
                                    </div>

                                    {latestWater && (
                                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <p className="text-slate-500">
                                                    Water Level
                                                </p>
                                                <p className="mt-1 text-slate-200">
                                                    {latestWater.water_level ??
                                                        "—"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-slate-500">
                                                    Turbidity
                                                </p>
                                                <p className="mt-1 text-slate-200">
                                                    {latestWater.turbidity ??
                                                        "—"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-slate-500">
                                                    Rainfall
                                                </p>
                                                <p className="mt-1 text-slate-200">
                                                    {latestWater.rainfall ?? "—"}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-slate-500">
                                                    Current Condition
                                                </p>
                                                <p className="mt-1 text-slate-200">
                                                    {latestWater.current_condition ??
                                                        "—"}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Advisories */}
                                <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                                    <p className="text-sm text-slate-400">
                                        Active Advisories
                                    </p>

                                    {destinationAdvisories.length === 0 ? (
                                        <p className="mt-3 text-sm text-slate-500">
                                            No active advisories.
                                        </p>
                                    ) : (
                                        <div className="mt-3 space-y-3">
                                            {destinationAdvisories.map(
                                                (advisory) => (
                                                    <div
                                                        key={`${advisory.title}-${advisory.destination_id}`}
                                                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                                                    >
                                                        <p className="text-sm font-semibold">
                                                            {advisory.title}
                                                        </p>

                                                        <p className="mt-1 text-sm leading-6 text-slate-400">
                                                            {advisory.message}
                                                        </p>

                                                        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-amber-400">
                                                            {advisory.severity}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}