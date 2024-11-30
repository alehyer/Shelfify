document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("login-helpInfo")
        .addEventListener("click", function () {
            alert(
                "Please contact IT Services \n\nPhone Number: +601234567890 \nEmail: shelfify@customersupport.com"
            );
        });

    const form = document.querySelector("form");
    const id = document.getElementById("librarian-id");
    const password = document.getElementById("librarian-password");
    const loginError = document.getElementById("loginError");

    // Add event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission for validation
        const inputs = form.querySelectorAll("[data-error]"); // Get all inputs with a data-error attribute

        inputs.forEach((input) => validateField(input)); // Validate each field

        const idValue = id.value.trim();
        const passwordValue = password.value.trim();

        if (idValue && passwordValue) {
            if (
                idValue.length === 8 &&
                idValue.substr(0, 3) === "LIB" &&
                Number.isInteger(parseInt(idValue.substr(3, 7)))
            ) {
                window.location.href = `/pages/home.html`;
            } else {
                loginError.style.display = "block";
                password.value = "";
                password.focus();
            }
        }
    });

    form.querySelectorAll("[data-error]").forEach((input) => {
        input.addEventListener("input", () => {
            const errorElementId = input.dataset.error;
            const errorElement = document.getElementById(errorElementId);

            // Remove invalid styles and hide the error message as user types
            input.classList.remove("invalid-input");
            errorElement.style.display = "none";
        });
    });

    // Function to validate fields
    function validateField(input) {
        const errorElementId = input.dataset.error; // Get the associated error element ID
        const errorElement = document.getElementById(errorElementId);
        const value = input.value.trim();

        if (!value) {
            input.classList.add("invalid-input");
            errorElement.style.display = "block";
        } else {
            input.classList.remove("invalid-input");
            errorElement.style.display = "none";
        }
    }
});
