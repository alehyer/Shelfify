document.addEventListener("DOMContentLoaded", () => {
  // Navigation bar function
  const menuToggle = document.querySelector(".menu-toggle");
  const menuItems = document.querySelector(".right-group");

  // Check if menuToggle and menuItems exist
  if (menuToggle && menuItems) {
    menuToggle.addEventListener("click", () => {
      menuItems.classList.toggle("active"); // Toggle the active class
      menuToggle.classList.toggle("rotated");
    });
  } else {
    console.error("Menu toggle or menu items not found!");
  }
});
