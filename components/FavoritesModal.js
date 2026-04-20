const FavoritesModal = {
    products: [],
    favorites: [],
    onClose: null,
    onProductClick: null,
    onRemoveFavorite: null,

    setData(products, favorites) {
        this.products = products;
        this.favorites = favorites;
    },

    setOnClose(callback) {
        this.onClose = callback;
    },

    setOnProductClick(callback) {
        this.onProductClick = callback;
    },

    setOnRemoveFavorite(callback) {
        this.onRemoveFavorite = callback;
    },

    getFavoriteProducts() {
        return this.products.filter(p => this.favorites.includes(p.id));
    },

    getDeclension(n) {
        const words = ['товар', 'товара', 'товаров'];
        const cases = [2, 0, 1, 1, 1, 2];
        return words[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
    },

    render() {
        const favoriteProducts = this.getFavoriteProducts();

        if (favoriteProducts.length === 0) {
            return `
                <div class="favorites-modal" id="favoritesModal">
                    <div class="favorites-modal-content">
                        <div class="favorites-header">
                            <div>
                                <h2 class="favorites-title">Избранное</h2>
                                <p class="favorites-count">0 товаров</p>
                            </div>
                            <button class="favorites-close" id="closeFavoritesModal">✕</button>
                        </div>
                        <div class="favorites-list">
                            <div class="favorite-empty">
                                <div class="favorite-empty-icon">💔</div>
                                <h3 class="favorite-empty-title">Избранное пусто</h3>
                                <p class="favorite-empty-text">Добавляйте понравившиеся товары, нажимая на сердечко</p>
                                <button class="favorite-empty-btn" id="closeEmptyFavorites">Перейти в каталог</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        const itemsHtml = favoriteProducts.map(product => `
            <div class="favorite-item" data-id="${product.id}">
                <div class="favorite-item-image">
                    <img src="${product.images[0]}" alt="${product.name}" onerror="this.src='https://placehold.co/200x200/e8f5e9/2e7d32?text=🌾'">
                </div>
                <div class="favorite-item-info">
                    <h3 class="favorite-item-name">${product.name}</h3>
                    <p class="favorite-item-desc">${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}</p>
                    <div class="favorite-item-tags">
                        <span class="favorite-item-tag">${product.category}</span>
                        <span class="favorite-item-tag">${product.packagingName}</span>
                    </div>
                    <div class="favorite-item-footer">
                        <span class="favorite-item-price">${product.price.toLocaleString()} ₽</span>
                        <div class="favorite-item-actions">
                            <button class="favorite-detail-btn" data-id="${product.id}">Подробнее</button>
                            <button class="favorite-remove-btn" data-id="${product.id}">Удалить</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="favorites-modal" id="favoritesModal">
                <div class="favorites-modal-content">
                    <div class="favorites-header">
                        <div>
                            <h2 class="favorites-title">Избранное</h2>
                            <p class="favorites-count">${favoriteProducts.length} ${this.getDeclension(favoriteProducts.length)}</p>
                        </div>
                        <button class="favorites-close" id="closeFavoritesModal">✕</button>
                    </div>
                    <div class="favorites-list">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        const closeBtn = document.getElementById('closeFavoritesModal');
        const modal = document.getElementById('favoritesModal');
        const emptyCloseBtn = document.getElementById('closeEmptyFavorites');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (this.onClose) this.onClose();
            });
        }

        if (emptyCloseBtn) {
            emptyCloseBtn.addEventListener('click', () => {
                if (this.onClose) this.onClose();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal && this.onClose) {
                    this.onClose();
                }
            });
        }

        const detailBtns = document.querySelectorAll('.favorite-detail-btn');
        detailBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (this.onProductClick) {
                    this.hide();
                    this.onProductClick(id);
                }
            });
        });

        const removeBtns = document.querySelectorAll('.favorite-remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                if (this.onRemoveFavorite) {
                    this.onRemoveFavorite(id);
                    this.rerender();
                }
            });
        });
    },

    show() {
        const container = document.getElementById('favorites-modal-container');
        if (container) {
            container.innerHTML = this.render();
            this.bindEvents();
            document.body.classList.add('no-scroll');
        }
    },

    hide() {
        const container = document.getElementById('favorites-modal-container');
        if (container) {
            container.innerHTML = '';
            document.body.classList.remove('no-scroll');
        }
    },

    rerender() {
        const container = document.getElementById('favorites-modal-container');
        if (container && container.innerHTML !== '') {
            const scrollPosition = window.scrollY;
            container.innerHTML = this.render();
            this.bindEvents();
            window.scrollTo(0, scrollPosition);
        }
    }
};