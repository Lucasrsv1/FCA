<?php

	class Eventos_model extends CI_Model {
		const TABELA = 'evento_tipo';
		
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
		
		function Cadastrar ($nome, $cor) {
			// Verificar se o nome está disponível.
			$this->db->where('nome', $nome);
			$select = $this->db->get(self::TABELA);
			if ($select->num_rows() > 0)
				return "errorN"; // Nome já em uso.
			
			$arrayInsert = array (
							'nome' => $nome,
							'cor' => $cor
			);
			
			$this->db->insert(self::TABELA, $arrayInsert);
			return $this->db->affected_rows() > 0;
		}
		
		function Atualizar ($id, $nome, $cor) {
			// Verificar se o nome está disponível.
			$this->db->where('nome', $nome);
			$select = $this->db->get(self::TABELA);
			if ($select->num_rows() > 0)
				return "errorN"; // Nome já em uso.
			
			$arrayUpdate = array (
							'nome' => $nome,
							'cor' => $cor
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
	}
	
?>