document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromNavBar = urlParams.get("fromNavBar");

    if (!fromNavBar) {
        // replace text content with user data
        const data = JSON.parse(localStorage.getItem("userData"));

        if (data) {
            document.getElementById("signOut-btn").style.display = "none";

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
                if (
                    span == document.getElementById("profile-picture") &&
                    value
                ) {
                    span.src = value;
                } else if (span && value) {
                    span.textContent = value;
                }
            });
        }
    }

    document
        .getElementById("signOut-btn")
        .addEventListener("click", function () {
            window.location.href = "../index.html";
        });
});
