#!/usr/bin/env node
'use strict';
const meow = require('meow');
let Tuc = require('tuc');
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

function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

if (cli.input[0].toString().length < 8) {
  var card_number = padDigits(cli.input[0].toString(), 8);
} else {
  var card_number = cli.input[0].toString();
}

if (cli.input.length === 0) {
  console.error('Please specify a tuc number');
  process.exit(1);
}

if (cli.flags.t) {
  tuc.getType(card_number, function(type){
    console.log(type);
  });
}

tuc.getBalance(card_number, function(balance) {
    console.log(balance);
});

