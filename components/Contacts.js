const Contacts = {
    render() {
        return `
            <section id="contacts" class="contacts-section">
                <div class="contacts-overlay"></div>
                <div class="container">
                    <h2 class="contacts-title">Ждём вас в гости</h2>
                    <p class="contacts-subtitle">Приходите вдохновляться и творить</p>
                    
                    <div class="contacts-grid">
                        <div class="contact-card">
                            <h3 class="contact-card-title">Режим работы</h3>
                            <div class="contact-schedule">
                                <div class="schedule-row">
                                    <span>Вторник - Пятница:</span>
                                    <span class="schedule-time">11:00 - 20:00</span>
                                </div>
                                <div class="schedule-row">
                                    <span>Суббота - Воскресенье:</span>
                                    <span class="schedule-time">12:00 - 18:00</span>
                                </div>
                                <div class="schedule-row">
                                    <span>Понедельник:</span>
                                    <span class="schedule-time">Выходной</span>
                                </div>
                            </div>
                        </div>
                        <div class="contact-card">
                            <h3 class="contact-card-title">Контакты</h3>
                            <div class="contact-links">
                                <p>📞 <a href="tel:+78311234567">+7 (831) 123-45-67</a></p>
                                <p>✉️ <a href="mailto:hello@evergreen.ru">hello@evergreen.ru</a></p>
                                <p>📱 <a href="#">@evergreen_nn (Telegram)</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="contact-note">
                        🚗 Бесплатная парковка | 🚶‍♀️ 5 минут от метро "Ленинская"
                    </div>
                </div>
            </section>
        `;
    }
};