"use client";

import { MinusIcon, PlusIcon } from "./Icons";
import { MAX_QTY } from "./ShopProvider";

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  small,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  small?: boolean;
}) {
  return (
    <div className={`stepper ${small ? "stepper-sm" : ""}`}>
      <button type="button" aria-label="Menge verringern" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}>
        <MinusIcon size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" aria-label="Menge erhöhen" onClick={() => onChange(Math.min(MAX_QTY, value + 1))} disabled={value >= MAX_QTY}>
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
