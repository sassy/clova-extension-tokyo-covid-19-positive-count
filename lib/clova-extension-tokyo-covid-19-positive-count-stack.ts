import * as cdk from '@aws-cdk/core';
import { Function, Runtime, Code} from "@aws-cdk/aws-lambda";
import { RestApi, LambdaIntegration, Resource, Integration } from "@aws-cdk/aws-apigateway";
import { Role, ServicePrincipal, ManagedPolicy } from "@aws-cdk/aws-iam";


export class ClovaExtensionTokyoCovid19PositiveCountStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const executionLambdaRole = new Role(this, 'tokyoCovidlambdarole', {
      roleName: 'tokyoCovidlambdarole',
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
      ]
    });


    const lambdaFunction: Function = new Function(this, "tokyoCovid19Handler", {
      functionName: "tokyoCovid19Handler",
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset("lambda"),
      handler: "main.handler",
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      role: executionLambdaRole,
      environment: {
        TZ: "Asia/Tokyo",
        APPLICATION_ID: "io.sassy.github.tokyo.covid19"
      }
    });

    const restApi: RestApi = new RestApi(this, "tokyoCovid19-API", {
      restApiName: "tokyoCovid19-API",
      description: "API"
    });

    const integration: Integration = new LambdaIntegration(lambdaFunction);
    const getResourse: Resource = restApi.root.addResource("covid");
    getResourse.addMethod("POST", integration);
  }
}
