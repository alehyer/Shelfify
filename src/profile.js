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

    // replace text content with user data
    const data = JSON.parse(localStorage.getItem("userData"));

    if (data) {
        // Define a field mapping of data keys to span IDs
        const fieldMapping = {
            Image: "profile-picture",
            Name: "name-span",
            "User ID": "id-span",
            Email: "email-span",
            Phone: "phone-span",
            "Street Address": "street-span",
            City: "city-span",
            State: "state-span",
            Zipcode: "zipcode-span",
            "Member Since": "memberDate-span",
            "Renewal Date": "renewalDate-span",
        };

        // Iterate over the field mapping
        Object.keys(fieldMapping).forEach((key) => {
            // Get the value from the data object using the key
            const value = data[key];

            // Find the corresponding span element by ID
            const span = document.getElementById(fieldMapping[key]);

            // Populate the span element with the value
            if (span == document.getElementById("profile-picture") && value) {
                span.src = value;
            } else if (span && value) {
                span.textContent = value;
            }
        });

        localStorage.removeItem("userData");
    }
});
