import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  light?: boolean;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
  light,
}: PageHeaderProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-medium uppercase tracking-[0.22em]",
            light ? "text-ivory/70" : "text-muted-foreground",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h1
        className={cn(
          "font-display text-4xl leading-[1.05] sm:text-5xl md:text-6xl",
          light ? "text-ivory" : "text-espresso",
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-ivory/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
