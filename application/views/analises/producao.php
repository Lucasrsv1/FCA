<div>
    <!-- LRV Graphics -->
	<script src="<?php echo base_url("system/utils/js/graphics.js");?>"></script>
	
	<div class="page-title">
		<div class="title_left no_search">
			<h3>Análise de Produção</h3>
		</div>
	</div>
	
	<div class="clearfix"></div>
	<div id="graph-row0" class="row graph-row">
		<div class="col-md-12 col-sm-12 col-xs-12 dashboard_graph">
			<div class="row x_title">
				<div style="float: left; margin-bottom: 10px;">
					<h3><i class="fa fa-refresh refresh" title="Recarregar gráfico"></i>Produção por Equipamento <small class="data_moment"></small></h3>
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
					<h2>Configurações</h2>
					<div class="clearfix"></div>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12">
					<select class="graphic_type graph-select" style="height: 31px; margin-bottom: 10px;">
						<option value="0"> Área </option>
						<option value="1"> Barras </option>
						<option value="2"> Linhas </option>
						<option value="3"> Radar </option>
						<option value="4"> ECharts Área </option>
						<option value="5" selected> ECharts Barras </option>
						<option value="6"> ECharts Dispersão </option>
						<option value="7"> ECharts Linhas </option>
						<option value="8"> Morris Área </option>
						<option value="9"> Morris Barras </option>
						<option value="10"> Morris Linhas </option>
					</select>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 withDataOnly graph-option">
					<p> <input type="checkbox" class="flat" checked /> Usar apenas pontos com dados. </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 includeControl graph-option">
					<p> <input type="checkbox" class="flat" checked /> Incluir problemas de produção. </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 echartsY graph-option">
					<p> <input type="checkbox" class="flat" checked /> Mostrar régua do eixo Y (ECharts). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 echartsMM graph-option">
					<p> <input type="checkbox" class="flat" checked /> Mostrar mínimos e máximos (ECharts). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 echartsAVG graph-option">
					<p> <input type="checkbox" class="flat" checked /> Mostrar médias (ECharts). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 morrisAngle graph-option">
					<p> <input type="checkbox" class="flat" /> Categorias na diagonal (Morris). </p>
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
	
	<div class="clearfix"></div>
	
	<div id="graph-row1" class="row graph-row">
		<div class="col-md-12 col-sm-12 col-xs-12 dashboard_graph">
			<div class="row x_title">
				<div style="float: left; margin-bottom: 10px;">
					<h3><i class="fa fa-refresh refresh" title="Recarregar gráfico"></i>Produção por Equipamento <small class="data_moment"></small></h3>
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
					<canvas id="canvas1" style="display: none;"></canvas>
					<h4 id="morris1_title" class="graph-title"></h4>
                    <div id="graph1" style="width:100%; height: 404px;"></div>
				</div>
			</div>
			<div class="col-md-3 col-sm-4 col-xs-12 bg-white options">
				<div class="x_title">
					<h2>Equipamentos</h2>
					<input class="form-control col-xs-5 small-search" name="search" type="text" placeholder="Pesquisa" />
					<div class="clearfix"></div>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12">
					<ul class="series_list CAF_list"></ul>
				</div>
				
				<div class="x_title" style="margin-top: 5px;">
					<h2>Configurações</h2>
					<div class="clearfix"></div>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12">
					<select class="graphic_type graph-select" style="height: 31px; margin-bottom: 10px;">
						<option value="0"> Área </option>
						<option value="1"> Barras </option>
						<option value="2"> Linhas </option>
						<option value="3"> Radar </option>
						<option value="4"> ECharts Área </option>
						<option value="5" selected> ECharts Barras </option>
						<option value="6"> ECharts Dispersão </option>
						<option value="7"> ECharts Linhas </option>
						<option value="8"> Morris Área </option>
						<option value="9"> Morris Barras </option>
						<option value="10"> Morris Linhas </option>
					</select>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 withDataOnly graph-option">
					<p> <input type="checkbox" class="flat" checked /> Usar apenas pontos com dados. </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 includeControl graph-option">
					<p> <input type="checkbox" class="flat" checked /> Incluir problemas de produção. </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 echartsY graph-option">
					<p> <input type="checkbox" class="flat" checked /> Mostrar régua do eixo Y (ECharts). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 echartsMM graph-option">
					<p> <input type="checkbox" class="flat" checked /> Mostrar mínimos e máximos (ECharts). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 echartsAVG graph-option">
					<p> <input type="checkbox" class="flat" checked /> Mostrar médias (ECharts). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 morrisAngle graph-option">
					<p> <input type="checkbox" class="flat" /> Categorias na diagonal (Morris). </p>
				</div>
				
				<div class="col-md-12 col-sm-12 col-xs-12 export">
					<button type="button" class="btn btn-primary salvar" data-dismiss="modal" disabled><i class="fa fa-download"></i>Salvar Imagem</button>
					<button type="button" class="btn btn-primary imprimir" data-dismiss="modal" disabled><i class="fa fa-print"></i>Imprimir</button>
				</div>
			</div>
			
			<div class="clearfix"></div>
		</div>
	</div>
    	
	<!-- Produção Script -->
	<script src="<?php echo base_url("system/utils/js/producao.js");?>"></script>
	<!-- Series Loaders -->
	<script src="<?php echo base_url("system/utils/js/Series/load_equipamentos.js");?>"></script>
</div>