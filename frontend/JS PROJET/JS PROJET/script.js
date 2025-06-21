// This file is for interactivity.
console.log("Welcome! Page loaded.");

const homepageMain = document.getElementById('homepage-main');
const authMain = document.getElementById('auth-main');
const loginContainer = document.getElementById('login-container');
const signupContainer = document.getElementById('signup-container');
const headerCta = document.getElementById('header-cta');
const showSignupLink = document.getElementById('show-signup-link');
const showLoginLink = document.getElementById('show-login-link');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

function showHomepage() {
    homepageMain.style.display = 'flex';
    authMain.style.display = 'none';
    headerCta.textContent = 'BECOME MEMBER';
}

function showAuth() {
    homepageMain.style.display = 'none';
    authMain.style.display = 'flex';
}

function showLogin() {
    showAuth();
    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
    headerCta.textContent = 'BECOME MEMBER';
}

function showSignup() {
    showAuth();
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
    headerCta.textContent = 'LOGIN';
}

// Initial state
showHomepage();

headerCta.addEventListener('click', (e) => {
    e.preventDefault();
    if (homepageMain.style.display !== 'none') {
        showSignup();
    } else if (signupContainer.style.display !== 'none') {
        showLogin();
    } else {
        showSignup();
    }
});

if (showSignupLink) {
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSignup();
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Login form submitted! (This is a demo)');
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        
        alert('Sign up form submitted! (This is a demo)');
    });
}