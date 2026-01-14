"use client";

import { useParams } from "next/navigation";
import { NotFound } from "@/components/NotFound";

export default function NotFoundPage() {
  const params = useParams();
  const lang = (params.lang as string) || "en";

  return (
    <div key={lang}>
      <NotFound />
    </div>
  );
}
