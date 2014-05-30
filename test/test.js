/* global describe, it */

'use strict';

var assert = require('assert'),
	Rx = require('rx'),
	parse = require('..'),
	esprima = require('esprima');

parse.registerParser('.txt', function parseTextAsCommonJS() {
	return function (files) {
		return files.map(function (file) {
			return {
				type: 'File',
				program: {
					type: 'Program',
					body: [{
						type: 'ExpressionStatement',
						expression: {
							type: 'AssignmentExpression',
							operator: '=',
							left: {
								type: 'MemberExpression',
								computed: false,
								object: {
									type: 'Identifier',
									name: 'module'
								},
								property: {
									type: 'Identifier',
									name: 'exports'
								}
							},
							right: {
								type: 'Literal',
								value: file.contents,
								raw: JSON.stringify(file.contents) // not required in real parser, for easy testing only
							}
						}
					}]
				},
				loc: {
					source: file.path + '.js'
				}
			};
		});
	};
});

it('test', function (done) {
	var input = [
			{path: 'file.js', contents: 'a = 1'},
			{path: 'file.txt', contents: 'hello, world!'}
		],
		expected = [
			input[0].contents,
			'module.exports = ' + JSON.stringify(input[1].contents)
		].map(esprima.parse);

	// simulating file sequence and applying transformation
	parse({loc: false})(Rx.Observable.fromArray(input))
	.zip(input, function (ast, file) {
		assert.equal(ast.loc.source, file.path.replace(/(\.js)?$/, '.js'));
		return ast.program;
	})
	// checking against array of expected results iteratively
	.zip(expected, assert.deepEqual)
	// subscribing to check results
	.subscribe(function () {}, done, done);
});
