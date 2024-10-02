// app/rent/layout.tsx (server-side, no "use client")
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Get a comprehensive overview of your activities, manage your airspace, funds, and referrals, all from the SkyTrade Dashboard.",
};

export default function RentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
