-- Добавляем системного пользователя
INSERT INTO users (id, name, email, role) 
VALUES (1, 'Система', 'system@voting.ru', 'system')
ON CONFLICT (email) DO NOTHING;