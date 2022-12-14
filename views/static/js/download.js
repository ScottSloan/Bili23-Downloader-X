layui.use(function() {
	hsycms.loading('正在查询');
	var element = layui.element;
	query();

	function query() {
		querytime = setTimeout(function() {
			$.getJSON("http://127.0.0.1:8123/download/query", function(data) {
				if (data.code == 0) {
					hsycms.closeAll();
					$("#download_list").html("");
					data.info.forEach(function(info) {
						id = info.id,
							flag = info.flag;
						if (flag == "completed") {} else {
							if (flag == "waiting") {
								var tr = $(['<tr id="download-' + id +
									'" data-id="' +
									id +
									'">', '<td>' + info
									.name +
									'</td>', '<td>' + info.size + '</td>',
									'<td>' +
									info.speed + '</td>' +
									'<td>等待下载…</td>',
									'<td>',
									'<button class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>',
									'</td>', '</tr>'
								].join(''));
							} else if (flag == "downloading") {
								var tr = $(['<tr id="download-' + id +
									'" data-id="' +
									id +
									'">', '<td>' + info
									.name +
									'</td>', '<td>' + info.size + '</td>',
									'<td>' +
									info.speed + '</td>' +
									'<td><div class="layui-progress" lay-filter="progress-' +
									id +
									'"><div class="layui-progress-bar" lay-percent="' +
									info.progress + '"></div></div></td>',
									'<td>',
									'<button class="layui-btn layui-btn-xs pause">暂停</button>',
									'<button class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>',
									'</td>', '</tr>'
								].join(''));
							} else if (flag == "pause") {
								var tr = $(['<tr id="download-' + id +
									'" data-id="' +
									id +
									'">', '<td>' + info
									.name +
									'</td>', '<td>' + info.size + '</td>',
									'<td>' +
									info.speed + '</td>' +
									'<td>暂停</td>',
									'<td>',
									'<button class="layui-btn layui-btn-xs resume">继续</button>',
									'<button class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>',
									'</td>', '</tr>'
								].join(''));
							} else if (flag == "merging") {
								var tr = $(['<tr id="download-' + id +
									'" data-id="' +
									id +
									'">', '<td>' + info
									.name +
									'</td>', '<td>' + info.size + '</td>',
									'<td>' +
									info.speed + '</td>' +
									'<td>正在合成…</td>',
									'<td></td>', '</tr>'
								].join(''));
							} else if (flag == "error") {
								var tr = $(['<tr id="download-' + id +
									'" data-id="' +
									id +
									'">', '<td>' + info
									.name +
									'</td>', '<td>' + info.size + '</td>',
									'<td>' +
									info.speed + '</td>' +
									'<td><span style="color:#ff1317">下载出错</span></td>',
									'<td>',
									'<button class="layui-btn layui-btn-xs layui-btn-danger delete">删除</button>',
									'</td>', '</tr>'
								].join(''));
							}
							//暂停
							tr.find('.pause').on('click', function() {
								$.ajax({
									url: "http://127.0.0.1:8123/download/action",
									type: "post",
									data: {
										"action": "pause",
										"id": tr.attr("data-id")
									},
									success: function(data) {}
								})
							});
							//删除
							tr.find('.delete').on('click', function() {
								$.ajax({
									url: "http://127.0.0.1:8123/download/action",
									type: "post",
									data: {
										"action": "delete",
										"id": tr.attr("data-id")
									},
									success: function(data) {
										tr.remove()
									}
								})
							});
							//继续
							tr.find('.resume').on('click', function() {
								$.ajax({
									url: "http://127.0.0.1:8123/download/action",
									type: "post",
									data: {
										"action": "resume",
										"id": tr.attr("data-id")
									},
									success: function(data) {
										tr.remove()
									}
								})
							});

							$("#download_list").append(tr);
							element.render('progress'); //渲染新加的进度条组件
						}
					})
				} else {
					hsycms.closeAll();
					var tg = TGTool();
					tg.error(data.message);
				}
			})
			num = $("#download_list tr").length;
			$("#task_num").html(num);
			query();
		}, 1000);
	}
})
$("#clear_list").click(function() {
	$.getJSON("http://127.0.0.1:8123/download/clear?action=error", function(data) {
		if (data.code == 0) {
			window.location.reload();
		} else {
			hsycms.closeAll();
			var tg = TGTool();
			tg.error(data.message);
		}
	})
})
