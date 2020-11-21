import { Endpoints } from '@octokit/types';

require('dotenv').config();

const { Octokit } = require('@octokit/rest');

const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
  accessToken: process.env.ACCESSTOKEN,
  accessTokenSecret: process.env.ACCESSTOKENSECRET,
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
    }).then(async (result: searchResponse) => {
      const chosenData = result.data.items[Math.floor(Math.random() * result.data.items.length)];
      const { title, body, html_url } = chosenData;
      await twitterClient.tweets.statusesUpdate({
        status: `title: ${title} - ${html_url} - ${body}`,
      });
      console.log(`title: ${title}`);
      console.log(html_url);
      console.log(body);
    })
      .catch((err: any) => console.log(err));
};

test();
