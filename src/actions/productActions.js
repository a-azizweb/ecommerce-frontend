import axios from 'axios';
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  PRODUCT_Detail_REQUEST,
  PRODUCT_Detail_SUCCESS,
  PRODUCT_Detail_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
} from '../constants/productConstants';

export const getAllProducts =
  (keyword = '', currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    // try {
    //   dispatch({ type: ALL_PRODUCT_REQUEST });
    //   let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    //   if (category) {
    //     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    //   }

    //   const { data } = await axios.get(link);
    //   dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    // } catch (error) {
    //   dispatch({
    //     type: ALL_PRODUCT_FAIL,
    //     payload: error.response.data.message,
    //   });
    // }

    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `https://ecommerce-back-7m1l.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `https://ecommerce-back-7m1l.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//get All products for admin

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });
    const { data } = await axios.get(
      'https://ecommerce-back-7m1l.onrender.com/api/v1/admin/products'
    );

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//getting product details
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_Detail_REQUEST });

    const { data } = await axios.get(
      `https://ecommerce-back-7m1l.onrender.com/api/v1/product/${id}`
    );

    dispatch({ type: PRODUCT_Detail_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_Detail_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Adding Review To product
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(
      `https://ecommerce-back-7m1l.onrender.com/api/v1/review`,
      reviewData,
      config
    );

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
