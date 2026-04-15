CREATE DATABASE agenda_faxina;

USE agenda_faxina;

CREATE TABLE usuario (  
    id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL,  
    password_hash VARCHAR(255) NOT NULL    
);

CREATE TABLE agendamento (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
    data_faxina DATE NOT NULL,
    horario_faxina TIME NOT NULL,
    local_faxina VARCHAR(250) NOT NULL,
    valor_cobrado INT,
    usuario_id int,    
    
    FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario)    
);
