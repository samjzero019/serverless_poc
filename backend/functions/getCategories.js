// 'use strict';
const axios = require("axios");

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "*",
  // "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "*",
};

const getCategories = async (event) => {
  console.log("Event: ", event)

  let resData;
  await axios("https://fakestoreapi.com/products/categories")
    .then(
      (res) =>
        (resData = {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify(res.data),
        })
    )
    .catch((err) => {
      resData = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify(err.message),
      };
    });

   console.log("Response: ", resData); 
  return resData;
};
module.exports = {
  handler: getCategories,
};
