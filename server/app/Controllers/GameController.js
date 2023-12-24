// const path = require('path');
// const { spawn } = require('node:child_process');
// const { spawnSync } = require('child_process');
// const { readFile } = require('fs/promises');
// const { appendFile } = require('fs/promises');

// const serve = (ctx) => {
//   const gamefile = path.resolve('games/plinko.py');
//   console.log('game file path', gamefile);
//   const python = spawn('python', [gamefile]);
//   var script;
//   python.stdout.on('data', (data) => {
//     console.log(data);
//     script = data.toString();
//     console.log(script);
//   });
//   python.on('close', (code) => {
//     console.log(code);
//     // ctx.body = `${script}`;
//   });
// };

// // const serve = async (ctx) => {
// //   const python = spawn('python3', ['games/plinko.py']);
// //   python.stdout.on('data', (data) => {
// //     console.log(data.toString());
// //   });
// // };

// serve();

// module.exports = { serve };
