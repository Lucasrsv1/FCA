<?php

	class Equipamentos extends CI_Controller {
		function __construct() {
			parent::__construct();
		}
	
		function index () {
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
	    		redirect('login');
			
			$data['title'] = "Equipamentos";
			$data['session_data'] = $session_data;
			$data['fullscreen'] = $this->session->userdata('fullscreen');
			$data['nav'] = $this->session->userdata('nav');
			
			$this->template->write_view('menu', 'menu_view', $data);
			//$this->template->write_view('content', '');
			$this->template->render();
		}
	
		function SelecionarTudo () {
			$equipamentos = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$this->load->model('equipamentos_model');
				$equipamentos = $this->equipamentos_model->SelecionarTudo();
				$mensagem = array('result' => 'success');
			}
			
			echo json_encode(array('data' => $equipamentos));
		}
	
		function SelecionarPorId () {
			$equipamento = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$id = $this->input->post('id');
				
				$this->load->model('equipamentos_model');
				$equipamento = $this->equipamentos_model->SelecionarPorId($id);
				
				if ($equipamento)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Id inexistente
			}
			
			echo json_encode(array('data' => $equipamento));
		}
	
		function Cadastrar () {
			$this->form_validation->set_rules('radio', 'radio', 'required');
			$this->form_validation->set_rules('caf', 'caf', 'required');
			$this->form_validation->set_rules('tipo', 'tipo', 'required');
			$this->form_validation->set_rules('modelo', 'modelo', 'required');
			$this->form_validation->set_rules('fabricante', 'fabricante', 'required');
			$this->form_validation->set_rules('ute', 'ute', 'required');
			$this->form_validation->set_rules('setor', 'setor', 'required');
			
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else if (!$this->form_validation->run())
				$mensagem = array('result' => 'errorF'); // Formulário inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$radio = $this->input->post('radio');
				$caf = $this->input->post('caf');
				$tipo = $this->input->post('tipo');
				$modelo = $this->input->post('modelo');
				$fabricante = $this->input->post('fabricante');
				$ute = $this->input->post('ute');
				$setor = $this->input->post('setor');
				$cod_sap = $this->input->post('cod_sap');
				$descricao = $this->input->post('descricao');
				$ano_fabr = $this->input->post('ano_fabr');
				$produto = $this->input->post('produto');
				$opercao = $this->input->post('opercao');
				$cons_energia_prod = $this->input->post('cons_energia_prod');
				$cons_energia_lig = $this->input->post('cons_energia_lig');
				$horimetro = $this->input->post('horimetro');
				$ciclos = $this->input->post('ciclos');
				$data_inicial = $this->input->post('data_inicial');
				
				$this->load->model('equipamentos_model');
				$insert = $this->equipamentos_model->Cadastrar($radio, $caf, $tipo, $modelo, $fabricante, $ute, $setor, $cod_sap, $descricao, $ano_fabr, $produto, $opercao, $cons_energia_prod, $cons_energia_lig, $horimetro, $ciclos, $data_inicial);
				
				if($insert)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Erro ao inserir
			}
			
			echo json_encode($mensagem);
		}
	
		function Atualizar () {
			$this->form_validation->set_rules('id', 'id', 'required');
			$this->form_validation->set_rules('radio', 'radio', 'required');
			$this->form_validation->set_rules('caf', 'caf', 'required');
			$this->form_validation->set_rules('tipo', 'tipo', 'required');
			$this->form_validation->set_rules('modelo', 'modelo', 'required');
			$this->form_validation->set_rules('fabricante', 'fabricante', 'required');
			$this->form_validation->set_rules('ute', 'ute', 'required');
			$this->form_validation->set_rules('setor', 'setor', 'required');
			
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$mensagem = array('result' => 'errorL'); // Login inválido
			else if (!$this->form_validation->run())
				$mensagem = array('result' => 'errorF'); // Formulário inválido
			else
				$mensagem = NULL;
			
			if ($mensagem == NULL) {
				$id = $this->input->post('id');
				$radio = $this->input->post('radio');
				$caf = $this->input->post('caf');
				$tipo = $this->input->post('tipo');
				$modelo = $this->input->post('modelo');
				$fabricante = $this->input->post('fabricante');
				$ute = $this->input->post('ute');
				$setor = $this->input->post('setor');
				$cod_sap = $this->input->post('cod_sap');
				$descricao = $this->input->post('descricao');
				$ano_fabr = $this->input->post('ano_fabr');
				$produto = $this->input->post('produto');
				$opercao = $this->input->post('opercao');
				$cons_energia_prod = $this->input->post('cons_energia_prod');
				$cons_energia_lig = $this->input->post('cons_energia_lig');
				$horimetro = $this->input->post('horimetro');
				$ciclos = $this->input->post('ciclos');
				$data_inicial = $this->input->post('data_inicial');
				
				$this->load->model('equipamentos_model');
				$update = $this->equipamentos_model->Atualizar($id, $radio, $caf, $tipo, $modelo, $fabricante, $ute, $setor, $cod_sap, $descricao, $ano_fabr, $produto, $opercao, $cons_energia_prod, $cons_energia_lig, $horimetro, $ciclos, $data_inicial);
				
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
				
				$this->load->model('equipamentos_model');
				$excluir = $this->equipamentos_model->Excluir($id);
				
				if ($excluir)
					$mensagem = array('result' => 'success');
				else
					$mensagem = array('result' => 'error'); // Erro ao excluir
			}
			
			echo json_encode($mensagem);
		}
		
		function AnaliseProducaoDuracao () {
			$analise = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$analise = 'errorL'; // Login inválido
			
			if ($analise === NULL) {
				$startDate = $this->input->post('startDate');
				$endDate = $this->input->post('endDate');
				$dateGroup = $this->input->post('dateGroup');
				$cafs = $this->input->post('cafs');
				$duracao = $this->input->post('duracao');
				
				$this->load->model('equipamentos_model');
				$analise = $this->equipamentos_model->ProducaoDuracao($startDate, $endDate, $dateGroup, $cafs, $duracao);
			}
			
			echo json_encode(array('data' => $analise));
		}
		
		function ProducaoPorHora () {
			$analise = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$analise = 'errorL'; // Login inválido
			
			if ($analise === NULL) {
				$cafs = $this->input->post('cafs');
				
				$this->load->model('equipamentos_model');
				$analise = $this->equipamentos_model->ProducaoPorHora($cafs);
			}
			
			echo json_encode(array('data' => $analise));
		}
		
		function EventosAgrupados () {
			$analise = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$analise = 'errorL'; // Login inválido
			
			if ($analise === NULL) {
				$cafs = $this->input->post('cafs');
				$labels = $this->input->post('labels');
				$labelsEnd = $this->input->post('labelsEnd');
				$labelsD = $this->input->post('labelsD');
				$labelsBR = $this->input->post('labelsBR');
				$maus = $this->input->post('maus');
				
				$this->load->model('equipamentos_model');
				$analise = $this->equipamentos_model->EventosAgrupados($cafs, $labels, $labelsEnd, $labelsD, $labelsBR, $maus);
			}
			
			echo json_encode(array('data' => $analise));
		}
		
		function TodosEventos () {
			$analise = NULL;
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				$analise = 'errorL'; // Login inválido
			
			if ($analise === NULL) {
				$cafs = $this->input->post('cafs');
				$labels = $this->input->post('labels');
				$labelsEnd = $this->input->post('labelsEnd');
				
				$this->load->model('equipamentos_model');
				$analise = $this->equipamentos_model->TodosEventos($cafs, $labels, $labelsEnd);
			}
			
			echo json_encode(array('data' => $analise));
		}
	}

?>