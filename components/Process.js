const Process = {
    render() {
        return `
            <section class="process-section">
                <div class="container">
                    <div class="process-header">
                        <span class="process-tag">ПОЛНЫЙ ЦИКЛ</span>
                        <h2 class="process-title">
                            Как рождается <span class="process-title-accent">ваша композиция</span>
                        </h2>
                        <div class="process-divider"></div>
                        <p class="process-subtitle">
                            От глины до готового подарка — всё создаём в одной мастерской
                        </p>
                    </div>
                    
                    <div class="process-steps">
                        <div class="process-step">
                            <div class="process-step-icon">🏺</div>
                            <div class="process-step-number">01</div>
                            <h3 class="process-step-title">Лепка</h3>
                            <p class="process-step-desc">
                                Лепим вазу из шамотной глины руками мастера. Каждое изделие уникально
                            </p>
                        </div>
                        
                        <div class="process-arrow">→</div>
                        
                        <div class="process-step">
                            <div class="process-step-icon">🔥</div>
                            <div class="process-step-number">02</div>
                            <h3 class="process-step-title">Обжиг</h3>
                            <p class="process-step-desc">
                                Обжигаем в печи при температуре 1000°C для прочности и долговечности
                            </p>
                        </div>
                        
                        <div class="process-arrow">→</div>
                        
                        <div class="process-step">
                            <div class="process-step-icon">🎨</div>
                            <div class="process-step-number">03</div>
                            <h3 class="process-step-title">Роспись</h3>
                            <p class="process-step-desc">
                                Расписываем вручную ангобами и глазурями. Каждый узор неповторим
                            </p>
                        </div>
                        
                        <div class="process-arrow">→</div>
                        
                        <div class="process-step">
                            <div class="process-step-icon">🌾</div>
                            <div class="process-step-number">04</div>
                            <h3 class="process-step-title">Украшение</h3>
                            <p class="process-step-desc">
                                Составляем композицию из сухоцветов, которая не увядает годами
                            </p>
                        </div>
                    </div>
                    
                    <div class="process-result">
                        <p>✨ Готовая композиция — в подарок или в интерьер ✨</p>
                    </div>
                </div>
            </section>
        `;
    }
};