const { sendResponse } = require("./include");

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const uuid = require("react-uuid");

module.exports.handler = async (event) => {
  console.log(" event: ", event);
  const { body } = event;
  const tableName = process.env.TABLE_NAME;
  const { username, orderItems, address, payment, orderDate } =
    JSON.parse(body);

  /** at object level this function can add as well as update the object  */


  const input = {
    TableName: tableName,
    Item: {
      OrderID: uuid(),
      Username: username,
      OrderItems: orderItems,
      Address: address,
      Card: payment,
      CreatedAt: orderDate,
    },
  };

  console.log("Input parameter: ", input);

  try {
    const data = await docClient.put(input).promise();
    msg = "Successful in Placing Order";
    console.log(data);
  } catch (err) {
    msg = `"Failed in Placing Order" ${err.message}`;
    return sendResponse(200, { message: msg });
  }

  return sendResponse(200, { message: msg });
};
