document.addEventListener("DOMContentLoaded", function () {
  const totalDisplay = document.querySelector("#checkout-total .total");
  const form = document.getElementById("checkout-form");
  const alertBox = document.getElementById("form-alert");

  function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
  }

  function hitungTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    totalDisplay.textContent = formatRupiah(total);
    return total;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validasi manual tambahan jika perlu
    const nama = form.nama.value.trim();
    const alamat = form.alamat.value.trim();
    const telepon = form.telepon.value.trim();
    const metode = form.metode.value;

    if (!nama || !alamat || !telepon || !metode) {
      alertBox.textContent = "Mohon lengkapi semua data terlebih dahulu!";
      alertBox.style.display = "block";
      return;
    }

    alertBox.style.display = "none";

    // Simpan data checkout ke localStorage
    const dataPembeli = {
      nama,
      alamat,
      telepon,
      metode,
      total: hitungTotal(),
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    };

    localStorage.setItem("checkoutData", JSON.stringify(dataPembeli));

    // Redirect ke halaman invoice
    window.location.href = "invoice.html";
  });

  // Tampilkan total saat halaman dimuat
  hitungTotal();
});
