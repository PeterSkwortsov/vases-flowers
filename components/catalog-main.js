// Страница каталога — сборщик компонентов
document.addEventListener('DOMContentLoaded', () => {
    // Состояние
    let favorites = [];
    let filteredProducts = [];
    let currentFilters = { sortBy: 'default', selectedPackaging: 'all' };

    // Загрузка избранного из localStorage
    function loadFavorites() {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            favorites = JSON.parse(saved);
        }
        if (Header && Header.updateFavoritesCount) {
            Header.updateFavoritesCount(favorites.length);
        }
        applyFiltersAndRender();
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (Header && Header.updateFavoritesCount) {
            Header.updateFavoritesCount(favorites.length);
        }
        if (FavoritesModal) {
            FavoritesModal.setData(productsData, favorites);
        }
        applyFiltersAndRender();
    }

    function toggleFavorite(productId) {
        const index = favorites.indexOf(productId);
        if (index === -1) {
            favorites.push(productId);
        } else {
            favorites.splice(index, 1);
        }
        saveFavorites();
    }

    function isFavorite(productId) {
        return favorites.includes(productId);
    }

    // Фильтрация и сортировка
    function applyFiltersAndRender() {
        let filtered = [...productsData];

        if (currentFilters.selectedPackaging !== 'all') {
            filtered = filtered.filter(p => p.packaging === currentFilters.selectedPackaging);
        }

        if (currentFilters.sortBy === 'cheap') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (currentFilters.sortBy === 'expensive') {
            filtered.sort((a, b) => b.price - a.price);
        } else {
            filtered.sort((a, b) => a.id - b.id);
        }

        filteredProducts = filtered;

        if (Filters && Filters.updateResultsCount) {
            Filters.updateResultsCount(filtered.length);
        }

        if (ProductCard) {
            ProductCard.setData(filteredProducts, favorites);
            const productsContainer = document.getElementById('products-container');
            if (productsContainer) {
                if (filtered.length === 0) {
                    productsContainer.innerHTML = ProductCard.renderEmpty(() => {
                        currentFilters = { sortBy: 'default', selectedPackaging: 'all' };
                        if (Filters) {
                            Filters.sortBy = 'default';
                            Filters.selectedPackaging = 'all';
                            Filters.rerender();
                        }
                        applyFiltersAndRender();
                    });
                    const resetBtn = document.getElementById('resetFiltersBtn');
                    if (resetBtn) {
                        resetBtn.addEventListener('click', () => {
                            currentFilters = { sortBy: 'default', selectedPackaging: 'all' };
                            if (Filters) {
                                Filters.sortBy = 'default';
                                Filters.selectedPackaging = 'all';
                                Filters.rerender();
                            }
                            applyFiltersAndRender();
                        });
                    }
                } else {
                    productsContainer.innerHTML = ProductCard.render();
                    ProductCard.bindEvents();
                }
            }
        }
    }

    // Обработчики событий
    function onFilterChange(newState) {
        currentFilters = newState;
        applyFiltersAndRender();
    }

    function onProductClick(productId) {
        const product = productsData.find(p => p.id === productId);
        if (product && ProductModal) {
            ProductModal.setData(product, favorites);
            ProductModal.show();
        }
    }

    function onFavoriteToggle(productId) {
        toggleFavorite(productId);
        ProductCard.setData(filteredProducts, favorites);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            if (filteredProducts.length === 0) {
                productsContainer.innerHTML = ProductCard.renderEmpty();
            } else {
                productsContainer.innerHTML = ProductCard.render();
                ProductCard.bindEvents();
            }
        }
        if (ProductModal && ProductModal.product && ProductModal.product.id === productId) {
            ProductModal.setData(ProductModal.product, favorites);
            ProductModal.rerender();
        }
    }

    function onModalFavoriteToggle(productId) {
        toggleFavorite(productId);
        if (ProductModal && ProductModal.product) {
            ProductModal.setData(ProductModal.product, favorites);
            ProductModal.rerender();
        }
        ProductCard.setData(filteredProducts, favorites);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            if (filteredProducts.length === 0) {
                productsContainer.innerHTML = ProductCard.renderEmpty();
            } else {
                productsContainer.innerHTML = ProductCard.render();
                ProductCard.bindEvents();
            }
        }
    }

    function onModalBuy(product) {
        alert(`Товар "${product.name}" добавлен в корзину!`);
        if (ProductModal) ProductModal.hide();
    }

    function onModalClose() {
        if (ProductModal) ProductModal.hide();
    }

    function onFavoritesOpen() {
        if (FavoritesModal) {
            FavoritesModal.setData(productsData, favorites);
            FavoritesModal.show();
        }
    }

    function onFavoritesClose() {
        if (FavoritesModal) FavoritesModal.hide();
    }

    function onFavoritesProductClick(productId) {
        onProductClick(productId);
    }

    function onFavoritesRemove(productId) {
        toggleFavorite(productId);
        if (FavoritesModal) {
            FavoritesModal.setData(productsData, favorites);
            FavoritesModal.rerender();
        }
        ProductCard.setData(filteredProducts, favorites);
        const productsContainer = document.getElementById('products-container');
        if (productsContainer) {
            if (filteredProducts.length === 0) {
                productsContainer.innerHTML = ProductCard.renderEmpty();
            } else {
                productsContainer.innerHTML = ProductCard.render();
                ProductCard.bindEvents();
            }
        }
    }

    // Настройка компонентов
    if (Header) {
        Header.setCurrentPage('catalog');
        Header.setOnFavoriteClick(onFavoritesOpen);
    }

    if (Filters) {
        Filters.setOnFilterChange(onFilterChange);
    }

    if (ProductCard) {
        ProductCard.setOnProductClick(onProductClick);
        ProductCard.setOnFavoriteToggle(onFavoriteToggle);
        ProductCard.setOnFilterReset(() => {
            currentFilters = { sortBy: 'default', selectedPackaging: 'all' };
            if (Filters) {
                Filters.sortBy = 'default';
                Filters.selectedPackaging = 'all';
                Filters.rerender();
            }
            applyFiltersAndRender();
        });
    }

    if (ProductModal) {
        ProductModal.setOnClose(onModalClose);
        ProductModal.setOnFavoriteToggle(onModalFavoriteToggle);
        ProductModal.setOnBuy(onModalBuy);
    }

    if (FavoritesModal) {
        FavoritesModal.setOnClose(onFavoritesClose);
        FavoritesModal.setOnProductClick(onFavoritesProductClick);
        FavoritesModal.setOnRemoveFavorite(onFavoritesRemove);
    }

    // Рендер
    const headerContainer = document.getElementById('header-container');
    if (headerContainer && Header && Header.render) {
        headerContainer.innerHTML = Header.render();
        if (Header.bindEvents) Header.bindEvents();
    }

    const heroContainer = document.getElementById('hero-container');
    if (heroContainer && CatalogHero && CatalogHero.render) {
        heroContainer.innerHTML = CatalogHero.render();
    }

    const filtersContainer = document.getElementById('filters-container');
    if (filtersContainer && Filters && Filters.render) {
        filtersContainer.innerHTML = Filters.render();
        if (Filters.bindEvents) Filters.bindEvents();
        currentFilters = Filters.getState();
    }

    const productsContainer = document.getElementById('products-container');
    if (productsContainer && ProductCard) {
        ProductCard.setData(productsData, favorites);
        productsContainer.innerHTML = '<div class="container"><div class="products-grid"><div class="empty-state"><div class="empty-icon">🌿</div><h3 class="empty-title">Загрузка...</h3></div></div></div>';
    }

    const featuresContainer = document.getElementById('features-container');
    if (featuresContainer && Features && Features.render) {
        featuresContainer.innerHTML = Features.render();
    }

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && Footer && Footer.render) {
        footerContainer.innerHTML = Footer.render();
    }

    // Загрузка избранного и применение фильтров
    loadFavorites();

    // Закрытие модалок по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (ProductModal) ProductModal.hide();
            if (FavoritesModal) FavoritesModal.hide();
        }
    });
});