import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SearchDialog } from "./SearchDialog";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { SkipLink } from "./SkipLink";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SkipLink />
      <SiteHeader />
      <main id="conteudo" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
      <SearchDialog />
    </div>
  );
}
