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

By defining the deployment preference of the lamda functions as Canary deployments we achieve blue/green deployments of sorts, with traffic shifting and aliases. The CloudWatch alarms will allow the deployment to halt and automatically rollback if the error threshold increases over the defined value in the template (in this case > 0).

The application has some issues that I still need to investigate so the functionality is not there. But I wanted to showcase the actual configuration, orchestration and safe deployment that I had designed.
