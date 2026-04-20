const About = {
    render() {
        return `
            <section id="about" class="about-section">
                <div class="container">
                    <div class="about-card">
                        <h2 class="about-title">О нашей студии</h2>
                        <div class="section-divider"></div>
                        <p class="about-text">
                            EverGreen — это пространство, где природа встречается с творчеством. 
                            Мы создаём композиции из сухоцветов, которые сохраняют свою красоту годами, 
                            и делимся своим мастерством на уютных занятиях.
                        </p>
                        <div class="about-address">
                            <span class="address-icon">📍</span>
                            <div>
                                <p class="address-text">Нижний Новгород, ул. Ломоносова, 9</p>
                                <p class="address-note">Вход со двора, 2 этаж. Просторная парковка рядом.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};