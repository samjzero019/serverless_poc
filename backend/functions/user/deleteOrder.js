const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
  // "Access-Control-Allow-Credentials" : true,
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "*",
};

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.TABLE_NAME;

module.exports.handler = async (event) => {
  console.log(" event: ", event);
  const { ID } = event.pathParameters;
  const { username } = event.queryStringParameters;

  let params = {
    TableName: tableName,
    Key: {
      OrderID: ID,
      Username: username,
    },
  };
  console.log("itm in del", params);
  let response;
  try {
    await docClient.delete(params).promise();
    response = {
      statusCode: 200,
      headers: headers,
      body: "Order Deleted Successfully",
    };
  } catch (err) {
    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify(err.message),
    };
  }
  return response;
};
