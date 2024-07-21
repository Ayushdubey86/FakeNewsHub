const countries = [
    "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "China", "Colombia", "Cuba", "Czech Republic",
    "Egypt", "France", "Germany", "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Ireland", "Israel", "Italy", "Japan",
    "Latvia", "Lithuania", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Philippines",
    "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa",
    "South Korea", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey", "UAE", "Ukraine", "United Kingdom", "United States", "Venezuela"
];

window.onload = function() {
    const countryDropdown = document.getElementById('country-dropdown');
    countries.forEach(country => {
        let option = document.createElement('option');
        option.value = country;
        option.text = country;
        countryDropdown.add(option);
    });

    const searchInput = document.getElementById('search-input');
    const categoryDropdown = document.getElementById('category-dropdown');
    const searchButton = document.getElementById('search-button');

    searchInput.addEventListener('input', function() {
        if (searchInput.value) {
            countryDropdown.disabled = true;
            categoryDropdown.disabled = true;
        } else {
            countryDropdown.disabled = false;
            categoryDropdown.disabled = false;
        }
    });

    countryDropdown.addEventListener('change', function() {
        if (countryDropdown.value || categoryDropdown.value) {
            searchInput.disabled = true;
        } else {
            searchInput.disabled = false;
        }
    });

    categoryDropdown.addEventListener('change', function() {
        if (categoryDropdown.value || countryDropdown.value) {
            searchInput.disabled = true;
        } else {
            searchInput.disabled = false;
        }
    });

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        const selectedCountry = countryDropdown.value;
        const selectedCategory = categoryDropdown.value;
        let url = `https://newsapi.org/v2/top-headlines?apiKey=a7f36bf0e6074d1099a8c1d0ee88dbad`;

        if (searchTerm) {
            url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchTerm)}&apiKey=a7f36bf0e6074d1099a8c1d0ee88dbad`;
        } else {
            if (selectedCountry) {
                const countryCode = getCountryCode(selectedCountry);
                url += `&country=${countryCode}`;
            }
            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }
        }

        fetch(url)
            .then(response => response.json())
            .then(data => displayNews(data.articles))
            .catch(error => console.error('Error fetching news:', error));
    });
};

function getCountryCode(countryName) {
    const countryCodes = {
        "Argentina": "ar", "Australia": "au", "Austria": "at", "Belgium": "be", "Brazil": "br", "Bulgaria": "bg", "Canada": "ca",
        "China": "cn", "Colombia": "co", "Cuba": "cu", "Czech Republic": "cz", "Egypt": "eg", "France": "fr", "Germany": "de",
        "Greece": "gr", "Hong Kong": "hk", "Hungary": "hu", "India": "in", "Indonesia": "id", "Ireland": "ie", "Israel": "il",
        "Italy": "it", "Japan": "jp", "Latvia": "lv", "Lithuania": "lt", "Malaysia": "my", "Mexico": "mx", "Morocco": "ma",
        "Netherlands": "nl", "New Zealand": "nz", "Nigeria": "ng", "Norway": "no", "Philippines": "ph", "Poland": "pl",
        "Portugal": "pt", "Romania": "ro", "Russia": "ru", "Saudi Arabia": "sa", "Serbia": "rs", "Singapore": "sg",
        "Slovakia": "sk", "Slovenia": "si", "South Africa": "za", "South Korea": "kr", "Sweden": "se", "Switzerland": "ch",
        "Taiwan": "tw", "Thailand": "th", "Turkey": "tr", "UAE": "ae", "Ukraine": "ua", "United Kingdom": "gb",
        "United States": "us", "Venezuela": "ve"
    };
    return countryCodes[countryName];
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${article.title}</h5>
                <p class="card-text">${article.description}</p>
            </div>
            <hr>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Source: ${article.source.name}</li>
                <li class="list-group-item">Author: ${article.author || 'Unknown'}</li>
            </ul>
            <div class="card-body">
                <a href="${article.url}" class="card-link">Read more</a>
            </div>
        `;
        newsContainer.appendChild(card);
    });
}
