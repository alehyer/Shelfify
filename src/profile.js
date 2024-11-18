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

  // Profile picture upload functionality
  const pictureUpload = document.getElementById("picture-upload");
  const profilePicture = document.getElementById("profile-picture");
  const changePictureBtn = document.querySelector(".change-picture-btn");

  // Load saved profile picture from localStorage
  const savedProfilePicture = localStorage.getItem("profilePicture");
  if (savedProfilePicture) {
    profilePicture.src = savedProfilePicture;
  }

  if (changePictureBtn && pictureUpload) {
    changePictureBtn.addEventListener("click", () => {
      pictureUpload.click();
    });

    pictureUpload.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imageData = e.target.result;
          profilePicture.src = imageData;

          // Save the image data to localStorage
          localStorage.setItem("profilePicture", imageData);
        };
        reader.readAsDataURL(file);
      }
    });
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
