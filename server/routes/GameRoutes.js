const gameRouter = require('koa-router')({
  prefix: '/games',
});

const GameController = require('../app/Controllers/GameController.js');

gameRouter.get('/', (ctx) => {
  ctx.body = 'default game route';
});

gameRouter.get('/play', GameController.serve);

module.exports = gameRouter;
