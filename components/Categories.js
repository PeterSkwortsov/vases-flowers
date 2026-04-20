const Categories = {
    onCategoryClick: null,

    setOnCategoryClick(callback) {
        this.onCategoryClick = callback;
    },

    render() {
        return `
            <section class="categories-section">
                <div class="container">
                    <div class="categories-grid">
                        <div class="category-card" data-category="new">
                            <div class="category-circle">
                                <div class="category-emoji">🌿</div>
                            </div>
                            <h3 class="category-title">новинки</h3>
                            <p class="category-desc">Свежие композиции</p>
                        </div>
                        
                        <div class="category-card" data-category="packaging">
                            <div class="category-circle">
                                <div class="category-emoji">🎁</div>
                            </div>
                            <h3 class="category-title">оформление</h3>
                            <p class="category-desc">Подарочная упаковка</p>
                        </div>
                        
                        <div class="category-card" data-category="compositions">
                            <div class="category-circle">
                                <div class="category-emoji">🌸</div>
                            </div>
                            <h3 class="category-title">композиции</h3>
                            <p class="category-desc">Авторские работы</p>
                        </div>
                        
                        <div class="category-card" data-category="bukets">
                            <div class="category-circle">
                                <div class="category-emoji">💐</div>
                            </div>
                            <h3 class="category-title">букеты</h3>
                            <p class="category-desc">Из сухоцветов</p>
                        </div>
                        
                        <div class="category-card" data-category="care">
                            <div class="category-circle">
                                <div class="category-emoji">🧴</div>
                            </div>
                            <h3 class="category-title">уход</h3>
                            <p class="category-desc">Как сохранить красоту</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    },

    bindEvents() {
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                if (this.onCategoryClick) {
                    this.onCategoryClick(category);
                }
            });
        });
    }
};