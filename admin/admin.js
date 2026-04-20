// Данные
let products = [];

// Опции упаковки
const packagingOptions = {
    'kraft': { name: 'Крафт упаковка', icon: '📜' },
    'vase': { name: 'В кашпо', icon: '🏺' },
    'none': { name: 'Без упаковки', icon: '✨' }
};

// Загрузка данных
async function loadProducts() {
    try {
        const response = await fetch('../data/products.json');
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

    try {
        const response = await fetch('save-products.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ products: products })
        });

        const result = await response.text();

        if (result === 'OK') {
            saveStatus.textContent = '✓ Сохранено!';
            saveStatus.className = 'save-status success';
            setTimeout(() => {
                saveStatus.textContent = '';
            }, 3000);
        } else {
            throw new Error(result);
        }
    } catch (error) {
        saveStatus.textContent = '✗ Ошибка сохранения';
        saveStatus.className = 'save-status error';
        console.error(error);
    }
}

// Добавление товара
function addProduct() {
    const newId = Math.max(0, ...products.map(p => p.id), 0) + 1;
    products.push({
        id: newId,
        name: 'Новый товар',
        price: 0,
        images: ['images/flowwers1.jpg', 'images/flowwers2.jpg', 'images/flowwers3.jpg'],
        category: 'Букеты',
        packaging: 'kraft',
        packagingName: 'Крафт упаковка',
        packagingIcon: '📜',
        description: 'Описание товара',
        sizes: 'Высота: 40-50 см',
        composition: 'Сухоцветы',
        care: 'Беречь от прямых солнечных лучей'
    });
    renderProducts();
}

// Удаление товара
function deleteProduct(index) {
    if (confirm('Удалить товар?')) {
        products.splice(index, 1);
        renderProducts();
    }
}

// Обновление поля товара
function updateProduct(index, field, value) {
    products[index][field] = value;
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

    if (products.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 60px; color: #6b7280;">Нет товаров. Нажмите "Добавить товар"</div>';
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
                        <option value="Букеты" ${product.category === 'Букеты' ? 'selected' : ''}>Букеты</option>
                        <option value="Композиции" ${product.category === 'Композиции' ? 'selected' : ''}>Композиции</option>
                        <option value="Панно" ${product.category === 'Панно' ? 'selected' : ''}>Панно</option>
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
                    <textarea onchange="updateProduct(${index}, 'description', this.value)">${escapeHtml(product.description)}</textarea>
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
                </div>
            </div>
        </div>
    `).join('');
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
    loadProducts();

    document.getElementById('addProductBtn').addEventListener('click', addProduct);
    document.getElementById('saveAllBtn').addEventListener('click', saveProducts);
});

// Делаем функции глобальными для onclick
window.deleteProduct = deleteProduct;
window.updateProduct = updateProduct;
window.updatePackaging = updatePackaging;
window.addImage = addImage;
window.removeImage = removeImage;