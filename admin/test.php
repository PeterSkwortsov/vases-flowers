<?php
// test.php — проверка что PHP работает и файлы создаются
echo "<h1>Тест PHP</h1>";

// Проверяем папку data
$dataDir = __DIR__ . '/../data';
echo "<p>Папка data: " . ($dataDir) . "</p>";
echo "<p>Папка data существует: " . (file_exists($dataDir) ? 'Да' : 'Нет') . "</p>";

// Проверяем права
if (file_exists($dataDir)) {
    echo "<p>Права на папку data: " . substr(sprintf('%o', fileperms($dataDir)), -4) . "</p>";
}

// Пытаемся создать тестовый файл
$testFile = $dataDir . '/test.txt';
$testResult = file_put_contents($testFile, 'Тест ' . date('Y-m-d H:i:s'));
echo "<p>Создание тестового файла: " . ($testResult ? 'Успешно' : 'Ошибка') . "</p>";

// Проверяем components
$componentsDir = __DIR__ . '/../components';
echo "<p>Папка components существует: " . (file_exists($componentsDir) ? 'Да' : 'Нет') . "</p>";

// Текущие товары
$dataFile = $dataDir . '/products.json';
if (file_exists($dataFile)) {
    $content = file_get_contents($dataFile);
    $products = json_decode($content, true);
    echo "<p>Товаров в JSON: " . count($products['products'] ?? []) . "</p>";
} else {
    echo "<p>Файл products.json не найден</p>";
}

// Информация о PHP
echo "<p>Версия PHP: " . phpversion() . "</p>";
echo "<p>open_basedir: " . (ini_get('open_basedir') ?: 'не ограничен') . "</p>";
?>