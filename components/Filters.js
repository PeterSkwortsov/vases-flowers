const Filters = {
    sortBy: 'default',
    selectedPackaging: 'all',
    onFilterChange: null,
    isMobileOpen: false,  // Сохраняем состояние панели

    setOnFilterChange(callback) {
        this.onFilterChange = callback;
    },

    getState() {
        return {
            sortBy: this.sortBy,
            selectedPackaging: this.selectedPackaging
        };
    },

    render() {
        const packagingOptions = [
            { value: 'all', label: 'Все варианты', icon: '📦' },
            { value: 'vase', label: 'В кашпо', icon: '🏺' },
            { value: 'kraft', label: 'Крафт упаковка', icon: '📜' },
            { value: 'none', label: 'Без упаковки', icon: '✨' }
        ];

        const filterButtons = packagingOptions.map(opt => `
            <button class="filter-chip ${this.selectedPackaging === opt.value ? 'active' : ''}" data-packaging="${opt.value}">
                <span>${opt.icon}</span>
                <span>${opt.label}</span>
            </button>
        `).join('');

        // Добавляем класс mobile-open если нужно
        const mobileOpenClass = this.isMobileOpen ? 'mobile-open' : '';

        return `
            <section class="filters-bar">
                <div class="container">
                    <button id="mobileFilterBtn" class="filter-mobile-btn">
                        <span>📋 Фильтры и сортировка</span>
                        <span id="filterArrow">${this.isMobileOpen ? '▲' : '▼'}</span>
                    </button>
                    
                    <div id="filterPanel" class="filter-panel ${mobileOpenClass}">
                        <div class="filter-group">
                            <span class="filter-label">Упаковка:</span>
                            <div id="packagingFilters">${filterButtons}</div>
                        </div>
                        
                        <div class="filter-group">
                            <span class="filter-label">Сортировать:</span>
                            <select id="sortSelect" class="sort-select">
                                <option value="default" ${this.sortBy === 'default' ? 'selected' : ''}>По умолчанию</option>
                                <option value="cheap" ${this.sortBy === 'cheap' ? 'selected' : ''}>Сначала дешевле</option>
                                <option value="expensive" ${this.sortBy === 'expensive' ? 'selected' : ''}>Сначала дороже</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="results-count">
                        Найдено <span id="resultsCount">0</span> композиций
                    </div>
                </div>
            </section>
        `;
    },

    bindEvents() {
        // Фильтры - обновляем без перерендера всей панели
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(btn => {
            btn.removeEventListener('click', this._handleFilterClick);
            this._handleFilterClick = () => {
                this.selectedPackaging = btn.dataset.packaging;
                // Обновляем активный класс на кнопках
                filterChips.forEach(c => {
                    if (c.dataset.packaging === this.selectedPackaging) {
                        c.classList.add('active');
                    } else {
                        c.classList.remove('active');
                    }
                });
                // Вызываем callback для обновления товаров
                if (this.onFilterChange) this.onFilterChange(this.getState());
            };
            btn.addEventListener('click', this._handleFilterClick);
        });

        // Сортировка
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.removeEventListener('change', this._handleSortChange);
            this._handleSortChange = (e) => {
                this.sortBy = e.target.value;
                if (this.onFilterChange) this.onFilterChange(this.getState());
            };
            sortSelect.addEventListener('change', this._handleSortChange);
        }

        // Мобильная кнопка - переключаем состояние
        const mobileBtn = document.getElementById('mobileFilterBtn');
        const filterPanel = document.getElementById('filterPanel');
        const filterArrow = document.getElementById('filterArrow');

        if (mobileBtn && filterPanel) {
            mobileBtn.removeEventListener('click', this._handleMobileToggle);
            this._handleMobileToggle = () => {
                if (this.isMobileOpen) {
                    filterPanel.classList.remove('mobile-open');
                    filterArrow.textContent = '▼';
                    this.isMobileOpen = false;
                } else {
                    filterPanel.classList.add('mobile-open');
                    filterArrow.textContent = '▲';
                    this.isMobileOpen = true;
                }
            };
            mobileBtn.addEventListener('click', this._handleMobileToggle);
        }
    },

    // Обновляем только результат, а не всю панель
    updateResultsCount(count) {
        const countEl = document.getElementById('resultsCount');
        if (countEl) countEl.textContent = count;
    },

    // Принудительное обновление после изменения сортировки извне
    forceUpdate() {
        const container = document.getElementById('filters-container');
        if (container) {
            const wasOpen = this.isMobileOpen;
            container.innerHTML = this.render();
            this.isMobileOpen = wasOpen;
            this.bindEvents();
        }
    }
};