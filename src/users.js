document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("add-btn").addEventListener("click", function () {
        window.location.href = `../pages/add-users.html`;
    });

    // example data
    const librarian1 = {
        uploadedUserImage: `../images/librarian.png`,
        userID: "LIB21345",
        name: "Librarian 1",
        email: "librarian@example.com",
        phone: "+6011 894 2718",
        streetAddress: "1 Blok A Kementah Jln Padang Tembak",
        city: "Kuala Lumpur",
        zipcode: "54100",
        state: "Wilayah Persekutuan",
        memberDate: "10-03-2024",
        renewalDate: "10-03-2025",
    };

    const librarian2 = {
        uploadedUserImage: `../images/librarian.png`,
        userID: "LIB67890",
        name: "Librarian 2",
        email: "librarian@example.com",
        phone: "+6012 727 8344",
        streetAddress: "Jalan Burhanuddin Helmi, Taman Tun Doktor Ismail",
        city: "Kuala Lumpur",
        zipcode: "60000",
        state: "Wilayah Persekutuan",
        memberDate: "20-04-2024",
        renewalDate: "20-04-2025",
    };

    const librarian3 = {
        uploadedUserImage: `../images/librarian.png`,
        userID: "LIB11223",
        name: "Librarian 3",
        email: "librarian@example.com",
        phone: "+6012 861 8820",
        streetAddress:
            "1023 Level 9-10 Block B1 Leisure Commerce Square No. 9 Jalan Pjs 8/9",
        city: "Petaling Jaya",
        zipcode: "46150",
        state: "Selangor",
        memberDate: "27-07-2024",
        renewalDate: "27-07-2025",
    };

    const member1 = {
        uploadedUserImage: `../images/customers.png`,
        userID: "SUN34523",
        name: "Member 1",
        email: "member@example.com",
        phone: "+6013 168 6414",
        streetAddress: "23 Jln Kem Pelabuhan Pelabuhan",
        city: "Klang",
        zipcode: "42000",
        state: "Selangor",
        memberDate: "30-02-2024",
        renewalDate: "30-02-2025",
    };

    const member2 = {
        uploadedUserImage: `../images/customers.png`,
        userID: "SUN23422",
        name: "Member 2",
        email: "member@example.com",
        phone: "+6012 991 3842",
        streetAddress: "Jalan Pjs 7/18, Bandar Sunway",
        city: "Petaling Jaya",
        zipcode: "46150",
        state: "Selangor",
        memberDate: "28-09-2024",
        renewalDate: "28-09-2025",
    };

    const member3 = {
        uploadedUserImage: `../images/customers.png`,
        userID: "SUN11223",
        name: "Member 3",
        email: "member@example.com",
        phone: "+6013 4270 6669",
        streetAddress: "Jalan Sulaiman 3, Taman Putra Sulaiman",
        city: "Ampang",
        zipcode: "68000",
        state: "Selangor",
        memberDate: "13-01-2024",
        renewalDate: "13-01-2024",
    };

    const currentURL = window.location.href;
    const memberArray = JSON.parse(localStorage.getItem("newMemberData")) || [];
    const librarianArray =
        JSON.parse(localStorage.getItem("newLibrarianData")) || [];

    if (librarianArray.length === 0) {
        librarianArray.push(librarian1, librarian2, librarian3);
        localStorage.setItem(
            "newLibrarianData",
            JSON.stringify(librarianArray)
        );
    }

    if (memberArray.length === 0) {
        memberArray.push(member1, member2, member3);
        localStorage.setItem("newMemberData", JSON.stringify(memberArray));
    }

    console.log(librarianArray);
    console.log(memberArray);

    if (currentURL.includes("librarians.html")) {
        librarianArray.forEach((data) => {
            appendNewCard(data, "Librarian");
        });
    } else if (currentURL.includes("members.html")) {
        memberArray.forEach((data) => {
            appendNewCard(data, "Member");
        });
    }

    function appendNewCard(data, userType) {
        const cardsContainer = document.querySelector(".cards");

        // Create a new card element
        const newCard = document.createElement("div");
        newCard.classList.add("card"); // Add the "card" class

        // Add the content for the new card
        newCard.innerHTML = `
        <img src="${data.uploadedUserImage}" alt="Uploaded Image" />
        <div>
            <h3>${data.name}</h3>
            <p>User ID: ${data.userID}</p>
            <p>Phone: ${data.phone} </p>
            <p>Email: ${data.email}</p>
            <div style="display: none">
                <p>Street Address: ${data.streetAddress}</p>
                <p>City: ${data.city}</p>
                <p>Zipcode: ${data.zipcode}</p>
                <p>State: ${data.state}</p>
                <p>Member Since: ${data.memberDate}</p>
                <p>Renewal Date: ${data.renewalDate}</p>
            </div>
        </div>
        <button
            class="delete"
            data-delete="zoom"
            onclick="event.stopPropagation();"
            data-user-id="${data.userID}"
        >
            Remove
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

            const userID = this.getAttribute("data-user-id");

            if (userType === "Librarian") {
                const indexToRemove = librarianArray.findIndex(
                    (item) => item.userID === userID
                );
                if (indexToRemove !== -1) {
                    librarianArray.splice(indexToRemove, 1); // Remove the specific item
                    localStorage.setItem(
                        "newLibrarianData",
                        JSON.stringify(librarianArray)
                    );
                    console.log("Updated librarianArray:", librarianArray);
                }
            } else if (userType === "Member") {
                const indexToRemove = memberArray.findIndex(
                    (item) => item.userID === userID
                );
                if (indexToRemove !== -1) {
                    memberArray.splice(indexToRemove, 1); // Remove the specific item
                    localStorage.setItem(
                        "newMemberData",
                        JSON.stringify(memberArray)
                    );
                    console.log("Updated memberArray:", memberArray);
                }
            }
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

    // view user details function
    document.querySelectorAll(".card").forEach(function (card) {
        card.addEventListener("click", function () {
            const imgSrc = this.querySelector("img").src;
            const name = this.querySelector("h3").textContent;

            let userDetail = {
                Image: imgSrc,
                Name: name,
            };

            this.querySelectorAll("p").forEach(function (p) {
                const key = p.textContent.split(":")[0].trim();
                const value = p.textContent.split(":").pop().trim();
                userDetail[key] = value;
            });

            console.log(userDetail);
            localStorage.setItem("userData", JSON.stringify(userDetail));
            window.location.href = "../pages/profile.html";
        });
    });
});
