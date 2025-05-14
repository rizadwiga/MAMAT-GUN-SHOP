document.addEventListener("DOMContentLoaded", function () {
  const produkCards = document.querySelectorAll(".produk-card");

  produkCards.forEach((card) => {
    const button = card.querySelector("button");
    button.addEventListener("click", function () {
      const name = card.querySelector("h4").textContent;
      const priceText = card.querySelector(".harga").textContent.replace(/[^\d]/g, "");
      const price = parseInt(priceText);
      const image = card.querySelector("img").getAttribute("src");

      const item = {
        name,
        price,
        image,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Cek apakah produk sudah ada
      const existingItem = cart.find((i) => i.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.name} ditambahkan ke keranjang!`);
    });
  });
});
