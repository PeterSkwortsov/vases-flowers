const Masterclasses = {
    data: [],

    setData(masterclasses) {
        const updatedData = [...masterclasses];
        if (updatedData[2]) {
            updatedData[2] = {
                id: 3,
                name: "Создание керамических цветов",
                price: 2200,
                duration: "2 часа",
                image: "images/10.jpeg",
                description: "Слепите цветок из глины за один вечер. Забираете готовое изделие после обжига. Все материалы даём. Для начинающих.",
                icon: "🏺"
            };
        }
        this.data = updatedData;
    },

    render() {
        if (!this.data.length) return '<div></div>';

        const html = this.data.map(mc => `
            <div class="masterclass-card">
                <div class="masterclass-image">
                    <img src="${mc.image}" 
                         alt="${mc.name}" 
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🎨%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="masterclass-content">
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