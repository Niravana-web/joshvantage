import type { Metadata } from "next";
import LeadsAdmin from "./LeadsAdmin";

export const metadata: Metadata = {
  title: "Leads | Josh Vantage Admin",
  robots: { index: false, follow: false },
};

export default function AdminLeadsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-6 py-16 text-[#181815] md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow-mono text-[#8a8a83]">/ADMIN</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
          Form submissions
        </h1>
        <LeadsAdmin />
      </div>
    </main>
  );
}
