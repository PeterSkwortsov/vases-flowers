// Главная страница — сборщик компонентов
document.addEventListener('DOMContentLoaded', () => {
    // Настройка Header
    if (Header && Header.setCurrentPage) {
        Header.setCurrentPage('index');
    }

    // Рендер Header
    const headerContainer = document.getElementById('header-container');
    if (headerContainer && Header && Header.render) {
        headerContainer.innerHTML = Header.render();
        if (Header.bindEvents) Header.bindEvents();
    }

    // Рендер Hero
    const heroContainer = document.getElementById('hero-container');
    if (heroContainer && Hero && Hero.render) {
        heroContainer.innerHTML = Hero.render();
    }

    // Рендер Categories
    const categoriesContainer = document.getElementById('categories-container');
    if (categoriesContainer && Categories && Categories.render) {
        categoriesContainer.innerHTML = Categories.render();

        // Настройка сторис при клике на категорию
        Categories.setOnCategoryClick((category) => {
            StoriesModal.setStories(category);
            StoriesModal.show();
        });

        Categories.bindEvents();
    }

    // Рендер ProductsSection (8 товаров)
    const productsContainer = document.getElementById('products-container');
    if (productsContainer && ProductsSection && ProductsSection.render) {
        ProductsSection.setData(productsData);
        ProductsSection.setOnProductClick((productId) => {
            alert(`Товар ${productId} выбран. Страница товара в разработке`);
        });
        productsContainer.innerHTML = ProductsSection.render();
        ProductsSection.bindEvents();
    }

    // Рендер Masterclasses
    const masterclassesContainer = document.getElementById('masterclasses-container');
    if (masterclassesContainer && Masterclasses && Masterclasses.render) {
        Masterclasses.setData(masterClassesData);
        masterclassesContainer.innerHTML = Masterclasses.render();
        Masterclasses.bindEvents();
    }

    // Рендер About
    const aboutContainer = document.getElementById('about-container');
    if (aboutContainer && About && About.render) {
        aboutContainer.innerHTML = About.render();
    }

    // Рендер Features
    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer && Features && Features.render) {
        featuresContainer.innerHTML = Features.render();
    }

    // Рендер Contacts
    const contactsContainer = document.getElementById('contacts-container');
    if (contactsContainer && Contacts && Contacts.render) {
        contactsContainer.innerHTML = Contacts.render();
    }

    // Рендер Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && Footer && Footer.render) {
        footerContainer.innerHTML = Footer.render();
    }

    // Плавная прокрутка
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