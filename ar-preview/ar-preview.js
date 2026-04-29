const ARPreview = {
    stream: null,
    currentImage: null,
    currentProduct: null,
    video: null,
    isActive: false,
    onClose: null,
    interiorImage: null,
    favorites: [],

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
                    <div class="ar-favorite-item" data-id="${product.id}" data-image="${product.images[0]}" data-name="${product.name}">
                        <img src="${product.images[0]}" alt="${product.name}" class="ar-favorite-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                        <div class="ar-favorite-info">
                            <div class="ar-favorite-name">${product.name}</div>
                            <div class="ar-favorite-price">${product.price} ₽</div>
                        </div>
                    </div>
                `).join('');

                const items = document.querySelectorAll('.ar-favorite-item');
                items.forEach(item => {
                    item.onclick = () => {
                        const id = parseInt(item.dataset.id);
                        const image = item.dataset.image;
                        const name = item.dataset.name;

                        items.forEach(fi => fi.classList.remove('active'));
                        item.classList.add('active');

                        this.currentImage = image;
                        this.currentProduct = { id, name, images: [image] };
                        this.setImage(image);

                        const selectedName = document.getElementById('arSelectedName');
                        if (selectedName) {
                            selectedName.textContent = name;
                            selectedName.style.color = '#059669';
                        }
                    };
                });
            } else {
                favoritesListElement.innerHTML = '<div class="ar-no-favorites">😢 Нет избранных композиций<br><small>Добавьте товары в избранное (нажмите на сердечко) и вернитесь сюда</small></div>';
            }
        }
    },

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });

            const videoElement = document.getElementById('arVideo');
            if (videoElement) {
                videoElement.srcObject = this.stream;
                videoElement.play();
                this.video = videoElement;
                this.isActive = true;
            }
        } catch (err) {
            console.error('Ошибка доступа к камере:', err);
            alert('Не удалось получить доступ к камере. Пожалуйста, разрешите доступ.');
        }
    },

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.isActive = false;
    },

    setImage(imageUrl) {
        this.currentImage = imageUrl;
        const imgElement = document.getElementById('arOverlayImage');
        const uploadImgElement = document.getElementById('arUploadOverlayImage');
        if (imgElement && imageUrl) {
            imgElement.src = imageUrl;
            imgElement.style.display = 'block';
        }
        if (uploadImgElement && imageUrl) {
            uploadImgElement.src = imageUrl;
            uploadImgElement.style.display = 'block';
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
                const imgElement = document.getElementById('arInteriorImage');
                if (imgElement) {
                    imgElement.src = this.interiorImage;
                    imgElement.style.display = 'block';
                }
                resolve(this.interiorImage);
            };
            reader.onerror = () => reject('Ошибка загрузки файла');
            reader.readAsDataURL(file);
        });
    },

    placeImageWithScale(event) {
        if (!this.currentImage) {
            alert('Сначала выберите композицию из избранного (нажмите на сердечко в карточке товара)');
            return;
        }

        const container = document.getElementById('arOverlayContainer');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        let x, y;
        if (event.touches) {
            const touch = event.touches[0];
            x = touch.clientX - containerRect.left;
            y = touch.clientY - containerRect.top;
        } else {
            x = event.clientX - containerRect.left;
            y = event.clientY - containerRect.top;
        }

        x = Math.min(Math.max(x, 20), containerRect.width - 20);
        y = Math.min(Math.max(y, 20), containerRect.height - 20);

        this.createPlaceableImage(x, y, container);
    },

    placeImageOnUpload(event) {
        if (!this.currentImage) {
            alert('Сначала выберите композицию из избранного (нажмите на сердечко в карточке товара)');
            return;
        }

        const container = document.getElementById('arUploadOverlayContainer');
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        let x, y;
        if (event.touches) {
            const touch = event.touches[0];
            x = touch.clientX - containerRect.left;
            y = touch.clientY - containerRect.top;
        } else {
            x = event.clientX - containerRect.left;
            y = event.clientY - containerRect.top;
        }

        x = Math.min(Math.max(x, 20), containerRect.width - 20);
        y = Math.min(Math.max(y, 20), containerRect.height - 20);

        this.createPlaceableImage(x, y, container);
    },

    createPlaceableImage(x, y, container) {
        // Создаём обертку для изображения
        const wrapper = document.createElement('div');
        wrapper.className = 'ar-image-wrapper';
        wrapper.style.position = 'absolute';
        wrapper.style.left = (x - 60) + 'px';
        wrapper.style.top = (y - 60) + 'px';
        wrapper.style.width = '120px';
        wrapper.style.height = '120px';
        wrapper.style.cursor = 'grab';
        wrapper.style.userSelect = 'none';

        const img = document.createElement('img');
        img.src = this.currentImage;
        img.className = 'ar-placed-image';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.pointerEvents = 'none';
        img.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))';

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
        resizeHandle.style.boxShadow = '0 2px 8px rgba(0,0,0,0.25)';
        resizeHandle.style.display = 'flex';
        resizeHandle.style.alignItems = 'center';
        resizeHandle.style.justifyContent = 'center';
        resizeHandle.style.fontSize = '14px';
        resizeHandle.style.zIndex = '25';

        // Переменные для drag-and-drop
        let isDragging = false;
        let dragStartX, dragStartY, startLeft, startTop;

        // Переменные для resize
        let isResizing = false;
        let resizeStartX, resizeStartY, startWidth, startHeight;

        // Обработчики drag
        const startDrag = (clientX, clientY) => {
            isDragging = true;
            dragStartX = clientX;
            dragStartY = clientY;
            startLeft = parseInt(wrapper.style.left);
            startTop = parseInt(wrapper.style.top);
            wrapper.style.cursor = 'grabbing';
            wrapper.style.transition = 'none';
        };

        const onDragMove = (clientX, clientY) => {
            if (!isDragging) return;
            const dx = clientX - dragStartX;
            const dy = clientY - dragStartY;
            let newLeft = startLeft + dx;
            let newTop = startTop + dy;

            // Ограничения по границам контейнера
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

        // Обработчики resize
        const startResize = (clientX, clientY) => {
            isResizing = true;
            resizeStartX = clientX;
            resizeStartY = clientY;
            startWidth = parseInt(wrapper.style.width);
            startHeight = parseInt(wrapper.style.height);
            wrapper.style.transition = 'none';
        };

        const onResizeMove = (clientX, clientY) => {
            if (!isResizing) return;
            const dx = clientX - resizeStartX;
            const dy = clientY - resizeStartY;
            const newWidth = Math.max(60, Math.min(400, startWidth + dx));
            const newHeight = newWidth; // Сохраняем пропорции

            wrapper.style.width = newWidth + 'px';
            wrapper.style.height = newHeight + 'px';
        };

        const stopResize = () => {
            isResizing = false;
        };

        // Mouse события
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

        // Touch события для мобильных
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
        });

        wrapper.appendChild(img);
        wrapper.appendChild(resizeHandle);
        wrapper.appendChild(deleteBtn);
        container.appendChild(wrapper);
    },

    render() {
        const favoritesListHtml = this.favorites.length > 0
            ? this.favorites.map(product => `
                <div class="ar-favorite-item" data-id="${product.id}" data-image="${product.images[0]}" data-name="${product.name}">
                    <img src="${product.images[0]}" alt="${product.name}" class="ar-favorite-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e8f5e9\'/%3E%3Ctext x=\'50\' y=\'55\' text-anchor=\'middle\' fill=\'%232e7d32\' font-size=\'12\'%3E🌾%3C/text%3E%3C/svg%3E'">
                    <div class="ar-favorite-info">
                        <div class="ar-favorite-name">${product.name}</div>
                        <div class="ar-favorite-price">${product.price} ₽</div>
                    </div>
                </div>
            `).join('')
            : '<div class="ar-no-favorites">😢 Нет избранных композиций<br><small>Добавьте товары в избранное (нажмите на сердечко) и вернитесь сюда</small></div>';

        return `
            <div class="ar-modal" id="arModal" style="display: flex;">
                <div class="ar-modal-overlay"></div>
                <div class="ar-modal-content">
                    <div class="ar-header">
                        <h3 class="ar-title">📷 Примерка в интерьере</h3>
                        <button class="ar-close" id="arCloseBtn">✕</button>
                    </div>
                    
                    <div class="ar-favorites-section">
                        <div class="ar-favorites-title">⭐ Ваши избранные композиции</div>
                        <div class="ar-favorites-list" id="arFavoritesList">
                            ${favoritesListHtml}
                        </div>
                    </div>
                    
                    <div class="ar-tabs">
                        <button class="ar-tab active" data-tab="camera">📷 Камера</button>
                        <button class="ar-tab" data-tab="upload">🖼️ Загрузить фото</button>
                    </div>
                    
                    <div class="ar-tab-content active" id="tabCamera">
                        <div class="ar-camera-container">
                            <div id="arOverlayContainer" class="ar-overlay-container">
                                <video id="arVideo" class="ar-video" autoplay playsinline></video>
                                <img id="arOverlayImage" class="ar-overlay-image" style="display: none;" alt="Композиция для примерки">
                            </div>
                            <div class="ar-instruction">
                                <p>📱 Наведите камеру на место в интерьере</p>
                                <p>👆 Кликните по экрану, чтобы разместить композицию</p>
                                <p>🖱️ Перетащите изображение пальцем или мышкой</p>
                                <p>↘️ Потяните за уголок, чтобы изменить размер</p>
                                <p>✕ Нажмите на крестик, чтобы удалить</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ar-tab-content" id="tabUpload">
                        <div class="ar-upload-container">
                            <div id="arUploadOverlayContainer" class="ar-overlay-container">
                                <img id="arInteriorImage" class="ar-interior-image" style="display: none;" alt="Интерьер">
                                <img id="arUploadOverlayImage" class="ar-overlay-image" style="display: none;" alt="Композиция для примерки">
                            </div>
                            <div class="ar-upload-area" id="arUploadArea">
                                <input type="file" id="arFileInput" accept="image/*" style="display: none;">
                                <button class="ar-upload-btn" id="arSelectFileBtn">📁 Выбрать фото интерьера</button>
                                <p class="ar-upload-hint">Загрузите фото комнаты, стены или полки</p>
                            </div>
                            <div class="ar-instruction ar-upload-instruction" style="display: none;" id="arUploadInstruction">
                                <p>👆 Кликните по изображению, чтобы разместить композицию</p>
                                <p>🖱️ Перетащите изображение пальцем или мышкой</p>
                                <p>↘️ Потяните за уголок, чтобы изменить размер</p>
                                <p>✕ Нажмите на крестик, чтобы удалить</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ar-footer">
                        <button id="arStartBtn" class="ar-start-btn">📷 Запустить камеру</button>
                        <button id="arStopBtn" class="ar-stop-btn" style="display: none;">⏹️ Остановить</button>
                    </div>
                    
                    <div class="ar-selected">
                        <span>Выбранная композиция:</span>
                        <span id="arSelectedName" class="ar-selected-name">${this.currentProduct ? this.currentProduct.name : 'Не выбрана'}</span>
                    </div>
                </div>
            </div>
        `;
    },

    bindEvents() {
        const closeBtn = document.getElementById('arCloseBtn');
        const startBtn = document.getElementById('arStartBtn');
        const stopBtn = document.getElementById('arStopBtn');
        const modal = document.getElementById('arModal');
        const tabs = document.querySelectorAll('.ar-tab');
        const selectFileBtn = document.getElementById('arSelectFileBtn');
        const fileInput = document.getElementById('arFileInput');

        const favoriteItems = document.querySelectorAll('.ar-favorite-item');
        favoriteItems.forEach(item => {
            item.onclick = () => {
                const id = parseInt(item.dataset.id);
                const image = item.dataset.image;
                const name = item.dataset.name;

                favoriteItems.forEach(fi => fi.classList.remove('active'));
                item.classList.add('active');

                this.currentImage = image;
                this.currentProduct = { id, name, images: [image] };
                this.setImage(image);

                const selectedName = document.getElementById('arSelectedName');
                if (selectedName) {
                    selectedName.textContent = name;
                    selectedName.style.color = '#059669';
                }
            };
        });

        tabs.forEach(tab => {
            tab.onclick = () => {
                const tabId = tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                document.querySelectorAll('.ar-tab-content').forEach(content => {
                    content.classList.remove('active');
                });

                if (tabId === 'camera') {
                    document.getElementById('tabCamera').classList.add('active');
                } else {
                    document.getElementById('tabUpload').classList.add('active');
                    this.stopCamera();
                    if (startBtn) startBtn.style.display = 'block';
                    if (stopBtn) stopBtn.style.display = 'none';
                }
            };
        });

        if (closeBtn) {
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                this.stopCamera();
                this.hide();
            };
        }

        if (modal) {
            modal.onclick = (e) => {
                if (e.target === modal || e.target.classList.contains('ar-modal-overlay')) {
                    this.stopCamera();
                    this.hide();
                }
            };
        }

        if (startBtn) {
            startBtn.onclick = async () => {
                await this.startCamera();
                startBtn.style.display = 'none';
                if (stopBtn) stopBtn.style.display = 'block';
            };
        }

        if (stopBtn) {
            stopBtn.onclick = () => {
                this.stopCamera();
                startBtn.style.display = 'block';
                stopBtn.style.display = 'none';
            };
        }

        const cameraContainer = document.getElementById('arOverlayContainer');
        if (cameraContainer) {
            cameraContainer.onclick = (e) => {
                if (e.target === cameraContainer || e.target.id === 'arOverlayContainer') {
                    this.placeImageWithScale(e);
                }
            };
            cameraContainer.ontouchstart = (e) => {
                if (e.target === cameraContainer || e.target.id === 'arOverlayContainer') {
                    e.preventDefault();
                    this.placeImageWithScale(e);
                }
            };
        }

        const uploadContainer = document.getElementById('arUploadOverlayContainer');
        if (uploadContainer) {
            uploadContainer.onclick = (e) => {
                if (e.target === uploadContainer || e.target.id === 'arUploadOverlayContainer') {
                    this.placeImageOnUpload(e);
                }
            };
            uploadContainer.ontouchstart = (e) => {
                if (e.target === uploadContainer || e.target.id === 'arUploadOverlayContainer') {
                    e.preventDefault();
                    this.placeImageOnUpload(e);
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
                    const uploadInstruction = document.getElementById('arUploadInstruction');
                    const uploadAreaDiv = document.getElementById('arUploadArea');

                    await this.uploadInteriorImage(file);

                    if (uploadContainer) {
                        uploadContainer.style.display = 'block';
                    }
                    if (uploadInstruction) {
                        uploadInstruction.style.display = 'block';
                    }
                    if (uploadAreaDiv) {
                        uploadAreaDiv.style.display = 'none';
                    }
                }
            };
        }

        document.onkeydown = (e) => {
            if (e.key === 'Escape') {
                const modalElement = document.getElementById('arModal');
                if (modalElement && modalElement.style.display !== 'none') {
                    this.stopCamera();
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
        this.stopCamera();
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
        this.setImage(product.images[0]);

        const nameSpan = document.getElementById('arSelectedName');
        if (nameSpan) {
            nameSpan.textContent = product.name;
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