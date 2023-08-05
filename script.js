document.addEventListener("DOMContentLoaded", function () {
    let playerBalance = 1000;
    let loggedInUsername = null;
    
    const balanceElement = document.getElementById("balance");
    const loggedInUsernameElement = document.getElementById("loggedInUsername");
    const betAmountInput = document.getElementById("betAmount");
    const rollButton = document.getElementById("rollButton");
    const adButton = document.getElementById("adButton");
    const resultElement = document.getElementById("result");
    const loginForm = document.getElementById("loginForm");
    const gameSection = document.getElementById("gameSection");
    const playerContainer = document.getElementById("playerContainer");
    const playerIframe = document.getElementById("player");

    // Check if the user is already logged in (stored in LocalStorage)
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
        loggedInUsername = storedUsername;
        showGameSection();
        loggedInUsernameElement.textContent = loggedInUsername;
        loadBalance();
    }

    let ytPlayer; // YouTube player object

    rollButton.addEventListener("click", function () {
        const betAmount = parseInt(betAmountInput.value);

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > playerBalance) {
            alert("Invalid bet amount. Please enter a valid bet.");
            return;
        }

        const diceRoll = Math.floor(Math.random() * 6) + 1;

        resultElement.textContent = "Rolling the dice...\nThe dice shows: " + diceRoll;

        if (diceRoll === 1) {
            resultElement.textContent += "\nYou lose! Better luck next time.";
            playerBalance -= betAmount;
        } else {
            resultElement.textContent += "\nCongratulations! You win.";
            playerBalance += betAmount;
        }

        updateBalance();
    });

    adButton.addEventListener("click", function () {
        // ... (unchanged adButton click event code)
    });

    document.getElementById("loginButton").addEventListener("click", function () {
        const username = document.getElementById("username").value;
        if (username.trim() === "") {
            alert("Please enter a valid username.");
            return;
        }

        loggedInUsername = username;
        localStorage.setItem("username", loggedInUsername);
        loggedInUsernameElement.textContent = loggedInUsername;

        showGameSection();
        loadBalance();
    });

    function showGameSection() {
        loginForm.style.display = "none";
        gameSection.style.display = "block";
    }

    function loadBalance() {
        // Retrieve balance from LocalStorage for the logged-in user (if exists)
        const storedBalance = localStorage.getItem(`balance_${loggedInUsername}`);
        if (storedBalance) {
            playerBalance = parseInt(storedBalance);
            updateBalance();
        }
    }

    function updateBalance() {
        balanceElement.textContent = playerBalance;
    }

    adButton.addEventListener("click", function () {
        adButton.disabled = true;
        resultElement.textContent = "Watching an ad...";

        // Show the YouTube video player
        playerContainer.style.display = "block";
        playerIframe.src = "https://www.youtube.com/embed/gYsUrXhbkPU?autoplay=1";

        setTimeout(function () {
            // Hide the player after 5 seconds
            playerContainer.style.display = "none";
            playerIframe.src = ""; // Stop the video playback
            resultElement.textContent = "Ad watched! You received 1000 credits.";
            playerBalance += 1000;
            updateBalance();
            adButton.disabled = false;
        }, 5000); // 5000 milliseconds = 5 seconds
    });

    // ... (existing script.js code) ...
});


