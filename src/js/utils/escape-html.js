/**
 * Escapa texto antes de insertarlo con innerHTML (evita inyección de HTML).
 */
const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ENTITIES[char]);
}
