import { Metadata } from "next";

export const metadata: Metadata = {
  title: "IIInternship Success Stories & Blogs",
  description:
    "Expert insights, student cohort retrospectives, training programs, and logistics updates from IIInternship.",
  keywords: [
    "IIInternship Blog",
    "Global Shipping Blog",
    "E-commerce Logistics Tips",
    "CSB-V Customs Clearance",
    "Amazon FBA Prep India",
    "Cross-border shipping guide",
  ],
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
