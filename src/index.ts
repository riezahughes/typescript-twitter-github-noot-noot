import { Endpoints } from '@octokit/types';

const { Octokit } = require('@octokit/rest');

const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
  apiKey: '<YOUR-TWITTER-API-KEY>',
  apiSecret: '<YOUR-TWITTER-API-SECRET>',
  accessToken: '<YOUR-TWITTER-ACCESS-TOKEN>',
  accessTokenSecret: '<YOUR-TWITTER-ACCESS-TOKEN-SECERT>',
});

const test = async () => {
  const octokit = new Octokit({
    userAgent: 'scotbot/rest.js v1.0.0',
  });

    type searchResponse = Endpoints['GET /search/issues']['response'];

    await octokit.search.issuesAndPullRequests({
      q: 'cunt',
      s: 'created',
      type: 'commits',
    }).then((result: searchResponse) => {
      const chosenData = result.data.items[Math.floor(Math.random() * result.data.items.length)];
      const { title, body, url } = chosenData;
      console.log(`title: ${title}`);
      console.log(url);
      console.log(body);
    });
};

test();
