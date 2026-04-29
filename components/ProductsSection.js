const ProductsSection = {
    products: [],
    onProductClick: null,
    onARPreview: null,

    setData(products) {
        this.products = products.slice(0, 8);
    },

    setOnProductClick(callback) {
        this.onProductClick = callback;
    },

    setOnARPreview(callback) {
        this.onARPreview = callback;
    },

    render() {
        if (!this.products.length) return '<div></div>';

        const productsHtml = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="product-image-wrapper">
                    <img src="${product.images[0] || 'images/placeholder.jpg'}" 
                         alt="${product.name}" 
                         class="product-image" 
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                    <div class="product-badge">${product.category}</div>
                    <div class="product-packaging">
                        <span>${product.packagingIcon}</span>
                        <span>${product.packagingName}</span>
                    </div>
                    <!-- Кнопка AR Preview -->
                    <button class="ar-preview-btn" data-id="${product.id}" title="Примерка в интерьере">📷</button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description.substring(0, 70)}...</p>
                    <div class="product-footer">
                        <div class="product-price">${product.price} <span>₽</span></div>
                        <button class="product-detail-btn" data-id="${product.id}">Подробнее</button>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <section class="products-section" id="products">
                <div class="container">
                    <div class="section-header">
                        <span class="section-tag">Коллекция</span>
                        <h2 class="section-title">Готовые композиции</h2>
                        <div class="section-divider"></div>
                        <p class="section-subtitle">Каждый букет создан вручную из натуральных материалов</p>
                    </div>
                    
                    <div class="products-scroll-container">
                        <button class="scroll-btn scroll-left" id="scrollLeftBtn">‹</button>
                        <button class="scroll-btn scroll-right" id="scrollRightBtn">›</button>
                        <div class="products-scroll" id="productsScroll">
                            ${productsHtml}
                        </div>
                    </div>
                    
                    <div class="view-all-wrapper">
                        <a href="catalog.html" class="btn-view-all">
                            <span>🌿</span>
                            <span>Смотреть все товары</span>
                            <span>→</span>
                        </a>
                    </div>
                </div>
            </section>
        `;
    },

    bindEvents() {
        const scrollContainer = document.getElementById('productsScroll');
        const leftBtn = document.getElementById('scrollLeftBtn');
        const rightBtn = document.getElementById('scrollRightBtn');

        if (leftBtn) {
            leftBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
            });
        }

        if (rightBtn) {
            rightBtn.addEventListener('click', () => {
                scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
            });
        }

        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('product-detail-btn')) {
                    const id = parseInt(e.target.dataset.id);
                    if (this.onProductClick) this.onProductClick(id);
                } else if (e.target.classList.contains('ar-preview-btn')) {
                    e.stopPropagation();
                    const id = parseInt(e.target.dataset.id);
                    const product = this.products.find(p => p.id === id);
                    if (product && this.onARPreview) {
                        this.onARPreview(product);
                    }
                } else {
                    const id = parseInt(card.dataset.id);
                    if (this.onProductClick) this.onProductClick(id);
                }
            });
        });
    }
};