const { sendResponse } = require("./include");

module.exports.handler = async (event) => {
    return sendResponse(200, { message: `User with Email ${event.requestContext.authorizer.claims.email}  has placed the order` })
}
