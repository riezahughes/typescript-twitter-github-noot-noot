import { Endpoints } from '@octokit/types';

const { Octokit } = require('@octokit/rest');
const { Endpoints } = require('@octokit/types');

const { TwitterClient } = require('twitter-api-client');

const octokit = new Octokit({
  userAgent: 'scotbot/rest.js v1.0.0',
});

type searchParameters = Endpoints['GET /search/issues']['parameters']
type searchResponse = Endpoints['GET /search/issues']['response']

const twitterClient = new TwitterClient({
  apiKey: '<YOUR-TWITTER-API-KEY>',
  apiSecret: '<YOUR-TWITTER-API-SECRET>',
  accessToken: '<YOUR-TWITTER-ACCESS-TOKEN>',
  accessTokenSecret: '<YOUR-TWITTER-ACCESS-TOKEN-SECERT>',
});

const results = async () => {
  await octokit.search.issuesAndPullRequests({
    q: 'cunt&type=pr',
    sort: 'created',
    order: 'desc',
  }).then((data: searchResponse) => {
    const choice: Array<String> = data.data[Math.floor(Math.random() * data.data.length)];
    return choice;
  });
};

results();
