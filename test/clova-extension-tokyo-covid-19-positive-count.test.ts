import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as ClovaExtensionTokyoCovid19PositiveCount from '../lib/clova-extension-tokyo-covid-19-positive-count-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new ClovaExtensionTokyoCovid19PositiveCount.ClovaExtensionTokyoCovid19PositiveCountStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
