document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".contact-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = form[0].value;
      const email = form[1].value;
      const message = form[2].value;

      const phoneNumber = "6282139145292"; // nomor wa saya

      const fullMessage = `Halo, saya ${name} (%0AEmail: ${email}) ingin menyampaikan pesan:%0A${message}`;

      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

      window.open(whatsappURL, "_blank");
    });
  });

