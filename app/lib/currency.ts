// app/lib/currency.ts
// Explicit 'en-IN' locale: formatting must be identical on server and client,
// or React throws a hydration mismatch.
const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export function formatRupees(amount: number) {
  return rupees.format(amount);
}
