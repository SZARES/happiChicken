/**
 * Lógica pura del carrito (HAP-112).
 * No toca el DOM ni localStorage, así puede probarse con node:test.
 * Los montos se manejan en céntimos para evitar errores de coma flotante.
 */

export function toCents(price) {
  const value = Number(price);
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`Precio inválido: ${price}`);
  }
  return Math.round(value * 100);
}

export function addItem(cart, { name, price }) {
  if (!name) throw new Error("El producto necesita un nombre");
  const priceCents = toCents(price);
  const existing = cart.find((item) => item.name === name);

  if (existing) {
    return cart.map((item) => (item.name === name ? { ...item, qty: item.qty + 1 } : item));
  }
  return [...cart, { name, priceCents, qty: 1 }];
}

export function decrementItem(cart, name) {
  return cart
    .map((item) => (item.name === name ? { ...item, qty: item.qty - 1 } : item))
    .filter((item) => item.qty > 0);
}

export function removeItem(cart, name) {
  return cart.filter((item) => item.name !== name);
}

export function getTotalCents(cart) {
  return cart.reduce((sum, item) => sum + item.priceCents * item.qty, 0);
}

export function getItemCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function formatSoles(cents) {
  return (cents / 100).toFixed(2);
}
