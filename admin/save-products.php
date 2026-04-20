<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Простая защита через секретный ключ
$SECRET_KEY = 'EverGreen2024';

// Проверяем ключ
$isAuthorized = false;

if (isset($_GET['key']) && $_GET['key'] === $SECRET_KEY) {
    $isAuthorized = true;
}

if (isset($_POST['key']) && $_POST['key'] === $SECRET_KEY) {
    $isAuthorized = true;
}

$headers = getallheaders();
if (isset($headers['X-Auth-Key']) && $headers['X-Auth-Key'] === $SECRET_KEY) {
    $isAuthorized = true;
}

if (!$isAuthorized) {
    http_response_code(401);
    echo 'Unauthorized';
    exit;
}

// Получаем данные
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['products'])) {
    http_response_code(400);
    echo 'Invalid data: products array not found';
    exit;
}

// 1. Сохраняем в data/products.json
$dataDir = __DIR__ . '/../data';
$dataFile = $dataDir . '/products.json';

if (!file_exists($dataDir)) {
    mkdir($dataDir, 0777, true);
}

$jsonResult = file_put_contents($dataFile, json_encode($input, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($jsonResult === false) {
    http_response_code(500);
    echo 'Error saving products.json';
    exit;
}

// 2. Обновляем components/products-data.js
$componentsDir = __DIR__ . '/../components';
if (!file_exists($componentsDir)) {
    mkdir($componentsDir, 0777, true);
}

// Формируем JS файл
$jsContent = "// Данные товаров — автоматически сгенерировано админкой\n";
$jsContent .= "// Последнее обновление: " . date('Y-m-d H:i:s') . "\n\n";
$jsContent .= "const productsData = " . json_encode($input['products'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . ";\n\n";

// Добавляем мастер-классы (они не меняются через админку)
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

$jsResult = file_put_contents($componentsDir . '/products-data.js', $jsContent);

if ($jsResult === false) {
    http_response_code(500);
    echo 'Products saved but failed to update JS file';
    exit;
}

echo 'OK';
?>