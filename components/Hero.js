const Hero = {
    render() {
        return `
            <section class="hero-section">
                <div class="hero-bg-pattern"></div>
                
                <!-- Первая ромашка (большая, справа внизу) -->
                <div class="hero-daisy hero-daisy-1">
                    <svg class="daisy-svg" viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="centerGradient1" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" style="stop-color:#f5d060;stop-opacity:1" />
                                <stop offset="40%" style="stop-color:#e8b830;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#c48818;stop-opacity:1" />
                            </radialGradient>
                            <filter id="petalShadow1" x="-30%" y="-30%" width="160%" height="160%">
                                <feDropShadow dx="3" dy="4" stdDeviation="4" flood-color="#a08060" flood-opacity="0.25"/>
                            </filter>
                            <filter id="petalShadowDeep1" x="-30%" y="-30%" width="160%" height="160%">
                                <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#8a6848" flood-opacity="0.3"/>
                            </filter>
                        </defs>
                        
                        <!-- Длинный стебель -->
                        
                        
                        <!-- Левый лист -->
                        <path d="M248 420 Q200 400 170 375 Q205 390 248 410" fill="#7da06a" stroke="#5a8a46" stroke-width="1"/>
                        <path d="M248 420 Q200 400 170 375" stroke="#4a6b3a" stroke-width="1.5" fill="none"/>
                        <path d="M210 398 L190 382" stroke="#4a6b3a" stroke-width="1" fill="none"/>
                        
                        <!-- Правый лист -->
                        <path d="M252 440 Q300 420 330 395 Q295 410 252 430" fill="#7da06a" stroke="#5a8a46" stroke-width="1"/>
                        <path d="M252 440 Q300 420 330 395" stroke="#4a6b3a" stroke-width="1.5" fill="none"/>
                        <path d="M290 418 L310 402" stroke="#4a6b3a" stroke-width="1" fill="none"/>
                        
                        <!-- Внешние лепестки -->
                        <g filter="url(#petalShadow1)">
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(0, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(22.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(45, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(67.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(90, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(112.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(135, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(157.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(180, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(202.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(225, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(247.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(270, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(292.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(315, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                            <ellipse cx="250" cy="130" rx="38" ry="90" transform="rotate(337.5, 250, 250)" fill="white" stroke="#e8d5c0" stroke-width="1.2"/>
                        </g>
                        
                        <!-- Внутренние лепестки -->
                        <g filter="url(#petalShadowDeep1)">
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(11.25, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(45, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(78.75, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(112.5, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(146.25, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(180, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(213.75, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(247.5, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(281.25, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                            <ellipse cx="250" cy="170" rx="28" ry="65" transform="rotate(315, 250, 250)" fill="#fffaf5" stroke="#e0d0b8" stroke-width="1"/>
                        </g>
                        
                        <!-- Центр -->
                        <circle cx="250" cy="250" r="65" fill="url(#centerGradient1)"/>
                        <circle cx="250" cy="250" r="65" fill="url(#centerHighlight)" opacity="0.5"/>
                        
                        <!-- Семечки -->
                        <g fill="#a06a10" opacity="0.7">
                            <circle cx="250" cy="210" r="5"/><circle cx="265" cy="215" r="5"/>
                            <circle cx="275" cy="230" r="5"/><circle cx="278" cy="248" r="5"/>
                            <circle cx="272" cy="265" r="5"/><circle cx="258" cy="278" r="5"/>
                            <circle cx="242" cy="278" r="5"/><circle cx="228" cy="265" r="5"/>
                            <circle cx="222" cy="248" r="5"/><circle cx="225" cy="230" r="5"/>
                            <circle cx="235" cy="215" r="5"/><circle cx="250" cy="225" r="4"/>
                            <circle cx="260" cy="228" r="4"/><circle cx="268" cy="238" r="4"/>
                            <circle cx="270" cy="250" r="4"/><circle cx="268" cy="262" r="4"/>
                            <circle cx="260" cy="272" r="4"/><circle cx="250" cy="275" r="4"/>
                            <circle cx="240" cy="272" r="4"/><circle cx="232" cy="262" r="4"/>
                            <circle cx="230" cy="250" r="4"/><circle cx="232" cy="238" r="4"/>
                            <circle cx="240" cy="228" r="4"/><circle cx="250" cy="240" r="3.5"/>
                            <circle cx="258" cy="242" r="3.5"/><circle cx="264" cy="250" r="3.5"/>
                            <circle cx="258" cy="258" r="3.5"/><circle cx="250" cy="260" r="3.5"/>
                            <circle cx="242" cy="258" r="3.5"/><circle cx="236" cy="250" r="3.5"/>
                            <circle cx="242" cy="242" r="3.5"/>
                        </g>
                        
                        <!-- Капли росы -->
                        <ellipse cx="200" cy="180" rx="6" ry="8" fill="white" opacity="0.5">
                            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="3s" repeatCount="indefinite"/>
                        </ellipse>
                        <ellipse cx="310" cy="200" rx="5" ry="7" fill="white" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
                        </ellipse>
                    </svg>
                </div>
                
                <!-- Вторая ромашка (средняя, слева внизу) -->
                <div class="hero-daisy hero-daisy-2">
                    <svg class="daisy-svg" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="centerGradient2" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" style="stop-color:#f5c842;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#c48018;stop-opacity:1" />
                            </radialGradient>
                            <filter id="petalShadow2" x="-30%" y="-30%" width="160%" height="160%">
                                <feDropShadow dx="2" dy="3" stdDeviation="3" flood-color="#a08060" flood-opacity="0.25"/>
                            </filter>
                        </defs>
                        
                        <!-- Длинный стебель -->
                        <path d="M200 300 Q195 360 200 460" stroke="#5a8a46" stroke-width="5" fill="none" stroke-linecap="round"/>
                        <path d="M200 300 Q205 360 200 460" stroke="#6d9a52" stroke-width="3" fill="none" stroke-linecap="round"/>
                        
                        <!-- Лист -->
                        <path d="M198 370 Q160 355 140 340 Q165 350 198 360" fill="#7da06a" stroke="#5a8a46" stroke-width="1"/>
                        
                        <g filter="url(#petalShadow2)">
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(0, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(30, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(60, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(90, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(120, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(150, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(180, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(210, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(240, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(270, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(300, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                            <ellipse cx="200" cy="110" rx="30" ry="70" transform="rotate(330, 200, 200)" fill="white" stroke="#e8d5c0" stroke-width="1"/>
                        </g>
                        
                        <circle cx="200" cy="200" r="45" fill="url(#centerGradient2)"/>
                        
                        <g fill="#a06a10" opacity="0.7">
                            <circle cx="200" cy="170" r="4"/><circle cx="215" cy="175" r="4"/>
                            <circle cx="225" cy="190" r="4"/><circle cx="228" cy="205" r="4"/>
                            <circle cx="222" cy="220" r="4"/><circle cx="210" cy="228" r="4"/>
                            <circle cx="195" cy="230" r="4"/><circle cx="180" cy="225" r="4"/>
                            <circle cx="172" cy="212" r="4"/><circle cx="170" cy="195" r="4"/>
                            <circle cx="178" cy="180" r="4"/><circle cx="190" cy="172" r="4"/>
                            <circle cx="200" cy="195" r="3"/><circle cx="208" cy="200" r="3"/>
                            <circle cx="205" cy="210" r="3"/><circle cx="195" cy="208" r="3"/>
                            <circle cx="192" cy="200" r="3"/><circle cx="200" cy="205" r="2.5"/>
                        </g>
                        
                        <ellipse cx="180" cy="180" rx="4" ry="6" fill="white" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite"/>
                        </ellipse>
                    </svg>
                </div>
                
                <!-- Третья ромашка (маленькая, сверху справа) -->
                <div class="hero-daisy hero-daisy-3">
                    <svg class="daisy-svg" viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="centerGradient3" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" style="stop-color:#f5d060;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#d4921a;stop-opacity:1" />
                            </radialGradient>
                            <filter id="petalShadow3" x="-30%" y="-30%" width="160%" height="160%">
                                <feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="#a08060" flood-opacity="0.25"/>
                            </filter>
                        </defs>
                        
                        <!-- Длинный стебель -->
                      
                        
                        <g filter="url(#petalShadow3)">
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(0, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(36, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(72, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(108, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(144, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(180, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(216, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(252, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(288, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                            <ellipse cx="150" cy="90" rx="22" ry="50" transform="rotate(324, 150, 150)" fill="white" stroke="#e8d5c0" stroke-width="0.8"/>
                        </g>
                        
                        <circle cx="150" cy="150" r="32" fill="url(#centerGradient3)"/>
                        
                        <g fill="#a06a10" opacity="0.7">
                            <circle cx="150" cy="128" r="3"/><circle cx="160" cy="132" r="3"/>
                            <circle cx="168" cy="142" r="3"/><circle cx="170" cy="152" r="3"/>
                            <circle cx="165" cy="162" r="3"/><circle cx="156" cy="168" r="3"/>
                            <circle cx="144" cy="168" r="3"/><circle cx="135" cy="162" r="3"/>
                            <circle cx="130" cy="152" r="3"/><circle cx="132" cy="142" r="3"/>
                            <circle cx="140" cy="132" r="3"/><circle cx="150" cy="145" r="2"/>
                            <circle cx="155" cy="150" r="2"/><circle cx="150" cy="155" r="2"/>
                            <circle cx="145" cy="150" r="2"/>
                        </g>
                        
                        <ellipse cx="140" cy="140" rx="3" ry="5" fill="white" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.5s" repeatCount="indefinite"/>
                        </ellipse>
                    </svg>
                </div>
                
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
                            Готовые композиции из сухоцветов и мастер-классы в уютной студии 
                            в центре Нижнего Новгорода
                        </p>
                        <div class="hero-buttons">
                            <a href="catalog.html" class="btn-primary">
                                <span>🌾</span>
                                <span>Выбрать композицию</span>
                            </a>
                            <a href="#masterclasses" class="btn-secondary">
                                <span>🎨</span>
                                <span>Расписание МК</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
};