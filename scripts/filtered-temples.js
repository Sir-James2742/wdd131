const currentyear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const today = new Date();

currentyear.innerHTML = `<span >${today.getFullYear()}</span>`;
lastModified.innerHTML = `Last modification: <span class="date">${new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(today)}</span>`;


const menuButton = document.querySelector('#menubutton');
const navigation = document.querySelector('.navlist');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "bengaluru India",
        location: "Bengaluru, India",
        dedicated: "2 December 2020",
        area: 38670,
        imageUrl:"https://churchofjesuschristtemples.org/assets/img/temples/bengaluru-india-temple/bengaluru-india-temple-7886-main.jpg"
    },
    {
        templeName: "Benin City Nigeria",
        location: "Nigeria",
        dedicated: "24 May 2025",
        area: 30700,
        imageUrl:"https://churchofjesuschristtemples.org/assets/img/temples/benin-city-nigeria-temple/benin-city-nigeria-temple-58575-main.jpg"
    },
    {
        templeName: "Dallas Texas",
        location: "texas, United States",
        dedicated: "24 October 1884",
        area: 44207,
        imageUrl:"https://churchofjesuschristtemples.org/assets/img/temples/dallas-texas-temple/dallas-texas-temple-55240-main.jpg"
    }
];


const templeCards = document.querySelector('#temple-cards');


function createTempleCards(filteredTemples) {
   
    templeCards.textContent = '';

   
    if (!filteredTemples || filteredTemples.length === 0) {
        templeCards.innerHTML = '<p>No temples match the selected criteria.</p>';
        return;
    }

    filteredTemples.forEach(temple => {
        const card = document.createElement('div');
       
        const dedicationYear = getDedicationYear(temple.dedicated);

        card.innerHTML = `
            <h2>${temple.templeName}</h2>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p><strong>Dedication Year:</strong> ${dedicationYear}</p>
            <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
            <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
        `;

        templeCards.appendChild(card);
    });
}


function getDedicationYear(dedicationString) {
    // Try format like "2005, August, 7"
    const commaParts = dedicationString.split(',');
    if (commaParts.length >= 1) {
        const yearPart = commaParts[0].trim();
        const year = parseInt(yearPart);
        if (!isNaN(year)) return year;
    }

    // Try format like "2 December 2020"
    const spaceParts = dedicationString.split(' ');
    for (let i = spaceParts.length - 1; i >= 0; i--) {
        const year = parseInt(spaceParts[i]);
        if (!isNaN(year)) return year;
    }

    return 'Unknown';
}

// Filter functions
function filterOldTemples() {
    const oldTemples = temples.filter(temple => {
        const year = getDedicationYear(temple.dedicated);
        return year <= 1900;
    });
    createTempleCards(oldTemples);
}

function filterNewTemples() {
    const newTemples = temples.filter(temple => {
        const year = getDedicationYear(temple.dedicated);
        return year >= 2000;
    });
    createTempleCards(newTemples);
}

function filterLargeTemples() {
    const largeTemples = temples.filter(temple => temple.area >= 90000);
    createTempleCards(largeTemples);
}

function filterSmallTemples() {
    const smallTemples = temples.filter(temple => temple.area < 10000);
    createTempleCards(smallTemples);
}

function showAllTemples() {
    createTempleCards(temples);
}
showAllTemples();
// Event listeners
document.querySelector('#old').addEventListener('click', filterOldTemples);
document.querySelector('#new').addEventListener('click', filterNewTemples);
document.querySelector('#large').addEventListener('click', filterLargeTemples);
document.querySelector('#small').addEventListener('click', filterSmallTemples);
document.querySelector('#home').addEventListener('click', showAllTemples);

// Initial load
