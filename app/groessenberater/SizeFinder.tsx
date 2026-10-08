"use client";

import { useState } from "react";

function recommend(cm: number) {
  if (cm <= 15) return { stone: "S · 16 cm", leather: "S · 17 cm" };
  if (cm <= 17) return { stone: "M · 18 cm", leather: "M · 19 cm" };
  return { stone: "L · 20 cm", leather: "L · 21 cm" };
}

export function SizeFinder() {
  const [value, setValue] = useState("");
  const cm = Number(value.replace(",", "."));
  const valid = cm >= 12 && cm <= 24;
  const rec = valid ? recommend(cm) : null;

  return (
    <div className="size-finder">
      <label htmlFor="wrist">Dein Handgelenkumfang</label>
      <div className="size-finder-row">
        <input
          id="wrist"
          inputMode="decimal"
          placeholder="z. B. 16,5"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span>cm</span>
      </div>
      {value && !valid && <p className="form-error">Bitte gib einen Wert zwischen 12 und 24 cm ein.</p>}
      {rec && (
        <div className="size-finder-result">
          <div>
            <span className="eyebrow">Naturstein & Kordel</span>
            <strong>{rec.stone}</strong>
          </div>
          <div>
            <span className="eyebrow">Leder & Edelstahl</span>
            <strong>{rec.leather}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
