// Главная страница — сборщик компонентов
document.addEventListener('DOMContentLoaded', () => {
    // Состояние для избранного на главной странице
    let favorites = [];

    // Загрузка избранного из localStorage
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
        // Обновляем отображение сердечка в модалке, если она открыта
        if (ProductModal && ProductModal.product && ProductModal.product.id === productId) {
            ProductModal.setData(ProductModal.product, favorites);
            ProductModal.rerender();
        }
    }

    function isFavorite(productId) {
        return favorites.includes(productId);
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

    // Рендер ProductsSection (8 товаров)
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

    // Рендер Masterclasses (обновлённые данные)
    const masterclassesContainer = document.getElementById('masterclasses-container');
    if (masterclassesContainer && Masterclasses && Masterclasses.render) {
        // Передаём данные мастер-классов (они будут обновлены внутри компонента)
        Masterclasses.setData(masterClassesData);
        masterclassesContainer.innerHTML = Masterclasses.render();
        Masterclasses.bindEvents();
    }

    // Рендер Blog (новый блок)
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer && Blog && Blog.render) {
        // Проверяем, что BlogData существует
        if (typeof BlogData !== 'undefined') {
            Blog.setData(BlogData);
            blogContainer.innerHTML = Blog.render();
            Blog.bindEvents();
        } else {
            console.warn('BlogData не загружен');
            blogContainer.innerHTML = '<div class="container" style="padding: 60px 0; text-align: center;"><p>Загрузка статей...</p></div>';
        }
    }

    // Рендер About
    const aboutContainer = document.getElementById('about-container');
    if (aboutContainer && About && About.render) {
        aboutContainer.innerHTML = About.render();
    }

    // Рендер Features
  

    // Рендер Process (блок о процессе создания)
    const processContainer = document.getElementById('process-container');
    if (processContainer && Process && Process.render) {
        processContainer.innerHTML = Process.render();
    }
   

    // Рендер Footer
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && Footer && Footer.render) {
        footerContainer.innerHTML = Footer.render();
    }

    // Загрузка избранного
    loadFavorites();

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