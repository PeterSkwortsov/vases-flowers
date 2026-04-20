// Данные
let products = [];

// Секретный ключ (должен совпадать с PHP)
const SECRET_KEY = 'EverGreen2024';

// Опции упаковки
const packagingOptions = {
    'kraft': { name: 'Крафт упаковка', icon: '📜' },
    'vase': { name: 'В кашпо', icon: '🏺' },
    'none': { name: 'Без упаковки', icon: '✨' }
};

// Категории
const categories = ['Букеты', 'Композиции', 'Панно'];

// Загрузка данных
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json?_=' + Date.now());
        if (!response.ok) {
            throw new Error('Файл не найден');
        }
        const data = await response.json();
        products = data.products || [];
        renderProducts();
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        products = [];
        renderProducts();
    }
}

// Сохранение данных
async function saveProducts() {
    const saveStatus = document.getElementById('saveStatus');
    saveStatus.textContent = 'Сохранение...';
    saveStatus.className = 'save-status';

    console.log('Отправляем товары:', products.length);

    try {
        const response = await fetch('save-products.php?key=' + SECRET_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products: products })
        });

        const result = await response.text();
        console.log('Ответ сервера:', result);

        if (result === 'OK') {
            saveStatus.textContent = '✓ Сохранено! Товаров: ' + products.length;
            saveStatus.className = 'save-status success';
            setTimeout(() => {
                saveStatus.textContent = '';
            }, 3000);
        } else {
            throw new Error(result);
        }
    } catch (error) {
        saveStatus.textContent = '✗ Ошибка: ' + error.message;
        saveStatus.className = 'save-status error';
        console.error(error);
    }
}

// Добавление товара
function addProduct() {
    const newId = Math.max(0, ...products.map(p => p.id), 0) + 1;
    const newProduct = {
        id: newId,
        name: 'Новый товар',
        price: 1000,
        images: ['images/flowwers1.jpg'],
        category: 'Букеты',
        packaging: 'kraft',
        packagingName: 'Крафт упаковка',
        packagingIcon: '📜',
        description: 'Добавьте описание товара',
        sizes: 'Высота: 40-50 см, Ширина: 30-35 см',
        composition: 'Сухоцветы',
        care: 'Беречь от прямых солнечных лучей'
    };
    products.push(newProduct);
    console.log('Добавлен товар:', newProduct);
    renderProducts();
    // Автоматически сохраняем после добавления
    saveProducts();
}

// Удаление товара
function deleteProduct(index) {
    if (confirm('Удалить товар?')) {
        const deleted = products.splice(index, 1);
        console.log('Удалён товар:', deleted[0]);
        renderProducts();
        // Автоматически сохраняем после удаления
        saveProducts();
    }
}

// Обновление поля товара
function updateProduct(index, field, value) {
    products[index][field] = value;
    console.log(`Обновлён товар ${index}, поле ${field}:`, value);
}

// Обновление упаковки
function updatePackaging(index, value) {
    products[index].packaging = value;
    products[index].packagingName = packagingOptions[value].name;
    products[index].packagingIcon = packagingOptions[value].icon;
    renderProducts();
}

// Добавление изображения
function addImage(index) {
    const newImage = prompt('Введите путь к изображению (например: images/flowwers1.jpg):');
    if (newImage && newImage.trim()) {
        products[index].images.push(newImage.trim());
        renderProducts();
    }
}

// Удаление изображения
function removeImage(productIndex, imageIndex) {
    if (products[productIndex].images.length > 1) {
        products[productIndex].images.splice(imageIndex, 1);
        renderProducts();
    } else {
        alert('У товара должно быть хотя бы одно изображение');
    }
}

// Рендер всех товаров
function renderProducts() {
    const container = document.getElementById('productsList');

    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 60px; color: #6b7280;">📦 Нет товаров. Нажмите "Добавить товар"</div>';
        return;
    }

    container.innerHTML = products.map((product, index) => `
        <div class="product-card">
            <div class="product-header">
                <span class="product-id">ID: ${product.id}</span>
                <button class="delete-product" onclick="deleteProduct(${index})">🗑 Удалить</button>
            </div>
            
            <div class="product-form">
                <div class="form-group">
                    <label>Название</label>
                    <input type="text" value="${escapeHtml(product.name)}" onchange="updateProduct(${index}, 'name', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Цена (₽)</label>
                    <input type="number" value="${product.price}" onchange="updateProduct(${index}, 'price', parseInt(this.value))">
                </div>
                
                <div class="form-group">
                    <label>Категория</label>
                    <select onchange="updateProduct(${index}, 'category', this.value)">
                        ${categories.map(cat => `<option value="${cat}" ${product.category === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Упаковка</label>
                    <select class="packaging-select" onchange="updatePackaging(${index}, this.value)">
                        <option value="kraft" ${product.packaging === 'kraft' ? 'selected' : ''}>📜 Крафт упаковка</option>
                        <option value="vase" ${product.packaging === 'vase' ? 'selected' : ''}>🏺 В кашпо</option>
                        <option value="none" ${product.packaging === 'none' ? 'selected' : ''}>✨ Без упаковки</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>Размеры</label>
                    <input type="text" value="${escapeHtml(product.sizes)}" onchange="updateProduct(${index}, 'sizes', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Состав</label>
                    <input type="text" value="${escapeHtml(product.composition)}" onchange="updateProduct(${index}, 'composition', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Уход</label>
                    <input type="text" value="${escapeHtml(product.care)}" onchange="updateProduct(${index}, 'care', this.value)">
                </div>
                
                <div class="form-group">
                    <label>Описание</label>
                    <textarea onchange="updateProduct(${index}, 'description', this.value)" rows="3">${escapeHtml(product.description)}</textarea>
                </div>
                
                <div class="form-group images-group">
                    <label>Изображения</label>
                    <div class="images-list">
                        ${product.images.map((img, imgIndex) => `
                            <div class="image-item">
                                <img src="${img}" alt="Фото" onerror="this.src='https://placehold.co/200x200/e8f5e9/2e7d32?text=🌾'">
                                <button class="remove-image" onclick="removeImage(${index}, ${imgIndex})">✕</button>
                            </div>
                        `).join('')}
                        <button class="add-image-btn" onclick="addImage(${index})">+ Добавить фото</button>
                    </div>
                    ${product.images.length === 0 ? '<p style="font-size: 12px; color: #9ca3af; margin-top: 8px;">⚠️ Фото не добавлены. Добавьте хотя бы одно фото.</p>' : ''}
                </div>
            </div>
        </div>
    `).join('');

    // Обновляем счётчик товаров
    const saveStatus = document.getElementById('saveStatus');
    if (saveStatus && saveStatus.textContent.includes('Сохранено')) {
        // Не обновляем, если только что сохранили
    } else {
        console.log('Всего товаров в админке:', products.length);
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function (m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    console.log('Админка загружена');
    loadProducts();

    const addBtn = document.getElementById('addProductBtn');
    if (addBtn) {
        addBtn.addEventListener('click', addProduct);
    }

    const saveBtn = document.getElementById('saveAllBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProducts);
    }
});

// Делаем функции глобальными для onclick
window.deleteProduct = deleteProduct;
window.updateProduct = updateProduct;
window.updatePackaging = updatePackaging;
window.addImage = addImage;
window.removeImage = removeImage;
window.addProduct = addProduct;
window.saveProducts = saveProducts;