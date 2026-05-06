CREATE DATABASE hotel_reservas;
USE hotel_reservas;

-- 👤 USUÁRIOS
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM ('FUNCIONARIO', 'CLIENTE') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 🛏 TIPOS DE QUARTO
CREATE TABLE tipos_quarto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome ENUM ('SIMPLES', 'DUPLO', 'SUITE') NOT NULL,
    descricao TEXT,
    capacidade INT NOT NULL
);

-- 💰 PREÇOS POR TEMPORADA
CREATE TABLE precos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_quarto_id INT,
    data_inicio DATE,
    data_fim DATE,
    valor DECIMAL(10,2),

    FOREIGN KEY (tipo_quarto_id) REFERENCES tipos_quarto(id)
);

-- 🚪 QUARTOS
CREATE TABLE quartos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL UNIQUE,
    tipo_id INT NOT NULL,
    status ENUM ('DISPONIVEL', 'MANUTENCAO') DEFAULT 'DISPONIVEL',

    FOREIGN KEY (tipo_id) REFERENCES tipos_quarto(id)
);

-- 📅 RESERVAS (SEM bloquear diretamente o quarto permanentemente)
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    data_checkin DATE NOT NULL,
    data_checkout DATE NOT NULL,
    status ENUM ('ATIVA', 'CANCELADA', 'FINALIZADA') DEFAULT 'ATIVA',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 🔗 RELAÇÃO RESERVA x QUARTO (permite flexibilidade)
CREATE TABLE reserva_quartos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT,
    quarto_id INT,

    FOREIGN KEY (reserva_id) REFERENCES reservas(id),
    FOREIGN KEY (quarto_id) REFERENCES quartos(id)
);

-- 📊 MOVIMENTAÇÕES (ESSENCIAL)
CREATE TABLE movimentacoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    tipo ENUM ('CHECKIN', 'CHECKOUT', 'RESERVA', 'CANCELAMENTO', 'MANUTENCAO'),
    descricao TEXT,
    reserva_id INT,
    data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 🚨 ALERTAS
CREATE TABLE alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensagem TEXT,
    tipo ENUM ('BAIXA_DISPONIBILIDADE', 'OVERBOOKING'),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER $$

CREATE TRIGGER trg_reserva_insert
AFTER INSERT ON reservas
FOR EACH ROW
BEGIN
    INSERT INTO movimentacoes (usuario_id, tipo, descricao, reserva_id)
    VALUES (NEW.usuario_id, 'RESERVA', 'Reserva criada', NEW.id);
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_cancelamento
AFTER UPDATE ON reservas
FOR EACH ROW
BEGIN
    IF NEW.status = 'CANCELADA' THEN
        INSERT INTO movimentacoes (usuario_id, tipo, descricao, reserva_id)
        VALUES (NEW.usuario_id, 'CANCELAMENTO', 'Reserva cancelada', NEW.id);
    END IF;
END$$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER trg_alerta
AFTER INSERT ON reserva_quartos
FOR EACH ROW
BEGIN
    DECLARE total INT;
    DECLARE ocupados INT;

    SELECT COUNT(*) INTO total FROM quartos;

    SELECT COUNT(DISTINCT quarto_id)
    INTO ocupados
    FROM reserva_quartos rq
    JOIN reservas r ON r.id = rq.reserva_id
    WHERE r.status = 'ATIVA'
    AND CURDATE() BETWEEN r.data_checkin AND r.data_checkout;

    IF (total - ocupados) <= 2 THEN
        INSERT INTO alertas (mensagem, tipo)
        VALUES ('Poucos quartos disponíveis hoje', 'BAIXA_DISPONIBILIDADE');
    END IF;

END$$

DELIMITER ;

ALTER TABLE movimentacoes 
MODIFY tipo ENUM(
  'LOGIN',
  'CADASTRO',
  'REQUEST',
  'RESERVA',
  'CANCELAMENTO',
  'CHECKIN',
  'CHECKOUT',
  'OVERBOOKING_TENTATIVA'
);

SELECT * FROM movimentacoes
WHERE usuario_id = 1
ORDER BY data_operacao DESC;

SELECT * FROM movimentacoes
WHERE tipo = 'OVERBOOKING_TENTATIVA';

SELECT * FROM movimentacoes
ORDER BY data_operacao DESC
LIMIT 50;