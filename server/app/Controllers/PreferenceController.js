// const {

// } = require('../Queries/preferenceQueries')

const {
  ADD_PREFERENCE,
  UPDATE_PREFERENCE,
  DELETE_PREFERENCE,
} = require('../Mutations/preference.js');

const {
  GET_PREFERENCES,
  GET_PREFERENCES_FOR_CURRENT_USER,
} = require('../Queries/preference.js');

const add = async (ctx) => {
  console.log('in preference add controller');
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

const getAllForCurrentUser = async (ctx) => {
  const params = ctx.request.query;
  const res = await GET_PREFERENCES_FOR_CURRENT_USER(params);
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

const getAll = async (ctx) => {
  const params = ctx.reques.query;
  const res = await GET_PREFERENCES(params);
  ctx.body = res
    ? { data: res, status: 'OK' }
    : { data: undefined, status: 'NOT FOUND' };
};

module.exports = {
  add,
  update,
  destroy,
  getAll,
  getAllForCurrentUser,
};
