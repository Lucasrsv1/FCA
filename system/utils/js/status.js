function CreateGraphic (graphicNum) {
	"use strict";
	
	// Spin loading indicator
	$('#graph-row' + graphicNum + ' .refresh').addClass('fa-spin');

	// Get Date Group for this graph is fixed.
	// Set Date Group Format
	var format = "YYYY-MM-DD";

	// Time Range
	var startDate = $('#graph-row' + graphicNum + ' .reportrange').data('daterangepicker').startDate;
	var endDate = $('#graph-row' + graphicNum + ' .reportrange').data('daterangepicker').endDate;

	// Get selected series category
	var spx = SeriesPrefix(graphicNum);

	// Set Series
	var series = [];
	$('#graph-row' + graphicNum + ' ul' + ((spx[0] === ".") ? spx : "." + spx) + '_list input:checked').each(function (index, element) {
		var pos = -1;
		var classes = $(element).get(0).classList;
		for (var c = 0; c < classes.length; c++) {
			if (classes[c].indexOf(spx) !== -1) {
				pos = classes[c].substr(spx.length);
				pos = pos.replace(/-/g, " ");
				break;
			}
		}

		var list = GetList(spx);
		if (list[pos]) {
			if (spx[0] !== ".") // Not an array of series
				series[series.length] = list[pos];
			else // Object with an array of series
				series = series.concat(list[pos]);
		}
	});

	// Without Series, without graphic.
	if (series.length === 0) {
		ClearGraphicArea(graphicNum);
		$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
		return;
	}

	// Set Title [Time Range]
	var title = "";
	if (endDate.diff(startDate, 'days') > 0)
		title = "Controle de Estado " + startDate.format("DD/MM/YYYY") + " - " + endDate.format("DD/MM/YYYY");
	else
		title = "Controle de Estado " + startDate.format("DD/MM/YYYY");

	// Set categories
	var categories = [];
	var startClone = startDate.clone();
	while (endDate.diff(startClone, dateGroups[1]) > 0) {
		categories[categories.length] = startClone.format(format);
		startClone.add(1, dateGroups[1]);
	}
	categories[categories.length] = startClone.format(format); // Add the last one

	var c;
	var labels = [], labelsEnd = [];
	for (c = 0; c < categories.length; c++) {
		labels[c] = moment(categories[c]).format("YYYY-MM-DD HH:mm:ss");
		labelsEnd[c] = moment(categories[c]).endOf(dateGroups[1]).add(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
	}
	
	// Get Values
	var values = {}, secondaryData = {}, lastEnd = {};
	$.ajax({
		url: base_url + "gerenciar/equipamentos/TodosEventos/",
		type: "POST",
		data: {
			cafs: series,
			labels: labels.join(", "),
			labelsEnd: labelsEnd.join(", "),
		},
		success: function (data) {
			var json = $.parseJSON(data);
			var queryResult = json.data;

			if (queryResult === "errorL") {
				$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Sessão expirada! Por favor, faça login novamente.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
				$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
				return;
			}

			// Set the value prefix
			var prefix = "Duração: ";

			// Handle returned values
			for (var i = 0; i < series.length; i++) {
				values[series[i]] = [];
				secondaryData[series[i]] = [];
			}

			var init, end, d, lastOne, add;
			var nomes = new UniqueArray();
			for (var row = 0; row < queryResult.length; row++) {
				if (values[queryResult[row]['Series']].length === 0)
					end = startDate.clone();
				else
					end = lastEnd[queryResult[row]['Series']];

				init = moment(queryResult[row]['Inicio']);
				if ((d = init.diff(end, 'seconds')) > 1) {
					values[queryResult[row]['Series']].push(["Não Informado", d]);
					secondaryData[queryResult[row]['Series']].push([end.format("DD/MM/YYYY HH:mm:ss"), init.format("DD/MM/YYYY HH:mm:ss")]);
					lastEnd[queryResult[row]['Series']] = init;
					nomes.Push("Não Informado");
				}

				lastOne = values[queryResult[row]['Series']].length - 1;
				if (lastOne >= 0)
					add = values[queryResult[row]['Series']][lastOne][0] !== queryResult[row]['nome'];
				else
					add = true;
				
				if (add) {
					values[queryResult[row]['Series']].push([queryResult[row]['nome'], queryResult[row]['Duracao'] * 1]);
					secondaryData[queryResult[row]['Series']].push([moment(queryResult[row]['Inicio']).format("DD/MM/YYYY HH:mm:ss"), moment(queryResult[row]['Fim']).format("DD/MM/YYYY HH:mm:ss")]);
					nomes.Push(queryResult[row]['nome']);
				} else {
					values[queryResult[row]['Series']][lastOne][1] += queryResult[row]['Duracao'] * 1;
					secondaryData[queryResult[row]['Series']][lastOne][1] = moment(queryResult[row]['Fim']).format("DD/MM/YYYY HH:mm:ss");
				}

				lastEnd[queryResult[row]['Series']] = moment(queryResult[row]['Fim']);
			}

			end = endDate.clone();
			for (var i2 = 0; i2 < series.length; i2++) {
				if (values[series[i2]].length === 0) {
					values[series[i2]].push(["Não Informado", endDate.diff(startDate, 'seconds')]);
					secondaryData[series[i2]].push([startDate.format("DD/MM/YYYY HH:mm:ss"), endDate.format("DD/MM/YYYY HH:mm:ss")]);
					nomes.Push("Não Informado");
					continue;
				}

				init = moment(lastEnd[series[i2]]);
				if ((d = end.diff(init, 'seconds')) > 1) {
					values[series[i2]].push(["Não Informado", d]);
					secondaryData[series[i2]].push([init.format("DD/MM/YYYY HH:mm:ss"), end.format("DD/MM/YYYY HH:mm:ss")]);
					nomes.Push("Não Informado");
				}
			}

			var lengths = [];			
			for (var v in values)
				lengths.push(values[v].length);

			nomes.Sort();
			series = series.sort();

			// Get graph zoom
			var zoom = $('#graph-row' + graphicNum + ' .zoom').val().replace(/%/g, "");

			// Renderizar
			RenderGraphicMultiSeriesAndValues(graphicNum, title, series, [], values, 24, prefix, 0, false, false, false, secondaryData, zoom, false, false, coresPorEvento, lengths, nomes, startDate, endDate);
		},
		error: function (data) {
			$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
			$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Problema de comunicação com o banco de dados.");
			$('#erro').fadeIn('slow').addClass('open-message');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
		}
	});
}

// Return the right array or object of series.
function GetList (prefix) {
	switch (prefix) {
		case "CAF":
			return cafs;
		case ".SAP":
			return saps;
		case ".DESCRT":
			return descriptions;
		case ".PROD":
			return products;
		case ".SECT":
			return sectors;
		case ".UTE":
			return utes;
		default:
			return [];
	}
}

// Defaul prefix for the main series list of each graph-row
function DefaultPrefix (graphicNum) {
	graphicNum = graphicNum * 1;
	switch (graphicNum) {
		case 0:
			return "CAF";
			break;
		default:
			return "series";
	}
}

var coresPorEvento = {};

function LoadedSeries (seriesName) {
	// After a series been loaded
	if (seriesName === "equipamentos") {
		$.ajax({
			url: base_url + "gerenciar/eventos/SelecionarTudo/",
			success: function (data) {
				var json = $.parseJSON(data);
				var eventos = json.data;
				for (var i = 0; i < eventos.length; i++)
					coresPorEvento[eventos[i]['nome']] = (eventos[i]['cor'].length > 0) ? "rgba(" + eventos[i]['cor'] + ",0.7)" : "";

				coresPorEvento['Não Informado'] = "rgba(120,120,120,0.7)";
				if (eventos.length === 0) {
					$("#msg_erro").html("Falha ao recuperar os tipos de eventos!<br />Sem dados de eventos!");
					$('#erro').fadeIn('slow').addClass('open-message');
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			},
			error: function (data) {
				$("#msg_erro").html("Falha ao recuperar os tipos de eventos!<br />Problema de comunicação com o banco de dados.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		});
	}
}