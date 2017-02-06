<?php
	
	class Login_model extends CI_Model{
		const TABELA = "login";
		
		function __construct(){
			parent::__construct();
			$this->load->database();
		}
		  
		function VerificarLogin ($usuario, $senha) {
			$select = $this->db->get_where(self::TABELA, array("usuario" => $usuario, "senha" => md5($senha)));
			if ($select->num_rows() == 1)
				return $select->result(); // Current user
			else
				return false;
		}
		
		function Cadastrar ($usuario, $senha) {
			// Verificar se o nome de usuário está disponível.
			$select = $this->db->get_where(self::TABELA, array('usuario' => $usuario));
			if ($select->num_rows() === 1)
				return "errorU"; // Nome de usuário já em uso.
			
			$data = array(
					'usuario' => $usuario,
					'senha' => md5($senha)
			);
			
			$this->db->insert(self::TABELA, $data);
			return $this->db->affected_rows() > 0;
		}
		  
		// Atualização feita pelo dono da conta na página de perfil.
		function Atualizar ($id, $usuario, $senha) {
			// Verificar se o nome de usuário está disponível.
			$select = $this->db->get_where(self::TABELA, array('usuario' => $usuario));
			if ($select->num_rows() === 1)
				return "errorU"; // Nome de usuário já em uso.
			
			$arrayUpdate = array (
							'usuario' => $usuario,
							'senha' => md5($senha)
			);
			
			$this->db->where(array('id' => $id));
			$this->db->update(self::TABELA, $arrayUpdate);
			return $this->db->affected_rows() > 0;
		}
		
		function Excluir ($id, $empresas_id) {
			$this->db->where(array('id' => $id));
			$this->db->delete(self::TABELA);
			return $this->db->affected_rows() > 0;
		}
	}
?>
