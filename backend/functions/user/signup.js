const AWS = require('aws-sdk')
const { sendResponse, validateInput } = require("./include");

const cognito = new AWS.CognitoIdentityServiceProvider()

module.exports.handler = async (event) => {

    console.log("Event in SignUp: ", event);

    try {
        const isValid = validateInput(event.body)
        if (!isValid)
            return sendResponse(400, { message: 'Invalid input' })

        const { email, password } = JSON.parse(event.body)
        // TODO: 
        const { user_pool_id } = process.env

        console.log("email: ", email, "password: ", password, "user_pool_id: ", user_pool_id)

        const params = {
            UserPoolId: user_pool_id,
            Username: email,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                },
                {
                    Name: 'email_verified',
                    Value: 'true'
                }],
            MessageAction: 'SUPPRESS'
        }
        const response = await cognito.adminCreateUser(params).promise();

        if (response.User) {
            const paramsForSetPass = {
                Password: password,
                UserPoolId: user_pool_id,
                Username: email,
                Permanent: true
            };
            await cognito.adminSetUserPassword(paramsForSetPass).promise()
        }
        return sendResponse(200, { message: 'User registration successful' })
    }
    catch (error) {
        const message = error.message ? error.message : 'Internal server error in SignUp'
        return sendResponse(500, { message })
    }
}