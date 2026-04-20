<?php
session_start();

// Проверка авторизации
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo 'Unauthorized';
    exit;
}

// Получаем данные
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['products'])) {
    http_response_code(400);
    echo 'Invalid data';
    exit;
}

// Путь к файлу с данными
$dataFile = __DIR__ . '/../data/products.json';

// Создаём папку data если её нет
if (!file_exists(__DIR__ . '/../data')) {
    mkdir(__DIR__ . '/../data', 0777, true);
}

// Сохраняем данные
$result = file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($result === false) {
    http_response_code(500);
    echo 'Error saving file';
    exit;
}

// Обновляем components/products-data.js
$jsContent = "// Данные товаров — автоматически сгенерировано админкой\n";
$jsContent .= "// Последнее обновление: " . date('Y-m-d H:i:s') . "\n\n";
$jsContent .= "const productsData = " . json_encode($input['products'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . ";\n\n";
$jsContent .= "const masterClassesData = [\n";
$jsContent .= "    {\n";
$jsContent .= "        id: 1,\n";
$jsContent .= "        name: \"Живая картина из мха\",\n";
$jsContent .= "        price: 2500,\n";
$jsContent .= "        duration: \"2 часа\",\n";
$jsContent .= "        image: \"https://images.pexels.com/photos/1104579/pexels-photo-1104579.jpeg?w=600&h=400&fit=crop\",\n";
$jsContent .= "        description: \"Создайте вертикальное панно из стабилизированного мха\",\n";
$jsContent .= "        icon: \"🌿\"\n";
$jsContent .= "    },\n";
$jsContent .= "    {\n";
$jsContent .= "        id: 2,\n";
$jsContent .= "        name: \"Авторская композиция\",\n";
$jsContent .= "        price: 2800,\n";
$jsContent .= "        duration: \"2.5 часа\",\n";
$jsContent .= "        image: \"https://images.pexels.com/photos/776554/pexels-photo-776554.jpeg?w=600&h=400&fit=crop\",\n";
$jsContent .= "        description: \"Соберите букет из сухоцветов по своему вкусу\",\n";
$jsContent .= "        icon: \"💐\"\n";
$jsContent .= "    },\n";
$jsContent .= "    {\n";
$jsContent .= "        id: 3,\n";
$jsContent .= "        name: \"Керамическая ваза\",\n";
$jsContent .= "        price: 2200,\n";
$jsContent .= "        duration: \"2 часа\",\n";
$jsContent .= "        image: \"https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?w=600&h=400&fit=crop\",\n";
$jsContent .= "        description: \"Лепка из глины с последующим обжигом\",\n";
$jsContent .= "        icon: \"🏺\"\n";
$jsContent .= "    }\n";
$jsContent .= "];\n";

file_put_contents(__DIR__ . '/../components/products-data.js', $jsContent);

echo 'OK';
?>