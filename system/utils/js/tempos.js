function CreateGraphic (graphicNum) {
	"use strict";

	// Spin loading indicator
	$('#graph-row' + graphicNum + ' .refresh').addClass('fa-spin');

	// Set Date Group Format
	var format = "YYYY-MM-DD HH", formatBR = "DD/MM/YY HH:00";

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
	if (endDate.diff(startDate, 'hours') > 0)
		title = "Processos de Produção " + startDate.format(formatBR) + " - " + endDate.format("DD/MM/YYYY HH:59");
	else
		title = "Processos de Produção " + startDate.format(formatBR);

	// Category, use labels only with data?
	var withDataOnly = $("#graph-row" + graphicNum + " .withDataOnly input[type='checkbox']").is(':checked');

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

	// Get graphic type
	var type = $('#graph-row' + graphicNum + ' .graphic_type').val() * 1;

	// Set categories
	var categories = [];
	var categoriesBR = [];
	if (!withDataOnly) {
		var startClone = startDate.clone();
		while (endDate.diff(startClone, 'hours') > 0) {
			categories[categories.length] = startClone.format(format);
			categoriesBR[categoriesBR.length] = startClone.format(formatBR);
			startClone.add(1, 'hours');
		}
		categories[categories.length] = startClone.format(format); // Add the last one
		categoriesBR[categoriesBR.length] = startClone.format(formatBR); // Add the last one
	}

	// Get Values
	var values = {};
	$.ajax({
		url: base_url + "gerenciar/equipamentos/AnaliseProducaoDuracao/",
		type: "POST",
		data: {
			startDate: startDate.format(format),
			endDate: endDate.format(format),
			dateGroup: 0,
			cafs: series,
			duracao: true
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

			// Get secondary data.
			var secondaryData = {};

			// Set the value prefix
			var prefix = "Total: ";
			var realSeries = ["Abastecer", "Desabastecer", "Duração", "Produzir"];

			for (var r = 0; r < 4; r++){
				values[realSeries[r]] = [];
				secondaryData[realSeries[r]] = {};
			}

			var newCategories = [], newCategoriesBR = [], label, labelIndex = -1;
			for (var row = 0; row < queryResult.length; row++) {
				if (categories.length !== 0) {
					// Use all Time_Range labels
					label = queryResult[row]['LabelBR']
					labelIndex = categoriesBR.indexOf(label);
					console.log(categoriesBR, label);
				} else {
					// Use only with data labels
					if ((labelIndex = newCategoriesBR.indexOf(queryResult[row]['LabelBR'])) === -1) {
						labelIndex = newCategoriesBR.length;
						label = queryResult[row]['LabelBR'];

						newCategoriesBR[labelIndex] = label;
						newCategories[labelIndex] = queryResult[row]['Label'];
					}
				}

				for (var s = 0; s < 4; s++) {
					if (!secondaryData[realSeries[s]][label])
						secondaryData[realSeries[s]][label] = [];

					values[realSeries[s]][labelIndex] = queryResult[row]['Value_' + s.toString()] * 1;
					secondaryData[realSeries[s]][label].push({
						group: "LV_ONLY",
						showTotal: false,
						label: "Máquina",
						value: queryResult[row]['Series_GROUP']
					});
				}
			}
			
			// Set all labels without data to zero.
			for (var v in values) {
				for (var l = 0; l < categories.length; l++) {
					if (!values[v][l])
						values[v][l] = null;
				}
			}

			if (categoriesBR.length === 0) {
				categories = newCategories;
				categoriesBR = newCategoriesBR;
			}
			
			// Get graph zoom
			var zoom = $('#graph-row' + graphicNum + ' .zoom').val().replace(/%/g, "");
			RenderGraphicMultiSeriesAndValues(graphicNum, title, realSeries, categoriesBR, values, type, prefix, xLabelAngle, echartsY, echartsMM, echartsAVG, secondaryData, zoom, true, true);
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