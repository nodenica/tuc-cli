#!/usr/bin/env node
'use strict';
const meow = require('meow');
var Tuc = require('tuc');
const tuc = new Tuc();

const cli = meow(`
  Usage
    tuc <tuc_number>

  Options
    -t, --type Tuc card type

  Example
    $ tuc 00759795
    30.00

    $ tuc 00759795 -t
    Cuenta limitada (sin movil)
`, {
  alias: {
    t: 'type'
  }
});

if (cli.input.length === 0) {
  console.error('Please specify a package name');
  process.exit(1);
}

if (cli.flags) {
  tuc.getType(cli.input[0].toString(), function( type ){
    console.log(type);
  });
  process.exit(1);
}

tuc.getBalance(cli.input[0].toString(), function(balance) {
    console.log(balance);
});

