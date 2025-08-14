
document.addEventListener('DOMContentLoaded', function () {
    
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    const menuButton = document.getElementById('menubutton');
    const mainNav = document.getElementById('mainnav');

    menuButton.addEventListener('click', function () {
        mainNav.classList.toggle('active');
    });

    updateVisitCounter();

   
    const properties = [
        {
            id: 1,
            title: "Modern Apartment in Kilimani",
            price: 45000,
            type: "apartment",
            bedrooms: 2,
            bathrooms: 2,
            neighborhood: "Kilimani",
            image: "images/property1.jpg",
            description: "Spacious 2-bedroom apartment with modern finishes and great amenities."
        },
        {
            id: 2,
            title: "Cozy Studio in Westlands",
            price: 25000,
            type: "studio",
            bedrooms: 1,
            bathrooms: 1,
            neighborhood: "Westlands",
            image: "images/property2.jpg",
            description: "Affordable studio perfect for students or young professionals."
        },
        {
            id: 3,
            title: "Family House in Lavington",
            price: 80000,
            type: "house",
            bedrooms: 3,
            bathrooms: 2,
            neighborhood: "Lavington",
            image: "images/property3.jpg",
            description: "Beautiful 3-bedroom house with garden and parking."
        },
        {
            id: 4,
            title: "Shared Apartment in Kileleshwa",
            price: 15000,
            type: "shared",
            bedrooms: 1,
            bathrooms: 1,
            neighborhood: "Kileleshwa",
            image: "images/property4.jpg",
            description: "Comfortable shared living space with all utilities included."
        },
        {
            id: 5,
            title: "Luxury Apartment in Upper Hill",
            price: 65000,
            type: "apartment",
            bedrooms: 2,
            bathrooms: 2,
            neighborhood: "Upper Hill",
            image: "images/property5.jpg",
            description: "High-end apartment with stunning city views and premium amenities."
        },
        {
            id: 6,
            title: "Affordable Studio in South B",
            price: 18000,
            type: "studio",
            bedrooms: 1,
            bathrooms: 1,
            neighborhood: "South B",
            image: "images/property6.jpg",
            description: "Budget-friendly studio in a convenient location."
        }
    ];

    const safetyRatings = {
        "Kilimani": 4,
        "Westlands": 5,
        "Lavington": 5,
        "Kileleshwa": 4,
        "Upper Hill": 4,
        "South B": 3,
        "South C": 3,
        "Ngong Road": 3,
        "Parklands": 4,
        "Karen": 5
    };

    document.addEventListener('DOMContentLoaded', function () {
      
        document.getElementById('currentyear').textContent = new Date().getFullYear();
        document.getElementById('lastModified').textContent = document.lastModified;

        const menuButton = document.getElementById('menubutton');
        const mainNav = document.getElementById('mainnav');

        menuButton.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });

        updateVisitCounter();

        initPropertyFilters();
        displayProperties(properties);
        initReviewForm();
        displaySafetyRatings();

        
        setupEventListeners();
    });

    
    function updateVisitCounter() {
        let visits = localStorage.getItem('siteVisits');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('siteVisits', visits);
        document.querySelector('#visitCounter span').textContent = visits;
    }

    function initPropertyFilters() {
        const neighborhoods = [...new Set(properties.map(prop => prop.neighborhood))];
        const neighborhoodFilter = document.getElementById('neighborhood-filter');

       
        while (neighborhoodFilter.options.length > 1) {
            neighborhoodFilter.remove(1);
        }

        
        neighborhoods.sort().forEach(neighborhood => {
            const option = document.createElement('option');
            option.value = neighborhood;
            option.textContent = neighborhood;
            neighborhoodFilter.appendChild(option);
        });

        
        const propertySelect = document.getElementById('property');
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property.id;
            option.textContent = `${property.title} (${property.neighborhood})`;
            propertySelect.appendChild(option);
        });
    }

    function displayProperties(propertiesToShow) {
        const container = document.getElementById('properties-container');
        container.innerHTML = '';

        if (propertiesToShow.length === 0) {
            container.innerHTML = '<p class="no-results">No properties match your filters. Try adjusting your criteria.</p>';
            return;
        }

        propertiesToShow.forEach(property => {
            const card = document.createElement('div');
            card.className = 'property-card';

            card.innerHTML = `
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}" loading="lazy">
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <div class="property-price">KSh ${property.price.toLocaleString()}/month</div>
                <div class="property-meta">
                    <span>${property.bedrooms} ${property.bedrooms === 1 ? 'bed' : 'beds'}</span>
                    <span>${property.bathrooms} ${property.bathrooms === 1 ? 'bath' : 'baths'}</span>
                    <span>${property.neighborhood}</span>
                </div>
                <p>${property.description}</p>
                <button class="contact-btn" data-id="${property.id}">Contact Landlord</button>
            </div>
        `;

            container.appendChild(card);
        });

        
        document.querySelectorAll('.contact-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const propertyId = this.getAttribute('data-id');
                const property = properties.find(p => p.id == propertyId);
                if (property) {
                    alert(`Contact information for ${property.title}:\nPhone: +254 700 ${Math.floor(1000 + Math.random() * 9000)}\nEmail: landlord${propertyId}@example.com`);
                }
            });
        });
    }

    function filterProperties() {
        const neighborhood = document.getElementById('neighborhood-filter').value;
        const priceRange = document.getElementById('price-filter').value;
        const type = document.getElementById('type-filter').value;

        let filtered = [...properties];

        if (neighborhood) {
            filtered = filtered.filter(prop => prop.neighborhood === neighborhood);
        }

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(prop => {
                if (max) {
                    return prop.price >= min && prop.price <= max;
                }
                return prop.price >= min;
            });
        }

        if (type) {
            filtered = filtered.filter(prop => prop.type === type);
        }

        displayProperties(filtered);
    }

    function displaySafetyRatings() {
        const container = document.querySelector('.safety-ratings');
        if (!container) return;

        container.innerHTML = '';

        for (const [neighborhood, rating] of Object.entries(safetyRatings)) {
            const div = document.createElement('div');
            div.className = 'safety-item';

            div.innerHTML = `
            <h4>${neighborhood}</h4>
            <div class="safety-stars">
                ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
            </div>
            <p>${getSafetyDescription(rating)}</p>
        `;

            container.appendChild(div);
        }
    }

    function getSafetyDescription(rating) {
        const descriptions = [
            "Not recommended",
            "Use caution",
            "Moderately safe",
            "Safe",
            "Very safe",
            "Extremely safe"
        ];
        return descriptions[rating];
    }

    function initReviewForm() {
        
        const totalReviews = localStorage.getItem('totalReviews') || 0;
        const totalReviewsElement = document.getElementById('totalReviews');
        if (totalReviewsElement) {
            totalReviewsElement.textContent = totalReviews;
        }
    }

    function setupEventListeners() {
        
        const neighborhoodFilter = document.getElementById('neighborhood-filter');
        const priceFilter = document.getElementById('price-filter');
        const typeFilter = document.getElementById('type-filter');

        if (neighborhoodFilter) neighborhoodFilter.addEventListener('change', filterProperties);
        if (priceFilter) priceFilter.addEventListener('change', filterProperties);
        if (typeFilter) typeFilter.addEventListener('change', filterProperties);

        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) reviewForm.addEventListener('submit', handleReviewSubmit);

        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    function handleReviewSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const review = {
            propertyId: formData.get('property'),
            rating: formData.get('rating'),
            review: formData.get('review'),
            name: formData.get('name') || 'Anonymous',
            date: new Date().toLocaleDateString()
        };

        console.log('Review submitted:', review);

        
        let totalReviews = localStorage.getItem('totalReviews') || 0;
        totalReviews = parseInt(totalReviews) + 1;
        localStorage.setItem('totalReviews', totalReviews);

        return true;
    }

    function handleNewsletterSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const preferences = Array.from(form.preferences.selectedOptions).map(opt => opt.value);

        let subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
        subscribers.push({ email, preferences, date: new Date().toISOString() });
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

        alert('Thank you for subscribing to our newsletter!');
        form.reset();
    }
});