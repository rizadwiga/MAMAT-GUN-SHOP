// auth.js

// Register logic
const registerForm = document.querySelector('form[action="register"]');
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    if (password !== confirmPassword) {
      alert("Password tidak cocok.");
      return;
    }

    // Simpan ke localStorage
    const userData = { username, email, password };
    localStorage.setItem("userData", JSON.stringify(userData));

    alert("Registrasi berhasil! Silakan login.");
    window.location.href = "login.html";
  });
}

// Login logic
const loginForm = document.querySelector('form[action="login"]');
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const storedData = JSON.parse(localStorage.getItem("userData"));

    if (
      storedData &&
      username === storedData.username &&
      password === storedData.password
    ) {
      alert("Login berhasil!");
      window.location.href = "index.html";
    } else {
      alert("Username atau password salah.");
    }
  });
}
