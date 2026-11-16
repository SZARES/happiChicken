/**
 * Generador del pedido hacia WhatsApp (HAP-113).
 */
import { formatSoles, getTotalCents } from "./cart.js";

export function normalizePhone(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (digits.length < 9) throw new Error("Número de WhatsApp inválido");
  // Números peruanos de 9 dígitos: se antepone el código de país 51.
  return digits.length === 9 ? `51${digits}` : digits;
}

export function buildOrderMessage(cart) {
  if (!cart.length) throw new Error("El carrito está vacío");

  const lines = cart.map(
    (item) => `• ${item.qty} x ${item.name} — S/ ${formatSoles(item.priceCents * item.qty)}`
  );

  return [
    "Hola Happy Chicken 👋 Quiero hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: S/ ${formatSoles(getTotalCents(cart))}`,
  ].join("\n");
}

export function buildWhatsAppUrl(phone, cart) {
  const text = encodeURIComponent(buildOrderMessage(cart));
  return `https://wa.me/${normalizePhone(phone)}?text=${text}`;
}
