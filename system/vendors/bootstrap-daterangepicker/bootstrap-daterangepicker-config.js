$(document).ready(function() {
	var cb = function (start, end, label) {
		this.element[0].getElementsByTagName("span")[0].innerHTML = start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY');
	};

	var optionSet1 = {
		startDate: moment(),
		endDate: moment(),
		showDropdowns: true,
		showWeekNumbers: true,
		timePicker: false,
		timePickerIncrement: 1,
		timePicker12Hour: true,
		language: "pt-BR",
		ranges: {
			'Hoje': [moment(), moment()],
			'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
			'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
			'Este Mês': [moment().startOf('month'), moment().endOf('month')],
			'Mês Passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month'	)],
			'Este Ano': [moment().startOf('year'), moment().endOf('year')],
			'Ano Passado': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
		},
		opens: 'left',
		buttonClasses: ['btn btn-default'],
		applyClass: 'btn-small btn-primary',
		cancelClass: 'btn-small',
		format: 'DD/MM/YYYY',
		separator: ' a ',
		locale: {
			applyLabel: 'Aplicar',
			cancelLabel: 'Cancelar',
			fromLabel: 'De',
			toLabel: 'a',
			weekLabel: "S",
			format: "DD/MM/YYYY",
			customRangeLabel: 'Personalizado',
			daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
			monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			firstDay: 1
		}
	};
	
	$('.reportrange span').html(moment().format('DD/MM/YYYY') + ' - ' + moment().format('DD/MM/YYYY'));
	$('.reportrange').daterangepicker(optionSet1, cb);
	
	$('.reportrange').on('apply.daterangepicker', function(ev, picker) {
		var id = $(this).parents('.graph-row').attr('id').substr(9);
		CreateGraphic(id);
	});
});