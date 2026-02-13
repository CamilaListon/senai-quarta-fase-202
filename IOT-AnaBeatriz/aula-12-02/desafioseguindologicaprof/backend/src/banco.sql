
USE gestao_frota;

CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    perfil ENUM('ADMIN', 'OPERADOR', 'GESTOR') DEFAULT 'OPERADOR',
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE log_acao (
    id_log INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    acao VARCHAR(100),
    tabela_afetada VARCHAR(50),
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    detalhes TEXT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);


CREATE TABLE veiculo (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(10) UNIQUE NOT NULL,
    modelo VARCHAR(50),
    tipo VARCHAR(30),
    capacidade_carga DECIMAL(6,2), -- em kg
    bateria_atual INT CHECK (bateria_atual BETWEEN 0 AND 100),
    quilometragem_total DECIMAL(10,2),
    status ENUM('DISPONIVEL', 'EM_USO', 'MANUTENCAO') DEFAULT 'DISPONIVEL'
);

CREATE TABLE entregador (
    id_entregador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20)
);

CREATE TABLE uso_veiculo (
    id_uso INT AUTO_INCREMENT PRIMARY KEY,
    id_veiculo INT NOT NULL,
    id_entregador INT NOT NULL,
    horario_saida DATETIME NOT NULL,
    horario_retorno DATETIME,
    bateria_saida INT,
    bateria_retorno INT,
    km_saida DECIMAL(10,2),
    km_retorno DECIMAL(10,2),

    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo),
    FOREIGN KEY (id_entregador) REFERENCES entregador(id_entregador)
);

CREATE TABLE manutencao (
    id_manutencao INT AUTO_INCREMENT PRIMARY KEY,
    id_veiculo INT NOT NULL,
    data_manutencao DATE,
    tipo ENUM('PREVENTIVA', 'CORRETIVA'),
    descricao TEXT,
    km_registrado DECIMAL(10,2),

    FOREIGN KEY (id_veiculo) REFERENCES veiculo(id_veiculo)
);

DELIMITER $$

CREATE TRIGGER verifica_bateria_antes_uso
BEFORE INSERT ON uso_veiculo
FOR EACH ROW
BEGIN
    DECLARE nivel_bateria INT;

    SELECT bateria_atual
    INTO nivel_bateria
    FROM veiculo
    WHERE id_veiculo = NEW.id_veiculo;

    IF nivel_bateria < 30 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Veículo indisponível: bateria abaixo de 30%';
    END IF;
END$$

DELIMITER ;

CREATE VIEW relatorio_eficiencia AS
SELECT 
    v.placa,
    e.nome AS entregador,
    u.horario_saida,
    u.horario_retorno,
    (u.bateria_saida - u.bateria_retorno) AS consumo_bateria,
    (u.km_retorno - u.km_saida) AS distancia_percorrida
FROM uso_veiculo u
JOIN veiculo v ON u.id_veiculo = v.id_veiculo
JOIN entregador e ON u.id_entregador = e.id_entregador;

SELECT v.id_veiculo, v.placa, v.quilometragem_total
FROM veiculo v
WHERE v.quilometragem_total - IFNULL(
    (SELECT MAX(km_registrado)
     FROM manutencao m
     WHERE m.id_veiculo = v.id_veiculo),
0) >= 5000;
