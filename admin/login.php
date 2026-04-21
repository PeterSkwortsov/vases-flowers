<?php
// Простая авторизация через GET параметр
$ADMIN_PASSWORD = 'peter';

// Если уже есть ключ в URL, перенаправляем в админку
if (isset($_GET['key']) && $_GET['key'] === $ADMIN_PASSWORD) {
    header('Location: index.html?key=' . $ADMIN_PASSWORD);
    exit;
}

// Если отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = $_POST['password'] ?? '';
    if ($password === $ADMIN_PASSWORD) {
        header('Location: index.html?key=' . $ADMIN_PASSWORD);
        exit;
    } else {
        $error = 'Неверный пароль';
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Вход в админку — EverGreen</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Montserrat', sans-serif;
            background: linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #ecfeff 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .login-container {
            background: white;
            border-radius: 24px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .login-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }
        .login-title {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            color: #064e3b;
            margin-bottom: 8px;
        }
        .input-group {
            margin-bottom: 24px;
            text-align: left;
        }
        .input-group label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: #374151;
            margin-bottom: 8px;
        }
        .input-group input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            font-size: 16px;
            font-family: 'Montserrat', sans-serif;
        }
        .input-group input:focus {
            outline: none;
            border-color: #059669;
            box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
        .login-btn {
            width: 100%;
            background: #059669;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 9999px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
        }
        .login-btn:hover {
            background: #047857;
        }
        .error-message {
            background: #fef2f2;
            color: #dc2626;
            padding: 12px;
            border-radius: 12px;
            font-size: 14px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-icon">🔐</div>
        <h1 class="login-title">Вход в админку</h1>
        
        <?php if (isset($error)): ?>
            <div class="error-message"><?php echo $error; ?></div>
        <?php endif; ?>
        
        <form method="POST">
            <div class="input-group">
                <label>Пароль</label>
                <input type="password" name="password" placeholder="Введите пароль" required autofocus>
            </div>
            <button type="submit" class="login-btn">Войти</button>
        </form>
    </div>
</body>
</html>