import axios from "axios";
import config from "./config";
const apiUrl = config.apiUrl;

// API Routes

const LOGIN = "login";
const UPDATE_USER = "update_user";
const VERIFY_USER = "verify_user";
const REGISTER_USER = "register_user";
const GET_OFFERS = "get_offer_images";
const GET_CATEGORIES = "get_categories";
const GET_RESTAURANTS = "get_partners";
const GET_PRODUCTS = "get_products";
const GET_ADDRESS = "get_address";
const ADD_ADDRESS = "add_address";
const DELETE_ADDRESS = "delete_address";
const UPDATE_ADDRESS = "update_address";
const IS_CITY_DELIVERABLE = "is_city_deliverable";
const ADD_TO_CART = "manage_cart";
const GET_USER_CART = "get_user_cart";
const GET_SETTINGS = "get_settings";
const GET_FAVORITES = "get_favorites";
const ADD_TO_FAVORITES = "add_to_favorites";
const REMOVE_FROM_FAVORITES = "remove_from_favorites";
const GET_LANGUAGES = "get_languages";
const PAYMENT_INTENT = "payment_intent";
const GET_ORDERS = "get_orders";
const PLACE_ORDER = "place_order";
const ADD_TRANSACTION = "add_transaction";
const TRANSACTIONS = "transactions";
const ORDER_STATUS = "update_order_status";
const REMOVE_FROM_CART = "remove_from_cart";
const GET_SECTIONS = "get_sections";
const GET_CITIES = "get_cities";
const GET_FAQS = "get_faqs";
const RAZORPAY_CREATE_ORDER = "razorpay_create_order";
const FLUTTERWAVE = "flutterwave_webview";
const FLUTTERWAVE_RESPONSE = "flutterwave_payment_response";
const DELIVERY_CHARGE = "get_delivery_charges";
const CART_SYNC = "cart_sync";
const DELETE_ORDER = "delete_order";
const SIGN_UP = "sign_up";
const GET_PROMO_CODE = "get_promo_codes";
const VALIDATE_CODE = "validate_promo_code";

//  axios interceptor
// Add request interceptor

axios.interceptors.request.use(
  async function (config) {
    let { token } = getUser();
    config.url = `${apiUrl}` + config.url;

    Object.assign(config.headers, {
      Authorization: `Bearer ${token}`
    });

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//get user from localstorage

const getUser = () => {
  let user = localStorage.getItem("user");
  // console.log("user==>",user)
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      return false;
    }
  }
  return false;
};

//get latitude and longitude from localStorage
const getlatlang = () => {
  let geolatitude = localStorage.getItem("latitude");
  let geolongitude = localStorage.getItem("longitude");

  return { latitude: geolatitude, longitude: geolongitude };
};

//login
export async function userAuth(mobile) {
  const formData = new FormData();
  let mobileData = parseInt(mobile);
  formData.append("mobile", mobileData);
  //   formData.append("fcm_id", fcm_id);
  let response = await axios.post(LOGIN, formData);

  return response.data;
}

//update user
export const update_user = async (
  username = "",
  mobile = "",
  email = "",
  image = "",
  address = "",
  city_id = "",
  referral_code = ""
) => {
  let { id: user_id } = getUser();
  let location = getlatlang();
  const formData = new FormData();
  formData.append("user_id", user_id);
  formData.append("username", username);
  formData.append("mobile", mobile);
  formData.append("email", email);
  formData.append("image", image);
  formData.append("address", address);
  if (typeof location !== "undefined") {
    if (typeof location.latitude !== "undefined") {
      formData.append("latitude", location.latitude);
    }
    if (typeof location.longitude !== "undefined") {
      formData.append("longitude", location.longitude);
    }
  }
  formData.append("city_id", city_id);
  formData.append("referral_code", referral_code);

  const response = await axios.post(UPDATE_USER, formData);

  return response.data;
};

//verify user
export const verify_user = async (mobile) => {
  const formData = new FormData();

  formData.append("mobile", mobile);

  const response = await axios.post(VERIFY_USER, formData);

  return response.data;
};

//register user

export const register_user = async (
  name,
  email,
  mobile = "",
  country_code = 91,
  referral_code = "",
  fcm_id = "",
  friends_code = "",
  latitude = "",
  longitude = "",
  type = ""
) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("mobile", mobile);
  formData.append("country_code", country_code);
  if (referral_code !== null) {
    formData.append("referral_code", referral_code);
  }
  formData.append("fcm_id", fcm_id);
  formData.append("friends_code", friends_code);
  if (latitude !== null) {
    formData.append("latitude", latitude);
  }
  if (longitude !== null) {
    formData.append("longitude", longitude);
  }
  formData.append("type", type);

  const response = await axios.post(REGISTER_USER, formData);

  return response.data;
};

//get sliders

export const getSliders = async (get_offer_images) => {
  const requestOptions = {
    get_offer_images: get_offer_images
  };

  let response = await axios.post(GET_OFFERS, requestOptions);

  return response.data;
};

// get_categories

export const get_categories = async (partner_slug = "") => {
  const formData = new FormData();
  formData.append("partner_slug", partner_slug);
  let response = await axios.post(GET_CATEGORIES, formData);
  return response.data;
};

// get_partners

export const get_partners = async (
  slug = "",
  partner_id = "",
  city_id,
  vegetarian = "",
  top_rated_partner = 0,
  limit = 20,
  offset = 0,
  sort = "",
  order = "",
  only_opened_partners = ""
) => {
  let location = getlatlang();
  let { id } = getUser();
  const formData = new FormData();
  formData.append("slug", slug);
  formData.append("id", partner_id);
  formData.append("city_id", city_id);
  id ? formData.append("user_id", id) : formData.append("user_id", "");
  formData.append("vegetarian", vegetarian);
  formData.append("limit", limit);
  formData.append("offset", offset);
  formData.append("sort", sort);
  formData.append("order", order);
  formData.append("top_rated_partner", top_rated_partner);
  formData.append("only_opened_partners", only_opened_partners);

  if (typeof location !== "undefined") {
    if (typeof location.latitude !== "undefined") {
      formData.append("latitude", location.latitude);
    }
    if (typeof location.longitude !== "undefined") {
      formData.append("longitude", location.longitude);
    }
  }

  let response = await axios.post(GET_RESTAURANTS, formData);
  return response.data;
};

// get_products

export const get_products = async (
  product_id = "",
  category_slug = "",
  category_id = "",
  search = "",
  tags = "",
  highlights = "",
  attribute_value_ids = "",
  limit = "",
  offset = "",
  sort = "",
  order = "",
  top_rated_foods = "",
  discount = "",
  min_price = "",
  max_price = "",
  partner_id = "",
  product_variant_ids = "",
  vegetarian = "",
  filter_by = "",
  city_id = "",
  partner_slug = ""
) => {
  let location = getlatlang();
  let { id } = getUser();
  const requestOptions = new FormData();
  requestOptions.append("id", product_id);
  requestOptions.append("category_slug", category_slug);
  requestOptions.append("category_id", category_id);
  id
    ? requestOptions.append("user_id", id)
    : requestOptions.append("user_id", "");
  requestOptions.append("search", search);
  requestOptions.append("tags", tags);
  requestOptions.append("highlights", highlights);
  requestOptions.append("attribute_value_ids", attribute_value_ids);
  requestOptions.append("limit", limit);
  requestOptions.append("offset", offset);
  requestOptions.append("sort", sort);
  requestOptions.append("order", order);
  requestOptions.append("top_rated_foods", top_rated_foods);
  requestOptions.append("discount", discount);
  requestOptions.append("min_price", min_price);
  requestOptions.append("max_price", max_price);
  requestOptions.append("partner_id", partner_id);
  requestOptions.append("product_variant_ids", product_variant_ids);
  requestOptions.append("vegetarian", vegetarian);
  requestOptions.append("filter_by", filter_by);
  if (typeof location !== "undefined") {
    if (typeof location.latitude !== "undefined") {
      requestOptions.append("latitude", location.latitude);
    }
    if (typeof location.longitude !== "undefined") {
      requestOptions.append("longitude", location.longitude);
    }
  }
  requestOptions.append("city_id", city_id);
  requestOptions.append("partner_slug", partner_slug);

  const response = await axios.post(GET_PRODUCTS, requestOptions);

  return response.data;
};

// get_address

export const get_address = async (addr_id = "") => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("address_id", addr_id);

  const response = await axios.post(GET_ADDRESS, formData);
  return response.data;
};

// add_address

export const add_address = async (
  mobile,
  adds,
  area,
  city,
  landmark,
  latitude,
  longitude,
  address_type = "home"
) => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("mobile", mobile);
  formData.append("address", adds);
  formData.append("area", area);
  formData.append("city", city);
  formData.append("landmark", landmark);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("type", address_type);

  const response = await axios.post(ADD_ADDRESS, formData);
  return response.data;
};

// delete_address
export const delete_address = async (id) => {
  const formData = new FormData();
  formData.append("id", id);
  const response = await axios.post(DELETE_ADDRESS, formData);
  return response.data;
};

// update_address
export const update_address = async (
  address_id = "",
  mobile = "",
  add = "",
  area = "",
  city = "",
  landmark = ""
) => {
  let { id } = getUser();
  let location = getlatlang();
  const formData = new FormData();
  formData.append("id", address_id);
  formData.append("user_id", id);
  formData.append("mobile", mobile);
  formData.append("address", add);
  formData.append("area", area);
  formData.append("city", city);
  formData.append("landmark", landmark);
  if (typeof location !== "undefined") {
    if (typeof location.latitude !== "undefined") {
      formData.append("latitude", location.latitude);
    }
    if (typeof location.longitude !== "undefined") {
      formData.append("longitude", location.longitude);
    }
  }
  const response = await axios.post(UPDATE_ADDRESS, formData);
  return response.data;
};

// is_city_deliverable

export const is_city_deliverable = async (name) => {
  const formData = new FormData();
  formData.append("name", name);

  const response = await axios.post(IS_CITY_DELIVERABLE, formData);
  return response.data;
};

//add to cart

export const add_to_cart = async (
  product_variant_id,
  qty = 1,
  clear_cart = "",
  is_saved_for_later = "",
  add_on_id = "",
  add_on_qty = ""
) => {
  let { id } = getUser();

  const formData = new FormData();
  id ? formData.append("user_id", id) : formData.append("user_id", "");
  formData.append("product_variant_id", product_variant_id);
  formData.append("qty", qty);

  if (clear_cart !== null) {
    formData.append("clear_cart", clear_cart);
  }
  if (is_saved_for_later !== null) {
    formData.append("is_saved_for_later", is_saved_for_later);
  }

  if (add_on_id !== null) {
    formData.append("add_on_id", add_on_id);
  }
  if (add_on_qty !== null) {
    formData.append("add_on_qty", add_on_qty);
  }

  const response = await axios.post(ADD_TO_CART, formData);
  return response.data;
};

//get user cart

export const get_user_cart = async (is_saved_for_later = null) => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);

  if (is_saved_for_later !== null) {
    formData.append("is_saved_for_later", is_saved_for_later);
  }

  const response = await axios.post(GET_USER_CART, formData);
  return response.data;
};

// GET_SETTTINGS

export const get_settings = async () => {
  const response = await axios.post(GET_SETTINGS);

  localStorage.setItem("sign", response.data.data.currency[0]);
  return response.data;
};

// get_favorites

export const get_favorites = async (type, limit = "", offset = "") => {
  const formData = new FormData();
  let { id } = getUser();
  formData.append("user_id", id);
  formData.append("type", type);
  formData.append("limit", limit);
  formData.append("offset", offset);

  const response = await axios.post(GET_FAVORITES, formData);
  return response.data;
};

// add_to_favorites

export const add_to_favorites = async (type, type_id) => {
  const formData = new FormData();
  let { id } = getUser();
  formData.append("user_id", id);
  formData.append("type", type);
  formData.append("type_id", type_id);

  const response = await axios.post(ADD_TO_FAVORITES, formData);
  return response.data;
};

// remove_from_favorites

export const remove_from_favorites = async (type, type_id) => {
  const formData = new FormData();
  let { id } = getUser();
  formData.append("user_id", id);
  formData.append("type", type);
  formData.append("type_id", type_id);

  const response = await axios.post(REMOVE_FROM_FAVORITES, formData);
  return response.data;
};

// get_languages

export const get_languages = async () => {
  const response = await axios.post(GET_LANGUAGES);
  return response.data;
};

// payment_intent

export const payment_intent = async (order_id, type) => {
  const formData = new FormData();
  formData.append("order_id", order_id);
  formData.append("type", type);
  const response = await axios.post(PAYMENT_INTENT, formData);
  return response.data;
};

// get_orders

export const get_orders = async (order_id = "", limit = "", offset = "") => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("id", order_id);
  formData.append("limit", limit);
  formData.append("offset", offset);

  const response = await axios.post(GET_ORDERS, formData);
  return response.data;
};

// place_order

export const place_order = async (
  product_variant_id,
  quantity,
  final_total,
  is_wallet_used,
  payment_method,
  active_status = "",
  address_id = "",
  delivery_tip = "",
  is_self_pick_up = ""
) => {
  let { id, mobile } = getUser();
  let location = getlatlang();

  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("mobile", mobile);
  formData.append("product_variant_id", product_variant_id);
  formData.append("quantity", quantity);
  formData.append("final_total", final_total);
  formData.append("is_wallet_used", is_wallet_used);
  if (typeof location !== "undefined") {
    if (typeof location.latitude !== "undefined") {
      formData.append("latitude", location.latitude);
    }
    if (typeof location.longitude !== "undefined") {
      formData.append("longitude", location.longitude);
    }
  }
  formData.append("payment_method", payment_method);
  formData.append("active_status", active_status);
  formData.append("address_id", address_id);
  formData.append("delivery_tip", delivery_tip);
  formData.append("is_self_pick_up", is_self_pick_up);

  const response = await axios.post(PLACE_ORDER, formData);
  return response.data;
};

// add_transaction

export const add_transaction = async (
  order_id,
  type,
  payment_method,
  txn_id,
  amount,
  status,
  message
) => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("order_id", order_id);
  formData.append("type", type);
  formData.append("payment_method", payment_method);
  formData.append("txn_id", txn_id);
  formData.append("amount", amount);
  formData.append("status", status);
  formData.append("message", message);

  const response = await axios.post(ADD_TRANSACTION, formData);
  return response.data;
};

// transactions

export const transactions = async () => {
  const formData = new FormData();
  let { id } = getUser();
  formData.append("user_id", id);

  const response = await axios.post(TRANSACTIONS, formData);
  return response.data;
};

// update_order_status

export const update_order_status = async (status, order_id, reason) => {
  const formData = new FormData();
  formData.append("status", status);
  formData.append("order_id", order_id);
  formData.append("reason", reason);

  const response = await axios.post(ORDER_STATUS, formData);
  return response.data;
};

// remove_from_cart

export const remove_from_cart = async (product_variant_id = "") => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("product_variant_id", product_variant_id);

  const response = await axios.post(REMOVE_FROM_CART, formData);
  return response.data;
};

// clear_cart

export const clearCart = async () => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);

  const response = await axios.post(REMOVE_FROM_CART, formData);
  return response.data;
};

// get_sections

export const get_sections = async () => {
  const response = await axios.post(GET_SECTIONS);
  return response.data;
};

// GET_CITIES

export const get_cities = async (limit = "", offset = "") => {
  const formData = new FormData();
  formData.append("limit", limit);
  formData.append("offset", offset);

  const response = await axios.post(GET_CITIES, formData);
  return response.data;
};
// GET_FAQS

export const get_faqs = async () => {
  const response = await axios.post(GET_FAQS);
  return response.data;
};
// RAZORPAY_CREATE_ORDER

export const razorpay_create_order = async (order_id) => {
  const formData = new FormData();
  formData.append("order_id", order_id);
  const response = await axios.post(RAZORPAY_CREATE_ORDER, formData);
  return response.data;
};

// flutterwave webview

export const flutterwave_webview = async (price) => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("amount", price);

  const response = await axios.post(FLUTTERWAVE, formData);
  return response.data;
};

// flutterwave_payment_response

export const flutterwave_payment_response = async () => {
  const response = await axios.post(FLUTTERWAVE_RESPONSE);
  return response.data;
};

// delivery_charge

export const get_delivery_charges = async (address_id) => {
  let { id } = getUser();
  const formData = new FormData();
  formData.append("user_id", id);
  formData.append("address_id", address_id);

  const response = await axios.post(DELIVERY_CHARGE, formData);
  return response.data;
};

// delivery_charge

export const cart_sync = async (data) => {
  const formData = new FormData();
  let { id } = getUser();
  formData.append("user_id", id);
  formData.append("data", data);

  const response = await axios.post(CART_SYNC, formData);
  return response.data;
};

// delivery_charge

export const delete_order = async (order_id) => {
  const formData = new FormData();
  formData.append("order_id", order_id);

  const response = await axios.post(DELETE_ORDER, formData);
  return response.data;
};

// sign_up

export const sign_up = async (type, name, email) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("name", name);
  formData.append("email", email);

  const response = await axios.post(SIGN_UP, formData);
  return response.data;
};

// get_promo_codes

export const get_promo_codes = async (type, name, email) => {
  const formData = new FormData();
  formData.append("type", type);
  formData.append("name", name);
  formData.append("email", email);

  const response = await axios.post(GET_PROMO_CODE, formData);
  return response.data;
};

// validate_code

export const validate_promo_code = async (promo_code, final_total) => {
  const formData = new FormData();
  let { id } = getUser();
  formData.append("user_id", id);
  formData.append("promo_code", promo_code);
  formData.append("final_total", final_total);

  const response = await axios.post(VALIDATE_CODE, formData);
  return response.data;
};
