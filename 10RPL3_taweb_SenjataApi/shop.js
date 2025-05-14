// script.js

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".product-card button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const name = card.querySelector("h3, h4").textContent;
      const priceText = card.querySelector(".harga, span").textContent;
      const image = card.querySelector("img").src;

      const price = parseInt(
        priceText.replace(/[^\d]/g, "") // hapus "Rp", titik, dsb
      );

      const item = {
        name,
        price,
        image,
        quantity: 1
      };

      addToCart(item);
      alert(`${name} telah ditambahkan ke keranjang.`);
    });
  });
});

function addToCart(item) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cek apakah item sudah ada
  const existingItem = cart.find((i) => i.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
