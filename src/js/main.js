import { WHATSAPP_PHONE } from "./config.js";
import { ALL_CATEGORIES, matchesCategory } from "./modules/catalog.js";
import { addItem, decrementItem, formatSoles, getTotalCents } from "./modules/cart.js";
import { buildWhatsAppUrl } from "./modules/whatsapp.js";
import { loadCart, saveCart } from "./state/store.js";
import { escapeHtml } from "./utils/escape-html.js";

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const storage = getStorage();
  let cart = loadCart(storage);

  /* ---------- Navegación móvil ---------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Catálogo (HAP-110) ---------- */
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".food-card");

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      filters.forEach((f) => f.classList.remove("active"));
      filter.classList.add("active");
      const selected = filter.dataset.filter ?? ALL_CATEGORIES;

      cards.forEach((card) => {
        card.classList.toggle("hidden", !matchesCategory(card.dataset.category, selected));
      });
    });
  });

  /* ---------- Toast (HAP-114) ---------- */
  const toast = document.querySelector(".toast");
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  /* ---------- Carrito (HAP-112) ---------- */
  const cartContainer = document.querySelector(".cart-items");
  const totalElement = document.querySelector(".order-total strong b");

  function updateCart(nextCart) {
    cart = nextCart;
    saveCart(storage, cart);
    renderCart();
  }

  function renderCart() {
    if (!cartContainer || !totalElement) return;

    if (!cart.length) {
      cartContainer.innerHTML = `
        <div class="empty-cart">
          <img class="empty-cart-img" src="imagenes/pollo-real.webp" alt="" />
          <strong>Aquí aparecerá tu pedido</strong>
          <small>Agrega algo rico desde nuestro menú.</small>
        </div>`;
      totalElement.textContent = "0.00";
      return;
    }

    cartContainer.innerHTML = cart
      .map((item) => {
        const name = escapeHtml(item.name);
        return `
      <div class="cart-line">
        <div><strong>${name}</strong><small>${item.qty} × S/ ${formatSoles(item.priceCents)}</small></div>
        <strong>S/ ${formatSoles(item.priceCents * item.qty)}</strong>
        <button class="remove-line" type="button" data-name="${name}" aria-label="Quitar uno de ${name}">−</button>
      </div>`;
      })
      .join("");

    totalElement.textContent = formatSoles(getTotalCents(cart));
  }

  // Delegación de eventos: un solo listener para todas las líneas del carrito.
  cartContainer?.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-line");
    if (!button) return;
    updateCart(decrementItem(cart, button.dataset.name));
  });

  document.querySelectorAll(".add-btn").forEach((button) => {
    button.setAttribute("aria-label", `Agregar ${button.dataset.name} al pedido`);
    button.addEventListener("click", () => {
      const { name, price } = button.dataset;
      updateCart(addItem(cart, { name, price }));
      showToast(`${name} agregado a tu pedido`);
    });
  });

  document.querySelector(".clear-cart")?.addEventListener("click", () => {
    if (!cart.length) return;
    updateCart([]);
    showToast("Pedido vacío");
  });

  /* ---------- Checkout por WhatsApp (HAP-113) ---------- */
  document.querySelector(".order-button")?.addEventListener("click", () => {
    if (!cart.length) {
      showToast("Primero agrega algo rico al pedido");
      document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.open(buildWhatsAppUrl(WHATSAPP_PHONE, cart), "_blank", "noopener");
  });

  /* ---------- Footer ---------- */
  const year = document.querySelector(".footer-bottom span");
  if (year) {
    year.textContent = `© ${new Date().getFullYear()} Happy Chicken. Todos los derechos reservados.`;
  }

  renderCart();
});
