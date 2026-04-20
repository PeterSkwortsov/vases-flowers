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

        const hasMultipleImages = this.product.images.length > 1;
        const thumbnailsHtml = hasMultipleImages ? this.product.images.map((img, idx) => `
            <div class="modal-thumb ${idx === this.currentPhotoIndex ? 'active' : ''}" data-index="${idx}">
                <img src="${img}" alt="Фото ${idx + 1}">
            </div>
        `).join('') : '';

        return `
            <div class="product-modal" id="productModal">
                <div class="product-modal-content">
                    <button class="modal-close-btn" id="modalCloseBtn">✕</button>
                    <button class="modal-favorite-btn" id="modalFavoriteBtn">
                        ${this.isFavorite() ? '❤️' : '🤍'}
                    </button>
                    
                    <div class="modal-grid">
                        <div class="modal-gallery">
                            <div class="modal-main-image">
                                <img id="modalMainImage" src="${this.product.images[this.currentPhotoIndex]}" alt="${this.product.name}" onerror="this.src='https://placehold.co/600x600/e8f5e9/2e7d32?text=🌾'">
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
        const closeBtn = document.getElementById('modalCloseBtn');
        const favBtn = document.getElementById('modalFavoriteBtn');
        const buyBtn = document.getElementById('modalBuyBtn');
        const modal = document.getElementById('productModal');
        const thumbnails = document.querySelectorAll('.modal-thumb');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                if (this.onClose) this.onClose();
            });
        }

        if (favBtn) {
            favBtn.addEventListener('click', () => {
                if (this.onFavoriteToggle && this.product) {
                    this.onFavoriteToggle(this.product.id);
                }
            });
        }

        if (buyBtn) {
            buyBtn.addEventListener('click', () => {
                if (this.onBuy && this.product) {
                    this.onBuy(this.product);
                }
            });
        }

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                this.currentPhotoIndex = parseInt(thumb.dataset.index);
                this.updateMainImage();
                this.updateActiveThumb();
            });
        });

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal && this.onClose) {
                    this.onClose();
                }
            });
        }
    },

    updateMainImage() {
        const mainImage = document.getElementById('modalMainImage');
        if (mainImage && this.product) {
            mainImage.src = this.product.images[this.currentPhotoIndex];
        }
    },

    updateActiveThumb() {
        const thumbnails = document.querySelectorAll('.modal-thumb');
        thumbnails.forEach((thumb, idx) => {
            if (idx === this.currentPhotoIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
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
    },

    rerender() {
        const container = document.getElementById('product-modal-container');
        if (container && container.innerHTML !== '') {
            const wasVisible = container.innerHTML !== '';
            if (wasVisible) {
                const scrollPosition = window.scrollY;
                container.innerHTML = this.render();
                this.bindEvents();
                window.scrollTo(0, scrollPosition);
            }
        }
    }
};