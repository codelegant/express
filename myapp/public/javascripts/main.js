require.config({
	paths: {
		jquery: "/jquery/dist/jquery.min",
		semantic: "/semantic/dist/semantic.min"
	}
});
require(["jquery", "jquery", "semantic"], function ($, jQuery, semantic) {
	$('.message .close')
		.on('click', function () {
			$(this)
				.closest('.message')
				.transition('fade')
			;
		})
	;
});