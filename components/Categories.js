const Categories = {
    onCategoryClick: null,
    viewedStories: JSON.parse(localStorage.getItem('viewedStories') || '{}'),

    // НАСТРОЙКА ИЗОБРАЖЕНИЙ ДЛЯ СТОРИС
    // Здесь вы можете сами определить какие изображения будут в каждой категории
    // Просто укажите пути к нужным файлам в массиве images (до 12 штук)
    storiesConfig: {
        'new': {
            title: 'Новинки',
            images: ['images/1.jpeg']
        },
        'packaging': {
            title: 'Оформление',
            images: ['images/2.jpeg', 'images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg']
        },
        'compositions': {
            title: 'Композиции',
            images: ['images/3.jpeg', 'images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg']
        },
        'bukets': {
            title: 'Букеты',
            images: ['images/4.jpeg', 'images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg', 'images/15.jpeg']
        },
        'care': {
            title: 'Уход',
            images: ['images/5.jpeg', 'images/6.jpeg', 'images/7.jpeg', 'images/8.jpeg', 'images/9.jpeg', 'images/10.jpeg', 'images/11.jpeg', 'images/12.jpeg', 'images/13.jpeg', 'images/14.jpeg', 'images/15.jpeg', 'images/16.jpeg']
        }
    },

    setOnCategoryClick(callback) {
        this.onCategoryClick = callback;
    },

    markAsViewed(categoryId) {
        this.viewedStories[categoryId] = true;
        localStorage.setItem('viewedStories', JSON.stringify(this.viewedStories));
        this.updateBorders();
    },

    isViewed(categoryId) {
        return this.viewedStories[categoryId] === true;
    },

    updateBorders() {
        const cards = document.querySelectorAll('.category-card');
        cards.forEach(card => {
            const category = card.dataset.category;
            const circle = card.querySelector('.category-circle');
            if (this.isViewed(category)) {
                circle.style.border = '3px solid white';
                circle.style.boxShadow = '0 0 0 2px #e5e7eb';
            } else {
                circle.style.border = '3px solid #3b82f6';
                circle.style.boxShadow = '0 0 0 2px #3b82f6, 0 4px 12px rgba(0,0,0,0.1)';
            }
        });
    },

    render() {
        const categories = [
            { id: 'new', name: 'новинки', desc: 'Свежие композиции', emoji: '🌿' },
            { id: 'packaging', name: 'оформление', desc: 'Подарочная упаковка', emoji: '🎁' },
            { id: 'compositions', name: 'композиции', desc: 'Авторские работы', emoji: '🌸' },
            { id: 'bukets', name: 'букеты', desc: 'Из сухоцветов', emoji: '💐' },
            { id: 'care', name: 'уход', desc: 'Как сохранить красоту', emoji: '🧴' }
        ];

        const html = categories.map(cat => {
            const isViewed = this.isViewed(cat.id);
            const borderStyle = isViewed
                ? 'border: 3px solid white; box-shadow: 0 0 0 2px #e5e7eb;'
                : 'border: 3px solid #3b82f6; box-shadow: 0 0 0 2px #3b82f6, 0 4px 12px rgba(0,0,0,0.1);';

            return `
                <div class="category-card" data-category="${cat.id}">
                    <div class="category-circle" style="${borderStyle}">
                        <div class="category-emoji">${cat.emoji}</div>
                    </div>
                    <h3 class="category-title">${cat.name}</h3>
                    <p class="category-desc">${cat.desc}</p>
                </div>
            `;
        }).join('');

        return `
            <section class="categories-section">
                <div class="categories-grid">
                    ${html}
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
                    const config = this.storiesConfig[category];
                    if (config) {
                        this.onCategoryClick(category, config);
                    }
                    this.markAsViewed(category);
                }
            });
        });
    }
};