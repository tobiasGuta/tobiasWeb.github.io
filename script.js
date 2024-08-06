
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const alertSound = document.getElementById("alert-sound");
    const closeButton = document.getElementById("close-btn");
    const virusMessage = document.getElementById("virus-message");
    const ipUnmaskingMessage = document.getElementById("ip-unmasking-message");
    const loadingProgress = document.getElementById("loading-progress");
    const blackout = document.getElementById("blackout");

 
    closeButton.style.display = "none";


    alertSound.volume = 0.1;

 
    let isPopupVisible = false;
    let loadingInterval = null; 

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
                closeButton.style.display = "block"; 
            }
        }, 500);
    }

    setTimeout(showPopup, 2000);

    closeButton.addEventListener("click", function() {
        closePopup();
    });


    function closePopup() {
        isPopupVisible = false; 
        clearInterval(loadingInterval); 
        popup.style.display = "none";
        blackout.style.display = 'none';
        alertSound.pause();
        alertSound.currentTime = 0;
        // Reset loading bar progress
        loadingProgress.style.width = "0%";
    }


    document.addEventListener("click", function(event) {
        if (isPopupVisible && !popup.contains(event.target)) {
            closePopup();
        }
    });
});
