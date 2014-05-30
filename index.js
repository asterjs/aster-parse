'use strict';

var Rx = require('rx');
var extname = require('path').extname;

var parsers = {};

function parse(options) {
	return function (files) {
		return files
			.groupBy(function (file) { return extname(file.path).toLowerCase() || '.' })
			.flatMap(function (files) { return parsers[files.key](options)(files) });
	};
}

parse.registerParser = function (extension, parser) {
	parsers[extension.toLowerCase()] = parser;
};

parse.registerParser('.js', require('aster-parse-js'));

module.exports = parse;
