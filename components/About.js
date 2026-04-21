const About = {
    render() {
        return `
            <section id="about" class="about-section">
                <div class="container">
                    <div class="about-wrapper">
                        <div class="about-content">
                            <div class="about-badge">
                                <span>О НАС</span>
                            </div>
                            <h2 class="about-title">
                                Творческая студия 
                                <span class="about-title-accent">Глиняный сад</span>
                            </h2>
                            <div class="about-divider"></div>
                            <p class="about-text">
                                Мы создаём пространство, где природа встречается с творчеством. 
                                Наша студия находится в самом сердце Нижнего Новгорода — месте, 
                                где рождаются уникальные композиции из сухоцветов и керамики.
                            </p>
                            <div class="about-features">
                                <div class="about-feature">
                                    <div class="about-feature-icon">🌿</div>
                                    <div>
                                        <h4>Натуральные материалы</h4>
                                        <p>Только экологичные сухоцветы и шамотная глина</p>
                                    </div>
                                </div>
                                <div class="about-feature">
                                    <div class="about-feature-icon">🎨</div>
                                    <div>
                                        <h4>Авторский подход</h4>
                                        <p>Каждая работа создаётся вручную с душой</p>
                                    </div>
                                </div>
                                <div class="about-feature">
                                    <div class="about-feature-icon">📍</div>
                                    <div>
                                        <h4>Удобное расположение</h4>
                                        <p>Нижний Новгород, ул. Ломоносова, 9</p>
                                    </div>
                                </div>
                                <div class="about-feature">
                                    <div class="about-feature-icon">✨</div>
                                    <div>
                                        <h4>Мастер-классы</h4>
                                        <p>Обучаем созданию керамики и композиций</p>
                                    </div>
                                </div>
                            </div>
                            <div class="about-contact">
                                <div class="about-contact-item">
                                    <span class="about-contact-icon">📞</span>
                                    <div>
                                        <strong>Телефон</strong>
                                        <a href="tel:+78311234567">+7 (831) 123-45-67</a>
                                    </div>
                                </div>
                                <div class="about-contact-item">
                                    <span class="about-contact-icon">✉️</span>
                                    <div>
                                        <strong>Email</strong>
                                        <a href="mailto:hello@evergreen.ru">hello@evergreen.ru</a>
                                    </div>
                                </div>
                                <div class="about-contact-item">
                                    <span class="about-contact-icon">⏰</span>
                                    <div>
                                        <strong>Режим работы</strong>
                                        <span>Вт-Пт: 11:00-20:00, Сб-Вс: 12:00-18:00</span>
                                    </div>
                                </div>
                            </div>
                            <a href="#contacts" class="about-btn">Связаться с нами →</a>
                        </div>
                        <div class="about-image">
                            <img src="images/10.jpeg" alt="Творческая студия Глиняный сад" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 400 500\'%3E%3Crect width=\'400\' height=\'500\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'200\' y=\'250\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'16\'%3EФото студии%3C/text%3E%3C/svg%3E'">
                            <div class="about-image-decoration"></div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};