const {Client, SpeechBuilder, Middleware, Clova } = require('@line/clova-cek-sdk-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const APPLICATION_ID = process.env.APPLICATION_ID;

const fs = require('fs');

const launchHandler = async (responseHelper: any) => {
    const json = JSON.parse(fs.readFileSync('./daily_positive_detail.json', 'utf8'));
    const latest_data = json.data.slice(-1)[0];
    const date = new Date(latest_data.diagnosed_date);

    responseHelper.setSimpleSpeech(
        SpeechBuilder.createSpeechText(`東京都の${date.getMonth()+1}月${date.getDate()}日の感染者数は${latest_data.count}人です。`)
    );
    responseHelper.endSession();
};


const sessionEndedHandler = async () => { };

const clovaHandler = Client
    .configureSkill()
    .onLaunchRequest(launchHandler)
    .onSessionEndedRequest(sessionEndedHandler)
    .handle();

const app = new express();
const clovaMiddleware = Middleware({ applicationId: APPLICATION_ID });

app.post('/covid', clovaMiddleware, clovaHandler);

const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);
exports.handler = (event:any, context:any) => awsServerlessExpress.proxy(server, event, context);