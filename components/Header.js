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
        const countElIcon = document.querySelector('.header-favorite-count-icon-only');
        if (countEl) {
            if (count > 0) {
                countEl.textContent = count;
                countEl.style.display = 'flex';
            } else {
                countEl.style.display = 'none';
            }
        }
        if (countElIcon) {
            if (count > 0) {
                countElIcon.textContent = count;
                countElIcon.style.display = 'flex';
            } else {
                countElIcon.style.display = 'none';
            }
        }
    },

    render() {
        const isCatalog = this.currentPage === 'catalog';

        const favoriteButton = isCatalog
            ? `<button id="favoritesBtn" class="header-favorite-btn-icon-only">
                    <span>❤️</span>
                    <span class="header-favorite-count-icon-only" style="display: none;">0</span>
               </button>`
            : '';

        const burgerMenu = `
            <button class="header-burger" id="burgerMenuBtn">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div class="menu-overlay" id="menuOverlay"></div>
            <div class="header-mobile-menu" id="mobileMenu">
                <div class="mobile-menu-header">
                    <span class="mobile-menu-logo">🌾 Глиняный сад</span>
                    <button class="mobile-menu-close" id="mobileMenuClose">✕</button>
                </div>
                <nav class="mobile-nav">
                    <a href="index.html" class="mobile-nav-link ${this.currentPage === 'index' ? 'active' : ''}">Главная</a>
                    <a href="catalog.html" class="mobile-nav-link ${this.currentPage === 'catalog' ? 'active' : ''}">Каталог</a>
                    <a href="index.html#masterclasses" class="mobile-nav-link">Мастер-классы</a>
                    <a href="index.html#blog" class="mobile-nav-link">Блог</a>
                    <a href="index.html#contacts" class="mobile-nav-link">Контакты</a>
                </nav>
            </div>
        `;

        return `
            <header class="main-header">
                <div class="container">
                    <div class="header-content">
                        <div class="header-left">
                            ${burgerMenu}
                            <a href="index.html" class="header-logo">
                                <span class="header-logo-icon">🌾</span>
                                <div>
                                    <h1 class="header-logo-title">Глиняный сад</h1>
                                    <p class="header-logo-subtitle">творческая студия</p>
                                </div>
                            </a>
                        </div>
                        
                        <nav class="header-nav">
                            <a href="index.html" class="header-nav-link ${this.currentPage === 'index' ? 'active' : ''}">Главная</a>
                            <a href="catalog.html" class="header-nav-link ${this.currentPage === 'catalog' ? 'active' : ''}">Каталог</a>
                            <a href="index.html#masterclasses" class="header-nav-link">Мастер-классы</a>
                            <a href="index.html#blog" class="header-nav-link">Блог</a>
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

        const burgerBtn = document.getElementById('burgerMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const menuClose = document.getElementById('mobileMenuClose');
        const menuOverlay = document.getElementById('menuOverlay');

        const openMenu = () => {
            if (mobileMenu) mobileMenu.classList.add('open');
            if (menuOverlay) menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            if (mobileMenu) mobileMenu.classList.remove('open');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (burgerBtn) {
            burgerBtn.removeEventListener('click', openMenu);
            burgerBtn.addEventListener('click', openMenu);
        }

        if (menuClose) {
            menuClose.removeEventListener('click', closeMenu);
            menuClose.addEventListener('click', closeMenu);
        }

        if (menuOverlay) {
            menuOverlay.removeEventListener('click', closeMenu);
            menuOverlay.addEventListener('click', closeMenu);
        }
    }
};