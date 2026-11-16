import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  addItem,
  decrementItem,
  formatSoles,
  getItemCount,
  getTotalCents,
  removeItem,
  toCents,
} from "../src/js/modules/cart.js";

const pollo = { name: "Pollo Happy", price: "24.90" };
const papas = { name: "Papas doraditas", price: "9.90" };

describe("cart.js (HAP-112)", () => {
  it("agrega un producto nuevo con cantidad 1", () => {
    const cart = addItem([], pollo);
    assert.deepEqual(cart, [{ name: "Pollo Happy", priceCents: 2490, qty: 1 }]);
  });

  it("incrementa la cantidad si el producto ya existe", () => {
    const cart = addItem(addItem([], pollo), pollo);
    assert.equal(cart.length, 1);
    assert.equal(cart[0].qty, 2);
  });

  it("no muta el carrito original", () => {
    const original = addItem([], pollo);
    addItem(original, pollo);
    assert.equal(original[0].qty, 1);
  });

  it("calcula el total sin errores de coma flotante", () => {
    // 0.1 + 0.2 en flotantes da 0.30000000000000004; en céntimos debe ser exacto.
    let cart = addItem([], { name: "A", price: "0.10" });
    cart = addItem(cart, { name: "B", price: "0.20" });
    assert.equal(getTotalCents(cart), 30);
    assert.equal(formatSoles(getTotalCents(cart)), "0.30");
  });

  it("suma el total de varios productos y cantidades", () => {
    const cart = addItem(addItem(addItem([], pollo), pollo), papas);
    assert.equal(formatSoles(getTotalCents(cart)), "59.70");
    assert.equal(getItemCount(cart), 3);
  });

  it("decrementa y elimina la línea al llegar a cero", () => {
    let cart = addItem(addItem([], pollo), pollo);
    cart = decrementItem(cart, "Pollo Happy");
    assert.equal(cart[0].qty, 1);
    cart = decrementItem(cart, "Pollo Happy");
    assert.deepEqual(cart, []);
  });

  it("elimina un producto completo", () => {
    const cart = removeItem(addItem(addItem([], pollo), papas), "Pollo Happy");
    assert.deepEqual(
      cart.map((i) => i.name),
      ["Papas doraditas"]
    );
  });

  it("rechaza precios inválidos", () => {
    assert.throws(() => toCents("abc"));
    assert.throws(() => toCents(-5));
    assert.throws(() => addItem([], { name: "", price: 10 }));
  });
});
