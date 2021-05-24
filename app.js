const { App } = require('@slack/bolt');
const axiosBase = require('axios');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

const axios = axiosBase.create({
  baseURL: `https://${process.env.JIRA_DOMAIN}/rest/api/3`,
  headers: {
    "Authorization": `Basic ${process.env.JIRA_TOKEN}`,
    "Accept": "application/json"
  }
});

app.event('app_home_opened', async ({ event, say }) => {
  const user = {
    user: event.user,
    channel: event.channel
  };

  const result = axios.get('/search')
    .catch((e) => {
      console.log(e);
    });

  await say(`Hello world, and welcome <@${user.user}>!`);
});


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
