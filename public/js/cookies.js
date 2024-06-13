const acceptCookiesButton = document.getElementById('btn-accept-cookies');
const cookiesNotice = document.getElementById('cookies-notice');
const cookiesBackdrop = document.getElementById('cookies-backdrop');

dataLayer = [];

// Check if cookies have not been accepted before
if (!localStorage.getItem('accepted-cookies')) {
    // Show the cookies notice and backdrop
    cookiesNotice.classList.add('active');
    cookiesBackdrop.classList.add('active');
} else {
    // If cookies have been accepted, push an event to the dataLayer
    dataLayer.push({'event': 'accepted-cookies'});
}

// Add a click event listener to the accept cookies button
acceptCookiesButton.addEventListener('click', () => {
    // Hide the cookies notice and backdrop
    cookiesNotice.classList.remove('active');
    cookiesBackdrop.classList.remove('active');

    // Store the acceptance of cookies in localStorage
    localStorage.setItem('accepted-cookies', true);

    // Push an event to the dataLayer to indicate cookies have been accepted
    dataLayer.push({'event': 'accepted-cookies'});
});