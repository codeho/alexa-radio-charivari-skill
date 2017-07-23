const Alexa = require('alexa-sdk');
const stateHandlers = require('./src/state-handlers');
const constants = require('./src/constants');

exports.chariskill = (event, context) => {
  const alexa = Alexa.handler(event, context);
  alexa.appId = constants.appId;
  alexa.registerHandlers(
    stateHandlers.startModeIntentHandlers,
    stateHandlers.playModeIntentHandlers,
    stateHandlers.remoteControllerHandlers,
    stateHandlers.resumeDecisionModeIntentHandlers
  );
  alexa.execute();
};
