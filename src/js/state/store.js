/**
 * Persistencia del carrito en localStorage (HAP-112).
 * Recibe el storage como parámetro para poder probarlo sin navegador.
 */

export const STORAGE_KEY = "happy-chicken:cart:v1";

function isValidItem(item) {
  return (
    item &&
    typeof item.name === "string" &&
    item.name.length > 0 &&
    Number.isInteger(item.priceCents) &&
    item.priceCents >= 0 &&
    Number.isInteger(item.qty) &&
    item.qty > 0
  );
}

export function loadCart(storage) {
  try {
    const raw = storage?.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isValidItem) : [];
  } catch {
    // JSON corrupto o storage bloqueado (modo privado): se empieza con carrito vacío.
    return [];
  }
}

export function saveCart(storage, cart) {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch {
    return false;
  }
}
