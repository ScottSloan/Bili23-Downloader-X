function getQuery(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return false;
}

function openURL(url) {
	$("#loading_box").attr("display", "block")
	$("#main_iframe").css("display", "none");
	$("#main_iframe").attr("src", url);
	$("#main_iframe").on("load", function() {
		setTimeout(function() {
			$("#main_iframe").css("display", "block");
			$("#loading_box").css("display", "none");
			menuClose();
		}, 300)
	})
}

function menuClose() {
	$("#menu_list").addClass("menu_list_closed");
	$("#menu_list").removeClass("menu_list_opened");
	$("#menu_list").attr("anim_data", "closed");
	$("#menu").css("left", "10px");
	$("#menu_button_icon").html("&#xf0c9;");
	$("#if_close_window").css("left", "-400px");
	$("#main_shade").css("display", "none");
}

function menuOpen() {
	$("#menu_list").removeClass("menu_list_closed");
	$("#menu_list").addClass("menu_list_opened");
	$("#menu_list").attr("anim_data", "opened");
	$("#menu").css("left", "295px");
	$("#menu_button_icon").html("&#xf104;");
	$("#main_shade").css("display", "block");
}
$(document).ready(function() {
	url = getQuery('url');
	if (url == "" || url == false) {
		url = "./home.html";
	}
	openURL(url);
});
$("#menu").click(function() {
	if ($("#menu_list").attr("anim_data") == "closed") {
		menuOpen();
	} else {
		menuClose();
	}
});
$("#close_window_btn").click(function() {
	$("#main_shade").css("display", "block");
	$("#if_close_window").css("left", "12px");
});
$("#main_shade").click(function() {
	menuClose();
});
$("#open_setting").click(function() {
	openURL("./setting.html");
})
$("#open_home").click(function() {
	openURL("./home.html");
})
$("#open_log").click(function() {
	openURL("./log.html");
})
$("#open_download").click(function() {
	openURL("./download.html");
})
$("#open_tool").click(function() {
	openURL("./tool.html");
})
$("#open_about").click(function() {
	openURL("./about.html");
})
/*
			window.wx_msg.postMessage("close");
			window.wx_msg.postMessage("resume");
			window.wx_msg.postMessage("iconize");
			window.wx_msg.postMessage("maximize");*/
$("#if_close_window_false").click(function() {
	$("#if_close_window").css("left", "-400px");
})
$(".menu_top img").click(function() {
	openURL("./setting.html");
})
const options = {
	bottom: '32px', // default: '32px'
	right: '32px', // default: '32px'
	left: 'unset', // default: 'unset'
	time: '0.5s', // default: '0.3s'
	mixColor: '#fff', // default: '#fff'
	backgroundColor: '#fff', // default: '#fff'
	buttonColorDark: '#100f2c', // default: '#100f2c'
	buttonColorLight: '#fff', // default: '#fff'
	saveInCookies: true, // default: true,
	label: '🌓', // default: ''
	autoMatchOsTheme: true // default: true
}

const darkmode = new Darkmode(options);
darkmode.showWidget();
