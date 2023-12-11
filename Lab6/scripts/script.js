(function () {
    window.addEventListener('load', function () {
        // Measure page load time
        var loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log('Время загрузки страницы: ' + loadTime + ' миллисекунд');

        // Display page load time
        const pageLoadElement = document.getElementById('pageLoad');
        if (pageLoadElement) {
            pageLoadElement.innerHTML = "Page load time in JavaScript: " + loadTime + " миллисекунд";
        } else {
            console.error('Element with id "pageLoad" not found.');
        }

        // Add preloader with GIF animation
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.innerHTML = '<img src="preloader-homer.gif" alt="Loading...">';
        } else {
            console.error('Element with id "preloader" not found.');
        }

        // Wait for the page load event and initiate a call to the data provider using the Fetch API
        fetchUserData();
    });
})();

document.addEventListener('DOMContentLoaded', function () {
    // Highlight active menu link based on the current page
    var currentPage = document.location.href;
    console.log(currentPage);
    var menuLinks = document.querySelectorAll('.navchoice a');

    menuLinks.forEach(function (link) {
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});

function fetchUserData() {
    // Show the preloader before making the fetch request
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'block';
    } else {
        console.error('Element with id "preloader" not found.');
    }

    // Initiate a call to the data provider using the Fetch API
    const randomId = Math.floor(Math.random() * 10) + 1;
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${randomId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide the preloader
            hidePreloader();

            // Render the received data to the user profile container
            renderUserData(data);

            // Pseudo-random filtering and additional logic (not implemented in this example)
        })
        .catch(error => {
            // Handle errors
            console.error('Error during data fetch:', error);

            // Hide the preloader and display an error message
            hidePreloader();
            displayErrorMessage('⚠ Something went wrong. Please try again later.');
        });
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.display = 'none';
    } else {
        console.error('Element with id "preloader" not found.');
    }
}

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.innerText = message;
    } else {
        console.error('Element with id "error-message" not found.');
    }
}

function renderUserData(data) {
    const usernameElement = document.getElementById('username');
    const nameElement = document.getElementById('name');

    if (usernameElement && nameElement) {
        usernameElement.innerText = data.username;
        nameElement.innerText = data.name;
        // Add more profile fields as needed
    } else {
        console.error('Username or name element not found.');
    }
}

// Function to open the profile.html page
function openProfilePage() {
    window.location.href = 'profile.html';
}
