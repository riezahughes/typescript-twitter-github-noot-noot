import { Endpoints } from '@octokit/types';

require('dotenv').config();

const cron = require('node-cron');

const { Octokit } = require('@octokit/rest');

const { TwitterClient } = require('twitter-api-client');

const twitterClient = new TwitterClient({
  apiKey: process.env.APIKEY,
  apiSecret: process.env.APISECRET,
  accessToken: process.env.ACCESSTOKEN,
  accessTokenSecret: process.env.ACCESSTOKENSECRET,
});

const sendTweet = async () => {
  const octokit = new Octokit({
    userAgent: 'scotbot/rest.js v1.0.0',
  });

    type searchResponse = Endpoints['GET /search/issues']['response'];

    const pageNumber: number = Math.floor(Math.random() * 5);

    await octokit.search.issuesAndPullRequests({
      q: 'cunt+OR+wank+OR+bellend+OR+fanny+OR+bawbag+in:title',
      sort: 'updated',
      order: 'desc',
      per_page: 100,
    }).then(async (result: searchResponse) => {
      //   console.log(result);
      let found: boolean = false;
      let title: String = '';
      let html_url: String = '';
      let body: String = '';

      while (!found) {
        const chosenData = result.data.items[Math.floor(Math.random() * result.data.items.length)];
        console.log(chosenData);
        if (chosenData.title.split(' ').length < 2) {
          console.log('re-rollling...');
        } else {
          title = chosenData.title;
          html_url = chosenData.html_url;
          body = chosenData.body;
          found = true;
        }
      }

      await twitterClient.tweets.statusesUpdate({
        status: `${title} - ${html_url} - ${body.substring(0, 60)}...`,
      });
      console.log(`${title}`);
      console.log(html_url);
      console.log(body);
    })
      .catch((err: any) => console.log(err));
};

cron.schedule('*/30 * * * *', () => {
  sendTweet();
});
