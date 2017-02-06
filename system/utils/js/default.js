String.prototype.replaceSection = function (start, end, replacement) {
	return this.substr(0, start) + replacement + this.substr(end);
}

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

$(document).ready(function () {
	"use strict";
	$("#erro").hide();
	$("#sucesso").hide();

	$(".close, .fechar").click(function () {
		$('.open-message').fadeOut('slow');
	});
});