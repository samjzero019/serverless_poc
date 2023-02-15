const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
  "Access-Control-Allow-Methods": "OPTIONS,GET",
  // "Access-Control-Allow-Credentials" : true,
  "Access-Control-Allow-Origin": "*",
  "X-Requested-With": "*",
};

const tableName = process.env.TABLE_NAME;  // Gets the Order Table from environment variable.
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

module.exports.handler = async (event) => {
  console.log(" event: ", event);
  const { username } = event.pathParameters;

  let params = {
    TableName: tableName,
  };

  let response;
  let res;
  try {
    let allData = await docClient.scan(params).promise();
    if (allData.Items.length > 0) {
      res = allData.Items.filter((itm) => itm.Username === username);
    }
    console.log("single: ", allData)
    response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(res),
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
