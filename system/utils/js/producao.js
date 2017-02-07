function CreateGraphic(graphicNum) {
	"use strict";

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
		return;
	}

	// Set Title [Time Range]
	var title = "";
	if (endDate.diff(startDate, dateGroups[dateGroup]) > 0)
		title = "Produção " + startDate.format(formatBR) + " - " + endDate.format(formatBR);
	else
		title = "Produção " + startDate.format(formatBR);

	// Category, use labels only with data?
	var withDataOnly = $("#graph-row" + graphicNum + " .withDataOnly input[type='checkbox']").is(':checked');

	// Add secondary data
	var includeControl = $("#graph-row" + graphicNum + " .includeControl input[type='checkbox']").is(':checked');

	// Use echarts cross-line tooltip?
	var echartsY = $("#graph-row" + graphicNum + " .echartsY input[type='checkbox']").is(':checked');

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
		url: "gerenciar/equipamentos/AnaliseProducao/",
		type: "POST",
		data: {
			startDate: startDate.format(format),
			endDate: endDate.format(format),
			dateGroup: dateGroup,
			cafs: series
		},
		success: function (data) {
			var json = $.parseJSON(data);
			var queryResult = json.data;

			if (queryResult === "errorL") {
				$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Sessão expirada! Por favor, faça login novamente.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
				return;
			} else if (queryResult === "errorP") {
				$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Verifique as configurações, series e datas selicionadas.");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
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

			if (categoriesBR.length === 0) {
				categories = newCategories;
				categoriesBR = newCategoriesBR;
			}

			// Get secondary data.
			var secondaryData = {};
			if (includeControl) {
				var labels = [];
				var labelsEnd = [];
				var labelsD = [];
				var labelsBR = [];
				var c;
				if (dateGroup !== 3) {
					for (c = 0; c < categories.length; c++) {
						labels[c] = moment(categories[c]).format("YYYY-MM-DD HH:mm:ss");
						labelsEnd[c] = moment(categories[c]).endOf(dateGroups[dateGroup]).format("YYYY-MM-DD HH:mm:ss");
						labelsD[c] = categories[c];
						labelsBR[c] = categoriesBR[c];
					}
				} else {
					for (c = 0; c < categories.length; c++) {
						labels[c] = moment(categories[c], "YYYY").format("YYYY-MM-DD HH:mm:ss");
						labelsEnd[c] = moment(categories[c], "YYYY").endOf(dateGroups[dateGroup]).format("YYYY-MM-DD HH:mm:ss");
						labelsD[c] = categories[c];
						labelsBR[c] = categoriesBR[c];
					}
				}

				$.ajax({
					url: "gerenciar/equipamentos/MausEventos/",
					type: "POST",
					data: {
						cafs: series,
						labels: labels.join(", "),
						labelsEnd: labelsEnd.join(", "),
						labelsD: labelsD.join(", "),
						labelsBR: labelsBR.join(", ")
					},
					success: function (data) {
						var json = $.parseJSON(data);
						var queryResult = json.data;

						if (queryResult === "errorL") {
							$("#msg_erro").html("Falha ao recuperar os dados secundários da análise!<br />Sessão expirada! Por favor, faça login novamente.");
							$('#erro').fadeIn('slow').addClass('open-message');
							$('html, body').animate({ scrollTop: 0 }, 'slow');
							return;
						} else if (queryResult.length === 0) {
							secondaryData = null;
						}

						// Handle secondary data
						var serie, lab;
						for (var row = 0; row < queryResult.length; row++) {
							serie = queryResult[row]['Series'];
							lab = queryResult[row]['labelBR'];
							if (!secondaryData[serie])
								secondaryData[serie] = {};

							if (!secondaryData[serie][lab])
								secondaryData[serie][lab] = [];

							secondaryData[serie][lab].push({
								group: "Peças não produzidas:",
								showTotal: true,
								label: queryResult[row]['nome'],
								value: Round(queryResult[row]['Duracao'] / (3599 / producaoPorHora[queryResult[row]['Series']]), 2)
							});
						}

						RenderGraphicMultiSeriesAndValues(graphicNum, title, (objectSeries.length > 0) ? objectSeries : series, categoriesBR, values, type, prefix, xLabelAngle, echartsY, secondaryData);
					},
					error: function (data) {
						$("#msg_erro").html("Falha ao recuperar os dados secundários da análise!<br />Problema de comunicação com o banco de dados.");
						$('#erro').fadeIn('slow').addClass('open-message');
						$('html, body').animate({ scrollTop: 0 }, 'slow');
						RenderGraphicMultiSeriesAndValues(graphicNum, title, (objectSeries.length > 0) ? objectSeries : series, categoriesBR, values, type, prefix, xLabelAngle, echartsY, null);
					}
				});
			} else {
				RenderGraphicMultiSeriesAndValues(graphicNum, title, (objectSeries.length > 0) ? objectSeries : series, categoriesBR, values, type, prefix, xLabelAngle, echartsY, null);
			}
		},
		error: function (data) {
			$("#msg_erro").html("Falha ao recuperar os dados da análise!<br />Problema de comunicação com o banco de dados.");
			$('#erro').fadeIn('slow').addClass('open-message');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
	});
}

var producaoPorHora = {};

// Series arrays and objects
var cafs = [], saps = {}, descriptions = {}, products = {}, sectors = {}, utes = {};

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

$(document).ready(function () {
	// Load available series
	$.ajax({
		url: "gerenciar/equipamentos/SelecionarTudo/",
		success: function (data) {
			var json = $.parseJSON(data);
			var equipamentos = json.data;

			for (var i = 0; i < equipamentos.length; i++) {
				var caf = equipamentos[i]['caf'];
				var cod_sap = equipamentos[i]['cod_sap'];
				var descricao = equipamentos[i]['descricao'];
				var produto = equipamentos[i]['produto'];
				var setor = equipamentos[i]['setor'];
				var ute = equipamentos[i]['ute'];

				$('.CAF_list').each(function (index, element) {
					// Get the <ul> element
					var container;
					if ($(element).children('div').children('.mCSB_container'))
						container = $(element).children('div').children('.mCSB_container');
					else
						container = $(element);

					// Create the series description
					var title = "Descrição: " + descricao + "&#10;Produto: " + produto + "&#10;UTE: " + ute + "&#10;Setor: " + setor + "&#10;CAF: " + caf + "&#10;Código SAP: " + cod_sap;

					// Add the series <li> to the <ul>
					container.append($("<li title='" + title + "'> <p> <input type=\"checkbox\" class=\"flat CAF" + i + "\" /> " + equipamentos[i]['caf'] + " </p> </li>"));
				});

				cafs.push(caf);

				if (!saps[cod_sap])
					saps[cod_sap] = [];

				saps[cod_sap].push(caf);

				if (!descriptions[descricao])
					descriptions[descricao] = [];

				descriptions[descricao].push(caf);

				if (!products[produto])
					products[produto] = [];

				products[produto].push(caf);

				if (!sectors[setor])
					sectors[setor] = [];

				sectors[setor].push(caf);

				if (!utes[ute])
					utes[ute] = [];

				utes[ute].push(caf);
			}

			var itemsLabels = ["Descrição: ", "Produto: ", "UTE: ", "Setor: ", "Código SAP: "];
			var itemsPrefix = ['.DESCRT', '.PROD', '.UTE', '.SECT', '.SAP'];
			var items = [descriptions, products, utes, sectors, saps];

			PopulateObjectSeries(items, itemsLabels, itemsPrefix, "CAF: ");

			if (equipamentos.length === 0) {
				$("#msg_erro").html("Falha ao recuperar equipamentos cadastrados!<br />Nenhum equipamento encontrado!");
				$('#erro').fadeIn('slow').addClass('open-message');
				$('html, body').animate({ scrollTop: 0 }, 'slow');
			} else {
				$('input.flat').iCheck({
					checkboxClass: 'icheckbox_flat-green',
					radioClass: 'iradio_flat-green'
				});

				SetGraphUpdateTrigger();
			}

			// After series been loaded
			$.ajax({
				url: "gerenciar/equipamentos/ProducaoPorHora/",
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
		},
		error: function (data) {
			$("#msg_erro").html("Falha ao recuperar equipamentos cadastrados!<br />Problema de comunicação com o banco de dados.");
			$('#erro').fadeIn('slow').addClass('open-message');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
	});
});