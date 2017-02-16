function DownloadURI(uri, name) {
	var link = document.createElement("a");
	link.download = name;
	link.href = uri;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	delete link;
}

function Round (val, precision = 0) {
	var p = Math.pow(10, precision);
	return Math.round(val * p) / p;
}

// Trigger when the .zoom[num-code="numCode"] is changed
function ZoomChange(numCode) {
	CreateGraphic(numCode);
}

$(document).ready(function () {
	"use strict";
	$.mask.definitions['h'] = '[0123456789ABCDEFabcdef]';

	$(".telefones").mask("(99) 9999-9999");
	$(".telefone_principal").mask("(99) 9999-9999");
	$(".telefone_alternativo").mask("(99) 9999-9999");
	$(".celular").mask("(99) 99999-9999");
	$('.MAC').mask("hh:hh:hh:hh:hh:hh");

	$("#erro").hide();
	$("#sucesso").hide();

	$(".close, .fechar").click(function () {
		$('.open-message').fadeOut('slow');
	});

	$('input[type="number"], .num-fild').keypress(function (e) {
		if ((e.which !== 8 && e.which !== 0 && e.which !== 13 && e.which !== 44 && e.which !== 46 && (e.which < 48 || e.which > 57)))
			return false;
	});

	$(".add-zoom").click(function () {
		var zoom = $(this).prev(".zoom");
		if (zoom.length === 0)
			zoom = $(this).next(".zoom");
		
		zoom.val(zoom.val().replace(/%/g, "") * 1 + 100).trigger("change");
	});

	$(".less-zoom").click(function () {
		var zoom = $(this).next(".zoom");
		if (zoom.length === 0)
			zoom = $(this).prev(".zoom");

		zoom.val(zoom.val().replace(/%/g, "") * 1 - 100).trigger("change");
	});

	$(".zoom").change(function () {
		var value = $(this).val().replace(/%/g, "") * 1;
		if (value <= 100 || isNaN(value))
			value = 100;
		
		value = Round(value);
		$(this).val(value.toString() + "%");

		ZoomChange($(this).attr("num-code"));
	}).trigger("change");
});