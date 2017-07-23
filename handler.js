const Alexa = require('alexa-sdk');
const stateHandlers = require('./src/state-handlers');
const constants = require('./src/constants');
const languageStrings = require('./src/language-strings');

exports.chariskill = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = constants.appId;
  alexa.resources = languageStrings;
  alexa.registerHandlers(
    stateHandlers.startModeIntentHandlers,
    stateHandlers.remoteControllerHandlers
  );
  alexa.execute();
};
