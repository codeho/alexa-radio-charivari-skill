const Alexa = require('alexa-sdk');
const audioData = require('./audio-assets');
const constants = require('./constants');
const Console = console;

var stateHandlers = {
  startModeIntentHandlers : Alexa.CreateStateHandler(constants.states.START_MODE, {
    'LaunchRequest': function () {
      // Initialize Attributes
      this.attributes.index = 0;
      this.attributes.offsetInMilliseconds = 0;
      this.attributes.playbackIndexChanged = true;
      //  Change state to START_MODE
      this.handler.state = constants.states.START_MODE;

      var message = this.t('launchRequest.WELCOME');
      var reprompt = this.t('launchRequest.REPROMT');

      this.response.speak(message).listen(reprompt);
      this.emit(':responseReady');
    },
    'PlayNewsBoarischIntent': function() {
      this.attributes.index = constants.playMode.NEWS_BAVARION;
      this.emit('PlayAudio');
    },
    'PlayNewsRosenheimRegionIntent': function() {
      this.attributes.index = constants.playMode.NEWS_REGIONAL;
      this.emit('PlayAudio');
    },
    'PlayStreamIntent': function() {
      this.attributes.index = constants.playMode.STREAM;
      this.emit('PlayAudio');
    },
    'PlayAudio': function () {
      if (!this.attributes.offsetInMilliseconds) {
        // Initialize Attributes if undefined.
        this.attributes.offsetInMilliseconds = 0;
        this.attributes.playbackIndexChanged = true;
        //  Change state to START_MODE
        this.handler.state = constants.states.START_MODE;
      }
      controller.play.call(this);
    },
    'AMAZON.HelpIntent': function () {
      var message = this.t('HELP.WELCOME');
      this.response.speak(message).listen(message);
      this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
      var message = this.t('GOOD_BYE');
      this.response.speak(message);
      controller.stop.call(this);
      this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
      var message = this.t('GOOD_BYE');
      this.response.speak(message);
      controller.stop.call(this);
      this.emit(':responseReady');
    },
    'AMAZON.LoopOnIntent': function () {
      var message = this.t('NO_LOOP');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.LoopOffIntent': function () {
      var message = this.t('NO_LOOP');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.NextIntent': function () {
      var message = this.t('NEXT');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.PreviousIntent': function () {
      var message = this.t('PREVIOUS');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.ShuffleOnIntent': function () {
      var message = this.t('NO_SHUFFLE');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.ShuffleOffIntent': function () {
      var message = this.t('NO_SHUFFLE');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
      // No session ended logic
    },
    'Unhandled': function () {
      Console.log(`unhandled ${this.handler.state}`);
      var message = this.t('UNHANDLED');
      this.response.speak(message);
      this.emit(':responseReady');
    }
  }),


  playModeIntentHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
    /*
    *  All Intent Handlers for state : PLAY_MODE
    */
    'LaunchRequest': function () {
      this.attributes['offsetInMilliseconds'] = 0;
      this.handler.state = constants.states.START_MODE;

      var message = this.t('launchRequest.WELCOME');
      var reprompt = this.t('launchRequest.REPROMT');

      this.response.speak(message).listen(reprompt);
      this.emit(':responseReady');
    },
    'PlayNewsBoarischIntent': function() {
      this.attributes.index = constants.playMode.NEWS_BAVARION;
      this.emit('PlayAudio');
    },
    'PlayNewsRosenheimRegionIntent': function() {
      this.attributes.index = constants.playMode.NEWS_REGIONAL;
      this.emit('PlayAudio');
    },
    'PlayStreamIntent': function() {
      this.attributes.index = constants.playMode.STREAM;
      this.emit('PlayAudio');
    },
    'PlayAudio': function () {
      controller.play.call(this);
    },
    'AMAZON.NextIntent': function () {
      var message = this.t('NEXT');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.PreviousIntent': function () {
      var message = this.t('PREVIOUS');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.PauseIntent': function () {
      controller.stop.call(this);
    },
    'AMAZON.StopIntent': function () {
      var message = this.t('GOOD_BYE');
      this.response.speak(message);
      controller.stop.call(this);
      this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
      controller.stop.call(this);
    },
    'AMAZON.ResumeIntent': function () {
      controller.play.call(this);
    },
    'AMAZON.LoopOnIntent': function () {
      var message = this.t('NO_LOOP');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.LoopOffIntent': function () {
      var message = this.t('NO_LOOP');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.ShuffleOnIntent': function () {
      var message = this.t('NO_SHUFFLE');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.ShuffleOffIntent': function () {
      var message = this.t('NO_SHUFFLE');
      this.response.speak(message);
      this.emit(':responseReady');
    },
    'AMAZON.RepeatIntent': function () {
      this.attributes['offsetInMilliseconds'] = 0;
      this.emit('PlayAudio');
    },
    'AMAZON.StartOverIntent': function () {
      controller.startOver.call(this);
    },
    'AMAZON.HelpIntent': function () {
      // This will called while audio is playing and a user says "ask <invocation_name> for help"
      var message = this.t('HELP.WELCOME');
      this.response.speak(message).listen(message);
      this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
      // No session ended logic
    },
    'Unhandled': function () {
      Console.log(`unhandled ${this.handler.state}`);
      var message = this.t('UNHANDLED');
      this.response.speak(message);
      this.emit(':responseReady');
    }
  }),


  remoteControllerHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
    /*
    *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
    */
    'PlayCommandIssued': function () {
      controller.play.call(this);
    },
    'PauseCommandIssued': function () {
      controller.stop.call(this);
    },
    'NextCommandIssued': function () {
      this.response.speak(this.t('NEXT'));
      this.emit(':responseReady');
    },
    'PreviousCommandIssued': function () {
      this.response.speak(this.t('PREVIOUS'));
      this.emit(':responseReady');
    }
  })
};

module.exports = stateHandlers;

var controller = function () {
  return {
    play: function () {
      /*
      *  Using the function to begin playing audio when:
      *      Play Audio intent invoked.
      *      Resuming audio when stopped/paused.
      *      Next/Previous commands issued.
      */
      this.handler.state = constants.states.PLAY_MODE;

      if (this.attributes['playbackFinished']) {
        // Reset to top of the playlist when reached end.
        this.attributes['index'] = 0;
        this.attributes['offsetInMilliseconds'] = 0;
        this.attributes['playbackIndexChanged'] = true;
        this.attributes['playbackFinished'] = false;
      }

      var token = String(this.attributes.index);
      var playBehavior = 'REPLACE_ALL';
      var podcast = audioData[this.attributes.index];
      var offsetInMilliseconds = (this.attributes.index !== 2) ? this.attributes['offsetInMilliseconds'] : 0;
      // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.
      this.attributes['enqueuedToken'] = null;

      if (canThrowCard.call(this)) {
        var cardTitle = `Radio Charivari Rosenheim ${podcast.title}`;
        var cardContent = `Spiele ${podcast.title}. (c) Charivari Rosenheim.`;
        this.response.cardRenderer(cardTitle, cardContent, null);
      }

      this.response.audioPlayerPlay(playBehavior, podcast.url, token, null, offsetInMilliseconds);
      this.emit(':responseReady');
    },
    stop: function () {
      /*
      *  Issuing AudioPlayer.Stop directive to stop the audio.
      *  Attributes already stored when AudioPlayer.Stopped request received.
      */
      this.response.audioPlayerStop();
      this.emit(':responseReady');
    },
    startOver: function () {
      // Start over the current audio file.
      this.attributes['offsetInMilliseconds'] = 0;
      controller.play.call(this);
    },
    reset: function () {
      // Reset to top of the playlist.
      this.attributes['offsetInMilliseconds'] = 0;
      this.attributes['playbackIndexChanged'] = true;
      controller.play.call(this);
    }
  };
}();

function canThrowCard() {
  /*
  * To determine when can a card should be inserted in the response.
  * In response to a PlaybackController Request (remote control events) we cannot issue a card,
  * Thus adding restriction of request type being "IntentRequest".
  */
  if (this.event.request.type === 'IntentRequest' && this.attributes['playbackIndexChanged']) {
    this.attributes['playbackIndexChanged'] = false;
    return true;
  } else {
    return false;
  }
}
