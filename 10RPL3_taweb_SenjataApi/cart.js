// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const keranjangContainer = document.querySelector(".keranjang-container");
  
    function formatRupiah(angka) {
      return "Rp " + angka.toLocaleString("id-ID");
    }
  
    function renderKeranjang() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Kosongkan isi dulu agar tidak duplikat
      keranjangContainer.innerHTML = "";
  
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("keranjang-item");
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <div class="item-detail">
            <h4>${item.name}</h4>
            <p>Harga: ${formatRupiah(item.price)}</p>
            <label>Jumlah: <input type="number" value="${item.quantity}" min="1" data-index="${index}" /></label>
          </div>
          <button class="hapus" data-index="${index}">Hapus</button>
        `;
        keranjangContainer.appendChild(itemDiv);
      });
  
      // Tambahkan elemen total + tombol checkout
      const totalDiv = document.createElement("div");
      totalDiv.classList.add("total");
      totalDiv.innerHTML = `
        <h3>Total: </h3>
        <button class="checkout">Checkout</button>
      `;
      keranjangContainer.appendChild(totalDiv);
  
      attachListeners();
      hitungTotal();
    }
  
    function hitungTotal() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      let total = 0;
      cart.forEach((item) => {
        total += item.price * item.quantity;
      });
  
      const totalElement = document.querySelector(".total h3");
      if (totalElement) {
        totalElement.textContent = "Total: " + formatRupiah(total);
      }
    }
  
    function attachListeners() {
      const inputs = document.querySelectorAll(".keranjang-item input");
      const hapusButtons = document.querySelectorAll(".keranjang-item .hapus");
      const checkoutBtn = document.querySelector(".checkout");
  
      inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
          const index = e.target.getAttribute("data-index");
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart[index].quantity = parseInt(e.target.value);
          localStorage.setItem("cart", JSON.stringify(cart));
          hitungTotal();
        });
      });
  
      hapusButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          let cart = JSON.parse(localStorage.getItem("cart")) || [];
          cart.splice(index, 1); // hapus item
          localStorage.setItem("cart", JSON.stringify(cart));
          renderKeranjang(); // render ulang setelah hapus
        });
      });
  
      if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
          window.location.href = "checkout.html";
        });
      }
    }
  
    renderKeranjang();
  });

