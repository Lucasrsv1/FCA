SELECT CONCAT(E.descricao, ' [', E.caf, ']') AS 'Series', DATE_FORMAT(P.data, '%Y-%m-%d %h') AS 'X', COUNT(P.duracao) AS 'Y' FROM producao P
INNER JOIN equipamentos E ON E.radio = P.equipamentos_radio
GROUP BY 1, 2