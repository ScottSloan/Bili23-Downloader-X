layui.use(function() {
	hsycms.loading('正在查询');
	var element = layui.element;
	query();

	function query() {
		setTimeout(function() {
			$.getJSON("http://127.0.0.1:8123/download/query", function(data) {
				if (data.code == 0) {
					hsycms.closeAll();
					$("#download_list").html("");
					data.info.forEach(function(info) {
						id = info.id,
							flag = info.flag;
						if (flag == "completed") {
							var tr = $(['<tr id="download-' + id + '" data-id="' +
								id +
								'">', '<td>' + info
								.name +
								'</td>', '<td>' + info.size + '</td>',
								'</tr>'
							].join(''));
							$("#download_list").append(tr);
						}
					})
				} else {
					hsycms.closeAll();
					var tg = TGTool();
					tg.error(data.message);
				}
			});
			num = $("#download_list tr").length;
			$("#task_num").html(num);
			query();
		}, 2000);
	}
})
$("#clear_list").click(function() {
	$.getJSON("http://127.0.0.1:8123/download/clear?action=completed", function(data) {
		if (data.code == 0) {
			window.location.reload();
		} else {
			hsycms.closeAll();
			var tg = TGTool();
			tg.error(data.msg);
		}
	})
})
