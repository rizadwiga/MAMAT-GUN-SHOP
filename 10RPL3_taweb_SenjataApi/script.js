// Background Music Logic
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

// Fungsi untuk konversi harga dari string ke number
function parseHarga(hargaStr) {
  return parseInt(hargaStr.replace(/[^\d]/g, ''));
}

// Tambahkan event listener untuk semua tombol "Beli Sekarang" dan "Tambahkan ke Keranjang"
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".product-card button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const nama = card.querySelector("h3, h4").textContent;
      const hargaText = card.querySelector(".harga, span").textContent;
      const harga = parseHarga(hargaText);
      const gambar = card.querySelector("img").src;

      // Ambil data dari localStorage
      let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];

      // Cek apakah produk sudah ada
      const existingItem = keranjang.find(item => item.nama === nama);
      if (existingItem) {
        existingItem.jumlah += 1;
      } else {
        keranjang.push({ nama, harga, gambar, jumlah: 1 });
      }

      localStorage.setItem("keranjang", JSON.stringify(keranjang));
      alert(`${nama} ditambahkan ke keranjang!`);
    });
  });
});
