<?php

	class Charts extends CI_Controller{
		function __construct() {
			parent::__construct();
		}
		
		function index () {
			$session_data = $this->session->userdata('logged_in');
			if (!$session_data)
				redirect('login');
			
			$data['title'] = "Gráficos de Produção";
			$data['session_data'] = $session_data;
			$data['fullscreen'] = $this->session->userdata('fullscreen');
			$data['nav'] = $this->session->userdata('nav');
			
			$this->template->write_view('menu', 'menu_view', $data);
			$this->template->write_view('content', 'analises/producao');
			$this->template->render();
		}
	}

?>
