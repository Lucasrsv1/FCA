<div>
    <!-- LRV Graphics -->
	<script src="<?php echo base_url("system/utils/js/graphics.js");?>"></script>
	
	<div class="page-title">
		<div class="title_left no_search">
			<h3>Análise de Estados</h3>
		</div>
	</div>

	<div class="clearfix"></div>
	
	<div id="graph-row0" class="row graph-row">
		<div class="col-md-12 col-sm-12 col-xs-12 dashboard_graph">
			<div class="row x_title">
				<div style="float: left; margin-bottom: 10px;">
					<h3><i class="fa fa-refresh refresh" title="Recarregar gráfico"></i>Estado dos Equipamentos <small class="data_moment"></small></h3>
				</div>
					<div style="float: right;">
						<div id="" class="reportrange date-box">
							<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
							<span></span> <b class="caret"></b>
						</div>
						<span class="axis">Eixo X:</span>
						<select class="category graph-select" style="height: 31px; width: auto;">
							<option value="0"> Horas </option>
							<option value="1" selected> Dias </option>
							<option value="2"> Meses </option>
							<option value="3"> Anos </option>
						</select>
					</div>
			</div>
			
			<div class="col-md-9 col-sm-8 col-xs-12">
				<div class="graph-sets" style="width: 100%;">
					<canvas id="canvas0" style="display: none;"></canvas>
					<h4 id="morris0_title" class="graph-title"></h4>
                    <div id="graph0" style="width:100%; height: 404px;"></div>
				</div>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-12 bg-white options">
				<div class="x_title">
					<select class="series graph-select col-xs-7" style="font-weight: 600">
						<option value="CAF" selected> CAFs </option>
						<option value=".SAP"> Códigos SAP </option>
						<option value=".DESCRT"> Descrições </option>
						<option value=".PROD"> Produtos </option>
						<option value=".SECT"> Setores </option>
						<option value=".UTE"> UTEs </option>
					</select>
					<input class="form-control col-xs-5 small-search" name="search" type="text" placeholder="Pesquisa" />
					<div class="clearfix"></div>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12">
					<ul class="series_list CAF_list not-hide"></ul>
					<ul class="series_list SAP_list hide"></ul>
					<ul class="series_list DESCRT_list hide"></ul>
					<ul class="series_list PROD_list hide"></ul>
					<ul class="series_list SECT_list hide"></ul>
					<ul class="series_list UTE_list hide"></ul>
				</div>
				
				<div class="x_title" style="margin-top: 5px;">
					<div class="clearfix"></div>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12">
					<div class="zoom-content">
						Zoom: 
						<i class="fa fa-minus-circle less-zoom"></i>
						<input type="text" name="zoom" class="form-control zoom num-fild" value="100" num-code="0" />
						<i class="fa fa-plus-circle add-zoom"></i>
					</div>
				</div>

				<div class="col-md-12 col-sm-12 col-xs-12 export">
					<button type="button" class="btn btn-primary salvar" data-dismiss="modal" disabled><i class="fa fa-download"></i>Salvar Imagem</button>
					<button type="button" class="btn btn-primary imprimir" data-dismiss="modal" disabled><i class="fa fa-print"></i>Imprimir</button>
				</div>
			</div>
			
			<div class="clearfix"></div>
		</div>
	</div>
    	
	<!-- Status Scripts -->
	<script src="<?php echo base_url("system/utils/js/status.js");?>"></script>
	<!-- Series Loaders -->
	<script src="<?php echo base_url("system/utils/js/Series/load_equipamentos.js");?>"></script>
</div>