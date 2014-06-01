# aster-parse
[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

> Centralized code parsing for aster.

## Usage

This is mostly internal module that you don't want to use directly but rather as part of [aster-src](https://npmjs.org/package/aster-src).
However, you should use it directly when developing bindings for external build systems.

## API

### parse(options)

#### options.loc
Type: `Boolean`
Default: `true`

Location tracking (required for source maps; common option for all the parsers).

#### options.*

Any other options for parsers being used (see corresponding documentation of each parser).

### parse.registerParser(extension, parser)

Method for registering parser as processor for any files with given extension:

```javascript
var parse = require('aster-parse');
parse.registerParser('.coffee', require('aster-parse-coffee'));
```

Please note that parsers published under name in format `'aster-parse-<extension>'` do not require explicit registration.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/aster-parse
[npm-image]: https://badge.fury.io/js/aster-parse.png

[travis-url]: http://travis-ci.org/asterjs/aster-parse
[travis-image]: https://secure.travis-ci.org/asterjs/aster-parse.png?branch=master
