require.config({
	paths: {
		jquery: "/jquery/dist/jquery.min",
		semantic: "/semantic/dist/semantic.min"
	},
	shim:{
		semantic:{exports:"$.site"}
	}
});
require(["jquery", "jquery", "semantic"], function ($, jQuery, semantic) {
	var $doc = $(document);
	$doc.on('click', ".message .close", function () {
			$(this)
				.closest('.message')
				.transition('fade')
			;
		});
	if ($("#update_password").length > 0) {
		$doc.on("click","#btn_update",function(){
			var originData=$("#update_password").serialize();
			console.log(originData);
			$.ajax({
				url:"/setting/account",
				method:"PATCH",
				dataType:"json",
				data:{"data":originData}
			})
			.done(function(data){
				if(data.success){
					alert("成功修改密码");
				}else{
					console.error("修改失败");
				}
			})
			.fail(function(xhr){
				console.error(xhr);
			});
		});
	}
});