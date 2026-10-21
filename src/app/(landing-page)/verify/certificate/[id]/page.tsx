import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificateVerifyRouteAlias({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    redirect("/verify");
  }
  redirect(`/verify?cert=${encodeURIComponent(id)}`);
}
