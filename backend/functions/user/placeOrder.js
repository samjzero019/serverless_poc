const { sendResponse } = require("./include");

// const { marshall } = require("@aws-sdk/util-dynamodb");

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const uuid = require("react-uuid");

module.exports.handler = async (event) => {
  console.log(" event: ", event);
  const { body } = event;
  const tableName = process.env.TABLE_NAME;
  const { username, orderItems, address, cardDetails, orderDate } =
    JSON.parse(body);

    console.log("cardDetails: ", cardDetails)
  /** at object level this function can add as well as update the object  */

  let item = {
    OrderID: uuid(),
    Username: username,
    OrderItems: orderItems,
    Address: address,
    Card: cardDetails,
    CreatedAt: orderDate,
  };

  console.log("itm", item);

  const input = {
    TableName: tableName,
    Item: item,
  };

  console.log("INput parameter: ", input)
  
  return sendResponse(200, { message: "msg" });
};
