import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Disponível: "bg-olive/15 text-olive",
  "Últimas unidades": "bg-espresso/10 text-espresso",
  "Sob encomenda": "bg-sand text-espresso",
  Indisponível: "bg-muted text-muted-foreground",
};

type AvailabilityProps = {
  status: string;
  note?: string;
  className?: string;
};

export function Availability({ status, note, className }: AvailabilityProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span
        className={cn(
          "inline-flex px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em]",
          styles[status] ?? "bg-muted text-muted-foreground",
        )}
      >
        {status}
      </span>
      {note ? <span className="text-sm text-muted-foreground">{note}</span> : null}
    </div>
  );
}
