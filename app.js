//export AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
const AWSXRay = require('aws-xray-sdk-core'),
    AWS = AWSXRay.captureAWS(require('aws-sdk'));

const documentClient = new AWS.DynamoDB.DocumentClient({ endpoint: 'http://localhost:4569', convertEmptyValues: true });

const dynamoPut = (params) => {
    return documentClient.put(params).promise().catch(err => console.log(err))
}

const generateResponse = (status, body) => {
  return {
      'statusCode': status,
      'body': JSON.stringify(body)
  }
}
const handler = async (event, context, callback) => {
    try {

      await dynamoPut({TableName: "", Item: {Id: 101} })
      response = generateResponse(200, { "dateOfBirth": "2001-01-01" })
    } catch (err) {
        console.log(err);
        return err;
    }
    callback(null, response)
};


module.exports = {
  handler,
  generateResponse
}
