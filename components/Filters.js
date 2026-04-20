const Filters = {
    sortBy: 'default',
    selectedPackaging: 'all',
    onFilterChange: null,

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

        return `
            <section class="filters-bar">
                <div class="container">
                    <button id="mobileFilterBtn" class="filter-mobile-btn">
                        <span>📋 Фильтры и сортировка</span>
                        <span id="filterArrow">▼</span>
                    </button>
                    
                    <div id="filterPanel" class="filter-panel">
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
        // Фильтры
        const filterChips = document.querySelectorAll('.filter-chip');
        filterChips.forEach(btn => {
            btn.removeEventListener('click', this._handleFilterClick);
            this._handleFilterClick = () => {
                this.selectedPackaging = btn.dataset.packaging;
                if (this.onFilterChange) this.onFilterChange(this.getState());
                this.rerender();
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
                this.rerender();
            };
            sortSelect.addEventListener('change', this._handleSortChange);
        }

        // Мобильная кнопка
        const mobileBtn = document.getElementById('mobileFilterBtn');
        const filterPanel = document.getElementById('filterPanel');
        const filterArrow = document.getElementById('filterArrow');

        if (mobileBtn && filterPanel) {
            mobileBtn.removeEventListener('click', this._handleMobileToggle);
            this._handleMobileToggle = () => {
                filterPanel.classList.toggle('mobile-open');
                const isOpen = filterPanel.classList.contains('mobile-open');
                filterArrow.textContent = isOpen ? '▲' : '▼';
            };
            mobileBtn.addEventListener('click', this._handleMobileToggle);
        }
    },

    rerender() {
        const container = document.getElementById('filters-container');
        if (container) {
            container.innerHTML = this.render();
            this.bindEvents();
            if (this.onFilterChange) {
                this.onFilterChange(this.getState());
            }
        }
    },

    updateResultsCount(count) {
        const countEl = document.getElementById('resultsCount');
        if (countEl) countEl.textContent = count;
    }
};