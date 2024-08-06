// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Smooth scroll to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// popup functionality
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const alertSound = document.getElementById("alert-sound");
    const closeButton = document.getElementById("close-btn");
    const virusMessage = document.getElementById("virus-message");
    const ipUnmaskingMessage = document.getElementById("ip-unmasking-message");
    const loadingProgress = document.getElementById("loading-progress");
    const blackout = document.getElementById("blackout");

    // Initially hide the close button
    closeButton.style.display = "none";

    // Set volume for the alert sound (0.1 means 10% volume)
    alertSound.volume = 0.1;

    // Flag to track if the popup is actively showing
    let isPopupVisible = false;
    let loadingInterval = null; // Variable to hold interval ID

    function showPopup() {
        isPopupVisible = true;
        popup.style.display = "block";
        alertSound.play();
        ipUnmaskingMessage.textContent = "Unmasking your IP address...";

        let progress = 0;
        loadingInterval = setInterval(function() {
            progress += 10;
            loadingProgress.style.width = progress + "%";
            if (progress >= 100) {
                clearInterval(loadingInterval);
                blackout.style.display = 'block';
                virusMessage.classList.remove("hidden");
                closeButton.style.display = "block"; // Show close button
            }
        }, 500);
    }

    setTimeout(showPopup, 2000);

    closeButton.addEventListener("click", function() {
        closePopup();
    });

    // Function to close the popup and hide the blackout overlay
    function closePopup() {
        isPopupVisible = false; // Set flag to false
        clearInterval(loadingInterval); // Stop loading interval
        popup.style.display = "none";
        blackout.style.display = 'none';
        alertSound.pause();
        alertSound.currentTime = 0;
        // Reset loading bar progress
        loadingProgress.style.width = "0%";
    }

    // Close popup and blackout overlay when clicking outside the popup
    document.addEventListener("click", function(event) {
        if (isPopupVisible && !popup.contains(event.target)) {
            closePopup();
        }
    });
});
