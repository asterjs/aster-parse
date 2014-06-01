'use strict';

var Rx = require('rx');
var extname = require('path').extname;

var parsers = {};

function parse(options) {
	return function (files) {
		return files
			.groupBy(function (file) { return extname(file.path).toLowerCase() || '.' })
			.flatMap(function (files) {
				var ext = files.key;
				var parser = parsers[ext] || parse.registerParser(ext, require('aster-parse-' + ext.slice(1)));

				return parser(options)(files);
			});
	};
}

parse.registerParser = function (ext, parser) {
	return parsers[ext.toLowerCase()] = parser;
};

module.exports = parse;
