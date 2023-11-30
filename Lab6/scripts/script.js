(function () {
    window.addEventListener('load', function () {
        var loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log('Время загрузки страницы: ' + loadTime + ' миллисекунд');
        const p = document.getElementById('pageLoad');

        // Check if the element exists before setting innerHTML
        if (p) {
            p.innerHTML = "Page load time in Javascript: " + loadTime + " миллисекунд";
        } else {
            console.error('Element with id "pageLoad" not found.');
        }

        // Step 2.1: Add a preloader with a GIF animation
        const preloader = document.getElementById('preloader');

        // Check if the preloader element exists before setting innerHTML
        if (preloader) {
            preloader.innerHTML = '<img src="./pics/homer-simpson-the-simpsons.gif" alt="Loading...">';
        } else {
            console.error('Element with id "preloader" not found.');
        }

        // Step 2.2: Wait for the page load event and initiate a call to the data provider using the Fetch API
        fetchUserData();
    });
})();

document.addEventListener('DOMContentLoaded', function () {
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
    // Step 3: Initiate a call to the data provider using the Fetch API
    const randomId = Math.floor(Math.random() * 10)+1; // Generate a random number (10)  ( Fixed )

    // Adjust the request URL based on the random number
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${randomId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                // Handle non-successful responses (e.g., 404 Not Found)
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Step 4: Hide the preloader, deserialize the data, and render the received data
            const preloader = document.getElementById('preloader');

            // Check if the preloader element exists before hiding it
            if (preloader) {
                preloader.style.display = 'none';
            } else {
                console.error('Element with id "preloader" not found.');
            }

            // Step 5: Render the received data to the user profile container
            const usernameElement = document.getElementById('username');
            const nameElement = document.getElementById('name');

            if (usernameElement && nameElement) {
                // Check if the elements exist before updating their content
                usernameElement.innerText = data.username;
                nameElement.innerText = data.name;
                // Add more profile fields as needed
            } else {
                console.error('Username or name element not found.');
            }

            // Step 6: Pseudo-random filtering and additional logic (not implemented in this example)
        })
        .catch(error => {
            // Step 6: Handle errors
            console.error('Error during data fetch:', error);

            // Hide the preloader and display an error message
            const preloader = document.getElementById('preloader');

            // Check if the preloader element exists before hiding it
            if (preloader) {
                preloader.style.display = 'none';
            } else {
                console.error('Element with id "preloader" not found.');
            }

            const errorMessageElement = document.getElementById('error-message');
            if (errorMessageElement) {
                errorMessageElement.innerText = '⚠ Something went wrong. Please try again later.';
            } else {
                console.error('Element with id "error-message" not found.');
            }
        });
}

// Function to open the profile.html page
function openProfilePage() {
    window.location.href = 'profile.html';
}
