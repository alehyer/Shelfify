document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-helpInfo').addEventListener('click', function() {
        alert("Please contact IT Services \n\nPhone Number: +601234567890 \nEmail: shelfify@customersupport.com");
    });

    document.getElementById('login-button').addEventListener('click', function() {
        const idElement = document.getElementById('librarian-id');
        const passwordElement = document.getElementById('librarian-password');
        
        const id = idElement.value.trim();
        let password = passwordElement.value.trim();
    
        if (id === "" || password === "") {
            alert("Please fill in all required fields.");
            return;
        }
        
        // admin account
        if (id === "123" && password === "abc") {
            window.location.href = `../pages/home.html`;
        } else {
            alert("Incorrect ID or password.");
        }

        passwordElement.value = "";
    });
});

