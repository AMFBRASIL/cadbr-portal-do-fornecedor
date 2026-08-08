import logo from "@/assets/cadbr-logo.png";
import { SITE } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt={SITE.name}
      className={className}
      width={230}
      height={115}
      loading="eager"
      decoding="async"
    />
  );
}
