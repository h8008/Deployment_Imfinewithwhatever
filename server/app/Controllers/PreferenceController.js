// const {

// } = require('../Queries/preferenceQueries')

const {
  ADD_PREFERENCE,
  UPDATE_PREFERENCE,
  DELETE_PREFERENCE,
  GET_PREFERENCE,
} = require('../Mutations/preference.js');

const add = async (ctx) => {
  const params = ctx.request.body;
  const res = await ADD_PREFERENCE(params);
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

const update = async (ctx) => {
  const params = ctx.request.body;
  const res = await UPDATE_PREFERENCE(params);
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

const destroy = async (ctx) => {
  const params = ctx.request.body;
  const res = await DELETE_PREFERENCE(params);
  ctx.body = res ? { status: 'OK' } : { status: 'FAILED TO DELETE' };
};

const get = async (ctx) => {
  const params = ctx.request.query;
  const res = await GET_PREFERENCE(params);
  ctx.body = res ? { status: 'OK' } : { status: 'NOT FOUND' };
};

module.exports = {
  add,
  update,
  destroy,
  get,
};
