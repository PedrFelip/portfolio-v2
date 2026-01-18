import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pedro Felipe - Links",
  description: "Connect with me on social media and professional platforms",
};

export default function LinksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md">{children}</div>
      </main>
    </div>
  );
}
