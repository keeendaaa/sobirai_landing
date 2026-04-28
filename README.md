# SobirAI Landing

Одностраничный лендинг SobirAI. Проект собран на Vite + React.

## Быстрый старт

Установка зависимостей:
```bash
npm install
```

Запуск в режиме разработки:
```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`.

## Сборка и предпросмотр

Сборка для продакшена:
```bash
npm run build
```

Файлы сборки появятся в папке `dist`.

Просмотр продакшен‑сборки локально:
```bash
npm run preview
```

## Структура проекта

```
├── src/                 # React-компоненты, стили и утилиты
├── assets/              # Исходные изображения, SVG и видео для бандла
├── public/              # Статические файлы, копируемые в dist как есть
├── index.html           # HTML-шаблон Vite
├── vite.config.js       # Конфигурация Vite
├── tailwind.config.js   # Конфигурация Tailwind CSS
├── vercel.json          # SPA fallback для Vercel
└── package.json         # Скрипты и зависимости
```

## Шрифты

Проект использует локальные шрифты из `public/fonts`.
Пути и подключения находятся в `src/index.css` и `index.html`.

## Команды

- `npm run dev` — запуск разработки
- `npm run build` — сборка
- `npm run preview` — предпросмотр сборки
