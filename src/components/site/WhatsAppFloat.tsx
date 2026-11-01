import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { genericWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={genericWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar connosco no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
    >
      <WhatsAppIcon className="h-7 w-7" title="" />
    </a>
  );
}
