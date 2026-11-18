/* Nodotempo Theme: Menü, Warenkorb-Schublade, Farbauswahl */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = window.Shopify && window.Shopify.routes ? window.Shopify.routes.root : "/";

  /* Overlays */
  const lock = () => {
    document.body.style.overflow = $(".menu.is-open, .drawer.is-open") ? "hidden" : "";
  };
  const toggle = (el, open) => {
    if (!el) return;
    el.classList.toggle("is-open", open);
    el.setAttribute("aria-hidden", String(!open));
    lock();
  };
  const menu = $("[data-menu]");
  const drawer = $("[data-cart-drawer]");
  $$("[data-menu-open]").forEach((b) => b.addEventListener("click", () => toggle(menu, true)));
  $$("[data-menu-close]").forEach((b) => b.addEventListener("click", () => toggle(menu, false)));
  $$("[data-cart-close]").forEach((b) => b.addEventListener("click", () => toggle(drawer, false)));
  $$("[data-cart-open]").forEach((a) =>
    a.addEventListener("click", (e) => {
      if (!drawer) return;
      e.preventDefault();
      refreshCart().then(() => toggle(drawer, true));
    }),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      toggle(menu, false);
      toggle(drawer, false);
    }
  });

  /* Kopfzeile: Rand beim Scrollen */
  const header = $("[data-header]");
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Warenkorb */
  const currency = (drawer && drawer.dataset.currency) || "EUR";
  const fmt = new Intl.NumberFormat("de-DE", { style: "currency", currency });
  const money = (cents) => fmt.format(cents / 100);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

  function renderCart(cart) {
    $$("[data-cart-count]").forEach((el) => (el.textContent = cart.item_count));
    if (!drawer) return;
    $("[data-cart-empty]", drawer).hidden = cart.item_count > 0;
    $("[data-cart-content]", drawer).hidden = cart.item_count === 0;
    $("[data-cart-total]", drawer).textContent = money(cart.total_price);

    const freeFrom = Number(drawer.dataset.freeFrom || 0);
    const bar = $("[data-shipping-bar]", drawer);
    if (freeFrom > 0) {
      bar.hidden = false;
      const missing = freeFrom - cart.total_price;
      $("[data-shipping-text]", drawer).innerHTML =
        missing > 0
          ? `Noch <strong>${money(missing)}</strong> bis zum kostenlosen Versand`
          : "Dein Versand ist <strong>kostenlos</strong>";
      $("[data-shipping-fill]", drawer).style.width = `${Math.min(100, (cart.total_price / freeFrom) * 100)}%`;
    }

    $("[data-cart-lines]", drawer).innerHTML = cart.items
      .map(
        (item, i) => `
      <li class="cart-line">
        <a href="${esc(item.url)}" class="cart-line-img"><div class="product-image">${
          item.image ? `<img src="${esc(item.image)}&width=200" alt="" loading="lazy">` : ""
        }</div></a>
        <div class="cart-line-body">
          <div class="cart-line-top">
            <a href="${esc(item.url)}" class="cart-line-name">${esc(item.product_title)}</a>
            <span>${money(item.final_line_price)}</span>
          </div>
          ${item.product_has_only_default_variant ? "" : `<p class="muted">${esc(item.variant_title)}</p>`}
          <div class="cart-line-actions">
            <div class="stepper stepper-sm">
              <button type="button" data-line="${i + 1}" data-qty="${item.quantity - 1}" aria-label="Menge verringern">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-line="${i + 1}" data-qty="${item.quantity + 1}" aria-label="Menge erhöhen" ${
                item.quantity >= 10 ? "disabled" : ""
              }>+</button>
            </div>
            <button type="button" class="link-btn" data-line="${i + 1}" data-qty="0">Entfernen</button>
          </div>
        </div>
      </li>`,
      )
      .join("");
  }

  function refreshCart() {
    return fetch(`${root}cart.js`, { headers: { Accept: "application/json" } })
      .then((r) => r.json())
      .then(renderCart)
      .catch(() => {});
  }

  if (drawer) {
    drawer.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-line]");
      if (!btn) return;
      fetch(`${root}cart/change.js`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ line: Number(btn.dataset.line), quantity: Math.max(0, Number(btn.dataset.qty)) }),
      })
        .then((r) => r.json())
        .then(renderCart);
    });
  }

  /* Produktseite */
  const product = $("[data-product]");
  if (product) {
    const input = $("[data-variant-input]", product);
    const addBtn = $("[data-add-button]", product);
    const error = $("[data-form-error]", product);
    const slides = $$(".pdp-slide", product);
    const thumbs = $$(".pdp-thumb", product);

    const showSlide = (id) => {
      slides.forEach((s) => (s.hidden = s.dataset.slide !== String(id)));
      thumbs.forEach((t) => t.classList.toggle("is-active", t.dataset.thumb === String(id)));
    };
    const showVariantMedia = (name) => {
      const own = slides.filter((s) => s.dataset.variantName === name);
      const list = own.length ? own : slides;
      thumbs.forEach((t) => (t.hidden = own.length ? t.dataset.variantName !== name : false));
      if (list[0]) showSlide(list[0].dataset.slide);
    };

    thumbs.forEach((t) => t.addEventListener("click", () => showSlide(t.dataset.thumb)));

    const selectVariant = (sw, updateUrl) => {
      $$(".swatch", product).forEach((s) => {
        const on = s === sw;
        s.classList.toggle("is-active", on);
        s.setAttribute("aria-checked", String(on));
      });
      input.value = sw.dataset.variantId;
      $("[data-variant-label]", product).textContent = sw.dataset.variantName;
      $("[data-variant-color]", product).textContent = sw.dataset.variantColor ? `· ${sw.dataset.variantColor}` : "";
      $("[data-price]", product).innerHTML = (sw.dataset.compare ? `<s>${sw.dataset.compare}</s>` : "") + sw.dataset.price;
      const available = sw.dataset.available === "true";
      if (addBtn) {
        addBtn.disabled = !available;
        addBtn.textContent = available ? "In den Warenkorb" : "Ausverkauft";
      }
      showVariantMedia(sw.dataset.variantName);
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("variant", sw.dataset.variantId);
        window.history.replaceState({}, "", url);
      }
    };

    const swatches = $$(".swatch", product);
    swatches.forEach((sw) => sw.addEventListener("click", () => selectVariant(sw, true)));
    const active = swatches.find((s) => s.classList.contains("is-active"));
    if (active) selectVariant(active, false);
    else if (slides[0]) showSlide(slides[0].dataset.slide);

    $$("[data-step]", product).forEach((b) =>
      b.addEventListener("click", () => {
        const q = $("input[name=quantity]", product);
        q.value = Math.min(10, Math.max(1, Number(q.value || 1) + Number(b.dataset.step)));
      }),
    );

    const form = $("#product-form");
    if (form && drawer) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        error.hidden = true;
        addBtn.disabled = true;
        fetch(`${root}cart/add.js`, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        })
          .then(async (r) => {
            const data = await r.json();
            if (!r.ok) throw new Error(data.description || data.message || "Das hat nicht geklappt.");
            return refreshCart();
          })
          .then(() => toggle(drawer, true))
          .catch((err) => {
            error.textContent = err.message;
            error.hidden = false;
          })
          .finally(() => (addBtn.disabled = false));
      });
    }
  }
})();
