<?php

	class Equipamentos_model extends CI_Model {
		const TABELA = 'equipamentos';
		
		function __construct() {
			parent::__construct();
		}
		
		function SelecionarTudo () {
			$select = $this->db->get(self::TABELA);
			return $select->result();
		}
		
		function SelecionarPorId ($id) {
			$select = $this->db->get_where(self::TABELA, array('id' => $id));
			if ($select->num_rows() == 1)
				return $select->result();
			else
				return false;
		}
		
		function Cadastrar ($radio, $caf, $tipo, $modelo, $fabricante, $ute, $setor, $cod_sap = NULL, $descricao = NULL, $ano_fabr = NULL, $produto = NULL, $opercao = NULL, $cons_energia_prod = NULL, $cons_energia_lig = NULL, $horimetro = NULL, $ciclos = NULL, $data_inicial = NULL) {
			// Verificar se o radio e o CAF estão disponíveis.
			$this->db->where('radio', $radio);
			$this->db->or_where('caf', $caf);
			$select = $this->db->get(self::TABELA);
			if ($select->num_rows() > 0) {
				$error = "error";
				foreach ($select->result() as $row) {
					if ($row['radio'] === $radio)
						$error .= 'R';
					if ($row['caf'] === $caf)
						$error .= 'C';
				}
				
				return $error; // Radio e/ou CAF já em uso.
			}
			
			$arrayInsert = array (
							'radio' => $radio,
							'caf' => $caf,
							'tipo' => $tipo,
							'modelo' => $modelo,
							'endereco' => $endereco,
							'fabricante' => $fabricante,
							'ute' => $ute,
							'setor' => $setor,
							'cod_sap' => $cod_sap,
							'descricao' => $descricao,
							'ano_fabr' => $ano_fabr,
							'produto' => $produto,
							'opercao' => $opercao,
							'cons_energia_prod' => $cons_energia_prod,
							'cons_energia_lig' => $cons_energia_lig,
							'horimetro' => $horimetro,
							'ciclos' => $ciclos,
							'data_inicial' => $data_inicial
			);
			
			$this->db->insert(self::TABELA, $arrayInsert);
			return $this->db->affected_rows() > 0;
		}
		
		function Atualizar ($id, $radio, $caf, $tipo, $modelo, $fabricante, $ute, $setor, $cod_sap = NULL, $descricao = NULL, $ano_fabr = NULL, $produto = NULL, $opercao = NULL, $cons_energia_prod = NULL, $cons_energia_lig = NULL, $horimetro	 = NULL, $ciclos = NULL, $data_inicial = NULL) {
			// Verificar se o radio e o CAF estão disponíveis.
			$this->db->where('radio', $radio);
			$this->db->or_where('caf', $caf);
			$select = $this->db->get(self::TABELA);
			if ($select->num_rows() > 0) {
				$error = "error";
				foreach ($select->result() as $row) {
					if ($row['radio'] === $radio)
						$error .= 'R';
					if ($row['caf'] === $caf)
						$error .= 'C';
				}
				
				return $error; // Radio e/ou CAF já em uso.
			}
			
			$arrayUpdate = array (
							'radio' => $radio,
							'caf' => $caf,
							'tipo' => $tipo,
							'modelo' => $modelo,
							'endereco' => $endereco,
							'fabricante' => $fabricante,
							'ute' => $ute,
							'setor' => $setor,
							'cod_sap' => $cod_sap,
							'descricao' => $descricao,
							'ano_fabr' => $ano_fabr,
							'produto' => $produto,
							'opercao' => $opercao,
							'cons_energia_prod' => $cons_energia_prod,
							'cons_energia_lig' => $cons_energia_lig,
							'horimetro' => $horimetro,
							'ciclos' => $ciclos,
							'data_inicial' => $data_inicial
			);
			
			$this->db->where('id', $id);
			$this->db->update(self::TABELA, $arrayUpdate);
			return $this->db->affected_rows() > 0;
		}
		
		function Excluir ($id) {
			$this->db->where('id', $id);
			$this->db->delete(self::TABELA);
			return $this->db->affected_rows() > 0;
		}
		
		function ProducaoDuracao ($startDate, $endDate, $dateGroup, $cafs, $duracao = false) {
			if (strlen($startDate) === 0|| strlen($endDate) === 0 || count($cafs) === 0)
				return 'errorP';
			
			switch ($dateGroup) {
				case 0:
					$format = "%Y-%m-%d %H";
					$formatBR = "%d/%m/%y %H:00";
					break;
				case 2:
					$format = "%Y-%m";
					$formatBR = "%m/%Y";
					break;
				case 3:
					$format = "%Y";
					$formatBR = "%Y";
					break;
				default:
					$format = "%Y-%m-%d";
					$formatBR = "%d/%m/%Y";
					break;
			}
			
			$inCafs = implode("', '", $cafs);
			
			if ($duracao === "true") {
				$select = $this->db->query("SELECT E.caf AS 'Series_GROUP', DATE_FORMAT(P.data, '$format') AS 'Label', DATE_FORMAT(P.data, '$formatBR') AS 'LabelBR', AVG(P.abastecer) AS 'Value_0', AVG(P.desabastecer) AS 'Value_1', AVG(P.duracao) AS 'Value_2', AVG(P.produzir) AS 'Value_3' FROM producao P INNER JOIN equipamentos E ON E.radio = P.equipamentos_radio WHERE E.caf IN ('$inCafs') AND DATE_FORMAT(P.data, '$format') BETWEEN '$startDate' AND '$endDate' GROUP BY 1, 2 ORDER BY 1, 2 ASC");
			} else {
				$select = $this->db->query("SELECT E.caf AS 'Series', DATE_FORMAT(P.data, '$format') AS 'Label', DATE_FORMAT(P.data, '$formatBR') AS 'LabelBR', COUNT(P.duracao) AS 'Value' FROM producao P INNER JOIN equipamentos E ON E.radio = P.equipamentos_radio WHERE E.caf IN ('$inCafs') AND DATE_FORMAT(P.data, '$format') BETWEEN '$startDate' AND '$endDate' GROUP BY 1, 2  ORDER BY 2 ASC");
			}

			if ($select)
				return $select->result();
			else
				return 'error';
		}
		
		function ProducaoPorHora ($cafs) {
			$inCafs = implode("', '", $cafs);
			
			$select = $this->db->query("SELECT Series, MAX(Value) AS 'Value' FROM (SELECT E.caf AS 'Series', DATE_FORMAT(P.data, '%Y-%m-%d %H') AS 'Label', COUNT(P.duracao) AS 'Value' FROM producao P INNER JOIN equipamentos E ON E.radio = P.equipamentos_radio WHERE E.caf IN ('$inCafs') GROUP BY 1, 2) S GROUP BY 1");
			if ($select)
				return $select->result();
			else
				return 'error';
		}
		
		function EventosAgrupados ($cafs, $labelsJoin, $labelsEndJoin, $labelsDJoin, $labelsBRJoin, $maus) {
			$inCafs = implode("', '", $cafs);
			$labels = explode(", ", $labelsJoin);
			$labelsEnd = explode(", ", $labelsEndJoin);
			$labelsD = explode(", ", $labelsDJoin);
			$labelsBR = explode(", ", $labelsBRJoin);
			
			$selectLabels = "SELECT";
			for ($l = 0; $l < count($labels); $l++) {
				if ($l === 0)
					$selectLabels .= " '".$labels[$l]."' AS 'label', '".$labelsEnd[$l]."' AS 'labelEnd', '".$labelsD[$l]."' AS 'labelD', '".$labelsBR[$l]."' AS 'labelBR'";
				else
					$selectLabels .= " UNION ALL SELECT '".$labels[$l]."', '".$labelsEnd[$l]."', '".$labelsD[$l]."', '".$labelsBR[$l]."'";
			}
			
			if ($maus === "true"){
				$select = $this->db->query("SELECT L.label, L.labelEnd, E.caf AS 'Series', C.evento_tipo_id, ET.nome, C.inicio AS 'Inicio', IF (C.fim IS NULL, CURRENT_TIMESTAMP, C.fim) AS 'Fim', SUM(IF (C.fim IS NULL, timestampdiff(SECOND, IF (C.inicio >= L.label, C.inicio, L.label), IF (timestampdiff(SECOND, CURRENT_TIMESTAMP, L.labelEnd) > 0, CURRENT_TIMESTAMP, L.labelEnd)), IF (C.inicio BETWEEN L.label AND L.labelEnd AND C.fim BETWEEN L.label AND L.labelEnd, C.duracao, IF (C.inicio BETWEEN L.label AND L.labelEnd, timestampdiff(SECOND, C.inicio, L.labelEnd), IF (C.fim BETWEEN L.label AND L.labelEnd, timestampdiff(SECOND, L.label, C.fim), IF (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim, timestampdiff(SECOND, L.label, L.labelEnd), 0)))))) AS 'Duracao', L.labelD, L.labelBR FROM controle C INNER JOIN equipamentos E ON E.radio = C.equipamentos_radio INNER JOIN evento_tipo ET ON C.evento_tipo_id = ET.id LEFT JOIN ($selectLabels) L ON C.inicio BETWEEN L.label AND L.labelEnd OR C.fim BETWEEN L.label AND L.labelEnd OR (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim) OR C.fim IS NULL WHERE E.caf IN ('$inCafs') AND C.evento_tipo_id != 10 AND (C.inicio BETWEEN L.label AND L.labelEnd OR C.fim BETWEEN L.label AND L.labelEnd OR (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim) OR (C.fim IS NULL AND timestampdiff(SECOND, L.label, CURRENT_TIMESTAMP) > 0)) GROUP BY 1, 3, 4 HAVING Duracao > 0 ORDER BY 1, 3, 5 ASC");
			} else {
				$select = $this->db->query("SELECT L.label, L.labelEnd, GROUP_CONCAT(DISTINCT E.caf ORDER BY E.caf DESC SEPARATOR '<br />') AS 'Series', C.evento_tipo_id, ET.nome, C.inicio AS 'Inicio', IF (C.fim IS NULL, CURRENT_TIMESTAMP, C.fim) AS 'Fim', SUM(IF (C.fim IS NULL, timestampdiff(SECOND, IF (C.inicio >= L.label, C.inicio, L.label), IF (timestampdiff(SECOND, CURRENT_TIMESTAMP, L.labelEnd) > 0, CURRENT_TIMESTAMP, L.labelEnd)), IF (C.inicio BETWEEN L.label AND L.labelEnd AND C.fim BETWEEN L.label AND L.labelEnd, C.duracao, IF (C.inicio BETWEEN L.label AND L.labelEnd, timestampdiff(SECOND, C.inicio, L.labelEnd), IF (C.fim BETWEEN L.label AND L.labelEnd, timestampdiff(SECOND, L.label, C.fim), IF (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim, timestampdiff(SECOND, L.label, L.labelEnd), 0)))))) AS 'Duracao', L.labelD, L.labelBR FROM controle C INNER JOIN equipamentos E ON E.radio = C.equipamentos_radio INNER JOIN evento_tipo ET ON C.evento_tipo_id = ET.id LEFT JOIN ($selectLabels) L ON C.inicio BETWEEN L.label AND L.labelEnd OR C.fim BETWEEN L.label AND L.labelEnd OR (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim) OR C.fim IS NULL WHERE E.caf IN ('$inCafs') AND (C.inicio BETWEEN L.label AND L.labelEnd OR C.fim BETWEEN L.label AND L.labelEnd OR (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim) OR (C.fim IS NULL AND timestampdiff(SECOND, L.label, CURRENT_TIMESTAMP) > 0)) GROUP BY 1, 4 HAVING Duracao > 0 ORDER BY 1, 3, 5 ASC");
			}

			if ($select)
				return $select->result();
			else
				return 'error';
		}
		
		function TodosEventos ($cafs, $labelsJoin, $labelsEndJoin) {
			$inCafs = implode("', '", $cafs);
			$labels = explode(", ", $labelsJoin);
			$labelsEnd = explode(", ", $labelsEndJoin);
			
			$selectLabels = "SELECT";
			for ($l = 0; $l < count($labels); $l++) {
				if ($l === 0)
					$selectLabels .= " '".$labels[$l]."' AS 'label', '".$labelsEnd[$l]."' AS 'labelEnd'";
				else
					$selectLabels .= " UNION ALL SELECT '".$labels[$l]."', '".$labelsEnd[$l]."'";
			}
			
			$select = $this->db->query("SELECT L.label, L.labelEnd, E.caf AS 'Series', C.evento_tipo_id, ET.nome, C.inicio AS 'Inicio', IF (C.fim IS NULL, CURRENT_TIMESTAMP, C.fim) AS 'Fim', SUM(IF (C.fim IS NULL, timestampdiff(SECOND, IF (C.inicio >= L.label, C.inicio, L.label), IF (timestampdiff(SECOND, CURRENT_TIMESTAMP, L.labelEnd) > 0, CURRENT_TIMESTAMP, L.labelEnd)), IF (C.inicio BETWEEN L.label AND L.labelEnd AND C.fim BETWEEN L.label AND L.labelEnd, C.duracao, IF (C.inicio BETWEEN L.label AND L.labelEnd, timestampdiff(SECOND, C.inicio, L.labelEnd), IF (C.fim BETWEEN L.label AND L.labelEnd, timestampdiff(SECOND, L.label, C.fim), IF (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim, timestampdiff(SECOND, L.label, L.labelEnd), 0)))))) AS 'Duracao' FROM controle C INNER JOIN equipamentos E ON E.radio = C.equipamentos_radio INNER JOIN evento_tipo ET ON C.evento_tipo_id = ET.id LEFT JOIN ($selectLabels) L ON C.inicio BETWEEN L.label AND L.labelEnd OR C.fim BETWEEN L.label AND L.labelEnd OR (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim) OR C.fim IS NULL WHERE E.caf IN ('$inCafs') AND (C.inicio BETWEEN L.label AND L.labelEnd OR C.fim BETWEEN L.label AND L.labelEnd OR (L.label BETWEEN C.inicio AND C.fim AND L.labelEnd BETWEEN C.inicio AND C.fim) OR (C.fim IS NULL AND timestampdiff(SECOND, L.label, CURRENT_TIMESTAMP) > 0)) GROUP BY 1, 3, C.id HAVING Duracao > 0 ORDER BY 1, 3, 6 ASC");
			if ($select)
				return $select->result();
			else
				return 'error';
		}
	}
	
?>