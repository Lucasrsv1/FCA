// Series arrays and objects loaded
var cafs = [], saps = {}, descriptions = {}, products = {}, sectors = {}, utes = {};

$(document).ready(function () {
	// Load available series
	$.ajax({
		url: base_url + "gerenciar/equipamentos/SelecionarTudo/",
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

			// Ajax callback
			if (typeof LoadedSeries == "function")
				LoadedSeries("equipamentos");
		},
		error: function (data) {
			$("#msg_erro").html("Falha ao recuperar equipamentos cadastrados!<br />Problema de comunicação com o banco de dados.");
			$('#erro').fadeIn('slow').addClass('open-message');
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
	});
});