const Features = {
    render() {
        const features = [
            { icon: "🌿", title: "Натуральные материалы", desc: "Только экологичные сухоцветы" },
            { icon: "🎨", title: "Авторский подход", desc: "Каждая работа уникальна" },
            { icon: "🤝", title: "Индивидуально", desc: "Учитываем ваши пожелания" },
            { icon: "✨", title: "Подарочная упаковка", desc: "Красиво и экологично" }
        ];

        const html = features.map(f => `
            <div class="feature-item">
                <div class="feature-icon">${f.icon}</div>
                <h3 class="feature-title">${f.title}</h3>
                <p class="feature-desc">${f.desc}</p>
            </div>
        `).join('');

        return `
            <section class="features-section">
                <div class="container">
                    <div class="features-grid">
                         ${html}
                    </div>
                </div>
            </section>
        `;
    }
};