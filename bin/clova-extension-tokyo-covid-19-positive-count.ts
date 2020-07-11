#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ClovaExtensionTokyoCovid19PositiveCountStack } from '../lib/clova-extension-tokyo-covid-19-positive-count-stack';

const app = new cdk.App();
new ClovaExtensionTokyoCovid19PositiveCountStack(app, 'ClovaExtensionTokyoCovid19PositiveCountStack');
app.synth();