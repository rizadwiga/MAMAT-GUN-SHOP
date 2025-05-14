document.addEventListener("DOMContentLoaded", function () {
  const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

  if (!checkoutData) {
    alert("Data checkout tidak ditemukan. Silakan kembali ke halaman checkout.");
    window.location.href = "checkout.html";
    return;
  }

  // Isi Informasi Pelanggan
  const infoBlock = document.querySelector(".info-block");
  infoBlock.innerHTML = `
    <h3>Informasi Pelanggan :</h3>
    <p><strong>Nama:</strong> ${checkoutData.nama}</p>
    <p><strong>Alamat:</strong> ${checkoutData.alamat}</p>
    <p><strong>Telepon:</strong> ${checkoutData.telepon}</p>
    <p><strong>Metode Pembayaran:</strong> ${checkoutData.metode}</p>
  `;

  // Isi Daftar Pesanan
  const orderList = document.querySelector(".order-list");
  orderList.innerHTML = ""; // Kosongkan dulu
  let subtotal = 0;

  checkoutData.cart.forEach(item => {
    const totalHargaItem = item.price * item.quantity;
    subtotal += totalHargaItem;

    const listItem = document.createElement("li");
    listItem.innerHTML = `${item.name} x${item.quantity} <span>Rp${totalHargaItem.toLocaleString("id-ID")}</span>`;
    orderList.appendChild(listItem);
  });

  // Tambah Biaya Pengiriman
  const biayaKirim = 500000;
  const biayaKirimItem = document.createElement("li");
  biayaKirimItem.innerHTML = `Biaya Pengiriman <span>Rp${biayaKirim.toLocaleString("id-ID")}</span>`;
  orderList.appendChild(biayaKirimItem);

  // Hitung Total
  const totalAkhir = subtotal + biayaKirim;
  document.querySelector(".invoice-footer .total strong").textContent =
    `Rp${totalAkhir.toLocaleString("id-ID")}`;

  // (Opsional) Buat ID Tagihan unik
  const invoiceId = "#INV" + Math.floor(100000 + Math.random() * 900000);
  document.querySelector(".invoice-header span").textContent = invoiceId;

  // (Opsional) Hapus data setelah invoice ditampilkan
  // localStorage.removeItem("cart");
  // localStorage.removeItem("checkoutData");
});
const music = document.getElementById("bg-music");
const controlBtn = document.querySelector(".music-control");
let isPlaying = false;

function toggleMusic() {
  if (isPlaying) {
    music.pause();
    controlBtn.textContent = "🎵";
  } else {
    music.play();
    controlBtn.textContent = "⏸️";
  }
  isPlaying = !isPlaying;
}

function printInvoice() {
  window.print();
}
