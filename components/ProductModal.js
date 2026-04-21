const ProductModal = {
    product: null,
    currentPhotoIndex: 0,
    favorites: [],
    onClose: null,
    onFavoriteToggle: null,
    onBuy: null,

    setData(product, favorites) {
        this.product = product;
        this.favorites = favorites;
        this.currentPhotoIndex = 0;
    },

    setOnClose(callback) {
        this.onClose = callback;
    },

    setOnFavoriteToggle(callback) {
        this.onFavoriteToggle = callback;
    },

    setOnBuy(callback) {
        this.onBuy = callback;
    },

    isFavorite() {
        return this.product && this.favorites.includes(this.product.id);
    },

    render() {
        if (!this.product) return '';

        const hasMultipleImages = this.product.images && this.product.images.length > 1;
        const thumbnailsHtml = hasMultipleImages ? this.product.images.map((img, idx) => `
            <div class="modal-thumb ${idx === this.currentPhotoIndex ? 'active' : ''}" data-index="${idx}">
                <img src="${img}" alt="Фото ${idx + 1}" onerror="this.src='https://placehold.co/200x200/e8f5e9/2e7d32?text=🌾'">
            </div>
        `).join('') : '';

        return `
            <div class="product-modal" id="productModal">
                <div class="product-modal-overlay"></div>
                <div class="product-modal-content">
                    <button class="modal-close-btn" id="modalCloseBtn">✕</button>
                    <button class="modal-favorite-btn" id="modalFavoriteBtn">
                        ${this.isFavorite() ? '❤️' : '🤍'}
                    </button>
                    
                    <div class="modal-grid">
                        <div class="modal-gallery">
                            <div class="modal-main-image">
                                <img id="modalMainImage" src="${this.product.images[0]}" alt="${this.product.name}" onerror="this.src='https://placehold.co/600x600/e8f5e9/2e7d32?text=🌾'">
                            </div>
                            ${hasMultipleImages ? `
                                <div class="modal-thumbnails" id="modalThumbnails">
                                    ${thumbnailsHtml}
                                </div>
                            ` : ''}
                        </div>
                        
                        <div class="modal-info">
                            <div class="modal-category">
                                <span class="modal-category-badge">${this.product.category}</span>
                                <span class="modal-packaging-badge">
                                    <span>${this.product.packagingIcon}</span>
                                    <span>${this.product.packagingName}</span>
                                </span>
                            </div>
                            <h2 class="modal-product-name">${this.product.name}</h2>
                            <div class="modal-product-price">${this.product.price.toLocaleString()} <span>₽</span></div>
                            
                            <div class="modal-section">
                                <h3 class="modal-section-title">Описание</h3>
                                <p class="modal-section-text">${this.product.description}</p>
                            </div>
                            <div class="modal-section">
                                <h3 class="modal-section-title">Размеры</h3>
                                <p class="modal-section-text">${this.product.sizes}</p>
                            </div>
                            <div class="modal-section">
                                <h3 class="modal-section-title">Состав</h3>
                                <p class="modal-section-text">${this.product.composition}</p>
                            </div>
                            <div class="modal-section">
                                <h3 class="modal-section-title">Уход</h3>
                                <p class="modal-section-text">${this.product.care}</p>
                            </div>
                            
                            <button class="modal-buy-btn" id="modalBuyBtn">Купить сейчас</button>
                            <p class="modal-delivery-note">Доставка по Нижнему Новгороду от 300₽ • Самовывоз бесплатно</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        const modal = document.getElementById('productModal');
        const closeBtn = document.getElementById('modalCloseBtn');
        const favBtn = document.getElementById('modalFavoriteBtn');
        const buyBtn = document.getElementById('modalBuyBtn');
        const overlay = document.querySelector('.product-modal-overlay');
        const thumbnails = document.querySelectorAll('.modal-thumb');

        // Закрытие по крестику
        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.onClose) this.onClose();
            };
        }

        // Закрытие по оверлею
        if (overlay) {
            overlay.onclick = (e) => {
                e.stopPropagation();
                if (this.onClose) this.onClose();
            };
        }

        // Избранное
        if (favBtn) {
            favBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.onFavoriteToggle && this.product) {
                    this.onFavoriteToggle(this.product.id);
                }
                // Обновляем кнопку
                const btn = document.getElementById('modalFavoriteBtn');
                if (btn) {
                    btn.innerHTML = this.isFavorite() ? '❤️' : '🤍';
                }
            };
        }

        // Купить
        if (buyBtn) {
            buyBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.onBuy && this.product) {
                    this.onBuy(this.product);
                }
            };
        }

        // Переключение фото по миниатюрам
        thumbnails.forEach(thumb => {
            thumb.onclick = (e) => {
                e.stopPropagation();
                this.currentPhotoIndex = parseInt(thumb.dataset.index);
                const mainImage = document.getElementById('modalMainImage');
                if (mainImage && this.product) {
                    mainImage.src = this.product.images[this.currentPhotoIndex];
                }
                // Обновляем активный класс
                thumbnails.forEach((t, idx) => {
                    if (idx === this.currentPhotoIndex) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            };
        });

        // Закрытие по Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape' && this.onClose) {
                this.onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        this._handleEscape = handleEscape;
    },

    show() {
        const container = document.getElementById('product-modal-container');
        if (container) {
            container.innerHTML = this.render();
            this.bindEvents();
            document.body.classList.add('no-scroll');
        }
    },

    hide() {
        const container = document.getElementById('product-modal-container');
        if (container) {
            container.innerHTML = '';
            document.body.classList.remove('no-scroll');
        }
        if (this._handleEscape) {
            document.removeEventListener('keydown', this._handleEscape);
        }
    },

    rerender() {
        const container = document.getElementById('product-modal-container');
        if (container && container.innerHTML !== '') {
            const scrollPosition = window.scrollY;
            container.innerHTML = this.render();
            this.bindEvents();
            window.scrollTo(0, scrollPosition);
        }
    }
};