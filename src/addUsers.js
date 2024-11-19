document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");

    // nav bar function
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".right-group");
    menuToggle.addEventListener("click", () => {
        menuItems.classList.toggle("active"); // Toggle the active class
        menuToggle.classList.toggle("rotated");
    });

    const phoneInput = document.getElementById("phone-no");
    phoneInput.addEventListener("input", () => {
        let value = phoneInput.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.startsWith("60")) {
            value =
                "+60" +
                value.slice(2, 4) +
                " " +
                value.slice(4, 7) +
                " " +
                value.slice(7);
        }
        phoneInput.value = value.trim();
    });
});
