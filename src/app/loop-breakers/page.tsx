import type { Metadata } from "next";
import DashboardClient from "./dashboard-client";

export const metadata: Metadata = {
  title: "Loop-breakers inbox — Better Within",
  description: "Subscriber dashboard.",
  robots: { index: false, follow: false },
};

export default function LoopBreakersPage() {
  return <DashboardClient />;
}
