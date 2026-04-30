CREATE DATABASE faxina_db;
USE faxina_db;

CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100),
  password_hash VARCHAR(255),
  tipo_usuario VARCHAR(50),
  ativo BOOLEAN
);

CREATE TABLE cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  telefone VARCHAR(20)
);

CREATE TABLE profissional (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  disponibilidade VARCHAR(100)
);

CREATE TABLE agendamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT,
  profissional_id INT,
  data_hora DATETIME,
  tipo VARCHAR(50),
  FOREIGN KEY (cliente_id) REFERENCES cliente(id),
  FOREIGN KEY (profissional_id) REFERENCES profissional(id)
);

-- DADOS INICIAIS (mínimo 3)
INSERT INTO cliente (nome, telefone) VALUES
('Maria', '9999-1111'),
('João', '9999-2222'),
('Ana', '9999-3333');

INSERT INTO profissional (nome, disponibilidade) VALUES
('Carlos', 'Manhã'),
('Fernanda', 'Tarde'),
('Pedro', 'Integral');

INSERT INTO agendamento (cliente_id, profissional_id, data_hora, tipo) VALUES
(1, 1, '2026-05-01 08:00:00', 'residencial'),
(2, 2, '2026-05-01 14:00:00', 'comercial'),
(3, 3, '2026-05-02 09:00:00', 'residencial');