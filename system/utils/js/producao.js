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
		title = "Produção " + startDate.format(formatBR) + " - " + endDate.format((dateGroup === 0) ? "DD/MM/YYYY HH:59" : formatBR);
	else
		title = "Produção " + startDate.format(formatBR);

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

	// Set categories
	var categories = [];
	var categoriesBR = [];
	if (!withDataOnly) {
		var startClone = startDate.clone();
		while (endDate.diff(startClone, dateGroups[dateGroup]) > 0) {
			categories[categories.length] = startClone.format(format);
			categoriesBR[categoriesBR.length] = startClone.format(formatBR);
			startClone.add(1, dateGroups[dateGroup]);
		}
		categories[categories.length] = startClone.format(format); // Add the last one
		categoriesBR[categoriesBR.length] = startClone.format(formatBR); // Add the last one
	}

	// Get graphic type
	var type = $('#graph-row' + graphicNum + ' .graphic_type').val() * 1;

	// Get Values
	var values = {};
	$.ajax({
		url: base_url + "gerenciar/equipamentos/AnaliseProducaoDuracao/",
		type: "POST",
		data: {
			startDate: startDate.format(format),
			endDate: endDate.format(format),
			dateGroup: dateGroup,
			cafs: series,
			duracao: false
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
			} else if (queryResult === "errorP") {
				$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
				$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Verifique as configurações, series e datas selicionadas.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
				$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
				return;
			}

			// Set the value prefix
			var prefix = "Peças produzidas: ";

			// Handle returned values
			var objectSeries = [];
			var objSeries = GetList(spx);
			if (spx[0] !== ".") {
				for (var i = 0; i < series.length; i++)
					values[series[i]] = [];
			}

			var newCategories = [], newCategoriesBR = [], pos = -1;
			for (var row = 0; row < queryResult.length; row++) {
				if (categories.length !== 0) {
					// Use all Time_Range labels
					var labelIndex = categories.indexOf(queryResult[row]['Label']);

					if (spx[0] !== ".") {
						values[queryResult[row]['Series']][labelIndex] = queryResult[row]['Value'];
					} else {
						for (var p in objSeries) {
							if (objSeries[p].indexOf(queryResult[row]['Series']) !== -1) {
								if (!values[p]) {
									values[p] = [];
									objectSeries.push(p);
								}
								
								if (!values[p][labelIndex])
									values[p][labelIndex] = 0;
								
								values[p][labelIndex] += queryResult[row]['Value'] * 1;
							}
						}
					}
				} else {
					// Use only with data labels
					if ((pos = newCategoriesBR.indexOf(queryResult[row]['LabelBR'])) === -1) {
						pos = newCategoriesBR.length;
						newCategoriesBR[pos] = queryResult[row]['LabelBR'];
						newCategories[pos] = queryResult[row]['Label'];
					}

					if (spx[0] !== ".") {
						values[queryResult[row]['Series']][pos] = queryResult[row]['Value'];
					} else {
						for (var p in objSeries) {
							if (objSeries[p].indexOf(queryResult[row]['Series']) !== -1) {
								if (!values[p]) {
									values[p] = [];
									objectSeries.push(p);
								}	

								if (!values[p][pos])
									values[p][pos] = 0;

								values[p][pos] += queryResult[row]['Value'] * 1;
							}
						}
					}
				}
			}
			
			series = series.sort();
			objectSeries = objectSeries.sort();

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

			// Get secondary data.
			var secondaryData = {};
			if (includeControl) {
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

				$.ajax({
					url: base_url + "gerenciar/equipamentos/EventosAgrupados/",
					type: "POST",
					data: {
						cafs: series,
						labels: labels.join(", "),
						labelsEnd: labelsEnd.join(", "),
						labelsD: categories.join(", "),
						labelsBR: categoriesBR.join(", "),
						maus: true
					},
					success: function (data) {
						var json = $.parseJSON(data);
						var queryResult = json.data;

						if (queryResult === "errorL") {
							$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
							$("#msg_erro").html("Falha ao recuperar os dados secundários da análise!<br />Sessão expirada! Por favor, faça login novamente.");
							$('#erro').fadeIn('slow').addClass('open-message');
							$('html, body').animate({ scrollTop: 0 }, 'slow');
							$('#graph-row' + graphicNum + ' .refresh').removeClass('fa-spin');
							return;
						} else if (queryResult.length === 0) {
							secondaryData = null;
						}

						// Handle secondary data
						var serie, lab, push;
						for (var row = 0; row < queryResult.length; row++) {
							if (spx[0] !== ".") {
								serie = queryResult[row]['Series'];
							} else {
								for (var p in objSeries) {
									if (objSeries[p].indexOf(queryResult[row]['Series']) !== -1) {
										serie = p;
										break;
									}
								}
							}	
							
							lab = queryResult[row]['labelBR'];
							if (!secondaryData[serie])
								secondaryData[serie] = {};

							push = -1;
							if (!secondaryData[serie][lab]) {
								secondaryData[serie][lab] = [];
							} else if (spx[0] === ".") {
								for (var s = 0; s < secondaryData[serie][lab].length; s++) {
									if (secondaryData[serie][lab][s].label === queryResult[row]['nome']) {
										push = s;
										break;
									}
								}
							}
							
							if (push === -1) {
								secondaryData[serie][lab].push({
									group: "Peças não produzidas:",
									showTotal: true,
									label: queryResult[row]['nome'],
									value: Round(queryResult[row]['Duracao'] / (3600 / producaoPorHora[queryResult[row]['Series']]), 2)
								});
							} else {
								secondaryData[serie][lab][push].value += Round(queryResult[row]['Duracao'] / (3600 / producaoPorHora[queryResult[row]['Series']]), 2);
							}
						}

						// Get graph zoom
						var zoom = $('#graph-row' + graphicNum + ' .zoom').val().replace(/%/g, "");
						RenderGraphicMultiSeriesAndValues(graphicNum, title, (objectSeries.length > 0) ? objectSeries : series, categoriesBR, values, type, prefix, xLabelAngle, echartsY, echartsMM, echartsAVG, secondaryData, zoom);
					},
					error: function (data) {
						$("#msg_erro").html("Falha ao recuperar os dados secundários da análise!<br />Problema de comunicação com o banco de dados.");
						$('#erro').fadeIn('slow').addClass('open-message');
						$('html, body').animate({ scrollTop: 0 }, 'slow');

						// Get graph zoom
						var zoom = $('#graph-row' + graphicNum + ' .zoom').val().replace(/%/g, "");
						RenderGraphicMultiSeriesAndValues(graphicNum, title, (objectSeries.length > 0) ? objectSeries : series, categoriesBR, values, type, prefix, xLabelAngle, echartsY, echartsMM, echartsAVG, null, zoom);
					}
				});
			} else {
				// Get graph zoom
				var zoom = $('#graph-row' + graphicNum + ' .zoom').val().replace(/%/g, "");
				RenderGraphicMultiSeriesAndValues(graphicNum, title, (objectSeries.length > 0) ? objectSeries : series, categoriesBR, values, type, prefix, xLabelAngle, echartsY, echartsMM, echartsAVG, null, zoom);
			}
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

var producaoPorHora = {};

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

function LoadedSeries (seriesName) {
	// After a series been loaded
	if (seriesName === "equipamentos") {
		$.ajax({
			url: base_url + "gerenciar/equipamentos/ProducaoPorHora/",
			type: "POST",
			data: {
				cafs: cafs
			},
			success: function (data) {
				var json = $.parseJSON(data);
				var equipamentos = json.data;
				for (var i = 0; i < equipamentos.length; i++)
					producaoPorHora[equipamentos[i]['Series']] = equipamentos[i]['Value'] * 1;

				if (equipamentos.length === 0) {
					$("#msg_erro").html("Falha ao recuperar a produção por equipamentos!<br />Sem dados de produção!");
					$('#erro').fadeIn('slow').addClass('open-message');
					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			},
			error: function (data) {
				$("#msg_erro").html("Falha ao recuperar a produção por equipamentos!<br />Problema de comunicação com o banco de dados.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			}
		});
	}
}