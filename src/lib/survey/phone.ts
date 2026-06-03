/** US phone: 10 digits, optional leading 1 */
export function normalizeUsPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }
  return digits;
}

export function isValidUsPhone(value: string): boolean {
  const digits = normalizeUsPhone(value);
  return digits.length === 10;
}

export function formatUsPhoneDisplay(value: string): string {
  const digits = normalizeUsPhone(value);
  if (digits.length !== 10) return value.trim();
  return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
