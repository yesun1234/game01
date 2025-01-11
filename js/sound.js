const soundSet = () => {
  if (!$('.btnSoundOk').length) {
    var audioEleOk = document.createElement('audio');
    var soundUrl = './common/sound/correct.mp3';
    audioEleOk.setAttribute('class', 'btnSoundOk');
    audioEleOk.setAttribute('src', soundUrl);
    audioEleOk.setAttribute('preload', 'auto');
    audioEleOk.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(audioEleOk);
  }
  if (!$('.btnSoundNo').length) {
    var audioEleNo = document.createElement('audio');
    var soundUrl = './common/sound/incorrect.mp3';
    audioEleNo.setAttribute('class', 'btnSoundNo');
    audioEleNo.setAttribute('src', soundUrl);
    audioEleNo.setAttribute('preload', 'auto');
    audioEleNo.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(audioEleNo);
  }
  if (!$('.btnSoundPop').length) {
    var audioElePop = document.createElement('audio');
    var soundUrl = './common/sound/complete.mp3';
    audioElePop.setAttribute('class', 'btnSoundPop');
    audioElePop.setAttribute('src', soundUrl);
    audioElePop.setAttribute('preload', 'auto');
    audioElePop.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(audioElePop);
  }
  if (!$('.btnSoundClick').length) {
    var audioEleNo = document.createElement('audio');
    var soundUrl = './common/sound/click.mp3';
    audioEleNo.setAttribute('class', 'btnSoundClick');
    audioEleNo.setAttribute('src', soundUrl);
    audioEleNo.setAttribute('preload', 'auto');
    audioEleNo.setAttribute('type', 'audio/mpeg');
    qs('#wrap').append(audioEleNo);
  }
};

const wrongSound = () => {
  var wrongAudio = qs('.btnSoundNo')[0];
  if (!wrongAudio.ended) {
    wrongAudio.currentTime = 0;
  }
  wrongAudio.play();
};
const correctSound = () => {
  var correctAudio = qs('.btnSoundOk')[0];
  if (!correctAudio.ended) {
    correctAudio.currentTime = 0;
  }
  correctAudio.play();
};
const popSound = () => {
  var popAudio = qs('.btnSoundPop')[0];
  if (!popAudio.ended) {
    popAudio.currentTime = 0;
  }
  popAudio.play();
};
const clickSound = () => {
  var clickAudio = qs('.btnSoundClick')[0];
  if (!clickAudio.ended) {
    clickAudio.currentTime = 0;
  }
  clickAudio.play();
};
