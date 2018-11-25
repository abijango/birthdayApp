//export AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
// const AWSXRay = require('aws-xray-sdk-core'),
const  AWS = require('aws-sdk');

const documentClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
    convertEmptyValues: true
});

const dynamoPut = (params) => {
    return documentClient.put(params).promise().catch(err => console.log(err))
}

const dynamoQuery = (params) => {
    return documentClient.query(params).promise().catch(err => console.log(err))
}

const generateResponse = (status, body) => {
  return {
      'statusCode': status,
      'body': JSON.stringify(body)
  }
}

let response;

const putTask = async (event, context, callback) => {
    try {
      const body = JSON.parse(event.body)
      const dOB = Date(body.dateOfBirth).format("YYYY-mm-dd")
      const put = await dynamoPut({
        TableName: 'birthdays',
        Item: {
          Id: String(event.pathParameters.userId),
          dateOfBirth: body.dateOfBirth
        }
      })

      //return the returned value
      callback(null, generateResponse(204, {
        put
      }))

    } catch (err) {
        console.log(err);
        callback(null, generateResponse(500, {
          err
        }))
    }
};
const getTask = async (event, context, callback) => {
    try {
      const get = await dynamoQuery({
        TableName: 'birthdays',
        KeyConditionExpression: 'Id = :id',
        ExpressionAttributeValues: {
          ':id': String(event.pathParameters.userId)
        }
      })
      // const dOB = Date(get.dateOfBirth).format("YYYY-mm-dd")
      //return the returned value
      callback(null, generateResponse(204, {
        get
      }))
    } catch (err) {
        console.log(err);
        callback(null, generateResponse(500, {
          err
        }))
    }
};

module.exports = {
  getTask,
  putTask,
  generateResponse
}

// handler()
