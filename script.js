document.addEventListener("DOMContentLoaded", function () {
    let playerBalance = 1000;
    const balanceElement = document.getElementById("balance");
    const betAmountInput = document.getElementById("betAmount");
    const rollButton = document.getElementById("rollButton");
    const adButton = document.getElementById("adButton");
    const resultElement = document.getElementById("result");

    // YouTube video parameters
    const videoId = "gYsUrXhbkPU"; // Replace with the actual YouTube video ID

    let ytPlayer; // YouTube player object

    updateBalance();

    rollButton.addEventListener("click", function () {
        // ... (existing rollButton click event code)
    });

    adButton.addEventListener("click", function () {
        adButton.disabled = true;
        resultElement.textContent = "Watching an ad...";

        // Show the YouTube video player
        document.getElementById("playerContainer").style.display = "block";

        // Create a new YouTube player if it doesn't exist
        if (!ytPlayer) {
            ytPlayer = new YT.Player("player", {
                height: "360",
                width: "640",
                videoId: videoId,
                events: {
                    onReady: function (event) {
                        // Start video playback
                        event.target.playVideo();
                    },
                    onStateChange: function (event) {
                        // Hide the player when the video ends
                        if (event.data === YT.PlayerState.ENDED) {
                            document.getElementById("playerContainer").style.display = "none";
                        }
                    },
                },
            });
        } else {
            // If the player already exists, play the video
            ytPlayer.playVideo();
        }

        // Hide the ad button for the duration of the video
        setTimeout(function () {
            ytPlayer.pauseVideo();
            document.getElementById("playerContainer").style.display = "none";
            resultElement.textContent = "Ad watched! You received 1000 credits.";
            playerBalance += 1000;
            updateBalance();
            adButton.disabled = false;
        }, 5000); // 5000 milliseconds = 5 seconds
    });

    function updateBalance() {
        balanceElement.textContent = playerBalance;
    }
});
