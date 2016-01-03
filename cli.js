#!/usr/bin/env node
'use strict';
const meow = require('meow');
const Tuc = require('tuc');
const tuc = new Tuc();
var cardnumber = '';

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
  cardnumber = padDigits(cli.input[0].toString(), 8);
} else {
  cardnumber = cli.input[0].toString();
}

if (cli.input.length === 0) {
  console.error('Please specify a tuc number');
  process.exit(1);
}

if (cli.flags.t) {
  tuc.getType(cardnumber, function (type) {
    console.log(type);
  });
}

tuc.getBalance(cardnumber, function (balance) {
  console.log(balance);
});

