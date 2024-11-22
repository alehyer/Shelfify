document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-helpInfo").addEventListener("click", function () {
    alert("Please contact IT Services \n\nPhone Number: +601234567890 \nEmail: shelfify@customersupport.com");
  });

  document.getElementById("login-button").addEventListener("click", function () {
    const id = document.getElementById("librarian-id").value.trim();
    let password = document.getElementById("librarian-password").value.trim();

    if (!id) {
      document.getElementById("librarian-id").classList.add("invalid-input");
    }
    if (!password) {
      document.getElementById("librarian-password").classList.add("invalid-input");
    }

    if (!id || !password) {
      alert("Please fill in all required fields.");
      return;
    }

    // demo account
    if (id === "123" && password === "abc") {
      window.location.href = `../pages/home.html`;
    } else {
      alert("Incorrect ID or password.");
      document.getElementById("librarian-id").classList.add("invalid-input");
      document.getElementById("librarian-password").classList.add("invalid-input");
    }

    // reset password
    document.getElementById("librarian-password").value = "";
  });

  document.getElementById("librarian-id").addEventListener("input", function () {
    if (this.value.trim()) {
      this.classList.remove("invalid-input");
    }
  });

  document.getElementById("librarian-password").addEventListener("input", function () {
    if (this.value.trim()) {
      this.classList.remove("invalid-input");
    }
  });
});
