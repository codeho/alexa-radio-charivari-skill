const Alexa = require('alexa-sdk');
const constants = require('./constants');
const Console = console;

// Binding audio handlers to PLAY_MODE State since they are expected only in this mode.
const audioEventHandlers = Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
  'PlaybackStarted' : function () {
    /*
      * AudioPlayer.PlaybackStarted Directive received.
      * Confirming that requested audio file began playing.
      * Storing details in dynamoDB using attributes.
      */
    this.attributes['token'] = getToken.call(this);
    this.attributes['index'] = getIndex.call(this);
    this.attributes['playbackFinished'] = false;
    this.emit(':saveState', true);
  },
  'PlaybackFinished' : function () {
    /*
      * AudioPlayer.PlaybackFinished Directive received.
      * Confirming that audio file completed playing.
      * Storing details in dynamoDB using attributes.
      */
    this.attributes['playbackFinished'] = true;
    this.attributes['enqueuedToken'] = false;
    this.emit(':saveState', true);
  },
  'PlaybackStopped' : function () {
    /*
      * AudioPlayer.PlaybackStopped Directive received.
      * Confirming that audio file stopped playing.
      * Storing details in dynamoDB using attributes.
      */
    this.attributes['token'] = getToken.call(this);
    this.attributes['index'] = getIndex.call(this);
    this.attributes['offsetInMilliseconds'] = getOffsetInMilliseconds.call(this);
    this.emit(':saveState', true);
  },
  'PlaybackFailed' : function () {
    //  AudioPlayer.PlaybackNearlyFinished Directive received. Logging the error.
    Console.log('Playback Failed : %j', this.event.request.error);
    this.context.succeed(true);
  }
});

module.exports = audioEventHandlers;

function getToken() {
  // Extracting token received in the request.
  return this.event.request.token;
}

function getIndex() {
  // Extracting index from the token received in the request.
  return parseInt(this.event.request.token);
}

function getOffsetInMilliseconds() {
  // Extracting offsetInMilliseconds received in the request.
  return this.event.request.offsetInMilliseconds;
}
