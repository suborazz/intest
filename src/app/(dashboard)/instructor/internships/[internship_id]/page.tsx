import { redirect } from "next/navigation";

export default async function InternshipApplicantsPage({
  params,
}: {
  params: Promise<{ internship_id: string }>;
}) {
  const { internship_id } = await params;
  redirect(`/instructor/internships/${internship_id}/applications`);
}
