const ARPreview = {
    currentImage: null,
    currentProduct: null,
    onClose: null,
    interiorImage: null,
    favorites: [],
    placedImages: [],
    calibrationMode: false,
    calibrationPoints: [],
    selectedObject: null,
    pixelPerCm: null,
    isCalibrated: false,

    // Стандартные объекты для калибровки
    calibrationObjects: {
        door: { name: 'Дверь', sizeCm: 200, icon: '🚪' },
        chair: { name: 'Стул', sizeCm: 45, icon: '🪑' },
        table: { name: 'Стол', sizeCm: 75, icon: '🪑' },
        sofa: { name: 'Диван (сиденье)', sizeCm: 45, icon: '🛋️' },
        person: { name: 'Человек', sizeCm: 170, icon: '🧑' },
        fridge: { name: 'Холодильник', sizeCm: 180, icon: '🧊' },
        socket: { name: 'Розетка', sizeCm: 8, icon: '🔌' },
        custom: { name: 'Свой размер', sizeCm: null, icon: '📏' }
    },

    setOnClose(callback) {
        this.onClose = callback;
    },

    updateFavorites(favoritesList, productsList) {
        this.favorites = favoritesList.map(id => {
            return productsList.find(p => p.id === id);
        }).filter(p => p);

        const favoritesListElement = document.getElementById('arFavoritesList');
        if (favoritesListElement) {
            if (this.favorites.length > 0) {
                favoritesListElement.innerHTML = this.favorites.map(product => `
                    <div class="ar-favorite-item" data-id="${product.id}" data-image="${product.images[0]}" data-name="${product.name}" data-height="${product.heightCm || 45}" data-width="${product.widthCm || 35}">
                        <img src="${product.images[0]}" alt="${product.name}" class="ar-favorite-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                        <div class="ar-favorite-info">
                            <div class="ar-favorite-name">${product.name}</div>
                            <div class="ar-favorite-price">${product.price} ₽</div>
                            <div class="ar-favorite-size">${product.heightCm || 45} см</div>
                        </div>
                    </div>
                `).join('');

                const items = document.querySelectorAll('.ar-favorite-item');
                items.forEach(item => {
                    item.onclick = () => {
                        const id = parseInt(item.dataset.id);
                        const image = item.dataset.image;
                        const name = item.dataset.name;
                        const height = parseInt(item.dataset.height) || 45;
                        const width = parseInt(item.dataset.width) || 35;

                        items.forEach(fi => fi.classList.remove('active'));
                        item.classList.add('active');

                        this.currentImage = image;
                        this.currentProduct = {
                            id,
                            name,
                            images: [image],
                            heightCm: height,
                            widthCm: width
                        };
                        this.setPreviewImage(image);

                        // Логируем для проверки
                        console.log('Выбран товар:', this.currentProduct);

                        const selectedName = document.getElementById('arSelectedName');
                        if (selectedName) {
                            selectedName.textContent = `${name} (${height} см)`;
                            selectedName.style.color = '#059669';
                        }
                    };
                });
            } else {
                favoritesListElement.innerHTML = '<div class="ar-no-favorites">😢 Нет избранных композиций<br><small>Добавьте товары в избранное (нажмите на сердечко) и вернитесь сюда</small></div>';
            }
        }
    },

    setPreviewImage(imageUrl) {
        this.currentImage = imageUrl;
        const previewImg = document.getElementById('arPreviewImage');
        if (previewImg && imageUrl) {
            previewImg.src = imageUrl;
            previewImg.style.display = 'block';
        }
    },

    uploadInteriorImage(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject('Файл не выбран');
                return;
            }

            if (!file.type.startsWith('image/')) {
                reject('Пожалуйста, выберите изображение');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.interiorImage = e.target.result;
                const interiorImg = document.getElementById('arInteriorImage');
                if (interiorImg) {
                    interiorImg.src = this.interiorImage;
                    interiorImg.style.display = 'block';

                    // Сбрасываем калибровку
                    this.resetCalibration();
                }
                const container = document.getElementById('arUploadOverlayContainer');
                if (container) container.style.display = 'block';
                resolve(this.interiorImage);
            };
            reader.onerror = () => reject('Ошибка загрузки файла');
            reader.readAsDataURL(file);
        });
    },

    // Калибровка
    startCalibration(objectId) {
        this.selectedObject = this.calibrationObjects[objectId];
        if (!this.selectedObject) return;

        this.calibrationMode = true;
        this.calibrationPoints = [];

        const interiorImg = document.getElementById('arInteriorImage');
        if (interiorImg) {
            interiorImg.style.cursor = 'crosshair';

            // Временно отключаем размещение композиций
            interiorImg.onclick = (event) => this.handleCalibrationClick(event);
        }

        const message = `📏 Отметьте ${this.selectedObject.name} на фото (2 клика: начало и конец)`;
        this.showCalibrationMessage(message);
    },

    handleCalibrationClick(event) {
        if (!this.calibrationMode) return;

        const interiorImg = document.getElementById('arInteriorImage');
        const imgRect = interiorImg.getBoundingClientRect();

        let x, y;
        if (event.touches) {
            const touch = event.touches[0];
            x = touch.clientX - imgRect.left;
            y = touch.clientY - imgRect.top;
        } else {
            x = event.clientX - imgRect.left;
            y = event.clientY - imgRect.top;
        }

        x = Math.min(Math.max(x, 0), imgRect.width);
        y = Math.min(Math.max(y, 0), imgRect.height);

        this.calibrationPoints.push({ x, y });

        // Рисуем маркер на изображении
        this.drawCalibrationMarker(x, y);

        if (this.calibrationPoints.length === 2) {
            // Рассчитываем масштаб
            const points = this.calibrationPoints;
            const distancePx = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y - points[0].y, 2));
            const sizeCm = this.selectedObject.sizeCm;

            if (sizeCm && distancePx > 0) {
                this.pixelPerCm = distancePx / sizeCm;
                this.isCalibrated = true;

                console.log(`✅ Калибровка: ${distancePx}px / ${sizeCm}см = ${this.pixelPerCm} px/см`);

                this.showCalibrationMessage(`✅ Калибровка завершена! 1 см = ${Math.round(this.pixelPerCm * 10) / 10} пикселей. Теперь можно размещать композиции в реальном масштабе.`);
                setTimeout(() => this.hideCalibrationMessage(), 3000);
            } else if (!sizeCm && this.selectedObject.name === 'Свой размер') {
                // Запрашиваем свой размер
                const customSize = prompt('Введите размер объекта в сантиметрах:');
                if (customSize && !isNaN(customSize)) {
                    this.pixelPerCm = distancePx / parseFloat(customSize);
                    this.isCalibrated = true;
                    this.showCalibrationMessage(`✅ Калибровка завершена! 1 см = ${Math.round(this.pixelPerCm * 10) / 10} пикселей.`);
                    setTimeout(() => this.hideCalibrationMessage(), 3000);
                } else {
                    this.showCalibrationMessage('❌ Некорректный размер. Калибровка отменена.');
                    setTimeout(() => this.hideCalibrationMessage(), 2000);
                }
            }

            // Завершаем калибровку
            this.calibrationMode = false;
            this.calibrationPoints = [];

            // Восстанавливаем обработчик размещения
            const interiorImg = document.getElementById('arInteriorImage');
            if (interiorImg) {
                interiorImg.style.cursor = 'pointer';
                interiorImg.onclick = (event) => this.placeImageOnUpload(event);
            }

            // Убираем маркеры
            this.clearCalibrationMarkers();
        }
    },

    drawCalibrationMarker(x, y) {
        const container = document.getElementById('arUploadOverlayContainer');
        const marker = document.createElement('div');
        marker.className = 'ar-calibration-marker';
        marker.style.position = 'absolute';
        marker.style.left = (x - 8) + 'px';
        marker.style.top = (y - 8) + 'px';
        marker.style.width = '16px';
        marker.style.height = '16px';
        marker.style.background = '#3b82f6';
        marker.style.borderRadius = '50%';
        marker.style.border = '2px solid white';
        marker.style.boxShadow = '0 0 0 2px #3b82f6';
        marker.style.zIndex = '30';
        marker.style.pointerEvents = 'none';
        marker.setAttribute('data-marker', 'true');
        container.appendChild(marker);
    },

    clearCalibrationMarkers() {
        const container = document.getElementById('arUploadOverlayContainer');
        const markers = container.querySelectorAll('[data-marker="true"]');
        markers.forEach(marker => marker.remove());
    },

    showCalibrationMessage(message) {
        let msgDiv = document.getElementById('arCalibrationMessage');
        if (!msgDiv) {
            msgDiv = document.createElement('div');
            msgDiv.id = 'arCalibrationMessage';
            msgDiv.className = 'ar-calibration-message';
            const container = document.getElementById('arUploadOverlayContainer');
            if (container) container.appendChild(msgDiv);
        }
        msgDiv.innerHTML = message;
        msgDiv.style.display = 'block';
    },

    hideCalibrationMessage() {
        const msgDiv = document.getElementById('arCalibrationMessage');
        if (msgDiv) msgDiv.style.display = 'none';
    },

    resetCalibration() {
        this.isCalibrated = false;
        this.pixelPerCm = null;
        this.calibrationMode = false;
        this.calibrationPoints = [];
        this.clearCalibrationMarkers();
        this.hideCalibrationMessage();

        // Восстанавливаем обработчик размещения
        const interiorImg = document.getElementById('arInteriorImage');
        if (interiorImg) {
            interiorImg.style.cursor = 'pointer';
            interiorImg.onclick = (event) => this.placeImageOnUpload(event);
        }
    },

    getScaledSize() {
        console.log('=== getScaledSize DEBUG ===');
        console.log('isCalibrated:', this.isCalibrated);
        console.log('pixelPerCm:', this.pixelPerCm);
        console.log('currentProduct:', this.currentProduct);

        // Если есть калибровка и у товара есть реальная высота
        if (this.isCalibrated && this.pixelPerCm && this.currentProduct && this.currentProduct.heightCm) {
            const calculatedSize = this.currentProduct.heightCm * this.pixelPerCm;
            console.log(`Реальная высота товара: ${this.currentProduct.heightCm} см`);
            console.log(`pixelPerCm: ${this.pixelPerCm} px/см`);
            console.log(`Рассчитанный размер: ${calculatedSize} px`);
            return calculatedSize;
        }

        console.log('Используем стандартный размер: 120 px');
        // Без калибровки — стандартный размер 120px
        return 120;
    },

    createPlaceableImageWithScale(x, y, container) {
        if (!this.currentImage) {
            alert('Сначала выберите композицию из избранного');
            return;
        }

        const targetSize = this.getScaledSize();
        console.log('=== createPlaceableImageWithScale DEBUG ===');
        console.log('Размер для вставки:', targetSize, 'px');

        // Загружаем изображение, чтобы узнать его реальные пропорции
        const tempImg = new Image();
        tempImg.onload = () => {
            const imgWidth = tempImg.width;
            const imgHeight = tempImg.height;
            const aspectRatio = imgHeight / imgWidth;

            console.log('Оригинальные размеры изображения:', imgWidth, 'x', imgHeight);
            console.log('Соотношение сторон (высота/ширина):', aspectRatio);

            // Вычисляем ширину на основе целевой высоты и пропорций
            const finalHeight = targetSize;
            const finalWidth = finalHeight / aspectRatio;

            console.log('Итоговые размеры на фото:', finalWidth, 'x', finalHeight, 'px');

            this.renderPlaceableImage(x, y, container, finalWidth, finalHeight);
        };
        tempImg.src = this.currentImage;
    },

    renderPlaceableImage(x, y, container, width, height) {
        const wrapper = document.createElement('div');
        wrapper.className = 'ar-image-wrapper';
        wrapper.style.position = 'absolute';
        wrapper.style.left = (x - width / 2) + 'px';
        wrapper.style.top = (y - height / 2) + 'px';
        wrapper.style.width = width + 'px';
        wrapper.style.height = height + 'px';
        wrapper.style.cursor = 'grab';
        wrapper.style.userSelect = 'none';

        const img = document.createElement('img');
        img.src = this.currentImage;
        img.className = 'ar-placed-image';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.pointerEvents = 'none';
        img.style.filter = 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))';

        // Кнопка удаления
        const deleteBtn = document.createElement('div');
        deleteBtn.className = 'ar-delete-btn';
        deleteBtn.innerHTML = '✕';
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.top = '-10px';
        deleteBtn.style.right = '-10px';
        deleteBtn.style.width = '24px';
        deleteBtn.style.height = '24px';
        deleteBtn.style.background = '#ef4444';
        deleteBtn.style.color = 'white';
        deleteBtn.style.borderRadius = '50%';
        deleteBtn.style.cursor = 'pointer';
        deleteBtn.style.display = 'flex';
        deleteBtn.style.alignItems = 'center';
        deleteBtn.style.justifyContent = 'center';
        deleteBtn.style.fontSize = '12px';
        deleteBtn.style.fontWeight = 'bold';
        deleteBtn.style.zIndex = '25';
        deleteBtn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';

        // Кнопка масштабирования
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'ar-resize-handle';
        resizeHandle.innerHTML = '↘️';
        resizeHandle.style.position = 'absolute';
        resizeHandle.style.bottom = '-10px';
        resizeHandle.style.right = '-10px';
        resizeHandle.style.width = '26px';
        resizeHandle.style.height = '26px';
        resizeHandle.style.background = 'white';
        resizeHandle.style.borderRadius = '50%';
        resizeHandle.style.cursor = 'nw-resize';
        resizeHandle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        resizeHandle.style.display = 'flex';
        resizeHandle.style.alignItems = 'center';
        resizeHandle.style.justifyContent = 'center';
        resizeHandle.style.fontSize = '14px';
        resizeHandle.style.zIndex = '25';

        // Переменные для drag-and-drop
        let isDragging = false;
        let dragStartX, dragStartY, startLeft, startTop;
        let isResizing = false;
        let resizeStartX, resizeStartY, startWidth, startHeight;

        const startDrag = (clientX, clientY) => {
            isDragging = true;
            dragStartX = clientX;
            dragStartY = clientY;
            startLeft = parseInt(wrapper.style.left);
            startTop = parseInt(wrapper.style.top);
            wrapper.style.cursor = 'grabbing';
        };

        const onDragMove = (clientX, clientY) => {
            if (!isDragging) return;
            const dx = clientX - dragStartX;
            const dy = clientY - dragStartY;
            let newLeft = startLeft + dx;
            let newTop = startTop + dy;

            const containerRect = container.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            newLeft = Math.min(Math.max(newLeft, 0), containerRect.width - wrapperRect.width);
            newTop = Math.min(Math.max(newTop, 0), containerRect.height - wrapperRect.height);

            wrapper.style.left = newLeft + 'px';
            wrapper.style.top = newTop + 'px';
        };

        const stopDrag = () => {
            isDragging = false;
            wrapper.style.cursor = 'grab';
        };

        const startResize = (clientX, clientY) => {
            isResizing = true;
            resizeStartX = clientX;
            resizeStartY = clientY;
            startWidth = parseInt(wrapper.style.width);
            startHeight = parseInt(wrapper.style.height);
        };

        const onResizeMove = (clientX, clientY) => {
            if (!isResizing) return;
            const dx = clientX - resizeStartX;
            const newWidth = Math.max(40, Math.min(500, startWidth + dx));
            wrapper.style.width = newWidth + 'px';
            wrapper.style.height = newWidth + 'px';
        };

        const stopResize = () => {
            isResizing = false;
        };

        wrapper.addEventListener('mousedown', (e) => {
            if (e.target === resizeHandle || resizeHandle.contains(e.target)) return;
            e.preventDefault();
            startDrag(e.clientX, e.clientY);
        });

        resizeHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            e.preventDefault();
            startResize(e.clientX, e.clientY);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) onDragMove(e.clientX, e.clientY);
            if (isResizing) onResizeMove(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) stopDrag();
            if (isResizing) stopResize();
        });

        wrapper.addEventListener('touchstart', (e) => {
            if (e.target === resizeHandle || resizeHandle.contains(e.target)) return;
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
            e.preventDefault();
        });

        resizeHandle.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            const touch = e.touches[0];
            startResize(touch.clientX, touch.clientY);
            e.preventDefault();
        });

        window.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            if (isDragging) onDragMove(touch.clientX, touch.clientY);
            if (isResizing) onResizeMove(touch.clientX, touch.clientY);
            e.preventDefault();
        });

        window.addEventListener('touchend', () => {
            if (isDragging) stopDrag();
            if (isResizing) stopResize();
        });

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.remove();
            const index = this.placedImages.indexOf(wrapper);
            if (index > -1) this.placedImages.splice(index, 1);
        });

        wrapper.appendChild(img);
        wrapper.appendChild(resizeHandle);
        wrapper.appendChild(deleteBtn);
        container.appendChild(wrapper);
        this.placedImages.push(wrapper);
    },

    placeImageOnUpload(event) {
        if (!this.currentImage) {
            alert('Сначала выберите композицию из избранного (нажмите на сердечко в карточке товара)');
            return;
        }

        const container = document.getElementById('arUploadOverlayContainer');
        if (!container) return;

        const interiorImg = document.getElementById('arInteriorImage');
        if (!interiorImg) return;

        const imgRect = interiorImg.getBoundingClientRect();

        let x, y;
        if (event.touches) {
            const touch = event.touches[0];
            x = touch.clientX - imgRect.left;
            y = touch.clientY - imgRect.top;
        } else {
            x = event.clientX - imgRect.left;
            y = event.clientY - imgRect.top;
        }

        x = Math.min(Math.max(x, 20), imgRect.width - 20);
        y = Math.min(Math.max(y, 20), imgRect.height - 20);

        this.createPlaceableImageWithScale(x, y, container);
    },

    renderCalibrationPanel() {
        const objectsHtml = Object.entries(this.calibrationObjects).map(([key, obj]) => `
            <button class="ar-calib-object" data-object="${key}">
                ${obj.icon} ${obj.name}
                ${obj.sizeCm ? `(${obj.sizeCm} см)` : ''}
            </button>
        `).join('');

        return `
            <div class="ar-calibration-panel" id="arCalibrationPanel">
                <div class="ar-calib-title">📏 Калибровка масштаба</div>
                <p class="ar-calib-desc">Выберите предмет на фото, чтобы задать реальный масштаб</p>
                <div class="ar-calib-objects">
                    ${objectsHtml}
                </div>
                <button class="ar-calib-skip" id="arCalibSkip">Пропустить (ручной размер)</button>
            </div>
        `;
    },

    render() {
        const favoritesListHtml = this.favorites.length > 0
            ? this.favorites.map(product => `
                <div class="ar-favorite-item" data-id="${product.id}" data-image="${product.images[0]}" data-name="${product.name}" data-height="${product.heightCm || 45}" data-width="${product.widthCm || 35}">
                    <img src="${product.images[0]}" alt="${product.name}" class="ar-favorite-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                    <div class="ar-favorite-info">
                        <div class="ar-favorite-name">${product.name}</div>
                        <div class="ar-favorite-price">${product.price} ₽</div>
                        <div class="ar-favorite-size">${product.heightCm || 45} см</div>
                    </div>
                </div>
            `).join('')
            : '<div class="ar-no-favorites">😢 Нет избранных композиций<br><small>Добавьте товары в избранное (нажмите на сердечко) и вернитесь сюда</small></div>';

        const calibrationPanel = this.renderCalibrationPanel();

        return `
            <div class="ar-modal" id="arModal" style="display: flex;">
                <div class="ar-modal-overlay"></div>
                <div class="ar-modal-content">
                    <div class="ar-header">
                        <h3 class="ar-title">🖼️ Примерка в интерьере</h3>
                        <button class="ar-close" id="arCloseBtn">✕</button>
                    </div>
                    
                    <div class="ar-favorites-section">
                        <div class="ar-favorites-title">⭐ Ваши избранные композиции</div>
                        <div class="ar-favorites-list" id="arFavoritesList">
                            ${favoritesListHtml}
                        </div>
                    </div>
                    
                    <div class="ar-upload-section">
                        <div class="ar-upload-area" id="arUploadArea">
                            <input type="file" id="arFileInput" accept="image/*" style="display: none;">
                            <button class="ar-upload-btn" id="arSelectFileBtn">📁 Загрузить фото интерьера</button>
                            <p class="ar-upload-hint">Загрузите фото комнаты, стены или полки</p>
                        </div>
                        
                        <div class="ar-preview-container">
                            <div class="ar-selected-comp-position">
                                <span>Выбранная композиция:</span>
                                <span id="arSelectedName" class="ar-selected-name">${this.currentProduct ? `${this.currentProduct.name} (${this.currentProduct.heightCm} см)` : 'Не выбрана'}</span>
                            </div>
                            <div class="ar-preview-img-container">
                                <img id="arPreviewImage" class="ar-preview-img" style="display: none;" alt="Композиция для примерки">
                            </div>
                        </div>
                        
                        <div id="arUploadOverlayContainer" class="ar-overlay-container" style="display: none;">
                            <img id="arInteriorImage" class="ar-interior-image" alt="Интерьер">
                            ${calibrationPanel}
                        </div>
                        
                        <div class="ar-instruction" id="arInstruction" style="display: none;">
                            <p>👆 Кликните по изображению интерьера, чтобы разместить композицию</p>
                            <p>🖱️ Перетащите изображение пальцем или мышкой</p>
                            <p>↘️ Потяните за уголок, чтобы изменить размер</p>
                            <p>✕ Нажмите на крестик, чтобы удалить</p>
                        </div>
                    </div>
                    
                    <div class="ar-selected-info">
                        <span>💡 Совет: используйте фото с хорошим освещением</span>
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        const closeBtn = document.getElementById('arCloseBtn');
        const modal = document.getElementById('arModal');
        const selectFileBtn = document.getElementById('arSelectFileBtn');
        const fileInput = document.getElementById('arFileInput');

        // Калибровка объектов
        const calibObjects = document.querySelectorAll('.ar-calib-object');
        calibObjects.forEach(btn => {
            btn.onclick = () => {
                const objectId = btn.dataset.object;
                this.startCalibration(objectId);

                // Скрываем панель калибровки
                const panel = document.getElementById('arCalibrationPanel');
                if (panel) panel.style.display = 'none';
            };
        });

        // Пропустить калибровку
        const skipBtn = document.getElementById('arCalibSkip');
        if (skipBtn) {
            skipBtn.onclick = () => {
                const panel = document.getElementById('arCalibrationPanel');
                if (panel) panel.style.display = 'none';
                this.resetCalibration();
            };
        }

        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                this.hide();
            };
        }

        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal || e.target.classList.contains('ar-modal-overlay')) {
                    this.hide();
                }
            };
        }

        if (selectFileBtn) {
            selectFileBtn.onclick = () => {
                fileInput.click();
            };
        }

        if (fileInput) {
            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    const uploadContainer = document.getElementById('arUploadOverlayContainer');
                    const instruction = document.getElementById('arInstruction');
                    const uploadArea = document.getElementById('arUploadArea');
                    const calibPanel = document.getElementById('arCalibrationPanel');

                    await this.uploadInteriorImage(file);

                    if (uploadContainer) uploadContainer.style.display = 'block';
                    if (instruction) instruction.style.display = 'block';
                    if (uploadArea) uploadArea.style.display = 'none';
                    if (calibPanel) calibPanel.style.display = 'block';
                }
            };
        }

        document.onkeydown = (e) => {
            if (e.key === 'Escape') {
                const modalElement = document.getElementById('arModal');
                if (modalElement && modalElement.style.display !== 'none') {
                    this.hide();
                }
            }
        };
    },

    show() {
        const container = document.getElementById('ar-preview-container');
        if (container) {
            container.innerHTML = this.render();
            container.style.display = 'block';
            this.bindEvents();
            document.body.classList.add('no-scroll');
        }
    },

    hide() {
        this.resetCalibration();
        const container = document.getElementById('ar-preview-container');
        if (container) {
            container.innerHTML = '';
            container.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
        if (this.onClose) this.onClose();
    },

    selectProduct(product) {
        this.currentImage = product.images[0];
        this.currentProduct = product;
        this.setPreviewImage(product.images[0]);

        const nameSpan = document.getElementById('arSelectedName');
        if (nameSpan) {
            nameSpan.textContent = `${product.name} (${product.heightCm} см)`;
            nameSpan.style.color = '#059669';
        }

        const favoriteItems = document.querySelectorAll('.ar-favorite-item');
        favoriteItems.forEach(item => {
            const id = parseInt(item.dataset.id);
            if (id === product.id) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
};