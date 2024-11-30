document.addEventListener("DOMContentLoaded", function () {
    const book1 = {
        uploadedBookCover: `../images/books.png`,
        title: "Book 1",
        author: "Author 1",
        publisher: "Publisher 1",
        category: "Adventure",
        bookID: "SD2340",
        shelfLocation: "A-10-23",
        isAvailable: true,
    };

    const book2 = {
        uploadedBookCover: `../images/books.png`,
        title: "Book 2",
        author: "Author 2",
        publisher: "Publisher 2",
        category: "Non-Fiction",
        bookID: "KD3452",
        shelfLocation: "G-21-65",
        isAvailable: true,
    };

    const book3 = {
        uploadedBookCover: `../images/books.png`,
        title: "Book 3",
        author: "Author 3",
        publisher: "Publisher 3",
        category: "Fantasy",
        bookID: "UW1231",
        shelfLocation: "H-20-05",
        isAvailable: false,
    };

    const currentURL = window.location.href;
    const bookArray = JSON.parse(localStorage.getItem("newBookData")) || [];

    if (bookArray.length === 0) {
        bookArray.push(book1, book2, book3);
        localStorage.setItem("newBookData", JSON.stringify(bookArray));
    }

    console.log(bookArray);

    // if current page is all books
    if (currentURL.includes("all-books.html")) {
        bookArray.forEach((data) => {
            appendNewCard(data, "Remove", "all-books.html");
        });
    }
    // else if current page is avalidable books
    else if (currentURL.includes("available-books.html")) {
        bookArray.forEach((data) => {
            if (data.isAvailable === true) {
                appendNewCard(data, "Lend Book", "available-books.html");
            }
        });
    }
    // else if current page is lent books
    else if (currentURL.includes("lent-books.html")) {
        bookArray.forEach((data) => {
            if (data.isAvailable === false) {
                appendNewCard(data, "Return Book", "lent-books.html");
            }
        });
    }

    function appendNewCard(data, button, page) {
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
                    <p>isAvailable: ${data.isAvailable}</p>
                </div>
            </div>
            <button
                class="delete"
                data-delete="zoom"
                onclick="event.stopPropagation();"
                data-book-id="${data.bookID}"
            >
                ${button}
            </button>
            <div class="animation-assets"></div>
        `;

        // Append the new card to the "cards" container
        cardsContainer.appendChild(newCard);

        // add event listener to delete button upon creating card
        const deleteBtn = newCard.querySelector(".delete");
        deleteBtn.addEventListener("click", function () {
            const card = parent(this, ".card", 1); // Find the card element

            // Add the zoom class for animation
            card.classList.add("zoom");

            card.addEventListener("animationend", function () {
                card.remove();
            });

            const bookID = this.getAttribute("data-book-id");

            // if current page is all-books, then remove from local storage
            if (page === "all-books.html") {
                const indexToRemove = bookArray.findIndex(
                    (item) => item.bookID === bookID
                );

                if (indexToRemove !== -1) {
                    bookArray.splice(indexToRemove, 1);
                }
                console.log("Updated bookArray:", bookArray);
            }
            // else if current page is available-books, change isAvailable to false
            else if (page === "available-books.html") {
                data.isAvailable = false;
            }
            // else if current page is lent-books, change isAvailable to true
            else if (page === "lent-books.html") {
                data.isAvailable = true;
            }
            localStorage.setItem("newBookData", JSON.stringify(bookArray));
        });
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
