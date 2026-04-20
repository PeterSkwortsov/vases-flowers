// Данные (в реальном проекте загружаются из products.json)
const productsData = [
    {
        id: 1,
        name: "Лавандовое поле",
        price: 2900,
        images: [
            "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=800&h=1000&fit=crop",
            "https://images.pexels.com/photos/1142820/pexels-photo-1142820.jpeg?w=800&h=1000&fit=crop",
            "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?w=800&h=1000&fit=crop"
        ],
        category: "Букеты",
        packaging: "kraft",
        packagingName: "Крафт упаковка",
        packagingIcon: "📜",
        description: "Ароматная лаванда в сочетании с полевыми травами создаёт атмосферу прованса. В композиции использованы: лаванда, статица, гипсофила, хлопок.",
        sizes: "Высота: 45-50 см, Ширина: 30-35 см",
        composition: "Лаванда, статица, гипсофила, хлопок, декоративная зелень",
        care: "Беречь от прямых солнечных лучей, не поливать, при необходимости сдувать пыль феном на холодном режиме"
    },
    {
        id: 2,
        name: "Осенний вальс",
        price: 3500,
        images: [
            "https://images.pexels.com/photos/1142820/pexels-photo-1142820.jpeg?w=800&h=1000&fit=crop",
            "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?w=800&h=1000&fit=crop",
            "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?w=800&h=1000&fit=crop"
        ],
        category: "Композиции",
        packaging: "vase",
        packagingName: "В кашпо",
        packagingIcon: "🏺",
        description: "Тёплые оттенки осени в изящной композиции. Идеально подходит для создания уюта в доме.",
        sizes: "Высота: 40-45 см, Ширина: 35-40 см",
        composition: "Гортензия, физалис, лимониум, декоративные ветки",
        care: "Беречь от влаги, размещать вдали от отопительных приборов"
    },
    {
        id: 3,
        name: "Эко-минимализм",
        price: 2700,
        images: [
            "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?w=800&h=1000&fit=crop",
            "https://images.pexels.com/photos/1230323/pexels-photo-1230323.jpeg?w=800&h=1000&fit=crop",
            "https://images.pexels.com/photos/1118419/pexels-photo-1118419.jpeg?w=800&h=1000&fit=crop"
        ],
        category: "Панно",
        packaging: "none",
        packagingName: "Без упаковки",
        packagingIcon: "✨",
        description: "Лаконичная композиция в эко-стиле для ценителей минимализма и натуральных материалов.",
        sizes: "Высота: 35-40 см, Ширина: 25-30 см",
        composition: "Пшеница, пампасная трава, эвкалипт",
        care: "Сухое место, защищённое от прямых солнечных лучей"
    }
];

const masterClassesData = [
    {
        id: 1,
        name: "Живая картина из мха",
        price: 2500,
        duration: "2 часа",
        image: "https://images.pexels.com/photos/1104579/pexels-photo-1104579.jpeg?w=600&h=400&fit=crop",
        description: "Создайте вертикальное панно из стабилизированного мха",
        icon: "🌿"
    },
    {
        id: 2,
        name: "Авторская композиция",
        price: 2800,
        duration: "2.5 часа",
        image: "https://images.pexels.com/photos/776554/pexels-photo-776554.jpeg?w=600&h=400&fit=crop",
        description: "Соберите букет из сухоцветов по своему вкусу",
        icon: "💐"
    },
    {
        id: 3,
        name: "Керамическая ваза",
        price: 2200,
        duration: "2 часа",
        image: "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?w=600&h=400&fit=crop",
        description: "Лепка из глины с последующим обжигом",
        icon: "🏺"
    }
];

// Рендер товаров
function renderProducts() {
    const container = document.getElementById('productsScroll');
    if (!container) return;

    container.innerHTML = productsData.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image-wrapper">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                <div class="product-badge">${product.category}</div>
                <div class="product-packaging">
                    <span>${product.packagingIcon}</span>
                    <span>${product.packagingName}</span>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description.substring(0, 80)}...</p>
                <div class="product-footer">
                    <div class="product-price">
                        ${product.price} <span>₽</span>
                    </div>
                    <button class="product-detail-btn">Подробнее</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Рендер мастер-классов
function renderMasterclasses() {
    const container = document.getElementById('masterclassesGrid');
    if (!container) return;

    container.innerHTML = masterClassesData.map(mc => `
        <div class="masterclass-card">
            <div class="masterclass-image">
                <img src="${mc.image}" alt="${mc.name}">
            </div>
            <div class="masterclass-content">
                <div class="masterclass-icon">${mc.icon}</div>
                <h3 class="masterclass-name">${mc.name}</h3>
                <p class="masterclass-desc">${mc.description}</p>
                <div class="masterclass-meta">
                    <div class="masterclass-duration">
                        <span>⏱</span>
                        <span>${mc.duration}</span>
                    </div>
                    <span class="masterclass-price">${mc.price} ₽</span>
                </div>
                <button class="btn-masterclass" onclick="alert('Запись на мастер-класс: ${mc.name}')">Записаться →</button>
            </div>
        </div>
    `).join('');
}

// Открыть модальное окно
function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    let currentPhotoIndex = 0;

    function renderModalContent() {
        modalBody.innerHTML = `
            <div class="modal-grid">
                <div class="modal-gallery">
                    <div class="modal-main-image">
                        <img src="${product.images[currentPhotoIndex]}" alt="${product.name}" id="modalMainImage">
                    </div>
                    ${product.images.length > 1 ? `
                        <button class="modal-nav-btn modal-nav-left" id="modalPrevBtn" ${currentPhotoIndex === 0 ? 'disabled' : ''}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button class="modal-nav-btn modal-nav-right" id="modalNextBtn" ${currentPhotoIndex === product.images.length - 1 ? 'disabled' : ''}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div class="modal-thumbnails" id="modalThumbnails">
                            ${product.images.map((img, idx) => `
                                <div class="modal-thumb ${idx === currentPhotoIndex ? 'active' : ''}" data-index="${idx}">
                                    <img src="${img}" alt="Фото ${idx + 1}">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="modal-info">
                    <div class="modal-category">
                        <span class="modal-category-badge">${product.category}</span>
                        <span class="modal-packaging-badge">
                            <span>${product.packagingIcon}</span>
                            <span>${product.packagingName}</span>
                        </span>
                    </div>
                    <h2 class="modal-product-name">${product.name}</h2>
                    <div class="modal-product-price">
                        ${product.price} <span>₽</span>
                    </div>
                    <div class="modal-section">
                        <h3 class="modal-section-title">Описание</h3>
                        <p class="modal-section-text">${product.description}</p>
                    </div>
                    <div class="modal-section">
                        <h3 class="modal-section-title">Размеры</h3>
                        <p class="modal-section-text">${product.sizes}</p>
                    </div>
                    <div class="modal-section">
                        <h3 class="modal-section-title">Состав</h3>
                        <p class="modal-section-text">${product.composition}</p>
                    </div>
                    <div class="modal-section">
                        <h3 class="modal-section-title">Уход</h3>
                        <p class="modal-section-text">${product.care}</p>
                    </div>
                    <button class="btn-buy" onclick="alert('Товар "${product.name}" добавлен в корзину!'); closeModal();">Купить сейчас</button>
                    <p class="modal-delivery-note">Доставка по Нижнему Новгороду от 300₽ • Самовывоз бесплатно</p>
                </div>
            </div>
        `;

        // Привязываем события кнопкам навигации
        if (product.images.length > 1) {
            const prevBtn = document.getElementById('modalPrevBtn');
            const nextBtn = document.getElementById('modalNextBtn');
            const thumbnails = document.querySelectorAll('.modal-thumb');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    if (currentPhotoIndex > 0) {
                        currentPhotoIndex--;
                        renderModalContent();
                    }
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    if (currentPhotoIndex < product.images.length - 1) {
                        currentPhotoIndex++;
                        renderModalContent();
                    }
                });
            }

            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', () => {
                    currentPhotoIndex = parseInt(thumb.dataset.index);
                    renderModalContent();
                });
            });
        }
    }

    renderModalContent();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Горизонтальный скролл
function initScrollButtons() {
    const scrollContainer = document.getElementById('productsScroll');
    const leftBtn = document.getElementById('scrollLeftBtn');
    const rightBtn = document.getElementById('scrollRightBtn');

    if (!scrollContainer || !leftBtn || !rightBtn) return;

    leftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
    });

    rightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
    });
}

// Закрытие модалки по клику на оверлей
document.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Инициализация
renderProducts();
renderMasterclasses();
initScrollButtons();


