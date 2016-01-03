import childProcess from 'child_process';
import test from 'ava';

test.cb('balance', t => {
  childProcess.execFile('./cli.js', ['01397764'], {
    cwd: __dirname
  }, (err, stdout) => {
    t.ifError(err);
    t.not(stdout.trim(), 2.50);
    t.end();
  });
});

