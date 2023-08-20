#!/usr/bin/env node
import meow from 'meow';
import og from './src/og.js';
import {cwd} from 'process';

const cli = meow(`
	Usage
	  $ og <input>

	Options
	  --output, -o  Output file name

	Examples
	  $ og file.html
`, {
	importMeta: import.meta,
	flags: {
		output: {
			type: 'string',
			shortFlag: 'o'
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

og(cli.input.at(0), {
	cwd: cwd(),
	output: 'card.svg',
	...cli.flags
});