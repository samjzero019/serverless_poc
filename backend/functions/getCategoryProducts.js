const axios = require("axios");
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
  // "Access-Control-Allow-Credentials" : true,
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "*",
};

const getCategoryProducts = async (event) => {
  console.log("Event: ", event);
  const { category } = event.pathParameters;

  let response;
  if (category && category.length > 0) {
    await axios
      .get(`https://fakestoreapi.com/products/category/${category}`)
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
      });
  } else {
    response = {
      statusCode: 500,
      headers: headers,
      body: `Valid Category not found`,
    };
  }
  console.log("Response: ", response);
  return response;
};
module.exports = {
  handler: getCategoryProducts,
};
