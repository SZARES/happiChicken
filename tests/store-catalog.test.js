import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { loadCart, saveCart, STORAGE_KEY } from "../src/js/state/store.js";
import { matchesCategory } from "../src/js/modules/catalog.js";
import { escapeHtml } from "../src/js/utils/escape-html.js";

function createMemoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value);
    },
  };
}

describe("store.js — persistencia (HAP-112)", () => {
  it("guarda y recupera el carrito", () => {
    const storage = createMemoryStorage();
    const cart = [{ name: "Alitas Happy", priceCents: 1890, qty: 2 }];
    assert.equal(saveCart(storage, cart), true);
    assert.deepEqual(loadCart(storage), cart);
  });

  it("devuelve carrito vacío si no hay datos", () => {
    assert.deepEqual(loadCart(createMemoryStorage()), []);
  });

  it("ignora JSON corrupto sin romper la página", () => {
    const storage = createMemoryStorage({ [STORAGE_KEY]: "{no es json" });
    assert.deepEqual(loadCart(storage), []);
  });

  it("descarta ítems con datos inválidos", () => {
    const storage = createMemoryStorage({
      [STORAGE_KEY]: JSON.stringify([
        { name: "Pollo Happy", priceCents: 2490, qty: 1 },
        { name: "Hack", priceCents: -1, qty: 1 },
        { name: "", priceCents: 100, qty: 1 },
      ]),
    });
    assert.equal(loadCart(storage).length, 1);
  });

  it("no lanza error si el storage está bloqueado", () => {
    const blocked = {
      getItem() {
        throw new Error("SecurityError");
      },
      setItem() {
        throw new Error("QuotaExceededError");
      },
    };
    assert.deepEqual(loadCart(blocked), []);
    assert.equal(saveCart(blocked, []), false);
  });
});

describe("catalog.js — filtro por categoría (HAP-110)", () => {
  it("'todos' muestra cualquier categoría", () => {
    assert.equal(matchesCategory("combos", "todos"), true);
  });

  it("filtra por categoría exacta", () => {
    assert.equal(matchesCategory("pollo", "pollo"), true);
    assert.equal(matchesCategory("combos", "pollo"), false);
  });
});

describe("escapeHtml", () => {
  it("escapa caracteres peligrosos", () => {
    assert.equal(escapeHtml('<img src=x onerror="x">'), "&lt;img src=x onerror=&quot;x&quot;&gt;");
  });
});
