CREATE SCHEMA `dourado_lanches` 

USE dourado_lanches;

CREATE TABLE `dourado_lanches`.`produto` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NULL,
    `valor` DECIMAL(7, 2) NULL,
    `descricao` VARCHAR(255) NULL,
    `ativo` INT NULL,
    PRIMARY KEY (`id`)
);

SELECT * FROM produto;

INSERT INTO `dourado_lanches`.`produto` (`nome`, `valor`, `descricao`, `ativo`) VALUES
('X-Burguer', 18.90, 'Pão, hambúrguer, queijo, alface e tomate', 1),
('X-Salada', 20.90, 'Pão, hambúrguer, queijo, presunto, alface e tomate', 1),
('X-Bacon', 22.50, 'Pão, hambúrguer, queijo, bacon crocante e molho especial', 1),
('X-Tudo', 27.90, 'Pão, 2 hambúrgueres, queijo, presunto, bacon, ovo e salada', 1),
('Misto Quente', 12.00, 'Pão de forma, presunto e queijo', 1),
('Hot Dog Simples', 14.50, 'Pão, salsicha, molho, milho e batata palha', 1),
('Hot Dog Completo', 18.00, 'Pão, 2 salsichas, molho, milho, ervilha, purê e batata palha', 1),
('Batata Frita P', 10.00, 'Porção pequena de batata frita crocante', 1),
('Batata Frita M', 15.00, 'Porção média de batata frita crocante', 1),
('Batata Frita G', 20.00, 'Porção grande de batata frita crocante', 1),
('Refrigerante Lata', 6.00, 'Refrigerante lata 350ml - sabores variados', 1),
('Refrigerante 2L', 12.00, 'Refrigerante garrafa 2 litros - sabores variados', 1),
('Suco Natural Laranja', 8.50, 'Suco natural de laranja 300ml', 1),
('Suco Natural Abacaxi', 9.00, 'Suco natural de abacaxi com hortelã 300ml', 1),
('Milkshake Chocolate', 16.00, 'Milkshake sabor chocolate 400ml', 1),
('Milkshake Morango', 16.00, 'Milkshake sabor morango 400ml', 1),
('Milkshake Ovomaltine', 18.00, 'Milkshake sabor Ovomaltine 400ml', 1),
('Açaí 300ml', 14.00, 'Açaí na tigela 300ml com granola', 1),
('Açaí 500ml', 20.00, 'Açaí na tigela 500ml com granola e banana', 1),
('Combo X-Burguer + Refri', 24.90, 'X-Burguer acompanhado de refrigerante lata', 1);