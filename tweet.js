const options = {
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new require('twitter')(options);

function tweet(str) {
  client
    .post('statuses/update', { status: str })
    .then(function(tweet) {
      console.log(tweet);
    })
    .catch(function(error) {
      console.log('Error', error);
    });
}

module.exports = {
  tweet: tweet,
};
