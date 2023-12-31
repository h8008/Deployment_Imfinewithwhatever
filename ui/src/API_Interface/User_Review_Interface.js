import Methods_Interface from "./Methods_Interface";

export default class UserReviews extends Methods_Interface{
  constructor() {
    super()
    // this.axiosAgent = axiosAgent;
    this.name = "UserReviews";
  }

  async getReview(params) {
    return (
      this.axiosAgent
        .get(`user_reviews/review/${params.restaurantID}/${params.email}`) // passing params as an object here because of the format of queries with multiple parameters
        // such as select from user_reviews where id = ? and email = ?
        // because of the keyword and in between cannot conveniently pass in an array
        .then((reviewInfo) => reviewInfo.data)
        .catch((error) => ({
          error,
          review: undefined,
        }))
    );
  }

  async addReview(params) {
    return (
      this.axiosAgent
        .post(`user_reviews/review`, { ...params }) // conveniently passing in an array
        // like this: insert into user_reviews values (?)
        .then((reviewInfo) => reviewInfo.data)
        .catch((error) => ({
          error,
          review: undefined,
        }))
    );
  }

  async updateReview(params) {
    return this.axiosAgent
      .post(`user_reviews/review/update`, { ...params })
      .then((reviewInfo) => reviewInfo.data)
      .catch((error) => ({
        error,
        review: undefined,
      }));
  }

  // async getReviews(params) {
  //   return this.axiosAgent
  //     .get(`user_reviews/${params.email}`)
  //     .then((reviewsInfo) => reviewsInfo.data)
  //     .catch((error) => ({
  //       error,
  //       reviews: undefined,
  //     }));
  // }

  async getReviews(params) {
    return await this.get({ url: `user_reviews/currentuser`, params }).then((reviewsInfo) => reviewsInfo.data)
    .catch((error) => ({
      error,
      reviews: [],
    }));
  }

  async deleteReview(params) {
    return this.axiosAgent
      .post(`user_reviews/delete`, { ...params })
      .then((reviewInfo) => reviewInfo.data)
      .catch((error) => ({
        error,
        review: undefined,
      }));
  }
}
