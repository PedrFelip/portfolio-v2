import Link from "next/link";

interface ViewAllLinkProps {
  href: string;
  label: string;
  className?: string;
}

export const ViewAllLink = ({
  href,
  label,
  className = "",
}: ViewAllLinkProps) => {
  return (
    <div className={`mt-8 sm:mt-12 text-center ${className}`}>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
};
