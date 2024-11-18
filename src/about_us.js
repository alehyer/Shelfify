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

  // Redirect Home button
  const redirectHomeElements = document.querySelectorAll(".redirect-home");
  if (redirectHomeElements) {
    redirectHomeElements.forEach((element) => {
      element.addEventListener("click", () => {
        window.location.href = "/pages/home.html";
      });
    });
  } else {
    console.error("Redirect home elements not found!");
  }

  // Redirect About Us button
  const redirectAboutUsElements = document.querySelector(".redirect-about");
  if (redirectAboutUsElements) {
    redirectAboutUsElements.addEventListener("click", () => {
      window.location.href = "/pages/about_us.html";
    });
  } else {
    console.error("About Us element not found!");
  }

  // Redirect Contact Us button
  const redirectContactUsElements = document.querySelector(".redirect-contact");
  if (redirectContactUsElements) {
    redirectContactUsElements.addEventListener("click", () => {
      window.location.href = "/pages/contact.html";
    });
  } else {
    console.error("About Us element not found!");
  }

  // Redirect Profile button
  const redirectProfileElements = document.querySelector(".redirect-profile");
  if (redirectProfileElements) {
    redirectProfileElements.addEventListener("click", () => {
      window.location.href = "/pages/profile.html";
    });
  } else {
    console.error("Profile element not found!");
  }
});
