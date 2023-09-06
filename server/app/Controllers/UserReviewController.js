const {
  ADD_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} = require("../Mutations/userReviewMutations");
const { GET_REVIEW, GET_REVIEWS } = require("../Queries/userReviewQueries");

const { query } = require("../Query");
const { mutate } = require("../Mutate");

const addReview = async (ctx) => {
  try {
    console.log("user_review add review called");
    let params = ctx.request.body;
    let res = await mutate({
      ...ADD_REVIEW,
      params: params,
    });
    if (res) {
      ctx.body = {
        message: `REVIEW ADDED`,
        status: "OK",
      };
    }
  } catch (error) {
    console.log("Error while adding review", error);
    throw error;
  }
};

const getReview = async (ctx) => {
  try {
    console.log("user_review get review called");
    let params = ctx.params;
    let res = await query({
      ...GET_REVIEW(params),
    });
    if (res.length > 0) {
      ctx.body = {
        data: res[0].review,
        status: "OK",
      };
    } else {
      ctx.body = {
        data: undefined,
        status: "NOT FOUND",
      };
    }
  } catch (error) {
    console.log("Error while retrieving review", error);
    throw error;
  }
};

const updateReview = async (ctx) => {
  try {
    console.log("user_review update review called");
    let params = ctx.request.body;
    let res = await mutate({
      ...UPDATE_REVIEW(params),
    });
    if (res) {
      ctx.body = {
        message: "Updated review for the restaurant",
        status: "OK",
      };
    }
  } catch (error) {
    console.error("Error while updating review", error);
    throw error;
  }
};

const deleteReview = async (ctx) => {
  try {
    console.log("user_review delete review called");
    let params = ctx.request.body;
    let res = await mutate({
      ...DELETE_REVIEW(params),
    });
    if (res) {
      ctx.body = {
        message: "Deleted review for the restaurant",
        status: "OK",
      };
    }
  } catch (error) {
    console.error("Error while deleting review", error);
    throw error;
  }
};

const getReviews = async (ctx) => {
  try {
    console.log("user_review get reviews called");
    let params = ctx.params;
    let res = await query({
      ...GET_REVIEWS(params),
    });
    if (res.length > 0) {
      ctx.body = {
        message: "Retrieved restaurant reviews for the user",
        status: "OK",
        data: res,
      };
    }
  } catch (error) {
    console.error("Error while retrieving reviews", error);
    throw error;
  }
};

module.exports = {
  addReview,
  getReview,
  updateReview,
  getReviews,
  deleteReview,
};
