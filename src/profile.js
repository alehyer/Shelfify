document.addEventListener("DOMContentLoaded", () => {
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
});
