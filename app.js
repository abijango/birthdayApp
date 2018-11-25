
const AWSXRay = require('aws-xray-sdk-core'),
    AWS = AWSXRay.captureAWS(require('aws-sdk'));

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

const generateResponse = (statusCode, body) => {
    return {
        'statusCode': statusCode,
        'body': JSON.stringify(body)
    }
}

const putBirthday = async (event, context, callback) => {
    try {
        const body = JSON.parse(event.body)
        const put = await dynamoPut({
            TableName: process.env.TABLE_NAME,
            ReturnValues: "ALL_OLD",
            Item: {
                Id: String(event.pathParameters.userId),
                dateOfBirth: Date(body.dateOfBirth).format('YYYY-mm-dd')
            }
        })

        callback(null, generateResponse(200, {
            put
        }))
    } catch (err) {
        console.log(err);
        callback(err, generateResponse(500, {
            err
        }))
    }
};

const getBirthday = async (event, context, callback) => {
    try {
        const get = await dynamoQuery({
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: 'Id = :id',
            ExpressionAttributeValues: {
                ':id': String(event.pathParameters.userId)
            }
        })


        if(get.Count === 0) {
            callback(null, generateResponse(404, "No record found for that person"))
        }

        callback(null, generateResponse(200, {
            get
        }))
    } catch (err) {
        console.log(err);
        callback(err, generateResponse(500, {
            err
        }))
    }
};

module.exports = {
    getBirthday,
    putBirthday,
    generateResponse
}
