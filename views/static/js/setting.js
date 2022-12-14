layui.use(function() {
	var slider = layui.slider,
		form = layui.form,
		element = layui.element;
	hsycms.loading('正在加载');
	$.getJSON("http://127.0.0.1:8123/setting/get", function(data) {
		form.val("settings", data.setting);
		return true;
	}).then(function(a, d) {
		thread_num = $("#thread_num").val();
		var thread_slide = slider.render({
			elem: '#thread_slide',
			max: 16,
			min: 0,
			value: thread_num,
			showstep: true,
			input: true,
			change: function(value) {
				if (value <= 0 || value == "") {
					thread_slide.setValue(1);
					$("#thread_num").val(1);
				} else {
					$("#thread_num").val(value);
				}
			}
		})
		hsycms.closeAll();
		$("#setting").submit(function() {
			data = form.val("settings")
			$.ajax({
				url: "http://127.0.0.1:8123/setting/set",
				data: JSON.stringify(data),
				type: "post",
				beforeSend: function() {
					hsycms.loading("正在保存");
				},
				complete: function() {
					hsycms.closeAll();
				},
				success: function(data) {
					if (data.code == 0) {
						var tg = TGTool();
						tg.success("设置保存成功");
					} else {
						var tg = TGTool();
						tg.error(data.message);
					}
				},
				error: function() {
					var tg = TGTool();
					tg.error("接口访问出错");
				}
			})
			return false;
		})
		form.on('switch(use_proxy)', function(data) {
			if (data.elem.checked) {
				$("#proxy_set").removeClass("layui-hide");
				$("#proxy_set input").attr("required", "");
			} else {
				$("#proxy_set").addClass("layui-hide");
				$("#proxy_set input").removeAttr("required");
			}
		});
		form.on('switch(use_proxy_user)', function(data) {
			if (data.elem.checked) {
				$("#proxy_user_set").removeClass("layui-hide");
				$("#proxy_user_set input").attr("required", "");
			} else {
				$("#proxy_user_set").addClass("layui-hide");
				$("#proxy_user_set input").removeAttr("required");
			}
		});
	});
})
