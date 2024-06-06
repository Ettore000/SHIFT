const acceptCookiesButton = document.getElementById('btn-accept-cookies');
const cookiesNotice = document.getElementById('cookies-notice');
const cookiesBackdrop = document.getElementById('cookies-backdrop');

dataLayer = [];

if (!localStorage.getItem('accepted-cookies')) {
    cookiesNotice.classList.add('active');
    cookiesBackdrop.classList.add('active');
} else {
    dataLayer.push({'event': 'accepted-cookies'});
}

acceptCookiesButton.addEventListener('click', () => {
    cookiesNotice.classList.remove('active');
    cookiesBackdrop.classList.remove('active');

    localStorage.setItem('accepted-cookies', true);

    dataLayer.push({'event': 'accepted-cookies'});
});