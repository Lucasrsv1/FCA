// LRV Graph System theme.
var colorsTheme = [
	[	"rgba(38, 185, 152, A)", // 0, 0
		"rgba(3, 86, 106, A)",
		"rgba(50, 115, 187, A)",
		"rgba(97, 56, 193, A)",
		"rgba(135, 48, 190, A)",
		"rgba(197, 40, 172, A)",
		"rgba(231, 47, 112, A)",
		"rgba(255, 72, 52, A)",
		"rgba(255, 144, 52, A)",
		"rgba(255, 168, 52, A)",
		"rgba(255, 195, 52, A)",
		"rgba(255, 228, 52, A)",
		"rgba(207, 247, 51, A)",
		"rgba(139, 235, 48, A)" // 0, 13
	], 
	[	"rgba(13, 106, 128, A)", // 1, 0
		"rgba(71, 200, 172, A)",
		"rgba(82, 138, 202, A)",
		"rgba(123, 87, 207, A)",
		"rgba(156, 80, 204, A)",
		"rgba(210, 74, 188, A)",
		"rgba(236, 83, 137, A)",
		"rgba(255, 106, 90, A)",
		"rgba(255, 165, 90, A)",
		"rgba(255, 184, 90, A)",
		"rgba(255, 207, 90, A)",
		"rgba(255, 233, 90, A)",
		"rgba(216, 249, 88, A)",
		"rgba(160, 239, 85, A)" // 1, 13
	],
	[	"rgba(2, 69, 84, A)", // 2, 0
		"rgba(2, 174, 135, A)",
		"rgba(16, 91, 176, A)",
		"rgba(70, 21, 183, A)",
		"rgba(115, 12, 179, A)",
		"rgba(188, 2, 158, A)",
		"rgba(227, 2, 82, A)",
		"rgba(255, 27, 3, A)",
		"rgba(255, 117, 3, A)",
		"rgba(255, 147, 3, A)",
		"rgba(255, 181, 3, A)",
		"rgba(255, 221, 3, A)",
		"rgba(196, 246, 3, A)",
		"rgba(114, 232, 2, A)" // 2, 13
	],
	[	"rgba(39, 124, 144, A)", // 3, 0
		"rgba(115, 219, 196, A)",
		"rgba(124, 169, 220, A)",
		"rgba(157, 128, 223, A)",
		"rgba(183, 123, 222, A)",
		"rgba(225, 118, 208, A)",
		"rgba(243, 127, 168, A)",
		"rgba(255, 145, 134, A)",
		"rgba(255, 189, 134, A)",
		"rgba(255, 203, 134, A)",
		"rgba(255, 219, 134, A)",
		"rgba(255, 239, 134, A)",
		"rgba(227, 251, 132, A)",
		"rgba(185, 245, 128, A)" // 3, 13
	],
	[	"rgba(1, 47, 57, A)", // 4, 0
		"rgba(0, 130, 101, A)",
		"rgba(10, 67, 132, A)",
		"rgba(51, 13, 138, A)",
		"rgba(86, 7, 135, A)",
		"rgba(143, 0, 120, A)",
		"rgba(177, 0, 63, A)",
		"rgba(202, 19, 0, A)",
		"rgba(202, 92, 0, A)",
		"rgba(202, 120, 0, A)",
		"rgba(202, 143, 0, A)",
		"rgba(202, 175, 0, A)",
		"rgba(155, 194, 0, A)",
		"rgba(89, 181, 0, A)" // 4, 13
	]
];

// Get a color from LRV Graph System theme.
function GetThemeColor (group, index, alpha) {
	"use strict";
	return colorsTheme[group][index].replace('A', alpha.toString());
}

// Morris library theme.
var morrisColorsTheme = [];
for (var grp = 0; grp < 5; grp++) {
	for (var ind = 0; ind < 14; ind++ )
		morrisColorsTheme[morrisColorsTheme.length] = GetThemeColor(grp, ind, 1);
}

// ECharts library theme.
var echartsTheme = {
	color: morrisColorsTheme,
	title: {
		itemGap: 8,
		textStyle: {
			fontWeight: '600',
			color: '#73879C'
		}
	},
	dataRange: {
		color: ['#1f610a', '#97b58d']
	},
	toolbox: {
		show: true
	},
	tooltip: {
		show: true,
		backgroundColor: 'rgba(0,0,0,0.5)',
		axisPointer: {
			type: 'line',
			lineStyle: {
				color: '#307819',
				type: 'dashed'
			},
			crossStyle: {
				color: '#307819'
			},
			shadowStyle: {
				color: 'rgba(200,200,200,0.3)'
			}
		}
	},
	dataZoom: {
		dataBackgroundColor: '#eee'
	},
	grid: {
		borderWidth: 0
	},
	categoryAxis: {
		axisLine: {
			lineStyle: {
				color: '#408829'
			}
		},
		splitLine: {
			lineStyle: {
				color: ['#eee']
			}
		}
	},
	valueAxis: {
		axisLine: {
			lineStyle: {
				color: '#408829'
			}
		},
		splitArea: {
			show: true,
			areaStyle: {
				color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
			}
		},
		splitLine: {
			lineStyle: {
				color: ['#eee']
			}
		}
	},
	timeline: {
		lineStyle: {
			color: '#408829'
		},
		controlStyle: {
			normal: {color: '#408829'},
			emphasis: {color: '#408829'}
		}
	},
	k: {
		itemStyle: {
			normal: {
				color: '#68a54a',
				color0: '#a9cba2',
				lineStyle: {
					width: 1,
					color: '#408829',
					color0: '#86b379'
				}
			}
		}
	},
	force: {
		itemStyle: {
			normal: {
				linkStyle: {
					strokeColor: '#408829'
				}
			}
		}
	},
	chord: {
		padding: 4,
		itemStyle: {
			normal: {
				lineStyle: {
					width: 1,
					color: 'rgba(128, 128, 128, 0.5)'
				},
				chordStyle: {
					lineStyle: {
						width: 1,
						color: 'rgba(128, 128, 128, 0.5)'
					}
				}
			},
			emphasis: {
				lineStyle: {
					width: 1,
					color: 'rgba(128, 128, 128, 0.5)'
				},
				chordStyle: {
					lineStyle: {
						width: 1,
						color: 'rgba(128, 128, 128, 0.5)'
					}
				}
			}
		}
	},
	gauge: {
		startAngle: 225,
		endAngle: -45,
		axisLine: {
			show: true,
			lineStyle: {
				color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
				width: 8
			}
		},
		axisTick: {
			splitNumber: 10,
			length: 12,
			lineStyle: {
				color: 'auto'
			}
		},
		axisLabel: {
			textStyle: {
				color: 'auto'
			}
		},
		splitLine: {
			length: 18,
			lineStyle: {
				color: 'auto'
			}
		},
		pointer: {
			length: '90%',
			color: 'auto'
		},
		title: {
			textStyle: {
				color: '#333'
			}
		},
		detail: {
			textStyle: {
				color: 'auto'
			}
		}
	},
	textStyle: {
		fontFamily: 'Arial, Verdana, sans-serif'
	}
};

// A enum to associate a graphic type to a number
var GraphicTypes = {
	Area: 0, // Multi Series And Values
	Bar: 1,
	Line: 2,
	Radar: 3,
	EChartsArea: 4,
	EChartsBar: 5,
	EChartsScatter: 6,
	EChartsLine: 7,
	MorrisArea: 8,
	MorrisBar: 9,
	MorrisLine: 10,
	Donut: 11, // Multi Series
	Pie: 12,
	PieArea: 13,
	EChartsFunnel: 14,
	EChartsPie: 15,
	EChartsPieArea: 16,
	EChartsDonut: 17,
	EChartsMiniPie: 18,
	EChartsGuage: 19,
	MorrisDonut: 20,
	EasyPie: 21, // Simple, one Series and one Value
	Guage: 22,
	ProgressBar: 23
};

// Stores all rendered graphics
var graphics = [];

// Supported date precisions ranges
var dateGroups = [ 'hours', 'days', 'months', 'years' ];

// Get graph type by the num specified (check the GraphicTypes: enum)
function GetType (graphicType) {
	"use strict";
	var type;
	switch (graphicType) {
		case GraphicTypes.Area:
			type = 'line';
			break;
		case GraphicTypes.Bar:
			type = 'bar';
			break;
		case GraphicTypes.Line:
			type = 'line';
			break;
		case GraphicTypes.Radar:
			type = 'radar';
			break;
		case GraphicTypes.MorrisArea:
			type = 'MorrisArea';
			break;
		case GraphicTypes.MorrisBar:
			type = 'MorrisBar';
			break;
		case GraphicTypes.MorrisLine:
			type = 'MorrisLine';
			break;
		case GraphicTypes.EChartsArea:
			type = "EChartsArea";
			break;
		case GraphicTypes.EChartsBar:
			type = "EChartsBar";
			break;
		case GraphicTypes.EChartsLine:
			type = "EChartsLine";
			break;
		case GraphicTypes.EChartsScatter:
			type = "EChartsScatter";
			break;
		default:
			type = 'line';
			break;
	}

	return type;
}

// Create the graph on the canvas or inside the div.
function RenderGraphicMultiSeriesAndValues (graphicNum, title, seriesNames, labels, seriesValues, graphicType, prefix, morrisAngle, echartsY, secondaryData) {
	"use strict";

	var backAlpha = 0.3;
	if (graphicType === GraphicTypes.Line)
		backAlpha = 0;

	var type = GetType(graphicType);

	// Clear canvas and div content
	ClearGraphicArea(graphicNum);

	// Get canvas
	var canvas = document.getElementById("canvas" + graphicNum);

	// Get div
	var divGraph = document.getElementById('graph' + graphicNum);

	// Is there any data?
	if (labels.length === 0)
		title += " (SEM DADOS)";

	var datasets = [];
	if (type === 'line' || type === 'bar' || type === 'radar') {
		// Charts JS
		$('#canvas' + graphicNum).show();
		$('#graph' + graphicNum).hide();
		$('#graph-row' + graphicNum).addClass('chartsjs');
		$('#morris' + graphicNum + '_title').text(title).hide();

		var colorGroup = 0, colorIndex = 0;
		for (var i = 0; i < seriesNames.length; i++) {
			datasets[datasets.length] = {
				label: seriesNames[i],
				backgroundColor: GetThemeColor(colorGroup, colorIndex, backAlpha),
				borderColor: GetThemeColor(colorGroup, colorIndex, 0.7),
				borderWidth: 2,
				pointBorderColor: GetThemeColor(colorGroup, colorIndex, 0.7),
				pointBackgroundColor: GetThemeColor(colorGroup, colorIndex, 0.7),
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointBorderWidth: 1,
				data: (seriesValues[seriesNames[i]]) ? seriesValues[seriesNames[i]] : []
			};

			// Move to next color
			if (colorIndex === 12) {
				colorIndex = 1;
				if (colorGroup === 4)
					colorGroup = 0;
			} else if (colorIndex === 13) {
				colorIndex = 0;
				if (colorGroup === 4)
					colorGroup = 0;
			} else {
				colorIndex += 2;
			}
		}

		var chartjsOption = {
			legend: {
				display: true,
				position: 'bottom',
				labels: {
					boxWidth: 20
				}
			},
			title: {
				display: true,
				fontColor: "#73879C",
				fontSize: 14,
				text: title
			},
			tooltips: {
				callbacks: {
					label: function (tooltipItems, data) {
						var serie = data.datasets[tooltipItems.datasetIndex].label;
						var lab = tooltipItems.xLabel;

						var secondary;
						if (secondaryData)
							secondary = secondaryData[serie];

						if (secondary)
							secondary = secondary[lab];

						var groupsTotal = {};

						var append = [serie], grp = "";
						append.push(prefix + ((!isNaN(tooltipItems.yLabel * 1)) ? tooltipItems.yLabel : "-"));
						if (secondary) {
							for (var d = 0; d < secondary.length; d++) {
								grp = secondary[d].group;

								if (!groupsTotal[grp]) {
									groupsTotal[grp] = {
										showTotal: secondary[d].showTotal,
										separator: (secondary[d].separator) ? secondary[d].separator : ": ",
										total: 0,
										content: []
									};
								}

								groupsTotal[grp].total += secondary[d].value;
								groupsTotal[grp].content.push(secondary[d].label + groupsTotal[grp].separator + secondary[d].value);
							}

							for (var g in groupsTotal) {
								append.push([]);
								append.push(g);
								append = append.concat(groupsTotal[g].content);
								if (groupsTotal[g].showTotal)
									append.push("Total" + groupsTotal[g].separator + Round(groupsTotal[g].total, 2));
							}
						}

						return append;
					}
				}
			}
		};

		if (type !== 'radar') {
			chartjsOption.scales = {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			};
		}

		graphics[graphicNum] = new Chart(canvas, {
			type: type,
			data: {
				labels: labels,
				datasets: datasets
			},
			options: chartjsOption
		});
	} else if (type.indexOf("Morris") !== -1) {
		$('#canvas' + graphicNum).hide();
		$('#graph' + graphicNum).show();
		$('#graph-row' + graphicNum).addClass('morris');
		$('#morris' + graphicNum + '_title').text(title).show();

		var row = {};
		for (var i = 0; i < labels.length; i++) {
			row = {
				"label": labels[i]
			};

			for (var s = 0; s < seriesNames.length; s++)
				row[seriesNames[s]] = seriesValues[seriesNames[s]][i];

			datasets[datasets.length] = row;
		}

		// No data, no Morris Graph
		if (labels.length === 0)
			return;

		var morrisGraph = {
			element: 'graph' + graphicNum,
			data: datasets,
			parseTime: false,
			xkey: 'label',
			ykeys: seriesNames,
			labels: seriesNames, // Legend,
			hoverCallback: function (index, options, content, row) {
				if (seriesNames.length === 1) {
					var append = $(content), serie, lab;
					serie = options.labels[0];
					append[1].innerHTML = serie + "<br />" + prefix + ((!isNaN(row[serie])) ? row[serie] : "-");

					var secondary;
					if (secondaryData)
						secondary = secondaryData[serie];

					if (secondary)
						secondary = secondary[row.label];

					var groupsTotal = {};
					var grp = "";

					if (secondary) {
						for (var d = 0; d < secondary.length; d++) {
							grp = secondary[d].group;

							if (!groupsTotal[grp]) {
								groupsTotal[grp] = {
									showTotal: secondary[d].showTotal,
									separator: (secondary[d].separator) ? secondary[d].separator : ": ",
									total: 0,
									content: ""
								};
							}

							groupsTotal[grp].total += secondary[d].value;
							groupsTotal[grp].content += "<br />" + secondary[d].label + groupsTotal[grp].separator + secondary[d].value;
						}

						for (var g in groupsTotal) {
							append[1].innerHTML += "<br />";
							append[1].innerHTML += "<br />" + g;
							append[1].innerHTML += groupsTotal[g].content;
							if (groupsTotal[g].showTotal)
								append[1].innerHTML += "<br />Total" + groupsTotal[g].separator + Round(groupsTotal[g].total, 2);
						}
					}

					return append[0].outerHTML + append[1].outerHTML;
				} else {
					return content;
				}
			},
			xLabelAngle: morrisAngle,
			barColors: morrisColorsTheme,
			lineColors: morrisColorsTheme,
			continuousLine: false,
			pointSize: 2,
			hideHover: 'auto',
			resize: true
		};

		if (type === "MorrisArea")
			Morris.Area(morrisGraph);
		else if (type === 'MorrisBar')
			Morris.Bar(morrisGraph);
		else if (type === "MorrisLine")
			Morris.Line(morrisGraph);

		if (morrisAngle !== 0)
			$('#graph' + graphicNum).children('svg').attr('height', $('#graph' + graphicNum).children('svg').attr('height') * 1 + 15);
	} else if (type.indexOf("ECharts") !== -1) {
		$('#canvas' + graphicNum).hide();
		$('#graph' + graphicNum).show();
		$('#graph-row' + graphicNum).addClass('echarts');
		$('#morris' + graphicNum + '_title').text(title).hide();

		graphics[graphicNum] = echarts.init(divGraph, echartsTheme);

		var t = 'line';
		if (type === "EChartsBar")
			t = 'bar';

		if (type !== "EChartsScatter") {
			for (var i2 = 0; i2 < seriesNames.length; i2++) {
				datasets[datasets.length] = {
					name: seriesNames[i2],
					type: t,
					data: (seriesValues[seriesNames[i2]]) ? seriesValues[seriesNames[i2]] : [],
					smooth: true,
					markPoint: {
						data: [{
							type: 'max',
							name: 'Máximo'
						}, {
							type: 'min',
							name: 'Mínimo'
						}]
					},
					markLine: {
						data: [{
							type: 'average',
							name: 'Média'
						}]
					}
				};
			}
		} else {
			var coordenadas;
			for (var i3 = 0; i3 < seriesNames.length; i3++) {
				coordenadas = [];

				for (var x = 0; x < labels.length; x++)
					coordenadas[coordenadas.length] = [labels[x], seriesValues[seriesNames[i3]][x]];

				datasets[datasets.length] = {
					name: seriesNames[i3],
					type: 'scatter',
					data: coordenadas,
					markPoint: {
						data: [{
							type: 'max',
							name: 'Máximo'
						}, {
							type: 'min',
							name: 'Mínimo'
						}]
					},
					markLine: {
						data: [{
							type: 'average',
							name: 'Média'
						}]
					}
				};
			}
		}

		var option = {
			title: {
				text: title
			},
			tooltip: {
				trigger: 'axis',
				formatter: function (params, ticket, callback) {
					var append = "<span style='display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: " + params.color + "'></span> " + params.seriesName + "<br />";
					if (typeof params.data !== "object")
						append += params.name + "<br />" + prefix + ((!isNaN(params.data * 1)) ? params.data : "-");
					else if (params.data.name)
						append += params.data.name + ": " + ((!isNaN(params.data.value * 1)) ? params.data.value : "-");
					else
						append += params.data[0] + "<br />" + prefix + ((!isNaN(params.data[1] * 1)) ? params.data[1] : "-");

					var secondary;
					if (secondaryData)
						secondary = secondaryData[params.seriesName];

					if (secondary) {
						if (typeof params.data === "object" && !params.data.name)
							secondary = secondary[params.data[0]];
						else
							secondary = secondary[params.name];
					}

					var groupsTotal = {};
					var grp = "";

					if (secondary) {
						for (var d = 0; d < secondary.length; d++) {
							grp = secondary[d].group;

							if (!groupsTotal[grp]) {
								groupsTotal[grp] = {
									showTotal: secondary[d].showTotal,
									separator: (secondary[d].separator) ? secondary[d].separator : ": ",
									total: 0,
									content: ""
								};
							}

							groupsTotal[grp].total += secondary[d].value;
							groupsTotal[grp].content += "<br />" + secondary[d].label + groupsTotal[grp].separator + secondary[d].value;
						}

						for (var g in groupsTotal) {
							append += "<br />";
							append += "<br />" + g;
							append += groupsTotal[g].content;
							if (groupsTotal[g].showTotal)
								append += "<br />Total" + groupsTotal[g].separator + Round(groupsTotal[g].total, 2);
						}
					}

					return append;
				}
			},
			legend: {
				x: 'left',
				y: 'bottom',
				data: seriesNames
			},
			toolbox: {
				show: true,
				feature: {
					mark: {
						show: true
					},
					magicType: {
						show: true,
						title: {
							line: 'Linhas',
							bar: 'Barras',
							stack: 'Pilha',
							tiled: 'Mosaico'
						},
						type: ['line', 'bar', 'stack', 'tiled']
					},
					restore: {
						show: true,
						title: "Reiniciar"
					},
					saveAsImage: {
						show: true,
						title: "Salvar Imagem"
					}
				}
			},
			calculable: true,
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: labels
			}],
			yAxis: [{
				type: 'value'
			}],
			series: datasets,
			dataZoom: {
				show: true,
				realtime: true,
				y: 36,
				height: 20,
				handleColor: "rgba(115, 135, 156, 0.8)",
				fillerColor: "rgba(26, 187, 156, 0.2)"
			}
		};

		if (echartsY) {
			option.tooltip.axisPointer = {
				type: 'cross',
				lineStyle: {
					type: 'dashed',
					width: 1
				}
			};
		}

		if (type === "EChartsScatter") {
			option.xAxis.type = 'value';
			option.xAxis.scale = true;
			option.yAxis.scale = true;
			option.toolbox.feature.magicType = {
				show: false
			};

			graphics[graphicNum].setOption(option);
		} else {
			for (var d = 0; d < datasets.length; d++) {
				if (type === "EChartsLine") {
					datasets[d].itemStyle = {
						normal: {
							lineStyle: {
								type: 'solid'
							}
						}
					};
				} else if (type === "EChartsArea") {
					datasets[d].itemStyle = {
						normal: {
							areaStyle: {
								type: 'default'
							}
						}
					};
				} else {
					option.xAxis[0].boundaryGap = true;
					break;
				}
			}

			graphics[graphicNum].setOption(option);
		}
	}

	if (labels.length !== 0)
		// Enable Save and Print buttons.
		$('#graph-row' + graphicNum + ' .export button').removeAttr('disabled');

	$('#graph-row' + graphicNum + ' .producao_dados').text(moment().format('DD/MM/YYYY HH:mm:ss'));
}

// Clear the canvas and div from the graph-set.
function ClearGraphicArea(graphicNum, checking = false) {
	var selected = SeriesPrefix(graphicNum);
	if ($('#graph-row' + graphicNum + ' ul' + ((selected[0] === ".") ? selected : "." + selected) + '_list input:checked').length > 0 && checking)
		return;

	// Clear canvas content
	if (graphics[graphicNum]) {
		if (graphics[graphicNum].destroy)
			graphics[graphicNum].destroy();

		if (graphics[graphicNum].clear)
			graphics[graphicNum].clear();
	}

	// Clear div content
	var divGraph = document.getElementById('graph' + graphicNum);
	if (divGraph) {
		divGraph.innerHTML = "";
		$('#morris' + graphicNum + '_title').text("");
	}

	// Remove graph type
	$('#graph-row' + graphicNum).removeClass('morris').removeClass('chartsjs').removeClass('echarts');

	// Disable Save and Print buttons.
	$('#graph-row' + graphicNum + ' .export button').attr('disabled', '');

	if (!checking) {
		setTimeout(ClearGraphicArea, 500, graphicNum, true);
		setTimeout(ClearGraphicArea, 1750, graphicNum, true);
		setTimeout(ClearGraphicArea, 3000, graphicNum, true);
	}
}

// Add <li> items to the <ul> that represents a object series.
function PopulateObjectSeries(items, itemsLabels, itemsPrefix, jointLabel) {
	for (var item = 0; item < items.length; item++) {
		for (var p in items[item]) {
			$(itemsPrefix[item] + '_list').each(function (index, element) {
				// Get the <ul> element
				var container;
				if ($(element).children('div').children('.mCSB_container'))
					container = $(element).children('div').children('.mCSB_container');
				else
					container = $(element);

				// Create the series description
				var title = itemsLabels[item] + p + "&#10;" + jointLabel + items[item][p].join(", ");

				// Add the series <li> to the <ul>
				container.append($("<li title='" + title + "'> <p> <input type=\"checkbox\" class=\"flat " + (itemsPrefix[item] + p).replace(/ /g, "-") + "\" /> " + p + " </p> </li>"));
			});
		}
	}
}

// After create all li options and series for the graph, call this function to update
// the graph when the configurations change and a series is selected/unselected.
function SetGraphUpdateTrigger() {
	"use strict";
	$('ul.series_list .iCheck-helper, .graph-option .iCheck-helper').click(function () {
		var input = $(this).prev('input');
		if (input.is(':checked'))
			input.parent().parent().css('color', 'rgb(26, 188, 156) !important');
		else
			input.parent().parent().css('color', 'inherit');

		var id = $(this).parents('.graph-row').attr('id').substr(9);
		CreateGraphic(id);
	});

	$('ul.series_list .iCheck-helper, .graph-option .iCheck-helper').each(function () {
		var input = $(this).prev('input');
		if (input.is(':checked'))
			input.parent().parent().css('color', 'rgb(26, 188, 156) !important');
		else
			input.parent().parent().css('color', 'inherit');
	});

	$('.graph-select').change(function () {
		var input = $(this).prev('input');
		if (input.is(':checked'))
			input.parent().parent().css('color', 'rgb(26, 188, 156) !important');
		else
			input.parent().parent().css('color', 'inherit');

		var id = $(this).parents('.graph-row').attr('id').substr(9);
		CreateGraphic(id);
	});

	$('.series').change(function () {
		var id = $(this).parents('.graph-row').attr('id').substr(9);
		var selected = $(this).val();
		if (selected[0] !== '.')
			selected = '.' + selected;

		$('#graph-row' + id).find('.series_list.not-hide').addClass('hide').removeClass('not-hide');
		$('#graph-row' + id).find(selected + '_list').removeClass('hide').addClass('not-hide');
	});
}

// Get the selected series value.
function SeriesPrefix (graphicNum) {
	var series = $('#graph-row' + graphicNum + ' .series');
	return (series.val()) ? series.val() : DefaultPrefix(graphicNum);
}

$(document).ready(function () {
	// Add scrollbar to the series <ul>
	$('.series_list').mCustomScrollbar({
		autoHideScrollbar: false,
		theme: 'minimal-dark',
		scrollButtons: { enable: true },
		mouseWheel: { preventDefault: true }
	});

	// Print functionality	
	$('.imprimir').click(function (e) {
		var id = $(this).parents('.graph-row').attr('id').substr(9);
		$('.graph-sets').hide();
		$('#graph-row' + id + ' .graph-sets').show();
		window.print();
		$('.graph-sets').show();
	});

	// Save graph as image.	
	$('.salvar').click(function (e) {
		var id = $(this).parents('.graph-row').attr('id').substr(9);
		var graph_row = $('#graph-row' + id);

		var canvas = null;
		if (graph_row.hasClass('chartsjs')) {
			canvas = document.getElementById('canvas' + id);
		} else if (graph_row.hasClass('echarts')) {
			canvas = $('#graph' + id + ' canvas').get(0);
		} else if (graph_row.hasClass('morris')) {
			canvas = document.createElement('canvas');
			canvg(canvas, $('#graph' + id + ' svg').get(0).outerHTML);
		}

		if (canvas !== null) {
			var destinationCanvas = document.createElement("canvas");
			destinationCanvas.width = canvas.width;
			destinationCanvas.height = canvas.height;

			var destCtx = destinationCanvas.getContext('2d');

			// Create a rectangle with the desired color
			destCtx.fillStyle = "#FFFFFF";
			destCtx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw the original canvas onto the destination canvas
			destCtx.drawImage(canvas, 0, 0);

			// Finally use the destinationCanvas.toDataURL() method to get the desired output;
			DownloadURI(destinationCanvas.toDataURL('image/jpeg'), $('#graph-row' + id + ' .graph-title').text());
			delete destinationCanvas;
		}

		if (graph_row.hasClass('morris'))
			delete canvas;
	});
});