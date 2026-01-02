import { Metadata } from "next";
import { generateMetadataWithCanonical } from "@/lib/metadata";

export const metadata: Metadata = generateMetadataWithCanonical(
  '/resume',
  'Resume | William Rice',
  'View my professional resume with work experience, technical skills, and software development expertise.'
);

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}