#!/usr/bin/env node
import meow from 'meow';
import og from './src/og.js';
import {cwd} from 'process';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cli = meow(`
	Usage
	  $ og <input>

	Options
	  --output, -o  Output file name
	  --html  Consider input as html

	Examples
	  $ og file.html
`, {
	importMeta: import.meta,
	flags: {
		output: {
			type: 'string',
			shortFlag: 'o'
		},
		html: {
			type: 'boolean'
		},
		width: {
			type: 'number',
			shortFlag: 'w',
			default: 1200,
		},
		height: {
			type: 'number',
			shortFlag: 'h',
			default: 628,
		}
	}
});

let opts = {
	cwd: __dirname,
	output: null,
	...cli.flags
};

if (opts.html && cli.input.length === 0) {
	process.stdin.resume()
	process.stdin.setEncoding('utf8')
	process.stdin.on('data', (data) => {
	  og(String(data).trim(), opts);
	})
  } else {
	og(cli.input.at(0), opts);
  }
