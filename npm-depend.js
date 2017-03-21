#!/usr/bin/env node

const yargs = require('yargs');

const npmDepend = require('./index');

const yinz = yargs
.help()
.usage('$0 [dependency...]')
;

const args = yinz.argv;

if (args._.length < 1) {
  yinz.showHelp();
  process.exit(1);
}

npmDepend(args._, args);
