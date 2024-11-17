// Wait for the DOM to be fully loaded
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

  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Reset previous errors
      resetErrors();

      // Get form fields
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      let isValid = true;

      // Validate name
      if (!name.value.trim()) {
        showError("name");
        isValid = false;
      }

      // Validate email
      if (!validateEmail(email.value.trim())) {
        showError("email");
        isValid = false;
      }

      // Validate subject
      if (!subject.value.trim()) {
        showError("subject");
        isValid = false;
      }

      // Validate message
      if (!message.value.trim()) {
        showError("message");
        isValid = false;
      }

      // If form is valid, show success message
      if (isValid) {
        // Here you would typically send the form data to your server
        document.getElementById("successMessage").style.display = "block";
        this.reset();
      }
    });
  } else {
    console.error("Contact form not found!");
  }

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Show error for a specific field
  function showError(fieldName) {
    const field = document.getElementById(fieldName);
    const error = document.getElementById(`${fieldName}Error`);
    if (field && error) {
      field.classList.add("error-border");
      error.style.display = "block";
    }
  }

  // Reset all errors
  function resetErrors() {
    const errors = document.getElementsByClassName("error");
    const inputs = document.getElementsByClassName("form-input");

    for (let error of errors) {
      error.style.display = "none";
    }

    for (let input of inputs) {
      input.classList.remove("error-border");
    }

    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "none";
    }
  }
});
