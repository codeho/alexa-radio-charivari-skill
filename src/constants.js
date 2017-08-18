module.exports = Object.freeze({
  appId: 'amzn1.ask.skill.af6768c6-4212-410d-a971-5cf041a8341b',
  dynamoDBTableName: 'radioCharivariSkill',
  states: {
    START_MODE : '',
    PLAY_MODE : '_PLAY_MODE'
  },
  playMode: {
    NEWS_BAVARION: 0,
    NEWS_REGIONAL: 1,
    STREAM: 2
  }
});
