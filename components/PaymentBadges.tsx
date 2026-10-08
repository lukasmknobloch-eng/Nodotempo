const methods = ["Visa", "Mastercard", "Amex", "PayPal", "Klarna", "Apple Pay", "Google Pay"];

export function PaymentBadges({ className }: { className?: string }) {
  return (
    <ul className={`payment-badges ${className ?? ""}`} aria-label="Akzeptierte Zahlungsarten">
      {methods.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}
