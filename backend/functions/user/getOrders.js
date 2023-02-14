const { sendResponse } = require("./include");

// const tableName = process.env.ORDER_TABLE;  // Gets the Order Table from environment variable.
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

module.exports.handler = async (event, exclusiveStartKey = null) => {
  console.log(" event: ", event);
  // const { username } = event.pathParameters;
  const username = "admin@netsoltech.com";

  const tableName = "OrderTable";
  let params = {
    TableName: tableName,
  };

  const allData = [];

  try {
    // We use Scan operator to fetch whole items from table
    let result = await docClient.scan(params).promise();
    if (result.Items.length > 0) {
      allData = result.Items.filter((itm) => itm.Username === username);
    }
    msg = "Successful in Placing Order";
    console.log(allData);
  } catch (err) {
    msg = `"Failed in Placing Order" ${err.message}`;
    return sendResponse(200, { message: msg });
  }

  return sendResponse(200, { message: msg, data: allData });
};
