import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-18 sm:py-22 md:py-24",
        "border-t border-white/6",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-10 sm:mb-12">
      <p className="text-xs font-medium tracking-[0.22em] uppercase text-white/60">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-white/66">
          {description}
        </p>
      ) : null}
    </header>
  );
}

