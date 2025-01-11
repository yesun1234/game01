let clickAudio = new Audio(`../common/sound/click.mp3`);
let dragDropAudio = new Audio(`../common/sound/drag_drop.mp3`);
let correctAudio = new Audio(`../common/sound/correct.mp3`);
let incorrectAudio = new Audio(`../common/sound/incorrect.mp3`);

var AudioPlayer = {
  audioObj: null,
  bgmObj: null,

  playEffect: function (_audio) {
    _audio.pause();
    _audio.currentTime = 0;
    _audio.play();
  },
  clickSet: function (_target) {
    qs("#container .btn").click(function () {
      if ($(this).hasClass("dpa")) {
        return;
      }
      AudioPlayer.playEffect(clickAudio);
    });

    if (_target) {
      qs(_target).click(function () {
        AudioPlayer.playEffect(clickAudio);
      });
    }
  },
  click: function () {
    AudioPlayer.playEffect(clickAudio);
  },
  dragDrop: function () {
    AudioPlayer.playEffect(dragDropAudio);
  },
  // 정오답 사운드
  answer: function (_answer) {
    if (_answer) {
      AudioPlayer.playEffect(correctAudio);
    } else {
      AudioPlayer.playEffect(incorrectAudio);
    }
  },
  play: function (_src, _callback) {
    audioObj = new Audio(_src);
    audioObj.play();
    audioObj.addEventListener("ended", function () {
      if (_callback != null) {
        _callback();
      }
    });
  },

  stop: function () {
    try {
      audioObj.pause();
    } catch (error) {}
  },

  playBgm: function (_bgmPath) {
    bgmObj = new Audio(_bgmPath);
    bgmObj.play();
    bgmObj.addEventListener("ended", function () {
      bgmObj.pause();
      bgmObj.currentTime = 0;
      bgmObj.play();
    });
  },

  pauseBgm: function () {
    if (bgmObj != null) {
      bgmObj.pause();
    }
  },

  resumeBgm: function () {
    if (bgmObj != null) {
      bgmObj.play();
    }
  },

  stopBgm: function () {
    if (bgmObj != null) {
      bgmObj.pause();
      bgmObj.currentTime = 0;
    }
  },
};
