document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".food-card");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");
      const category = filter.dataset.filter;

      cards.forEach(card => {
        card.classList.toggle("hidden", category !== "todos" && card.dataset.category !== category);
      });
    });
  });

  const cart = [];
  const cartContainer = document.querySelector(".cart-items");
  const totalElement = document.querySelector(".order-total strong b");
  const toast = document.querySelector(".toast");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function renderCart() {
    if (!cart.length) {
      cartContainer.innerHTML = `
        <div class="empty-cart">
          <span></span>
          <strong>Aquí aparecerá tu pedido</strong>
          <small>Agrega algo rico desde nuestro menú.</small>
        </div>`;
      totalElement.textContent = "0.00";
      return;
    }

    cartContainer.innerHTML = cart.map((item, index) => `
      <div class="cart-line">
        <div><strong>${item.name}</strong><small>${item.qty} × S/ ${item.price.toFixed(2)}</small></div>
        <strong>S/ ${(item.qty * item.price).toFixed(2)}</strong>
        <button class="remove-line" data-index="${index}" aria-label="Eliminar ${item.name}">×</button>
      </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    totalElement.textContent = total.toFixed(2);

    cartContainer.querySelectorAll(".remove-line").forEach(button => {
      button.addEventListener("click", () => {
        cart.splice(Number(button.dataset.index), 1);
        renderCart();
      });
    });
  }

  document.querySelectorAll(".add-btn").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = Number(button.dataset.price);
      const existing = cart.find(item => item.name === name);

      if (existing) existing.qty += 1;
      else cart.push({ name, price, qty: 1 });

      renderCart();
      showToast(`${name} agregado a tu pedido`);
    });
  });

  document.querySelector(".clear-cart")?.addEventListener("click", () => {
    cart.length = 0;
    renderCart();
    showToast("Pedido vacío");
  });

  document.querySelector(".order-button")?.addEventListener("click", () => {
    if (!cart.length) {
      showToast("Primero agrega algo rico al pedido");
      document.querySelector("#menu").scrollIntoView({ behavior: "smooth" });
      return;
    }

    const summary = cart.map(item => `${item.qty}x ${item.name}`).join(", ");
    const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
    const message = encodeURIComponent(`Hola Happy Chicken 👋 Quiero pedir: ${summary}. Total aproximado: S/ ${total.toFixed(2)}.`);
    window.open(`https://wa.me/51999999999?text=${message}`, "_blank", "noopener");
  });

  // Año automático del footer
  const year = document.querySelector(".footer-bottom span");
  if (year) year.textContent = `© ${new Date().getFullYear()} Happy Chicken. Todos los derechos reservados.`;
});
