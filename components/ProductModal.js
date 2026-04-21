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

    openZoom(imageSrc) {
        // Создаём модалку для увеличенного изображения
        const zoomModal = document.createElement('div');
        zoomModal.className = 'zoom-modal';
        zoomModal.innerHTML = `
            <img src="${imageSrc}" alt="Увеличенное изображение" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
            <button class="zoom-close">✕</button>
        `;
        document.body.appendChild(zoomModal);
        document.body.style.overflow = 'hidden';

        // Закрытие по клику
        zoomModal.addEventListener('click', (e) => {
            if (e.target === zoomModal || e.target.classList.contains('zoom-close')) {
                zoomModal.remove();
                document.body.style.overflow = '';
            }
        });

        // Закрытие по Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                zoomModal.remove();
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    },

    render() {
        if (!this.product) return '';

        const hasMultipleImages = this.product.images && this.product.images.length > 1;
        const thumbnailsHtml = hasMultipleImages ? this.product.images.map((img, idx) => `
            <div class="modal-thumb ${idx === this.currentPhotoIndex ? 'active' : ''}" data-index="${idx}">
                <img src="${img}" 
                     alt="Фото ${idx + 1}" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
            </div>
        `).join('') : '';

        const currentImage = this.product.images[this.currentPhotoIndex];

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
                            <div class="modal-main-image" id="modalMainImageContainer">
                                <img id="modalMainImage" 
                                     src="${currentImage}" 
                                     alt="${this.product.name}" 
                                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                                <button class="zoom-btn" id="zoomBtn">🔍</button>
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
        const zoomBtn = document.getElementById('zoomBtn');
        const mainImage = document.getElementById('modalMainImage');

        // Кнопка лупы
        if (zoomBtn && mainImage) {
            zoomBtn.onclick = (e) => {
                e.stopPropagation();
                this.openZoom(mainImage.src);
            };
        }

        // Клик по изображению для увеличения
        if (mainImage) {
            mainImage.onclick = (e) => {
                e.stopPropagation();
                this.openZoom(mainImage.src);
            };
        }

        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.onClose) this.onClose();
            };
        }

        if (overlay) {
            overlay.onclick = (e) => {
                e.stopPropagation();
                if (this.onClose) this.onClose();
            };
        }

        if (favBtn) {
            favBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.onFavoriteToggle && this.product) {
                    this.onFavoriteToggle(this.product.id);
                }
                const btn = document.getElementById('modalFavoriteBtn');
                if (btn) {
                    btn.innerHTML = this.isFavorite() ? '❤️' : '🤍';
                }
            };
        }

        if (buyBtn) {
            buyBtn.onclick = (e) => {
                e.stopPropagation();
                if (this.onBuy && this.product) {
                    this.onBuy(this.product);
                }
            };
        }

        thumbnails.forEach(thumb => {
            thumb.onclick = (e) => {
                e.stopPropagation();
                this.currentPhotoIndex = parseInt(thumb.dataset.index);
                const mainImageEl = document.getElementById('modalMainImage');
                if (mainImageEl && this.product) {
                    mainImageEl.src = this.product.images[this.currentPhotoIndex];
                }
                thumbnails.forEach((t, idx) => {
                    if (idx === this.currentPhotoIndex) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
            };
        });

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