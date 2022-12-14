parse_url = "";
$('#url_input').focus(function() {
	$(".url_input_box").css("border-color", "#002294");
})
$('#url_input').blur(function() {
	$(".url_input_box").css("border-color", "#cfcfcf");
})
$("#search_btn").click(function() {
	if ($("#url_input").val() == "") {
		$("#url_input").removeAttr("disabled");
		$(".url_input_box").css("background-color",
			"#ffffff00");
		var tg = TGTool();
		tg.error("输入框不能为空");
	} else {
		$.ajax({
			url: "http://127.0.0.1:8123/url_parse",
			type: "GET",
			data: {
				"url": $("#url_input").val()
			},
			beforeSend: function(xhr) {
				$("#url_input").attr("disabled", "true");
				$(".url_input_box").css("background-color", "#eaeaea");
				hsycms.loading('正在解析');
			},
			success: function(res) {
				if (res.code == 0) {
					if (res.type == "live") {
						$("#post_download").hide();
						$("#post_play").show();
					} else {
						$("#post_download").show();
						$("#post_play").hide();
					}
					parse_url = "http://127.0.0.1:8123/" + res.type + "_info"
					layui.use(function() {
						table = layui.table;
						table.render({
							elem: '#result_table',
							url: parse_url,
							id: "result_table",
							escape: false,
							height: "full-300",
							parseData: function(res) {
								if (res.episodes_list.data[0].url != "") {
									$("#post_play").attr("data-url", res
										.episodes_list.data[0].url)
								}
								return {
									"code": res.code,
									"msg": res.message,
									"data": res.episodes_list.data,
									"tip": res.tip
								};
							},
							cols: [
								[{
										type: "checkbox",
										LAY_CHECKED: true
									},
									{
										type: "numbers",
										field: "id",
										title: "序号"
									}, {
										field: "title",
										title: "标题"
									}, {
										field: "badge",
										title: "备注"
									}, {
										field: "duration",
										title: "时长"
									}
								]
							],
							done: function(res, curr, count) {
								hsycms.closeAll();
								$(".result_box").css("display", "block");
								$("#choose_quality").css("height", "auto");
								$("#result_tip").html(res.tip);
								$("#url_input").removeAttr("disabled");
								$(".url_input_box").css("background-color",
									"#ffffff00");
								$(".url_input_box").css("margin-top",
									"80px");
								var tg = TGTool();
								tg.success("解析成功");
								table.resize('result_table');
							}
						});
						$("#post_download").click(function() {
							var data = table.checkStatus('result_table'),
								info = data.data;
							$.ajax({
								url: "http://127.0.0.1:8123/download/add",
								type: "POST",
								data: JSON.stringify(info),
								success: function(res) {
									window.location.href =
										"./download.html";
								}
							})
						})
					})
				} else {
					$("#url_input").removeAttr("disabled");
					$(".url_input_box").css("background-color",
						"#ffffff00");
					hsycms.closeAll();
					var tg = TGTool();
					tg.error(data.message);
				}
			},
			error: function(res) {
				$("#url_input").removeAttr("disabled");
				$(".url_input_box").css("background-color",
					"#ffffff00");
				hsycms.closeAll();
				var tg = TGTool();
				tg.error("接口访问出错");
			}
		});
	}
})
$("#download_manage").click(function() {
	window.location.href = "./download.html"
})

$("#post_download").click(function() {
	window.location.href = "./dplayer/index.html?url=" +
		this.attr("data-url");
})
