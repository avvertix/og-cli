#!/usr/bin/env node
import meow from 'meow';
import og from './src/og.js';
import * as process from 'process';

const cli = meow(`
	Usage
	  $ og <input>

	Options
	  --output, -o  Output file name

	Examples
	  $ og file.html --svg
`, {
	importMeta: import.meta,
	flags: {
		output: {
			type: 'string',
			shortFlag: 'o'
		}
	}
});

og(cli.input.at(0), {
	cwd: process.cwd(),
	output: 'image.png',
	...cli.flags
});