document.querySelectorAll('.delete_button').forEach(button => {
    button.addEventListener('click', function() {
        const bookingId = this.getAttribute('data-id'); // Get ID from the button's data-id

        fetch(`/home/${bookingId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            // Server will handle the redirect, so we don't need to do anything further here
            if (response.redirected) {
                window.location.href = response.url;  // Handle redirect to /home
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

window.onload = function() {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');  // Get the 'error' parameter from URL

    if (error) {
        // Display the error message in a prompt dialog
        alert(error);  // Use the error message directly

        // Remove the 'error' parameter from the URL to prevent it from showing on refresh
        const urlWithoutError = window.location.href.split('?')[0]; // Remove query string
        window.history.replaceState({}, document.title, urlWithoutError);  // Update URL without query string
    }
};
