import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { addItem } from "../src/js/modules/cart.js";
import { buildOrderMessage, buildWhatsAppUrl, normalizePhone } from "../src/js/modules/whatsapp.js";

const cart = addItem(
  addItem(addItem([], { name: "Happy Combo", price: 32.9 }), {
    name: "Happy Combo",
    price: 32.9,
  }),
  { name: "Papas doraditas", price: 9.9 }
);

describe("whatsapp.js (HAP-113)", () => {
  it("antepone 51 a números peruanos de 9 dígitos", () => {
    assert.equal(normalizePhone("987 654 321"), "51987654321");
    assert.equal(normalizePhone("+51 987-654-321"), "51987654321");
  });

  it("rechaza números incompletos", () => {
    assert.throws(() => normalizePhone("12345"));
  });

  it("arma el mensaje con cada producto, subtotal y total", () => {
    const message = buildOrderMessage(cart);
    assert.match(message, /• 2 x Happy Combo — S\/ 65\.80/);
    assert.match(message, /• 1 x Papas doraditas — S\/ 9\.90/);
    assert.match(message, /Total: S\/ 75\.70$/);
  });

  it("no permite generar un pedido con el carrito vacío", () => {
    assert.throws(() => buildOrderMessage([]), /vacío/);
  });

  it("genera una URL de wa.me con el texto codificado", () => {
    const url = new URL(buildWhatsAppUrl("987654321", cart));
    assert.equal(url.origin, "https://wa.me");
    assert.equal(url.pathname, "/51987654321");
    assert.equal(url.searchParams.get("text"), buildOrderMessage(cart));
  });
});
