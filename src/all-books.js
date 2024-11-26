document.addEventListener("DOMContentLoaded", function () {
    const data = JSON.parse(localStorage.getItem("newBookData"));
    if (data) {
        const cardsContainer = document.querySelector(".cards");

        // Create a new card element
        const newCard = document.createElement("div");
        newCard.classList.add("card"); // Add the "card" class

        // Add the content for the new card
        newCard.innerHTML = `
            <img src="${data.uploadedBookCover}" alt="Book 1" style="border-radius: 1rem; height: auto;"/>
            <div>
                <h3>${data.title}</h3>
                <p>Book ID: ${data.bookID}</p>
                <p>Author: ${data.author}</p>
                <p>Publisher: ${data.publisher}</p>
                <p>Category: ${data.category}</p>
                <div style="display: none">
                    <p>Shelf Location: ${data.shelfLocation}</p>
                </div>
            </div>
            <button
                class="delete"
                data-delete="zoom"
                onclick="event.stopPropagation();"
            >
                remove
            </button>
            <div class="animation-assets"></div>
        `;

        // Append the new card to the "cards" container
        cardsContainer.appendChild(newCard);

        // Delete data after use
        localStorage.removeItem("newBookData");
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

    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("click", function () {
            const imgSrc = this.querySelector("img").src;
            const title = this.querySelector("h3").textContent;

            let bookDetail = {
                Image: imgSrc,
                Title: title,
            };

            this.querySelectorAll("p").forEach(function (p) {
                const key = p.textContent.split(":")[0].trim();
                const value = p.textContent.split(":").pop().trim();
                bookDetail[key] = value;
            });

            localStorage.setItem("bookData", JSON.stringify(bookDetail));
            window.location.href = "../pages/book-details.html";
        });
    });
});
