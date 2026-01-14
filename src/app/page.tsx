import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const lang = acceptLanguage.includes("pt") ? "pt" : "en";

  redirect(`/${lang}`);
}
