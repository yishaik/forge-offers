import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge — Paste the job. Send a priced page. Get paid.",
  description: "Quote-to-cash for freelancers, consultants, and SMB service businesses. Turn messy job briefs into client-ready priced offer pages.",
  keywords: ["freelancer", "quotes", "proposals", "invoicing", "offers", "pricing"],
  authors: [{ name: "Forge" }],
  openGraph: {
    title: "Forge — Quote-to-Cash for Freelancers",
    description: "Turn messy job briefs into client-ready priced offer pages.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
