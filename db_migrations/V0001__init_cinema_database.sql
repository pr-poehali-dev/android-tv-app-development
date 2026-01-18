-- Таблица профилей пользователей
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    avatar VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица фильмов
CREATE TABLE IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year VARCHAR(4) NOT NULL,
    rating VARCHAR(10) NOT NULL,
    image TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    quality VARCHAR(20) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица избранного (связь профиль-фильм)
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER REFERENCES profiles(id),
    movie_id INTEGER REFERENCES movies(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(profile_id, movie_id)
);

-- Вставка профилей по умолчанию
INSERT INTO profiles (name, avatar) VALUES 
('Профиль 1', '👤'),
('Профиль 2', '👨'),
('Профиль 3', '👩')
ON CONFLICT DO NOTHING;

-- Вставка фильмов по умолчанию
INSERT INTO movies (title, year, rating, image, category, quality, description) VALUES 
('Невероятные приключения Шурика', '2025', '8.2', 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Шурик', 'russian', 'HDRip', 'Современная экранизация классики советского кино'),
('Горыныч', '2025', '7.8', 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Горыныч', 'russian', 'BDRip', 'Фэнтези про русского богатыря'),
('Позывной: Альфа', '2025', '8.5', 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Альфа', 'series', 'WEB-DL', 'Боевик про элитный спецназ'),
('Ночной администратор', '2025', '8.1', 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Админ', 'series', 'HDRip', 'Детективный триллер'),
('Атака титанов: Финал', '2025', '9.1', 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Титаны', 'anime', 'WEB-DL', 'Эпический финал популярной манги'),
('Магическая битва', '2025', '8.8', 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Магия', 'anime', 'HDRip', 'Аниме про магов и проклятия'),
('Дюна: Часть третья', '2025', '8.9', 'https://via.placeholder.com/300x450/E50914/FFFFFF?text=Дюна', 'hdrip', 'HDRip', 'Продолжение космической саги'),
('Матрица: Воскрешение 2', '2025', '8.3', 'https://via.placeholder.com/300x450/1F1F1F/FFB800?text=Матрица', 'hdrip', 'BDRip', 'Продолжение культовой франшизы')
ON CONFLICT DO NOTHING;