const ProductCard = {
    products: [],
    favorites: [],
    onProductClick: null,
    onFavoriteToggle: null,
    onARPreview: null,

    setData(products, favorites) {
        this.products = products;
        this.favorites = favorites;
    },

    setOnProductClick(callback) {
        this.onProductClick = callback;
    },

    setOnFavoriteToggle(callback) {
        this.onFavoriteToggle = callback;
    },

    setOnARPreview(callback) {
        this.onARPreview = callback;
    },

    render() {
        if (!this.products.length) {
            return `<div class="container"><div class="products-grid"></div></div>`;
        }

        const productsHtml = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-wrapper">
                    <img src="${product.images[0]}" 
                         alt="${product.name}" 
                         class="product-image" 
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                    <button class="product-favorite-btn" data-id="${product.id}">
                        ${this.favorites.includes(product.id) ? '❤️' : '🤍'}
                    </button>
                    <!-- Кнопка AR Preview -->
                    <button class="ar-preview-btn" data-id="${product.id}" data-image="${product.images[0]}" data-name="${product.name}" title="Примерка в интерьере">📷</button>
                    <div class="product-badge">${product.category}</div>
                    <div class="product-packaging">
                        <span>${product.packagingIcon}</span>
                        <span>${product.packagingName}</span>
                    </div>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description.substring(0, 80)}${product.description.length > 80 ? '...' : ''}</p>
                    <div class="product-footer">
                        <div class="product-price">${product.price.toLocaleString()} <span>₽</span></div>
                        <button class="detail-btn" data-id="${product.id}">Подробнее</button>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <div class="container">
                <div class="products-grid" id="productsGrid">
                    ${productsHtml}
                </div>
            </div>
        `;
    },

    renderEmpty(resetCallback) {
        this.onFilterReset = resetCallback;
        return `
            <div class="container">
                <div class="products-grid">
                    <div class="empty-state">
                        <div class="empty-icon">🌿</div>
                        <h3 class="empty-title">Ничего не найдено</h3>
                        <p class="empty-text">Попробуйте изменить параметры фильтрации</p>
                        <button id="resetFiltersBtn" class="reset-btn">Сбросить фильтры</button>
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        // Кнопки подробнее
        const detailBtns = document.querySelectorAll('.detail-btn');
        detailBtns.forEach(btn => {
            btn.removeEventListener('click', this._handleDetailClick);
            this._handleDetailClick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                if (this.onProductClick) this.onProductClick(id);
            };
            btn.addEventListener('click', this._handleDetailClick);
        });

        // Карточки товаров
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.removeEventListener('click', this._handleCardClick);
            this._handleCardClick = (e) => {
                if (e.target.classList.contains('detail-btn') ||
                    e.target.classList.contains('product-favorite-btn') ||
                    e.target.classList.contains('ar-preview-btn') ||
                    e.target.parentElement?.classList?.contains('product-favorite-btn') ||
                    e.target.parentElement?.classList?.contains('ar-preview-btn')) {
                    return;
                }
                const id = parseInt(card.dataset.id);
                if (this.onProductClick) this.onProductClick(id);
            };
            card.addEventListener('click', this._handleCardClick);
        });

        // Кнопки избранного
        const favBtns = document.querySelectorAll('.product-favorite-btn');
        favBtns.forEach(btn => {
            btn.removeEventListener('click', this._handleFavoriteClick);
            this._handleFavoriteClick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                if (this.onFavoriteToggle) this.onFavoriteToggle(id);
                // Обновляем иконку сразу
                if (this.favorites.includes(id)) {
                    btn.innerHTML = '🤍';
                } else {
                    btn.innerHTML = '❤️';
                }
            };
            btn.addEventListener('click', this._handleFavoriteClick);
        });

        // Кнопки AR Preview
        const arBtns = document.querySelectorAll('.ar-preview-btn');
        arBtns.forEach(btn => {
            btn.removeEventListener('click', this._handleARClick);
            this._handleARClick = (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                const product = this.products.find(p => p.id === id);
                if (product && this.onARPreview) {
                    this.onARPreview(product);
                }
            };
            btn.addEventListener('click', this._handleARClick);
        });
    },

    updateProducts(products, favorites) {
        this.products = products;
        this.favorites = favorites;
        const container = document.getElementById('products-container');
        if (container) {
            if (products.length === 0) {
                container.innerHTML = this.renderEmpty();
                const resetBtn = document.getElementById('resetFiltersBtn');
                if (resetBtn && this.onFilterReset) {
                    resetBtn.addEventListener('click', () => {
                        if (this.onFilterReset) this.onFilterReset();
                    });
                }
            } else {
                container.innerHTML = this.render();
                this.bindEvents();
            }
        }
    },

    setOnFilterReset(callback) {
        this.onFilterReset = callback;
    }
};