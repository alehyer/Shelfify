document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add-btn").addEventListener("click", function () {
        window.location.href = `../pages/add-users.html`;
    });

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.size > 0) {
        const uploadedUserImage = localStorage.getItem("uploadedUserImage");
        const userID = urlParams.get("userID");
        const name = urlParams.get("name");
        const email = urlParams.get("email");
        const phone = urlParams.get("phone");
        const address = urlParams.get("address");
        const cardsContainer = document.querySelector(".cards");

        // Create a new card element
        const newCard = document.createElement("div");
        newCard.classList.add("card"); // Add the "card" class

        // Add the content for the new card
        newCard.innerHTML = `
            <img src="${uploadedUserImage}" alt="Uploaded Image" />
            <div>
                <h3>${name}</h3>
                <p>User ID: ${userID}</p>
                <p>Phone: ${phone} </p>
                <p>Email: ${email}</p>
                <div style="display: none">
                    <p>Address: ${address}</p>
                </div>
            </div>
            <button class="delete" data-delete="zoom">remove</button>
            <div class="animation-assets"></div>
        `;

        // Append the new card to the "cards" container
        cardsContainer.appendChild(newCard);
    }

    const parent = function (el, match, last) {
        var result = [];
        for (var p = el && el.parentElement; p; p = p.parentElement) {
            result.push(p);
            if (p.matches(match)) {
                break;
            }
        }
        if (last == 1) {
            return result[result.length - 1];
        } else {
            return result;
        }
    };

    document.querySelectorAll(".delete").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = parent(this, ".card", 1); // Find the card element

            // Add the zoom class for animation
            card.classList.add("zoom");

            card.addEventListener("animationend", function () {
                card.remove();
            });
        });
    });
});
