// 'use strict';
const axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "*",
};

const getProductDetails = async (event) => {
  console.log("Event: ", event);
  const {productID} = event.pathParameters;
  let response;
  productID &&
    productID.length > 0 &&
    (await axios
      .get(`https://fakestoreapi.com/products/${productID}`)
      .then((res) => {
        response = {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify(res.data),
        };
      })
      .catch((err) => {
        response = {
          statusCode: 500,
          headers: headers,
          body: JSON.stringify(err.message),
        };
      }));
      console.log("Response", response);
  return response;
};

module.exports = {
  handler: getProductDetails,
};
