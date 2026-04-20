const Hero = {
    render() {
        return `
            <section class="hero-section">
                <div class="hero-bg-gradient"></div>
                <div class="hero-blur-1"></div>
                <div class="hero-blur-2"></div>
                
                <div class="container">
                    <div class="hero-content">
                        <div class="hero-badge">
                            <span>🌸 Создано с любовью к природе</span>
                        </div>
                        <h1 class="hero-title">
                            Красота, которая
                            <span class="hero-title-accent">не увядает</span>
                        </h1>
                        <p class="hero-description">
                            Готовые композиции из сухоцветов и мастер-классы в уютной студии в центре Нижнего Новгорода
                        </p>
                        <div class="hero-buttons">
                            <a href="catalog.html" class="btn-primary">Выбрать композицию</a>
                            <a href="#masterclasses" class="btn-secondary">Расписание МК</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};