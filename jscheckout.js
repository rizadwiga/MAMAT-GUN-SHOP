document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#checkout-form");
    const checkoutBtn = document.querySelector(".checkout-btn");
    const keranjangContainer = document.querySelector(".keranjang-container");
    const totalElement = document.querySelector(".summary .total");
    
   
    function formatRupiah(angka) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(angka);
    }
  
  
    const keranjang = JSON.parse(localStorage.getItem("cart")) || [];
    
    
    if (keranjang.length > 0) {
      let total = 0;
  
      keranjang.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("checkout-item");
  
        itemElement.innerHTML = `
          <img src="${item.gambar}" alt="${item.nama}" />
          <div class="item-detail">
            <h4>${item.nama}</h4>
            <p>Harga: ${formatRupiah(item.harga)}</p>
            <p>Jumlah: ${item.jumlah}</p>
            <p>Total: ${formatRupiah(item.harga * item.jumlah)}</p>
          </div>
        `;
  
        keranjangContainer.appendChild(itemElement);
        total += item.harga * item.jumlah;
      });
  
     
      totalElement.innerHTML = formatRupiah(total);
    } else {
      keranjangContainer.innerHTML = "<p>Keranjang Anda kosong.</p>";
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 
  
      
      const nama = form.querySelector("#nama").value.trim();
      const alamat = form.querySelector("#alamat").value.trim();
      const metode = form.querySelector("#metode").value;
  
      if (!nama || !alamat || !metode) {
        alert("Mohon lengkapi semua field sebelum melanjutkan.");
        return;
      }
  
      
      const konfirmasi = confirm(`Apakah Anda yakin ingin menyelesaikan pembelian ini?`);
      if (!konfirmasi) return;
  
    
      checkoutBtn.disabled = true;
      checkoutBtn.textContent = "Memproses...";
      checkoutBtn.style.opacity = 0.7;
  
      setTimeout(() => {
        alert("Checkout berhasil! Terima kasih telah berbelanja.");
  
        localStorage.removeItem("keranjang");
        localStorage.removeItem("totalHarga");
  
        form.reset();
        checkoutBtn.disabled = false;
        checkoutBtn.textContent = "Bayar Sekarang";
        checkoutBtn.style.opacity = 1;
  
        
        window.location.href = "thankyou.html"; 
      }, 2000);
    });
  
    const alertBox = document.getElementById("form-alert");
    alertBox.style.display = "block";
    alertBox.textContent = "Isi semua data terlebih dahulu!";
  });

  
  