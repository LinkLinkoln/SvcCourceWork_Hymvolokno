# Используем официальный образ Node.js как базовый
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта в контейнер
COPY . .

# Открываем порт для приложения (замените 3000 на нужный)
EXPOSE 3000

# Запускаем сервер
CMD ["node", "/usr/src/app/server.js"]
