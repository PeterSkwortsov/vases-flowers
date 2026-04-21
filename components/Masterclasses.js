const Masterclasses = {
    data: [],

    setData(masterclasses) {
        this.data = masterclasses;
    },

    render() {
        if (!this.data.length) return '<div></div>';

        // Обновляем пути к изображениям
        const updatedData = this.data.map((mc, index) => {
            const images = ['2.jpeg', '4.jpeg', '6.jpeg', '8.jpeg'];
            return {
                ...mc,
                image: `images/${images[index % images.length]}`
            };
        });

        const html = updatedData.map(mc => `
            <div class="masterclass-card">
                <div class="masterclass-image">
                    <img src="${mc.image}" alt="${mc.name}" onerror="this.src='https://placehold.co/600x400/e8f5e9/2e7d32?text=🌾'">
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
                    <button class="masterclass-btn" data-id="${mc.id}">Записаться →</button>
                </div>
            </div>
        `).join('');

        return `
            <section id="masterclasses" class="masterclasses-section">
                <div class="container">
                    <div class="section-header">
                        <span class="section-tag section-tag-teal">Вдохновение</span>
                        <h2 class="section-title">Мастер-классы</h2>
                        <div class="section-divider section-divider-teal"></div>
                        <p class="section-subtitle">Создайте уникальную вещь своими руками под руководством мастера</p>
                    </div>
                    <div class="masterclasses-grid">
                        ${html}
                    </div>
                </div>
            </section>
        `;
    },

    bindEvents() {
        const btns = document.querySelectorAll('.masterclass-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Запись на мастер-класс! Скоро мы свяжемся с вами.');
            });
        });
    }
};