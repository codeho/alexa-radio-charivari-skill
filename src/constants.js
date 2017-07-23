module.exports = Object.freeze({
  appId : 'amzn1.ask.skill.af6768c6-4212-410d-a971-5cf041a8341b',

  /*
    *  States:
    *  START_MODE : Welcome state when the audio list has not begun.
    *  PLAY_MODE :  Not handled
    *  RESUME_DECISION_MODE : Not handled
    */
  states : {
    START_MODE : '',
    PLAY_MODE : '_PLAY_MODE',
    RESUME_DECISION_MODE : '_RESUME_DECISION_MODE',
  }
});
