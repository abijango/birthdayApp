//export AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
// const AWSXRay = require('aws-xray-sdk-core'),
const  AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1', endpoint: 'http://localhost:4569', convertEmptyValues: true });

const dynamoPut = (params) => {
    return documentClient.put(params).promise()
}

const generateResponse = (status, body) => {
  return {
      'statusCode': status,
      'body': JSON.stringify(body)
  }
}

let response;

const handler = async (event, context, callback) => {
    try {

      await dynamoPut({TableName: "birthdays", Item: {Id: "101"} })
      response = generateResponse(200, {
        "dateOfBirth": "2001-01-01"
      })

    } catch (err) {
        console.log(err);
        return err;
    }
};


module.exports = {
  handler,
  generateResponse
}

handler()
