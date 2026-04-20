// Данные товаров для всего сайта
const productsData = [
    {
        id: 1,
        name: "Лавандовое поле",
        price: 2900,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Букеты",
        packaging: "kraft",
        packagingName: "Крафт упаковка",
        packagingIcon: "📜",
        description: "Ароматная лаванда в сочетании с полевыми травами создаёт атмосферу прованса.",
        sizes: "Высота: 45-50 см, Ширина: 30-35 см",
        composition: "Лаванда, статица, гипсофила, хлопок",
        care: "Беречь от прямых солнечных лучей, не поливать"
    },
    {
        id: 2,
        name: "Осенний вальс",
        price: 3500,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Композиции",
        packaging: "vase",
        packagingName: "В кашпо",
        packagingIcon: "🏺",
        description: "Тёплые оттенки осени в изящной композиции.",
        sizes: "Высота: 40-45 см, Ширина: 35-40 см",
        composition: "Гортензия, физалис, лимониум",
        care: "Беречь от влаги, размещать вдали от отопительных приборов"
    },
    {
        id: 3,
        name: "Эко-минимализм",
        price: 2700,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Панно",
        packaging: "none",
        packagingName: "Без упаковки",
        packagingIcon: "✨",
        description: "Лаконичная композиция в эко-стиле.",
        sizes: "Высота: 35-40 см, Ширина: 25-30 см",
        composition: "Пшеница, пампасная трава, эвкалипт",
        care: "Сухое место, защищённое от прямых солнечных лучей"
    },
    {
        id: 4,
        name: "Небесная лазурь",
        price: 4200,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Букеты",
        packaging: "vase",
        packagingName: "В кашпо",
        packagingIcon: "🏺",
        description: "Нежные голубые и синие оттенки сухоцветов.",
        sizes: "Высота: 50-55 см, Ширина: 35-40 см",
        composition: "Бруния, эрмингия, эвкалипт, статица",
        care: "Оберегать от детей и домашних животных"
    },
    {
        id: 5,
        name: "Деревенский шарм",
        price: 3100,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Композиции",
        packaging: "kraft",
        packagingName: "Крафт упаковка",
        packagingIcon: "📜",
        description: "Рустикальный букет с нотками прованса.",
        sizes: "Высота: 40-45 см, Ширина: 30-35 см",
        composition: "Лаванда, хлопок, пшеница, сухоцветы",
        care: "Не требует особого ухода, сохраняет вид до 3 лет"
    },
    {
        id: 6,
        name: "Зимняя сказка",
        price: 4800,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Букеты",
        packaging: "vase",
        packagingName: "В кашпо",
        packagingIcon: "🏺",
        description: "Белоснежные и серебристые сухоцветы.",
        sizes: "Высота: 45-50 см, Ширина: 35-40 см",
        composition: "Лунулария, хлопок, гипсофила, бессмертник",
        care: "Размещать в сухом проветриваемом месте"
    },
    {
        id: 7,
        name: "Ботанический сад",
        price: 3900,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Композиции",
        packaging: "none",
        packagingName: "Без упаковки",
        packagingIcon: "✨",
        description: "Микс из разнообразных сухоцветов.",
        sizes: "Высота: 55-60 см, Ширина: 40-45 см",
        composition: "Разнотравье, декоративные злаки",
        care: "Избегать попадания прямых солнечных лучей"
    },
    {
        id: 8,
        name: "Розовый закат",
        price: 3400,
        images: ["images/flowwers1.jpg", "images/flowwers2.jpg", "images/flowwers3.jpg"],
        category: "Букеты",
        packaging: "kraft",
        packagingName: "Крафт упаковка",
        packagingIcon: "📜",
        description: "Нежные розовые и пудровые оттенки.",
        sizes: "Высота: 40-45 см, Ширина: 30-35 см",
        composition: "Гортензия, розовые сухоцветы, статица",
        care: "Хранить в сухом месте"
    }
];

const masterClassesData = [
    {
        id: 1,
        name: "Живая картина из мха",
        price: 2500,
        duration: "2 часа",
        image: "https://images.pexels.com/photos/1104579/pexels-photo-1104579.jpeg?w=600&h=400&fit=crop",
        description: "Создайте вертикальное панно из стабилизированного мха",
        icon: "🌿"
    },
    {
        id: 2,
        name: "Авторская композиция",
        price: 2800,
        duration: "2.5 часа",
        image: "https://images.pexels.com/photos/776554/pexels-photo-776554.jpeg?w=600&h=400&fit=crop",
        description: "Соберите букет из сухоцветов по своему вкусу",
        icon: "💐"
    },
    {
        id: 3,
        name: "Керамическая ваза",
        price: 2200,
        duration: "2 часа",
        image: "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?w=600&h=400&fit=crop",
        description: "Лепка из глины с последующим обжигом",
        icon: "🏺"
    }
];