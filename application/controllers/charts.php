<?php

	class Charts extends CI_Controller{
		function __construct() {
			parent::__construct();
		}
		
		function index () {
			redirect('charts/producao');
		}

		function Load ($page, $title) {
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				redirect('login');
			
			$data['title'] = $title;
			$data['session_data'] = $session_data;
			$data['fullscreen'] = $this->session->userdata('fullscreen');
			$data['nav'] = $this->session->userdata('nav');
			
			$this->template->write_view('menu', 'menu_view', $data);
			$this->template->write_view('content', $page);
			$this->template->render();
		}
		
		function controles () {
			self::Load("analises/controles", "Análise de Controles");
		}

		function producao () {
			self::Load("analises/producao", "Análise de Produção");
		}
		
		function status () {
			self::Load("analises/status", "Análise de Estado");
		}
		
		function tempos () {
			self::Load("analises/tempos", "Análise de Duração");
		}
	}

?>
