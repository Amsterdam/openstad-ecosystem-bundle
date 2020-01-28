const { spawn } = require('child_process');

module.exports = function execute(command, args, options) {

  return new Promise((resolve, reject) => {

    // todo: dit is te simpel en zou wat error handling moeten doen

    const child = spawn(command, args, options);

    child.stdout.on('data', (chunk) => {
      console.log(`${chunk}`);
    });

    child.stderr.on('data', (chunk) => {
      console.log(`${chunk}`);
    });

    child.on('close', (code) => {
      resolve();
    });

  });

}
