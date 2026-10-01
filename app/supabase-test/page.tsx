"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Destination = {
  id: string;
  name: string;
  location: string | null;
  visitor_capacity: number;
  description: string | null;
};

export default function SupabaseTestPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDestinations() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) {
        setError(error.message);
      } else {
        setDestinations(data ?? []);
      }

      setLoading(false);
    }

    loadDestinations();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">
          Supabase Connection Test
        </h1>

        <p className="mt-2 text-slate-400">
          Slaycation Destination Management System
        </p>

        {loading && (
          <p className="mt-8 text-slate-300">
            Loading destinations...
          </p>
        )}

        {error && (
          <div className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <p className="font-semibold text-red-400">
              Connection Error
            </p>

            <p className="mt-2 text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h2 className="text-xl font-semibold">
                  {destination.name}
                </h2>

                <p className="mt-2 text-slate-400">
                  {destination.location}
                </p>

                <div className="mt-4">
                  <p className="text-sm text-slate-400">
                    Visitor Capacity
                  </p>

                  <p className="text-2xl font-bold">
                    {destination.visitor_capacity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && destinations.length === 0 && (
          <p className="mt-8 text-slate-400">
            No destinations found.
          </p>
        )}
      </div>
    </main>
  );
}