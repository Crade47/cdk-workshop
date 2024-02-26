import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, LambdaRestApi, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //defining labmda function
    const helloLambda = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      code: lambda.Code.fromAsset('lambda/hello/bin'),
      handler: 'bootstrap',
    });

    const pathLambda = new lambda.Function(this, 'PathHandler', {
      runtime: lambda.Runtime.PROVIDED_AL2,
      code: lambda.Code.fromAsset('lambda/path/bin'),
      handler: 'bootstrap',

    });


    //defining api gateway
    const api = new RestApi(this, "api", {
      defaultCorsPreflightOptions: {  
        allowOrigins: ['*'],
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowHeaders: ['*']
      } 
    })
    api.root.addMethod('ANY')

    //defining resources and methods for hello function
    const hello = api.root.addResource('hello')
    hello.addMethod('GET', new LambdaIntegration(helloLambda))
    hello.addMethod('POST', new LambdaIntegration(helloLambda))
    //defining resources and methods for path function
    const path = api.root.addResource('path')
    path.addMethod('GET', new LambdaIntegration(pathLambda))

  }
}
