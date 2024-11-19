document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const userType = document.getElementById("user-type");
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const userEmail = document.getElementById("email");
    const phoneNumber = document.getElementById("phone-no");
    const streetAddress = document.getElementById("street-address");
    const cityAddress = document.getElementById("city-address");
    const zipCode = document.getElementById("zip-code");
    const stateAddress = document.getElementById("state-address");

    // nav bar function
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".right-group");
    menuToggle.addEventListener("click", () => {
        menuItems.classList.toggle("active"); // Toggle the active class
        menuToggle.classList.toggle("rotated");
    });

    // upload file btn
    document.querySelector(".file-upload-btn").addEventListener("click", () => {
        document.getElementById("file-upload").click();
    });

    // preview image
    document.getElementById("file-upload").addEventListener("change", (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.onload = (event) => {
                // Set the uploaded image as the src of the <img> element
                const imagePreview = document.getElementById("image-preview");
                imagePreview.src = event.target.result;
                imagePreview.style.display = "block"; // Make the image visible
                displayInSpan(event.target.result);
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            alert("Please upload a valid image file.");
            e.target.value = ""; // Clear the invalid file
        }
    });

    window.addEventListener("load", () => {
        fileInput.value = ""; // Clear the file input

        // Optionally, clear the image preview (if applicable)
        const imagePreview = document.getElementById("image-preview");
        imagePreview.style.display = "none"; // Hide the image preview
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

    document
        .getElementById("addUser-btn")
        .addEventListener("click", function () {
            const userTypeValue = userType.value.trim();
            const firstNameValue = firstName.value.trim();
            const lastNameValue = lastName.value.trim();
            const emailValue = userEmail.value.trim();
            const phoneNumberValue = phoneNumber.value.trim();
            const streetAddressValue = streetAddress.value.trim();
            const cityAddressValue = cityAddress.value.trim();
            const zipCodeValue = zipCode.value.trim();
            const stateAddressValue = stateAddress.value.trim();

            const fields = [
                { element: userType, isValid: userTypeValue !== "Select User" },
                { element: firstName, isValid: firstNameValue },
                { element: lastName, isValid: lastNameValue },
                { element: userEmail, isValid: emailValue.includes("@") },
                {
                    element: phoneNumber,
                    isValid:
                        phoneNumberValue.length >= 14 &&
                        phoneNumberValue.startsWith("+60"),
                },
                { element: streetAddress, isValid: streetAddressValue },
                { element: cityAddress, isValid: cityAddressValue },
                { element: zipCode, isValid: zipCodeValue },
                { element: stateAddress, isValid: stateAddressValue },
            ];

            fields.forEach(({ element, isValid }) => {
                if (!isValid) {
                    element.classList.add("invalid-input");
                }
            });

            if (!(fileInput.files.length > 0)) {
                document
                    .querySelector(".file-upload-btn")
                    .classList.add("invalid-input");
            }

            if (
                fileInput.files.length <= 0 ||
                userTypeValue === "Select User" ||
                !firstNameValue ||
                !lastNameValue ||
                !emailValue.includes("@") ||
                !(
                    phoneNumberValue.length >= 14 &&
                    phoneNumberValue.startsWith("+60")
                ) ||
                !streetAddressValue ||
                !cityAddressValue ||
                !zipCodeValue ||
                !stateAddressValue
            ) {
                alert("Please fill in all required fields correctly.");
                return;
            } else {
                document.getElementById("userDetail-panel").style.display =
                    "none";
                document.getElementById("confirmation-panel").style.display =
                    "flex";

                // replace text
                document.getElementById("userType-span").textContent =
                    userTypeValue;
                document.getElementById(
                    "name-span"
                ).textContent = `${firstNameValue} ${lastNameValue}`;
                document.getElementById("email-span").textContent = emailValue;
                document.getElementById("phone-span").textContent =
                    phoneNumberValue;
                document.getElementById(
                    "address-span"
                ).textContent = `${streetAddressValue}, ${zipCodeValue} ${cityAddressValue}, ${stateAddressValue}`;
            }
        });

    document
        .getElementById("cancel-btn")
        .addEventListener("click", function () {
            document.getElementById("userDetail-panel").style.display = "flex";
            document.getElementById("confirmation-panel").style.display =
                "none";
        });

    function displayInSpan(imageData) {
        const span = document.getElementById("image-span");
        span.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;

        // Add a <style> block with media queries dynamically
        const style = document.createElement("style");
        style.textContent = `
            #image-span img {
                max-width: 5rem;
            }

            @media (min-width: 768px) {
                #image-span img {
                    max-width: 6rem;
                }
            }

            @media (min-width: 1024px) {
                #image-span img {
                    max-width: 7rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function validateInput(event) {
        const target = event.target;

        // Handle text inputs
        if (event.type === "input" && target.value.trim()) {
            target.classList.remove("invalid-input");
        }
        // Handle category selection
        else if (
            event.type === "change" &&
            target === userType &&
            target.value !== "Select User"
        ) {
            target.classList.remove("invalid-input");
        }
        // Handle file input
        else if (
            event.type === "change" &&
            target === fileInput &&
            fileInput.files.length > 0
        ) {
            document
                .querySelector(".file-upload-btn")
                .classList.remove("invalid-input");
        }
    }

    // Attach the event listener to text inputs
    [
        firstName,
        lastName,
        userEmail,
        phoneNumber,
        streetAddress,
        cityAddress,
        zipCode,
        stateAddress,
    ].forEach((input) => {
        input.addEventListener("input", validateInput);
    });

    // Attach a change event for the category and file input fields
    [userType, fileInput].forEach((field) => {
        field.addEventListener("change", validateInput);
    });
});
