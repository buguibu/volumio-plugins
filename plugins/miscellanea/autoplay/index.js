'use strict';

var libQ = require('kew');
var fs = require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;

// Define the ControllerSpop class
module.exports = ControllerSpop;
function ControllerSpop(context) {
	// This fixed variable will let us refer to 'this' object at deeper scopes
	var self = this;

	this.context = context;
	this.commandRouter = this.context.coreCommand;
	this.logger = this.context.logger;
	this.configManager = this.context.configManager;
}


ControllerSpop.prototype.savePluginConfig = function (data) {
	var self = this;

	var defer = libQ.defer();

	self.config.set('autoPlayUrl', data['autoPlayUrl']);

	//(sleep 25; mpc clear; mpc add http://8503.live.streamtheworld.com:443/CLASSICFM_SC; mpc volume 25; mpc play )&

	exec("sed '^(sleep 25; mpc clear; mpc add ' /etc/rc.local", function (error, stdout, stderr) {
		if (error !== null) {
			self.commandRouter.pushConsoleMessage('The following error occurred while removing previous config: ' + error);
			defer.reject();
		}
		else {
			self.commandRouter.pushConsoleMessage('Previous configuration removed.');
			defer.resolve();
		}
	})

	exec("echo \"(sleep 25; mpc clear; mpc add "+self.config.get('autoPlayUrl')+"; mpc volume 15; mpc play )&\" >> /etc/rc.local", function (error, stdout, stderr) {
		if (error !== null) {
			self.commandRouter.pushConsoleMessage('The following error occurred while setting the new config: ' + error);
			defer.reject();
		}
		else {
			self.commandRouter.pushConsoleMessage('New configuration saved.');
			defer.resolve();
		}
	});

	return defer.promise;
};

ControllerSpop.prototype.getConfigurationFiles = function()
{
	return ['config.json'];
}


ControllerSpop.prototype.onVolumioStart = function()
{
	var self = this;
	var configFile=this.commandRouter.pluginManager.getConfigurationFile(this.context,'config.json');
	this.config = new (require('v-conf'))();
	this.config.loadFile(configFile);

	self.commandRouter.pushConsoleMessage('Autoplay plugin => onVolumioStart.');
}
