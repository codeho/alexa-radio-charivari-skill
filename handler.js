const Alexa = require('alexa-sdk');
const stateHandlers = require('./src/state-handlers');
const constants = require('./src/constants');
const languageStrings = require('./src/language-strings');
const audioEventHandlers = require('./src/audio-event-handlers');

exports.chariskill = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = constants.appId;
  alexa.dynamoDBTableName = constants.dynamoDBTableName;
  alexa.resources = languageStrings;
  alexa.registerHandlers(
    stateHandlers.startModeIntentHandlers,
    stateHandlers.playModeIntentHandlers,
    stateHandlers.remoteControllerHandlers,
    audioEventHandlers
  );
  alexa.execute();
};
