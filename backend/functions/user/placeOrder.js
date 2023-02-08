const { sendResponse } = require("./include");

module.exports.handler = async (event) => {
    console.log("Event", event)

    return sendResponse(200, { message: `User with Email  has placed the order` })
}
