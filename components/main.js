// Главная страница — сборщик компонентов
document.addEventListener('DOMContentLoaded', () => {
    // Состояние для избранного на главной странице
    let favorites = [];

    // Функция для обновления ARPreview (если компонент загружен)
    function updateARPreview() {
        if (typeof ARPreview !== 'undefined' && ARPreview && ARPreview.updateFavorites) {
            ARPreview.updateFavorites(favorites, productsData);
        }
    }

    // Загрузка избранного из localStorage
    function loadFavorites() {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            favorites = JSON.parse(saved);
        }
        updateARPreview();
        updateFavoritesUI();
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateARPreview();
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

        Categories.setOnCategoryClick((category, config) => {
            StoriesModal.setStories(category, config);
            StoriesModal.show();
        });

        Categories.bindEvents();
    }

    // Настройка ProductModal
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

    // Рендер Process (блок о процессе создания)
    const processContainer = document.getElementById('process-container');
    if (processContainer && Process && Process.render) {
        processContainer.innerHTML = Process.render();
    }

    // Рендер ProductsSection (товары)
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

        // Добавляем обработчик для ARPreview из карточек товаров
        ProductsSection.setOnARPreview((product) => {
            if (typeof ARPreview !== 'undefined' && ARPreview) {
                updateARPreview();
                ARPreview.selectProduct(product);
                ARPreview.show();
            }
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

    // Рендер Blog
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer && Blog && Blog.render) {
        if (typeof BlogData !== 'undefined') {
            Blog.setData(BlogData);
            blogContainer.innerHTML = Blog.render();
            Blog.bindEvents();
        }
    }

    // Рендер About
    const aboutContainer = document.getElementById('about-container');
    if (aboutContainer && About && About.render) {
        aboutContainer.innerHTML = About.render();
    }

    // Рендер Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && Footer && Footer.render) {
        footerContainer.innerHTML = Footer.render();
    }

    // ARPreview настройка
    if (typeof ARPreview !== 'undefined' && ARPreview) {
        ARPreview.setOnClose(() => {
            // Ничего дополнительного не делаем
        });
    }

    // Загрузка избранного
    loadFavorites();

    // Закрытие модалок по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (ProductModal) ProductModal.hide();
            if (StoriesModal) StoriesModal.hide();
            if (typeof ARPreview !== 'undefined' && ARPreview) ARPreview.hide();
        }
    });

    // Плавная прокрутка для якорных ссылок
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