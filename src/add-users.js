document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const uploadTrigger = document.querySelector(".file-upload-btn");
    const imagePreview = document.getElementById("image-preview");
    const form = document.querySelector("form");
    const phoneInput = document.getElementById("phone-no");
    const zipcode = document.getElementById("zip-code");
    const referrer = document.referrer;
    let base64Image = ""; // variable to hold the Base64 encoded image

    // select user type dropdown
    const userType = document.getElementById("user-type");
    if (referrer.includes("librarians.html")) {
        userType.value = "Librarian";
    } else if (referrer.includes("members.html")) {
        userType.value = "Member";
    } else {
        userType.value = "Select User";
    }

    // format phone no
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

    zipcode.addEventListener("input", () => {
        let value = zipcode.value.replace(/\D/g, "");
        zipcode.value = value.trim();
    });

    // Trigger file input on button click
    uploadTrigger.addEventListener("click", () => {
        fileInput.click();
    });

    // Preview the uploaded image
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                base64Image = event.target.result;
                imagePreview.src = base64Image;
                imagePreview.style.display = "block"; // Show the image preview
                displayInSpan(event.target.result); // Display the image in span

                // Clear invalid-input class
                setValid(
                    uploadTrigger,
                    document.getElementById(fileInput.dataset.error)
                );
            };

            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file.");
            e.target.value = ""; // Clear the invalid file
        }
    });

    // Clear file input, file preview, and all inputs on page load
    window.addEventListener("load", () => {
        const inputs = document.querySelectorAll("input");

        fileInput.value = "";
        imagePreview.style.display = "none";

        inputs.forEach((input) => {
            if (input.name === "tel") {
                input.value = "+60";
            } else {
                input.value = "";
            }
        });
    });

    function displayInSpan(imageData) {
        const span = document.getElementById("image-span");
        span.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;

        // Add a <style> block with media queries dynamically
        const style = document.createElement("style");
        style.textContent = `
            #image-span img {
                max-width: 5rem;
                border-radius: 1rem;
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

    // Form submission handler
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        const inputs = form.querySelectorAll("[data-error]");
        let allValid = true;

        // Validate all inputs
        inputs.forEach((input) => {
            validateField(input);
            if (input.classList.contains("invalid-input")) {
                allValid = false;
            }
        });

        // If all fields are valid, proceed
        if (allValid) {
            // Handle form success (e.g., send data or show a success message)
            document.getElementById("userDetail-panel").style.display = "none";
            document.getElementById("confirmation-panel").style.display =
                "flex";

            // Map of input field IDs to span IDs
            const fieldMapping = {
                "user-type": "userType-span",
                email: "email-span",
                "phone-no": "phone-span",
            };

            // Loop through the mapping and set text content
            Object.entries(fieldMapping).forEach(([inputId, spanId]) => {
                const inputValue = document
                    .getElementById(inputId)
                    .value.trim();
                document.getElementById(spanId).textContent = inputValue;
            });

            const firstName = getTrimmedValue("first-name");
            const lastName = getTrimmedValue("last-name");
            const streetAddress = getTrimmedValue("street-address");
            const city = getTrimmedValue("city-address");
            const zipcode = getTrimmedValue("zip-code");
            const state = getTrimmedValue("state-address");

            // set full name
            document.getElementById(
                "name-span"
            ).textContent = `${firstName} ${lastName}`;

            // Set address
            document.getElementById(
                "address-span"
            ).textContent = `${streetAddress}, ${zipcode} ${city}, ${state}`;
        }
    });

    // Validate individual fields
    function validateField(input) {
        const errorElement = document.getElementById(input.dataset.error);
        const value = input.value.trim();

        // Validation rules
        const validationRules = {
            SELECT: () => input.value === "Select User" || !input.value,
            file: () => !input.files || input.files.length === 0,
            tel: () => value.length < 14 || !value.startsWith("+60"),
            email: () => !isValidEmail(value),
            name: () => {
                const nameRegex = /^[a-zA-Z\s\-'/.]+$/;
                return (
                    !value ||
                    !nameRegex.test(value) ||
                    value.length < 2 ||
                    value.length > 50
                );
            },
            default: () => !value, // General validation for empty fields
        };

        // Determine the validation logic to use
        let validationType;

        if (input.tagName === "SELECT") {
            validationType = "SELECT";
        } else if (input.name === "name") {
            validationType = "name";
        } else if (input.type) {
            validationType = input.type;
        } else {
            validationType = "default";
        }

        const isInvalid = (
            validationRules[validationType] || validationRules.default
        )();

        // Set validity based on the result
        if (isInvalid) {
            if (input.name === "name" && value) {
                setInvalid(input, document.getElementById("validNameError"));
            } else {
                setInvalid(input, errorElement);
            }

            if (input.type === "file") {
                uploadTrigger.classList.add("invalid-input");
            }
        } else {
            setValid(input, errorElement);
        }
    }

    // Real-time validation for inputs
    form.querySelectorAll("[data-error]").forEach((input) => {
        input.addEventListener("input", () => {
            const errorElementId = input.dataset.error;
            const errorElement = document.getElementById(errorElementId);

            // Remove invalid styles and hide the error message as user types
            input.classList.remove("invalid-input");
            errorElement.style.display = "none";

            if (input.name === "name") {
                document.getElementById("validNameError").style.display =
                    "none";
            }
        });
    });

    document
        .getElementById("cancel-btn")
        .addEventListener("click", function () {
            document.getElementById("userDetail-panel").style.display = "flex";
            document.getElementById("confirmation-panel").style.display =
                "none";
        });

    document
        .getElementById("confirm-btn")
        .addEventListener("click", function () {
            const userType =
                document.getElementById("userType-span").textContent;
            const name = document.getElementById("name-span").textContent;
            const email = document.getElementById("email-span").textContent;
            const phone = document.getElementById("phone-span").textContent;
            const streetAddress = getTrimmedValue("street-address");
            const city = getTrimmedValue("city-address");
            const zipcode = getTrimmedValue("zip-code");
            const state = getTrimmedValue("state-address");

            let redirectURL = "";
            let userID = Math.floor(Math.random() * 90000) + 10000; // random 5 digits generator

            if (userType === "Librarian") {
                redirectURL = `librarians.html`;
                userID = `LIB${userID}`;
            } else {
                redirectURL = `members.html`;
                userID = `SUN${userID}`;
            }

            const date = new Date();
            const day = String(date.getDate()).padStart(2, "0"); // Get day with leading zero
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-indexed)
            const year = date.getFullYear(); // Get full year

            const memberDate = `${day}-${month}-${year}`;
            const renewalDate = `${day}-${month}-${year + 1}`;

            let librarianData, memberData;
            try {
                librarianData = JSON.parse(
                    localStorage.getItem("newLibrarianData")
                );
                memberData = JSON.parse(localStorage.getItem("newMemberData"));
            } catch (error) {
                console.error("Error parsing localStorage data:", error);
                librarianData = memberData = null;
            }

            const newUserDetail =
                userType === "Librarian"
                    ? Array.isArray(librarianData)
                        ? librarianData
                        : []
                    : Array.isArray(memberData)
                    ? memberData
                    : [];

            console.log("Fetched newUserDetail:", newUserDetail);

            var newDetail = {
                uploadedUserImage: base64Image,
                userID: userID,
                name: name,
                email: email,
                phone: phone,
                streetAddress: streetAddress,
                city: city,
                zipcode: zipcode,
                state: state,
                memberDate: memberDate,
                renewalDate: renewalDate,
            };

            newUserDetail.push(newDetail);

            if (userType === "Librarian") {
                localStorage.setItem(
                    "newLibrarianData",
                    JSON.stringify(newUserDetail)
                );
            } else if (userType === "Member") {
                localStorage.setItem(
                    "newMemberData",
                    JSON.stringify(newUserDetail)
                );
            } else {
                console.error("Invalid userType:", userType);
            }
            window.location.replace(`../pages/${redirectURL}`);
        });

    // Helper function to get and trim input value by ID
    function getTrimmedValue(id) {
        return document.getElementById(id)?.value.trim() || "";
    }

    // Helper function to mark input as invalid
    function setInvalid(input, errorElement) {
        input.classList.add("invalid-input");
        if (errorElement) errorElement.style.display = "block";
    }

    // Helper function to mark input as valid
    function setValid(input, errorElement) {
        input.classList.remove("invalid-input");
        if (errorElement) errorElement.style.display = "none";
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
