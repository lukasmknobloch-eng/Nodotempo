import { LogoScript } from "./LogoScript";

/** Logo der Website: der Schriftzug "Nodotempo" */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`logo ${className ?? ""}`}>
      <LogoScript className="logo-script" />
    </span>
  );
}
