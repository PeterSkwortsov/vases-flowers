const StoriesModal = {
    stories: [],
    currentIndex: 0,
    progressInterval: null,
    isPlaying: true,
    touchStartX: 0,
    touchEndX: 0,
    onClose: null,

    setStories(categoryId, config) {
        if (!config || !config.images) return;

        const descriptionsList = {
            'new': [
                'Свежая коллекция', 'Вдохновение природой', 'Уникальные сочетания',
                'Тренды сезона', 'Натуральные оттенки', 'Эко-стиль',
                'Ручная работа', 'Авторский подход', 'Природная гармония',
                'Сезонные новинки', 'Эксклюзивные букеты', 'Подарок с душой'
            ],
            'packaging': [
                'Эко-упаковка', 'Крафт бумага', 'Натуральные материалы',
                'Льняные ленты', 'Джутовые верёвки', 'Бумага ручной работы',
                'Сухоцветы в упаковке', 'Подарочный набор', 'Эстетичная подача',
                'Экологичная упаковка', 'Стильное оформление', 'Подарок готовый'
            ],
            'compositions': [
                'Авторский подход', 'Ручная работа', 'Гармония цвета',
                'Баланс форм', 'Уют в доме', 'Натуральные материалы',
                'Долговечность', 'Уникальность', 'Интерьерное решение',
                'Вдохновение природой', 'Эстетика минимализма', 'Природная красота'
            ],
            'bukets': [
                'Лаванда', 'Эвкалипт', 'Полевые травы',
                'Пампасная трава', 'Хлопок', 'Гортензия',
                'Статица', 'Физалис', 'Бессмертник',
                'Лунулария', 'Эрмингия', 'Бруния'
            ],
            'care': [
                'Правила ухода', 'Сохранение цвета', 'Долговечность',
                'Защита от солнца', 'Сухая среда', 'Без полива',
                'Чистка феном', 'Отсутствие влаги', 'Температурный режим',
                'Проветривание', 'Без прямых лучей', 'Сохранение формы'
            ]
        };

        const descriptions = descriptionsList[categoryId] || descriptionsList['new'];

        this.stories = config.images.map((img, idx) => ({
            id: idx,
            image: img,
            title: config.title || 'Сухоцветы',
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
                            <img src="${story.image}" 
                                 alt="${story.title}" 
                                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
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
        const progressBar = document.querySelector('.progress-bar');

        if (contentDiv) {
            contentDiv.innerHTML = `
                <div class="story-slide active">
                    <img src="${story.image}" 
                         alt="${story.title}" 
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                    <div class="story-caption">
                        <h3>${story.title}</h3>
                        <p>${story.description}</p>
                    </div>
                </div>
            `;
        }

        if (progressBar) {
            progressBar.style.width = '0%';
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
                this.nextStory();
            } else {
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
            closeBtn.onclick = () => this.hide();
        }

        if (prevBtn) {
            prevBtn.onclick = () => this.prevStory();
        }

        if (nextBtn) {
            nextBtn.onclick = () => this.nextStory();
        }

        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal) this.hide();
            };
        }

        indicators.forEach(indicator => {
            indicator.onclick = () => {
                const index = parseInt(indicator.dataset.index);
                this.goToStory(index);
            };
        });

        if (content) {
            content.ontouchstart = (e) => this.handleTouchStart(e);
            content.ontouchend = (e) => this.handleTouchEnd(e);
            content.onmousedown = () => { this.isPlaying = false; };
            content.onmouseup = () => {
                setTimeout(() => { this.isPlaying = true; this.startProgress(); }, 100);
            };
        }

        document.onkeydown = (e) => {
            if (modal && modal.style.display !== 'none') {
                if (e.key === 'ArrowLeft') this.prevStory();
                if (e.key === 'ArrowRight') this.nextStory();
                if (e.key === 'Escape') this.hide();
            }
        };
    }
};