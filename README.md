# birthdayApp

This is a app generated with the SAM local cli

The application is a Serverless API that interacts with a DynamoDB.

The application is defined in the samTemplate.yaml, this includes:

- Lamda functions:
  - PutFunction
  - GetFunction
- Lamda functions Deployment Preference, in this case Canary Deployment with 10% traffic shifting every 5 mins.
  There are alarms defined for 60 second intervals to halt deployments if error > 0 in the time period.
- API Gateway Endpoints are created due to Lambda functions trigger defined as API event.
- DynamoDB Table and access policies.
