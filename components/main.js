// Главная страница — сборщик компонентов
document.addEventListener('DOMContentLoaded', () => {
    let favorites = [];

    function loadFavorites() {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            favorites = JSON.parse(saved);
        }
        updateFavoritesUI();
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesUI();
    }

    function toggleFavorite(productId) {
        const index = favorites.indexOf(productId);
        if (index === -1) {
            favorites.push(productId);
        } else {
            favorites.splice(index, 1);
        }
        saveFavorites();
        if (ProductModal && ProductModal.product && ProductModal.product.id === productId) {
            ProductModal.setData(ProductModal.product, favorites);
            ProductModal.rerender();
        }
    }

    function updateFavoritesUI() {
        if (Header && Header.updateFavoritesCount) {
            Header.updateFavoritesCount(favorites.length);
        }
    }

    if (Header && Header.setCurrentPage) {
        Header.setCurrentPage('index');
    }

    const headerContainer = document.getElementById('header-container');
    if (headerContainer && Header && Header.render) {
        headerContainer.innerHTML = Header.render();
        if (Header.bindEvents) Header.bindEvents();
    }

    const heroContainer = document.getElementById('hero-container');
    if (heroContainer && Hero && Hero.render) {
        heroContainer.innerHTML = Hero.render();
    }

    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer && Categories && Categories.render) {
        categoriesContainer.innerHTML = Categories.render();

        Categories.setOnCategoryClick((category, config) => {
            StoriesModal.setStories(category, config);
            StoriesModal.show();
        });

        Categories.bindEvents();
    }

    if (ProductModal) {
        ProductModal.setOnClose(() => {
            ProductModal.hide();
        });

        ProductModal.setOnFavoriteToggle((productId) => {
            toggleFavorite(productId);
        });

        ProductModal.setOnBuy((product) => {
            alert(`Товар "${product.name}" добавлен в корзину!`);
            ProductModal.hide();
        });
    }

    const productsContainer = document.getElementById('products-container');
    if (productsContainer && ProductsSection && ProductsSection.render) {
        ProductsSection.setData(productsData);
        ProductsSection.setOnProductClick((productId) => {
            const product = productsData.find(p => p.id === productId);
            if (product && ProductModal) {
                ProductModal.setData(product, favorites);
                ProductModal.show();
            }
        });
        productsContainer.innerHTML = ProductsSection.render();
        ProductsSection.bindEvents();
    }

    const masterclassesContainer = document.getElementById('masterclasses-container');
    if (masterclassesContainer && Masterclasses && Masterclasses.render) {
        Masterclasses.setData(masterClassesData);
        masterclassesContainer.innerHTML = Masterclasses.render();
        Masterclasses.bindEvents();
    }

    const aboutContainer = document.getElementById('about-container');
    if (aboutContainer && About && About.render) {
        aboutContainer.innerHTML = About.render();
    }

    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer && Features && Features.render) {
        featuresContainer.innerHTML = Features.render();
    }

    const contactsContainer = document.getElementById('contacts-container');
    if (contactsContainer && Contacts && Contacts.render) {
        contactsContainer.innerHTML = Contacts.render();
    }

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && Footer && Footer.render) {
        footerContainer.innerHTML = Footer.render();
    }

    loadFavorites();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});