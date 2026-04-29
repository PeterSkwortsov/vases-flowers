// Страница каталога — сборщик компонентов
document.addEventListener('DOMContentLoaded', () => {
    let favorites = [];
    let filteredProducts = [];
    let currentFilters = { sortBy: 'default', selectedPackaging: 'all' };

    // Функция для обновления ARPreview
    function updateARPreview() {
        if (typeof ARPreview !== 'undefined' && ARPreview && ARPreview.updateFavorites) {
            ARPreview.updateFavorites(favorites, productsData);
        }
    }

    function loadFavorites() {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            favorites = JSON.parse(saved);
        }
        updateARPreview();
        if (Header && Header.updateFavoritesCount) {
            Header.updateFavoritesCount(favorites.length);
        }
        applyFiltersAndRender();
    }

    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateARPreview();
        if (Header && Header.updateFavoritesCount) {
            Header.updateFavoritesCount(favorites.length);
        }
        if (typeof FavoritesModal !== 'undefined' && FavoritesModal) {
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
        // Обновляем отображение в модалке если открыта
        if (typeof ProductModal !== 'undefined' && ProductModal && ProductModal.product && ProductModal.product.id === productId) {
            ProductModal.setData(ProductModal.product, favorites);
            ProductModal.rerender();
        }
    }

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

        if (typeof Filters !== 'undefined' && Filters && Filters.updateResultsCount) {
            Filters.updateResultsCount(filtered.length);
        }

        if (typeof ProductCard !== 'undefined' && ProductCard) {
            ProductCard.setData(filteredProducts, favorites);
            ProductCard.setOnProductClick((productId) => {
                const product = productsData.find(p => p.id === productId);
                if (product && typeof ProductModal !== 'undefined' && ProductModal) {
                    ProductModal.setData(product, favorites);
                    ProductModal.show();
                }
            });
            ProductCard.setOnFavoriteToggle((productId) => {
                toggleFavorite(productId);
            });
            ProductCard.setOnARPreview((product) => {
                if (typeof ARPreview !== 'undefined' && ARPreview) {
                    updateARPreview();
                    ARPreview.selectProduct(product);
                    ARPreview.show();
                }
            });

            const productsContainer = document.getElementById('products-container');
            if (productsContainer) {
                if (filtered.length === 0) {
                    productsContainer.innerHTML = ProductCard.renderEmpty(() => {
                        currentFilters = { sortBy: 'default', selectedPackaging: 'all' };
                        if (typeof Filters !== 'undefined' && Filters) {
                            Filters.sortBy = 'default';
                            Filters.selectedPackaging = 'all';
                            Filters.forceUpdate();
                        }
                        applyFiltersAndRender();
                    });
                    const resetBtn = document.getElementById('resetFiltersBtn');
                    if (resetBtn) {
                        resetBtn.addEventListener('click', () => {
                            currentFilters = { sortBy: 'default', selectedPackaging: 'all' };
                            if (typeof Filters !== 'undefined' && Filters) {
                                Filters.sortBy = 'default';
                                Filters.selectedPackaging = 'all';
                                Filters.forceUpdate();
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

    function onFilterChange(newState) {
        currentFilters = newState;
        applyFiltersAndRender();
    }

    function onModalFavoriteToggle(productId) {
        toggleFavorite(productId);
        if (typeof ProductModal !== 'undefined' && ProductModal && ProductModal.product) {
            ProductModal.setData(ProductModal.product, favorites);
            ProductModal.rerender();
        }
        if (typeof ProductCard !== 'undefined' && ProductCard) {
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
    }

    function onModalBuy(product) {
        alert(`Товар "${product.name}" добавлен в корзину!`);
        if (typeof ProductModal !== 'undefined' && ProductModal) ProductModal.hide();
    }

    function onModalClose() {
        if (typeof ProductModal !== 'undefined' && ProductModal) ProductModal.hide();
    }

    function onFavoritesOpen() {
        if (typeof FavoritesModal !== 'undefined' && FavoritesModal) {
            FavoritesModal.setData(productsData, favorites);
            FavoritesModal.show();
        }
    }

    function onFavoritesClose() {
        if (typeof FavoritesModal !== 'undefined' && FavoritesModal) FavoritesModal.hide();
    }

    function onFavoritesProductClick(productId) {
        const product = productsData.find(p => p.id === productId);
        if (product && typeof ProductModal !== 'undefined' && ProductModal) {
            ProductModal.setData(product, favorites);
            ProductModal.show();
        }
    }

    function onFavoritesRemove(productId) {
        toggleFavorite(productId);
        if (typeof FavoritesModal !== 'undefined' && FavoritesModal) {
            FavoritesModal.setData(productsData, favorites);
            FavoritesModal.rerender();
        }
        if (typeof ProductCard !== 'undefined' && ProductCard) {
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
    }

    // Настройка компонентов
    if (typeof Header !== 'undefined' && Header) {
        Header.setCurrentPage('catalog');
        Header.setOnFavoriteClick(onFavoritesOpen);
    }

    if (typeof Filters !== 'undefined' && Filters) {
        Filters.setOnFilterChange(onFilterChange);
    }

    if (typeof ProductCard !== 'undefined' && ProductCard) {
        ProductCard.setOnFilterReset(() => {
            currentFilters = { sortBy: 'default', selectedPackaging: 'all' };
            if (typeof Filters !== 'undefined' && Filters) {
                Filters.sortBy = 'default';
                Filters.selectedPackaging = 'all';
                Filters.forceUpdate();
            }
            applyFiltersAndRender();
        });
    }

    if (typeof ProductModal !== 'undefined' && ProductModal) {
        ProductModal.setOnClose(onModalClose);
        ProductModal.setOnFavoriteToggle(onModalFavoriteToggle);
        ProductModal.setOnBuy(onModalBuy);
    }

    if (typeof FavoritesModal !== 'undefined' && FavoritesModal) {
        FavoritesModal.setOnClose(onFavoritesClose);
        FavoritesModal.setOnProductClick(onFavoritesProductClick);
        FavoritesModal.setOnRemoveFavorite(onFavoritesRemove);
    }

    // Рендер компонентов
    const headerContainer = document.getElementById('header-container');
    if (headerContainer && typeof Header !== 'undefined' && Header && Header.render) {
        headerContainer.innerHTML = Header.render();
        if (Header.bindEvents) Header.bindEvents();
    }

    const heroContainer = document.getElementById('hero-container');
    if (heroContainer && typeof CatalogHero !== 'undefined' && CatalogHero && CatalogHero.render) {
        heroContainer.innerHTML = CatalogHero.render();
    }

    const filtersContainer = document.getElementById('filters-container');
    if (filtersContainer && typeof Filters !== 'undefined' && Filters && Filters.render) {
        filtersContainer.innerHTML = Filters.render();
        if (Filters.bindEvents) Filters.bindEvents();
        currentFilters = Filters.getState();
    }

    const productsContainer = document.getElementById('products-container');
    if (productsContainer && typeof ProductCard !== 'undefined' && ProductCard) {
        ProductCard.setData(productsData, favorites);
        productsContainer.innerHTML = '<div class="container"><div class="products-grid"><div class="empty-state"><div class="empty-icon">🌿</div><h3 class="empty-title">Загрузка...</h3></div></div></div>';
    }

    const footerContainer = document.getElementById('footer-container');
    if (footerContainer && typeof Footer !== 'undefined' && Footer && Footer.render) {
        footerContainer.innerHTML = Footer.render();
    }

    // Загрузка избранного и применение фильтров
    loadFavorites();

    // ARPreview настройка
    if (typeof ARPreview !== 'undefined' && ARPreview) {
        ARPreview.setOnClose(() => {
            // Ничего дополнительного не делаем
        });
    }

    // Закрытие модалок по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (typeof ProductModal !== 'undefined' && ProductModal) ProductModal.hide();
            if (typeof FavoritesModal !== 'undefined' && FavoritesModal) FavoritesModal.hide();
            if (typeof ARPreview !== 'undefined' && ARPreview) ARPreview.hide();
        }
    });
});