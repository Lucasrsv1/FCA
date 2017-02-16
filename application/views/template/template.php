<?php

	$baseUrlScript = "<script type=\"text/javascript\"> var base_url = '".base_url()."'; </script>";

	$onLoad = "";
	if ($fullscreen == true)
		$onLoad .= "fullscreen = true; ";
	else
		$onLoad .= "fullscreen = false; ";
	
	if ($nav === "sm")
		$onLoad .= "navStatus = 'sm'; ";
	else
		$onLoad .= "navStatus = 'md'; ";
	
	$onLoad .= "ApplyPreferences();";
	
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta http-equiv="content-language" content="pt-br" />
	    <meta http-equiv="pragma" content="no-cache" />
	    <link rel="shortcut icon" href="<?php echo base_url("system/utils/Imagens/fca-logo.ico"); ?>" type="image/x-icon" />
    	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta name="description" content="Análise de produção">
	    <meta name="author" content="Lucas Rassilan Vilanova">
	    <meta name="keywords" content="fca,análise,produção,máquinas" />
	    <meta name="copyright" content="© 2017 Fiat Chrysler Automobiles" />
		
		<title><?php echo $title; ?> | AP3FR - Fiat Chrysler Automobiles</title>
		
		<!-- Bootstrap -->
		<link href="<?php echo base_url("system/vendors/bootstrap/dist/css/bootstrap.min.css"); ?>" rel="stylesheet">
		<!-- Font Awesome -->
		<link href="<?php echo base_url("system/vendors/fontawesome/css/font-awesome.min.css"); ?>" rel="stylesheet">
		<!-- NProgress -->
		<link href="<?php echo base_url("system/vendors/nprogress/nprogress.css"); ?>" rel="stylesheet">
		<!-- jQuery custom content scroller -->
		<link href="<?php echo base_url("system/vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css"); ?>" rel="stylesheet">
		<!-- bootstrap-progressbar -->
		<link href="<?php echo base_url("system/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css"); ?>" rel="stylesheet">
		<!-- bootstrap-daterangepicker -->
		<link href="<?php echo base_url("system/vendors/bootstrap-daterangepicker/daterangepicker.css"); ?>" rel="stylesheet">
		<!-- Datatables -->
		<link href="<?php echo base_url("system/vendors/datatables.net-bs/css/dataTables.bootstrap.min.css"); ?>" rel="stylesheet">
		<!-- iCheck -->
		<link href="<?php echo base_url("system/vendors/iCheck/skins/flat/green.css"); ?>" rel="stylesheet">
		
		<!-- Custom Theme Style -->
		<link href="<?php echo base_url("system/theme/css/custom.css"); ?>" rel="stylesheet" type="text/css">
		
		<!-- Custom Style -->
		<link href="<?php echo base_url("system/utils/css/default.css"); ?>" rel="stylesheet">
        
        <!-- jQuery -->
		<script src="<?php echo base_url("system/vendors/jquery/dist/jquery.min.js"); ?>"></script>

		<!-- Base Url -->
		<?php echo $baseUrlScript; ?>
	</head>
    <body class="nav-md" onLoad="<?php echo $onLoad; ?>">
		<div class="container body">
			<div class="main_container">
				<div class="col-md-3 left_col menu_fixed" style="overflow: visible;">
					<div style="max-height: none;" tabindex="0">
						<div style="position: relative; top: 0px; left: 0px;" dir="ltr">
							<div class="left_col scroll-view">
								<span class="nav_title_span">
									<div class="navbar nav_title" style="border: 0;">
										<a href="<?php echo base_url(); ?>" class="site_title">AP3FR</a>
									</div>
								</span>
								<div class="clearfix"></div>
								
								<!-- menu profile quick info -->
								<div class="profile clearfix">
									<div class="profile_pic">
										<a href="<?php echo base_url("perfil"); ?>"><img src="<?php echo base_url("system/utils/Imagens/administrador.png"); ?>" class="img-circle profile_img"></a>
									</div>
									<div class="profile_info">
										<span>Bem Vindo,</span>
										<h2><?php echo $session_data['usuario']; ?></h2>
									</div>
									<div class="clearfix"></div>
								</div>
								<!-- /menu profile quick info -->
								<br />
								
								<!-- sidebar menu -->
								<?php echo $menu; ?>
								<!-- /sidebar menu -->
    							
								<!-- /menu footer buttons -->
								<div class="sidebar-footer hidden-small">
									<a id="fullscreen" data-toggle="tooltip" data-placement="top" title="Tela Cheia">
										<span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
									</a>
									<a href="<?php echo base_url("ajuda"); ?>" data-toggle="tooltip" data-placement="top" title="Ajuda">
										<span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
									</a>
									<a href="<?php echo base_url("login/logout"); ?>" data-toggle="tooltip" data-placement="top" title="Logout">
										<span class="glyphicon glyphicon-off" aria-hidden="true"></span>
									</a>
								</div>
								<!-- /menu footer buttons -->
							</div>
						</div>
    				</div>
				</div>
				<!-- top navigation -->
				<div class="top_nav">
					<div class="nav_menu">
						<nav>
							<div class="nav toggle">
								<a id="menu_toggle"><i class="fa fa-bars"></i></a>
							</div>
    						
							<ul class="nav navbar-nav navbar-right">
                                <li>
									<a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
										<img src="<?php echo base_url("system/utils/Imagens/administrador.png"); ?>" alt=""><?php echo $session_data['usuario']; ?>
										<span class=" fa fa-angle-down"></span>
									</a>
									<ul class="dropdown-menu dropdown-usermenu pull-right">
										<li><a href="<?php echo base_url("perfil"); ?>">Perfil</a></li>
										<li><a href="<?php echo base_url("ajuda"); ?>">Ajuda</a></li>
										<li><a href="<?php echo base_url("login/logout"); ?>"><i class="fa fa-sign-out pull-right"></i> Log Out</a></li>
									</ul>
								</li>
							</ul>
						</nav>
					</div>
				</div>
				<!-- /top navigation -->
    			
				<!-- Error and Success modals -->
				<div id="sucesso" class="popup">  
						<div class="modal-content alert-success">
							<div class="modal-header alert-success">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title ">Sucesso</h4>
							</div>
							<div class="modal-body">
								<p id="msg_acerto"></p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default fechar" data-dismiss="modal" >Fechar</button>
							</div>
						</div>
					</div>
					<div id="erro" class="popup">
						<div class="modal-content alert-danger">
							<div class="modal-header alert-danger">
								<button type="button" class="close" data-dismiss="modal">&times;</button>
								<h4 class="modal-title ">Falha</h4>
							</div>
							<div class="modal-body">
								<p id="msg_erro"></p>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default fechar" data-dismiss="modal" >Fechar</button>
							</div>
						</div>
					</div>
				<!-- /Error and Success modals -->
				
				<!-- page content -->
				<div class="right_col" role="main">
					<?php echo $content; ?>
				</div>
				<!-- /page content -->
				
				<!-- footer content -->
				<footer>
					<div class="pull-right">
						Sistema de Análise de Produção criado por Lucas Rassilan Vilanova
					</div>
					<div class="clearfix"></div>
				</footer>
				<!-- /footer content -->
			</div>
		</div>
        
        <!-- jQuery UI -->
		<script src="<?php echo base_url("system/vendors/jquery/dist/jquery-ui.min.js"); ?>"></script>
        <!-- jQuery Mask -->
		<script src="<?php echo base_url("system/vendors/jquery/dist/jquery.maskedinput.js"); ?>"></script>
		<!-- Data Table -->
		<script src="<?php echo base_url("system/vendors/jquery/dist/jquery.data.Tables.js"); ?>"></script>
		<script src="<?php echo base_url("system/vendors/jquery/dist/dataTables.tableTools.js"); ?>"></script>
        <!-- jQuery custom content scroller -->
		<script src="<?php echo base_url("system/vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js"); ?>"></script>
		<!-- Chart.js -->
		<script src="<?php echo base_url("system/vendors/Chart.js-2.1.0/dist/Chart.min.js"); ?>"></script>
		<!-- Morris.js -->
		<script src="<?php echo base_url("system/vendors/raphael/raphael.min.js"); ?>"></script>
		<script src="<?php echo base_url("system/vendors/morris.js/morris.min.js"); ?>"></script>
		<!-- ECharts -->
		<script src="<?php echo base_url("system/vendors/echarts/dist/echarts.min.js"); ?>"></script>
		<!-- Bootstrap -->
		<script src="<?php echo base_url("system/vendors/bootstrap/dist/js/bootstrap.min.js"); ?>"></script>
		<!-- bootstrap-progressbar -->
		<script src="<?php echo base_url("system/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js"); ?>"></script>
		<!-- FastClick -->
		<script src="<?php echo base_url("system/vendors/fastclick/lib/fastclick.js"); ?>"></script>
		<!-- NProgress -->
		<script src="<?php echo base_url("system/vendors/nprogress/nprogress.js"); ?>"></script>
		<!-- DateJS -->
		<script src="<?php echo base_url("system/vendors/DateJS/build/date.js"); ?>"></script>
		<!-- bootstrap-daterangepicker -->
		<script src="<?php echo base_url("system/vendors/moment/min/moment.min.js"); ?>"></script>
		<script src="<?php echo base_url("system/vendors/bootstrap-daterangepicker/daterangepicker.js"); ?>"></script>
		<script src="<?php echo base_url("system/vendors/bootstrap-daterangepicker/bootstrap-daterangepicker-config.js"); ?>"></script>
		<!-- iCheck -->
		<script src="<?php echo base_url("system/vendors/iCheck/icheck.min.js"); ?>"></script>
		<!-- Canvg -->
		<script src="<?php echo base_url("system/vendors/canvg-master/rgbcolor.js"); ?>"></script>
		<script src="<?php echo base_url("system/vendors/canvg-master/canvg.js"); ?>"></script>
    	
		<!-- Custom Theme Scripts -->
		<script src="<?php echo base_url("system/theme/js/custom.js"); ?>"></script>
    	
		<!-- Custom Scripts -->
		<script src="<?php echo base_url("system/utils/js/default.js"); ?>"></script>
	</body>
</html>