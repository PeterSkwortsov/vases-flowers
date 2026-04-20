const Header = {
    currentPage: 'index',
    favoritesCount: 0,
    onFavoriteClick: null,

    setCurrentPage(page) {
        this.currentPage = page;
    },

    setOnFavoriteClick(callback) {
        this.onFavoriteClick = callback;
    },

    updateFavoritesCount(count) {
        this.favoritesCount = count;
        const countEl = document.querySelector('.header-favorite-count');
        if (countEl) {
            if (count > 0) {
                countEl.textContent = count;
                countEl.style.display = 'flex';
            } else {
                countEl.style.display = 'none';
            }
        }
    },

    render() {
        // Для страницы каталога показываем кнопку "Назад"
        const backButton = this.currentPage === 'catalog'
            ? `<a href="index.html" class="header-back-btn" title="На главную">←</a>`
            : '';

        // Для страницы каталога показываем кнопку "Избранное"
        const favoriteButton = this.currentPage === 'catalog'
            ? `<button id="favoritesBtn" class="header-favorite-btn">
                    <span>❤️</span>
                    <span>Избранное</span>
                    <span class="header-favorite-count" style="display: none;">0</span>
               </button>`
            : `<button id="cartBtn" class="header-favorite-btn">
                    <span>🛒</span>
                    <span>Корзина</span>
               </button>`;

        return `
            <header class="main-header">
                <div class="container">
                    <div class="header-content">
                        <div class="header-left">
                            ${backButton}
                            <a href="index.html" class="header-logo">
                                <span class="header-logo-icon">🌾</span>
                                <div>
                                    <h1 class="header-logo-title">EverGreen</h1>
                                    <p class="header-logo-subtitle">творческая студия</p>
                                </div>
                            </a>
                        </div>
                        
                        <nav class="header-nav">
                            <a href="index.html" class="header-nav-link ${this.currentPage === 'index' ? 'active' : ''}">Главная</a>
                            <a href="catalog.html" class="header-nav-link ${this.currentPage === 'catalog' ? 'active' : ''}">Каталог</a>
                            <a href="index.html#masterclasses" class="header-nav-link">Мастер-классы</a>
                            <a href="index.html#contacts" class="header-nav-link">Контакты</a>
                        </nav>
                        
                        ${favoriteButton}
                    </div>
                </div>
            </header>
        `;
    },

    bindEvents() {
        const favoritesBtn = document.getElementById('favoritesBtn');
        if (favoritesBtn && this.onFavoriteClick) {
            favoritesBtn.addEventListener('click', this.onFavoriteClick);
        }

        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', () => {
                alert('Корзина в разработке');
            });
        }
    }
};