/**
 * Filtrado del catálogo por categoría (HAP-110).
 */

export const ALL_CATEGORIES = "todos";

export function matchesCategory(cardCategory, selected) {
  return selected === ALL_CATEGORIES || cardCategory === selected;
}
