<?php

	class Eventos extends CI_Controller {
		function __construct() {
			parent::__construct();
		}
	
		function index () {
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
	    		redirect('login');
			
			$data['title'] = "Tipos de Eventos";
			$data['session_data'] = $session_data;
			$data['fullscreen'] = $this->session->userdata('fullscreen');
			$data['nav'] = $this->session->userdata('nav');
			
			$this->template->write_view('menu', 'menu_view', $data);
			//$this->template->write_view('content', '');
			$this->template->render();
		}
	
		function SelecionarTudo () {
			$eventos = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$this->load->model('eventos_model');
				$eventos = $this->eventos_model->SelecionarTudo();
				$mensagem = array('result' => 'success');
			}
			
			echo json_encode(array('data' => $eventos));
		}
	
		function SelecionarPorId () {
			$evento = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$id = $this->input->post('id');
				
				$this->load->model('eventos_model');
				$evento = $this->eventos_model->SelecionarPorId($id);
				
				if ($evento)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Id inexistente
			}
			
			echo json_encode(array('data' => $evento));
		}
	
		function Cadastrar () {
			$this->form_validation->set_rules('nome', 'nome', 'required');
			$this->form_validation->set_rules('cor', 'cor', 'required');
			
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else if (!$this->form_validation->run())
				$mensagem = array('result' => 'errorF'); // Formulário inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$nome = $this->input->post('nome');
				$cor = $this->input->post('cor');
				
				$this->load->model('eventos_model');
				$insert = $this->eventos_model->Cadastrar($nome, $cor);
				
				if($insert)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Erro ao inserir
			}
			
			echo json_encode($mensagem);
		}
	
		function Atualizar () {
			$this->form_validation->set_rules('id', 'id', 'required');
			$this->form_validation->set_rules('nome', 'nome', 'required');
			$this->form_validation->set_rules('cor', 'cor', 'required');
			
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else if (!$this->form_validation->run())
				$mensagem = array('result' => 'errorF'); // Formulário inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$id = $this->input->post('id');
				$nome = $this->input->post('nome');
				$cor = $this->input->post('cor');
				
				$this->load->model('eventos_model');
				$update = $this->eventos_model->Atualizar($id, $nome, $cor);
				
				if($update)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Erro ao atualizar
			}
			
			echo json_encode($mensagem);
		}
	
		function Excluir () {
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$id = $this->input->post('id');
				
				$this->load->model('eventos_model');
				$excluir = $this->eventos_model->Excluir($id);
				
				if ($excluir)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Erro ao excluir
			}
			
			echo json_encode($mensagem);
		}
	}

?>