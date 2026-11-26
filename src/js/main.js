import { WHATSAPP_PHONE } from "./config.js";
import { ALL_CATEGORIES, matchesCategory } from "./modules/catalog.js";
import {
  addItem,
  decrementItem,
  formatSoles,
  getItemCount,
  getTotalCents,
} from "./modules/cart.js";
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

  function applyFilter(selected) {
    filters.forEach((f) => f.classList.toggle("active", f.dataset.filter === selected));
    cards.forEach((card) => {
      card.classList.toggle("hidden", !matchesCategory(card.dataset.category, selected));
    });
  }

  filters.forEach((filter) => {
    filter.addEventListener("click", () => applyFilter(filter.dataset.filter ?? ALL_CATEGORIES));
  });

  // Enlaces que abren el menú ya filtrado (p. ej. "Ver combos" en la promo).
  document.querySelectorAll("[data-filter-link]").forEach((link) => {
    link.addEventListener("click", () => applyFilter(link.dataset.filterLink));
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
  const cartFab = document.querySelector(".cart-fab");
  const fabCount = cartFab?.querySelector(".cart-fab__count");
  const fabTotal = cartFab?.querySelector(".cart-fab__total");

  // Botón flotante (HAP-119): muestra cantidad y total mientras el cliente
  // recorre el menú; se esconde cuando la sección del pedido ya está a la vista.
  function renderCartFab() {
    if (!cartFab) return;
    const count = getItemCount(cart);
    cartFab.hidden = count === 0;
    if (!count) return;
    if (fabCount.textContent !== String(count)) {
      fabCount.textContent = String(count);
      fabCount.classList.remove("bump");
      void fabCount.offsetWidth;
      fabCount.classList.add("bump");
    }
    fabTotal.textContent = `S/ ${formatSoles(getTotalCents(cart))}`;
    cartFab.setAttribute(
      "aria-label",
      `Ver mi pedido: ${count} ${count === 1 ? "producto" : "productos"}, S/ ${formatSoles(getTotalCents(cart))}`
    );
  }

  const orderSection = document.querySelector("#pedido");
  if (cartFab && orderSection && "IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      cartFab.classList.toggle("is-away", entry.isIntersecting);
    }).observe(orderSection);
  }

  function updateCart(nextCart) {
    cart = nextCart;
    saveCart(storage, cart);
    renderCart();
  }

  // Cada botón "Agregar" del menú muestra cuántas unidades ya están en el pedido.
  function renderMenuButtons() {
    document.querySelectorAll(".add-btn").forEach((button) => {
      const qty = cart.find((item) => item.name === button.dataset.name)?.qty ?? 0;
      let badge = button.querySelector(".add-btn__qty");
      button.classList.toggle("in-cart", qty > 0);
      if (!qty) {
        badge?.remove();
        return;
      }
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "add-btn__qty";
        button.append(badge);
      }
      badge.textContent = String(qty);
    });
  }

  function renderCart() {
    renderCartFab();
    renderMenuButtons();
    if (!cartContainer || !totalElement) return;

    if (!cart.length) {
      cartContainer.innerHTML = `
        <div class="empty-cart">
          <strong>Tu pedido está vacío</strong>
          <small>Elige algo del menú y aparecerá aquí.</small>
          <a href="#menu">Ver el menú</a>
        </div>`;
      totalElement.textContent = "0.00";
      return;
    }

    cartContainer.innerHTML = cart
      .map((item) => {
        const name = escapeHtml(item.name);
        return `
      <div class="cart-line">
        <div class="cart-line__row">
          <strong>${name}</strong>
          <span class="cart-line__leader" aria-hidden="true"></span>
          <strong class="cart-line__price">S/ ${formatSoles(item.priceCents * item.qty)}</strong>
        </div>
        <div class="cart-line__row">
          <small>S/ ${formatSoles(item.priceCents)} c/u</small>
          <div class="line-qty">
            <button class="remove-line" type="button" data-name="${name}" aria-label="Quitar uno de ${name}">−</button>
            <span>${item.qty}</span>
            <button class="add-line" type="button" data-name="${name}" aria-label="Agregar uno más de ${name}">+</button>
          </div>
        </div>
      </div>`;
      })
      .join("");

    totalElement.textContent = formatSoles(getTotalCents(cart));
  }

  // Delegación de eventos: un solo listener para todas las líneas del carrito.
  cartContainer?.addEventListener("click", (event) => {
    const minus = event.target.closest(".remove-line");
    const plus = event.target.closest(".add-line");
    if (minus) updateCart(decrementItem(cart, minus.dataset.name));
    if (plus) {
      const item = cart.find((line) => line.name === plus.dataset.name);
      if (item) updateCart(addItem(cart, { name: item.name, price: item.priceCents / 100 }));
    }
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

  /* ---------- Comanda: fecha y hora impresas en el ticket ---------- */
  const ticketDate = document.querySelector(".ticket-date");
  if (ticketDate) {
    const now = new Intl.DateTimeFormat("es-PE", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
    ticketDate.textContent = now;
  }

  /* ---------- Footer ---------- */
  const year = document.querySelector(".footer-bottom span");
  if (year) {
    year.textContent = `© ${new Date().getFullYear()} Happy Chicken. Todos los derechos reservados.`;
  }

  renderCart();
});
