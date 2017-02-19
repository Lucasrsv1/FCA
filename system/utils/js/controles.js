function CreateGraphic (graphicNum) {
	"use strict";

	// Spin loading indicator
	$('#graph-row' + graphicNum + ' .refresh').addClass('fa-spin');

	// Get Date Group
	var dateGroup = $('#graph-row' + graphicNum + ' .category').val() * 1;

	// Set Date Group Format
	var format = "", formatBR = "";
	switch (dateGroup) {
		case 0:
			format = "YYYY-MM-DD HH";
			formatBR = "DD/MM/YYYY HH:00";
			break;
		case 2:
			format = "YYYY-MM";
			formatBR = "MM/YYYY";
			break;
		case 3:
			format = "YYYY";
			formatBR = "YYYY";
			break;
		default:
			dateGroup = 1;
			format = "YYYY-MM-DD";
			formatBR = "DD/MM/YYYY";
			break;
	}

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
	if (endDate.diff(startDate, dateGroups[dateGroup]) > 0)
		title = "Controles " + startDate.format(formatBR) + " - " + endDate.format(formatBR);
	else
		title = "Controles " + startDate.format(formatBR);

	// Add secondary data
	var includeControl = $("#graph-row" + graphicNum + " .includeControl input[type='checkbox']").is(':checked');

	// Use echarts cross-line tooltip?
	var echartsY = $("#graph-row" + graphicNum + " .echartsY input[type='checkbox']").is(':checked');

	// Show min and max in echarts?
	var echartsMM = $("#graph-row" + graphicNum + " .echartsMM input[type='checkbox']").is(':checked');

	// Show average in echarts?
	var echartsAVG = $("#graph-row" + graphicNum + " .echartsAVG input[type='checkbox']").is(':checked');

	// Morris xLabelAngle
	var xLabelAngle = 0;
	var morrisAngle = $("#graph-row" + graphicNum + " .morrisAngle input[type='checkbox']").is(':checked');
	if (morrisAngle)
		xLabelAngle = 60;

	// Set categories
	var categories = [];
	var categoriesBR = [];
	var startClone = startDate.clone();
	while (endDate.diff(startClone, dateGroups[dateGroup]) > 0) {
		categories[categories.length] = startClone.format(format);
		categoriesBR[categoriesBR.length] = startClone.format(formatBR);
		startClone.add(1, dateGroups[dateGroup]);
	}
	categories[categories.length] = startClone.format(format); // Add the last one
	categoriesBR[categoriesBR.length] = startClone.format(formatBR); // Add the last one

	// Get graphic type
	var type = $('#graph-row' + graphicNum + ' .graphic_type').val() * 1;

	// Get Values
	var c;
	var labels = [], labelsEnd = [];
	if (dateGroup !== 3) {
		for (c = 0; c < categories.length; c++) {
			labels[c] = moment(categories[c]).format("YYYY-MM-DD HH:mm:ss");
			labelsEnd[c] = moment(categories[c]).endOf(dateGroups[dateGroup]).add(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
		}
	} else {
		for (c = 0; c < categories.length; c++) {
			labels[c] = moment(categories[c], "YYYY").format("YYYY-MM-DD HH:mm:ss");
			labelsEnd[c] = moment(categories[c], "YYYY").endOf(dateGroups[dateGroup]).add(1, 'seconds').format("YYYY-MM-DD HH:mm:ss");
		}
	}

	var values = {};
	$.ajax({
		url: base_url + "gerenciar/equipamentos/EventosAgrupados/",
		type: "POST",
		data: {
			cafs: series,
			labels: labels.join(", "),
			labelsEnd: labelsEnd.join(", "),
			labelsD: categories.join(", "),
			labelsBR: categoriesBR.join(", "),
			maus: false
		},
		success: function (data) {
			var json = $.parseJSON(data);
			var queryResult = json.data;

			if (queryResult === "errorL") {
				$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
				$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Sessão expirada! Por favor, faça login novamente.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
				$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
				return;
			}

			// Set the value prefix
			var prefix = "Duração total: ";
			var realSeries = new UniqueArray();

			// Get secondary data.
			var secondaryData = {};

			for (var row = 0; row < queryResult.length; row++)

				for (var i = 0; i < realSeries.Length(); i++)
					values[realSeries[i]] = [];

			for (var row = 0; row < queryResult.length; row++) {
				realSeries.Push(queryResult[row]['nome']);
				if (!values[queryResult[row]['nome']]) {
					values[queryResult[row]['nome']] = [];
					secondaryData[queryResult[row]['nome']] = {};
				}
				
				var labelIndex = categories.indexOf(queryResult[row]['labelD']);
				if (!values[queryResult[row]['nome']][labelIndex]) {
					values[queryResult[row]['nome']][labelIndex] = 0;
					secondaryData[queryResult[row]['nome']][categoriesBR[labelIndex]] = [];
				}

				values[queryResult[row]['nome']][labelIndex] += queryResult[row]['Duracao'] * 1;
				secondaryData[queryResult[row]['nome']][categoriesBR[labelIndex]].push({
					group: "LV_ONLY",
					showTotal: false,
					label: "Máquina(s):",
					separator: "<br />",
					value: queryResult[row]['Series']
				});
			}
			
			realSeries.Sort();

			// Set all labels without data to zero.
			for (var v in values) {
				for (var l = 0; l < categories.length; l++) {
					if (!values[v][l])
						values[v][l] = null;
				}
			}
			
			// Get graph zoom
			var zoom = $('#graph-row' + graphicNum + ' .zoom').val().replace(/%/g, "");
			RenderGraphicMultiSeriesAndValues(graphicNum, title, realSeries.GetAll(), categoriesBR, values, type, prefix, xLabelAngle, echartsY, echartsMM, echartsAVG, secondaryData, zoom, true, coresPorEvento);
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
		case 1:
			return "CAF";
			break;
		default:
			return "series";
	}
}

var coresPorEvento = {};

function LoadedSeries(seriesName) {
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