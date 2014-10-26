/*global Settings:false */
"use strict";

window.addEventListener("load", function (e)
{
	var email = $("#settings-about-email");
	email.attr("href", "mailto:" + email.attr("href").replace("=", "@").replace(/\+/g, ""));
	var checkInterval = $("#settings-check-interval");
	var displayTimeout = $("#settings-display-timeout");
	this.settings = Settings.getDefaultSettings();
	var self = this;
	
	var saveSettings = function()
	{
		chrome.storage.sync.set(self.settings);
		chrome.extension.sendRequest({ command: "settings" });
	};
	
	$("[data-i18n]").each(function(index, e)
	{
		e = $(e);
		e.text(chrome.i18n.getMessage(e.data("i18n")));
	});
	
	$("[data-title-i18n]").each(function(index, e)
	{
		e = $(e);
		e.attr("title", chrome.i18n.getMessage(e.data("title-i18n")));
	});

	displayTimeout.tooltip();

	chrome.storage.sync.get(self.settings, function(storedSettings)
	{
		self.settings = $.extend(self.settings, storedSettings);
		checkInterval.val(self.settings.checkInterval);
		displayTimeout.val(self.settings.displayTimeout);
	});

	checkInterval.on("change", function()
	{
		self.settings.checkInterval = parseInt(checkInterval.val());
		saveSettings();
	});
	
	displayTimeout.on("change", function()
	{
		self.settings.displayTimeout = parseInt(displayTimeout.val());
		saveSettings();
	});

	$("#settings-check-now").click(function (e)
	{
		e.preventDefault();
		chrome.extension.sendRequest({ command: "check" });
	});
	
	$("nav a").click(function (e)
	{
		e.preventDefault();
		$(this).tab("show");
	});
	
}, false);
