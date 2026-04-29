// ar-preview/ar-button.js
// Добавление кнопки AR в карточки товаров
const ARButton = {
    addToProductCards() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            // Проверяем, есть ли уже кнопка
            if (card.querySelector('.ar-card-btn')) return;

            const imageWrapper = card.querySelector('.product-image-wrapper');
            if (!imageWrapper) return;

            const btn = document.createElement('button');
            btn.className = 'ar-card-btn';
            btn.innerHTML = '📷';
            btn.title = 'Примерка в интерьере';

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = parseInt(card.dataset.id);
                const product = productsData.find(p => p.id === productId);
                if (product && ARPreview) {
                    ARPreview.selectProduct(product);
                    ARPreview.show();
                }
            });

            imageWrapper.appendChild(btn);
        });
    },

    addToCatalogCards() {
        // Для страницы каталога с динамической загрузкой
        const observer = new MutationObserver(() => {
            const cards = document.querySelectorAll('.product-card:not(.has-ar-btn)');
            cards.forEach(card => {
                card.classList.add('has-ar-btn');
                const imageWrapper = card.querySelector('.product-image-wrapper');
                if (!imageWrapper) return;

                if (!card.querySelector('.ar-card-btn')) {
                    const btn = document.createElement('button');
                    btn.className = 'ar-card-btn';
                    btn.innerHTML = '📷';
                    btn.title = 'Примерка в интерьере';

                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const productId = parseInt(card.dataset.id);
                        const product = productsData.find(p => p.id === productId);
                        if (product && ARPreview) {
                            ARPreview.selectProduct(product);
                            ARPreview.show();
                        }
                    });

                    imageWrapper.appendChild(btn);
                }
            });
        });

        observer.observe(document.getElementById('products-container'), {
            childList: true,
            subtree: true
        });
    }
};