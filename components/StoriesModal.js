const StoriesModal = {
    stories: [],
    currentIndex: 0,
    progressInterval: null,
    isPlaying: true,
    touchStartX: 0,
    touchEndX: 0,
    onClose: null,

    setStories(categoryId) {
        // Для каждой категории свои 12 фото
        const storiesImages = {
            'new': [
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg'
            ],
            'packaging': [
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg'
            ],
            'compositions': [
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg'
            ],
            'bukets': [
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg'
            ],
            'care': [
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg',
                'images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg'
            ]
        };

        const titles = {
            'new': 'Новинки',
            'packaging': 'Оформление',
            'compositions': 'Композиции',
            'bukets': 'Букеты',
            'care': 'Уход'
        };

        const descriptionsList = {
            'new': ['Свежая коллекция', 'Вдохновение природой', 'Уникальные сочетания', 'Тренды сезона', 'Натуральные оттенки', 'Эко-стиль', 'Ручная работа', 'Авторский подход', 'Природная гармония', 'Сезонные новинки', 'Эксклюзивные букеты', 'Подарок с душой'],
            'packaging': ['Эко-упаковка', 'Крафт бумага', 'Натуральные материалы', 'Льняные ленты', 'Джутовые верёвки', 'Бумага ручной работы', 'Сухоцветы в упаковке', 'Подарочный набор', 'Эстетичная подача', 'Экологичная упаковка', 'Стильное оформление', 'Подарок готовый'],
            'compositions': ['Авторский подход', 'Ручная работа', 'Гармония цвета', 'Баланс форм', 'Уют в доме', 'Натуральные материалы', 'Долговечность', 'Уникальность', 'Интерьерное решение', 'Вдохновение природой', 'Эстетика минимализма', 'Природная красота'],
            'bukets': ['Лаванда', 'Эвкалипт', 'Полевые травы', 'Пампасная трава', 'Хлопок', 'Гортензия', 'Статица', 'Физалис', 'Бессмертник', 'Лунулария', 'Эрмингия', 'Бруния'],
            'care': ['Правила ухода', 'Сохранение цвета', 'Долговечность', 'Защита от солнца', 'Сухая среда', 'Без полива', 'Чистка феном', 'Отсутствие влаги', 'Температурный режим', 'Проветривание', 'Без прямых лучей', 'Сохранение формы']
        };

        const images = storiesImages[categoryId] || storiesImages['new'];
        const descriptions = descriptionsList[categoryId] || descriptionsList['new'];

        this.stories = images.map((img, idx) => ({
            id: idx,
            image: img,
            title: titles[categoryId] || 'Сухоцветы',
            description: descriptions[idx % descriptions.length]
        }));

        this.currentIndex = 0;
    },

    render() {
        if (!this.stories.length) return '';

        const story = this.stories[this.currentIndex];
        const indicatorsHtml = this.stories.map((_, idx) => `
            <div class="stories-indicator ${idx === this.currentIndex ? 'active' : ''}" data-index="${idx}"></div>
        `).join('');

        return `
            <div class="stories-modal" id="storiesModal">
                <div class="stories-overlay"></div>
                <div class="stories-container">
                    <div class="stories-header">
                        <div class="stories-progress">
                            <div class="progress-bar"></div>
                        </div>
                        <button class="stories-close" id="storiesCloseBtn">✕</button>
                    </div>
                    <div class="stories-content" id="storiesContent">
                        <div class="story-slide active">
                            <img src="${story.image}" alt="${story.title}">
                            <div class="story-caption">
                                <h3>${story.title}</h3>
                                <p>${story.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="stories-nav">
                        <button class="stories-prev" id="storiesPrevBtn">‹</button>
                        <button class="stories-next" id="storiesNextBtn">›</button>
                    </div>
                    <div class="stories-indicators" id="storiesIndicators">
                        ${indicatorsHtml}
                    </div>
                </div>
            </div>
        `;
    },

    startProgress() {
        this.stopProgress();
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        let width = 0;
        progressBar.style.width = '0%';

        this.progressInterval = setInterval(() => {
            if (!this.isPlaying) return;
            width += 2;
            progressBar.style.width = width + '%';
            if (width >= 100) {
                this.nextStory();
            }
        }, 80);
    },

    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    },

    nextStory() {
        if (this.currentIndex < this.stories.length - 1) {
            this.currentIndex++;
            this.updateContent();
        } else {
            this.hide();
        }
    },

    prevStory() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateContent();
        } else {
            this.hide();
        }
    },

    goToStory(index) {
        if (index >= 0 && index < this.stories.length) {
            this.currentIndex = index;
            this.updateContent();
        }
    },

    updateContent() {
        const story = this.stories[this.currentIndex];
        const contentDiv = document.getElementById('storiesContent');
        const indicators = document.querySelectorAll('.stories-indicator');

        if (contentDiv) {
            contentDiv.innerHTML = `
                <div class="story-slide active">
                    <img src="${story.image}" alt="${story.title}">
                    <div class="story-caption">
                        <h3>${story.title}</h3>
                        <p>${story.description}</p>
                    </div>
                </div>
            `;
        }

        indicators.forEach((ind, idx) => {
            if (idx === this.currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });

        this.startProgress();
    },

    handleTouchStart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.isPlaying = false;
    },

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].clientX;
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Свайп влево — следующий
                this.nextStory();
            } else {
                // Свайп вправо — предыдущий
                this.prevStory();
            }
        }

        setTimeout(() => {
            this.isPlaying = true;
            this.startProgress();
        }, 100);
    },

    show() {
        const container = document.getElementById('stories-modal-container');
        if (container) {
            container.innerHTML = this.render();
            this.bindEvents();
            this.startProgress();
            document.body.classList.add('no-scroll');
        }
    },

    hide() {
        this.stopProgress();
        const container = document.getElementById('stories-modal-container');
        if (container) {
            container.innerHTML = '';
            document.body.classList.remove('no-scroll');
        }
        if (this.onClose) this.onClose();
    },

    bindEvents() {
        const closeBtn = document.getElementById('storiesCloseBtn');
        const prevBtn = document.getElementById('storiesPrevBtn');
        const nextBtn = document.getElementById('storiesNextBtn');
        const modal = document.getElementById('storiesModal');
        const content = document.getElementById('storiesContent');
        const indicators = document.querySelectorAll('.stories-indicator');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStory());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStory());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.hide();
            });
        }

        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const index = parseInt(indicator.dataset.index);
                this.goToStory(index);
            });
        });

        // Свайп для мобильных устройств
        if (content) {
            content.addEventListener('touchstart', (e) => this.handleTouchStart(e));
            content.addEventListener('touchend', (e) => this.handleTouchEnd(e));

            // Пауза при нажатии
            content.addEventListener('mousedown', () => { this.isPlaying = false; });
            content.addEventListener('mouseup', () => {
                setTimeout(() => { this.isPlaying = true; this.startProgress(); }, 100);
            });
        }

        // Клавиатура
        document.addEventListener('keydown', (e) => {
            if (modal && modal.style.display !== 'none') {
                if (e.key === 'ArrowLeft') this.prevStory();
                if (e.key === 'ArrowRight') this.nextStory();
                if (e.key === 'Escape') this.hide();
            }
        });
    }
};