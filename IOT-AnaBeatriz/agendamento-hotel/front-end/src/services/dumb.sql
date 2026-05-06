CREATE DATABASE hotel_reservas;

USE hotel_reservas;

CREATE TABLE usuarios (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(150) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
senha VARCHAR(150) NOT NULL,
tipo ENUM ('Funcionario', 'Cliente')
);

CREATE TABLE tipos_quarto(
id INT AUTO_INCREMENT PRIMARY KEY,
quarto ENUM ('SIMPLES', 'DUPLO', 'SUITE') NOT NULL,
descricao TEXT
);

CREATE TABLE quartos(
id INT AUTO_INCREMENT PRIMARY KEY,
numero INT NOT NULL,
tipo_id INT NOT NULL,
status ENUM ('DISPONIVEL', 'OCUPADO', 'EM MANUTENÇÃO') DEFAULT'DISPONIVEL',
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (tipo_id) REFERENCES tipos_quarto(id)
);

CREATE TABLE reservas(
id INT AUTO_INCREMENT PRIMARY KEY,
usuario_id INT NOT NULL,
quarto_id INT NOT NULL,
data_chekin DATE NOT NULL,
data_checkout DATE NOT NULL,
status ENUM ('ATIVA', 'CANCELADA', 'FINALIZADA') DEFAULT 'ATIVA',
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
FOREIGN KEY (quarto_id) REFERENCES quartos(id)
);

CREATE TABLE alertas(
id INT AUTO_INCREMENT PRIMARY KEY,
mensagem TEXT,
tipo ENUM ('BAIXA_DISPONBILIDADE', 'OVERBOOKING'),
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE historico (
id INT AUTO_INCREMENT PRIMARY KEY,
usuario_id INT,
acao VARCHAR(150),
tabela_afetada VARCHAR(150),
registro_id INT,
data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

DELIMITER $$

CREATE TRIGGER trg_reserva_insert AFTER INSERT ON reservas FOR EACH ROW BEGIN
INSERT INTO historico (usuario_id, acao, tabela_afetada, registro_id)
VALUES (NEW.usuario_id ('CRIACAO_RESERVA', 'RESERVAS'), NEW.id);
END$$


DELIMITER $$

CREATE TRIGGER trg_ocupar_quarto AFTER INSERT ON reservas FOR EACH ROW BEGIN
UPDATE quartos
SET stats = 'OCUPADO'
WHERE id = NEW.quarto.id;
END$$


DELIMITER $$

CREATE TRIGGER trg_alerta_disponibilidade AFTER INSERT ON reservas FOR EACH ROW BEGIN
DECLARE total INT;
DECLARE ocupados INT;

SELECT COUNT(*) INTO total FROM quartos;
SELECT COUNT(*) INTO ocupados FROM quartos WHERE status = 'OCUPADO';

IF (total - ocupados) <= 2 THEN 
INSERT INTO alertas (mensagem, tipo)
VALUES ('POUCOS QUARTOS DISPONIVEIS', 'BAIXA_DISPONIBILIDADE');
END IF;

IF ocupados > total THEN
INSERT INTO alertas (mensagem, tipo)
VALUES ('POSSIVEL OVERBOOKING DETECTADO', 'OVERBOOKING');
END IF;

END$$


DELIMITER $$

CREATE TRIGGER trg_update_reserva AFTER UPDATE ON reservas FOR EACH ROW BEGIN
INSERT INTO historico (usuario_id, acao, tabela_afetada, registro_id)
VALUES (NEW.usuario_id, 'ATUALIZACAO_RESERVA', 'RESERVAS' ,NEW.id);
END$$


DELIMITER $$

CREATE TRIGGER trg_cancelamento_reserva AFTER UPDATE ON reservas FOR EACH ROW BEGIN
IF NEW.status = 'CANCELADA' THEN 
UPDATE quartos
SET STATUS = 'DISPONIVEL'
WHERE id = NEW.quarto_id;
END IF;

END$$

