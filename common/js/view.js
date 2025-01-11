'use strict';

COMMONLIBRARY.createNs('view');

COMMONLIBRARY.view = (function () {
  return {
    scaleValueX: 1,
    scaleValueY: 1,
    scale: 1,

    setScale: function () {
      var windowW = document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth;
      var windowH = document.body.clientHeight || window.innerHeight || document.documentElement.clientHeight;

      if (Math.floor(window.visualViewport.height) < windowH) {
        if (qs('#wrap').attr('data-view') !== 'false') {
          windowW = window.visualViewport.width;
          windowH = window.visualViewport.height;
        }
      }

      // var wrapEl = document.getElementById("wrap");
      var wrapEl = $(SHADOW_WRAP).find('#wrap')[0];
      var _scaleValueX = windowW / wrapEl.clientWidth;
      var _scaleValueY = windowH / wrapEl.clientHeight;
      var _scale = _scaleValueX < _scaleValueY ? _scaleValueX : _scaleValueY;

      this.scaleValueX = _scaleValueX;
      this.scaleValueY = _scaleValueY;
      this.scale = _scale;

      var transform = 'transform: scale(' + _scale + ',' + _scale + ');' + '-ms-transform: scale(' + _scale + ',' + _scale + ');' + '-webkit-transform: scale(' + _scale + ',' + _scale + ');';

      // 가로모드
      if (windowW < windowH) {
        wrapEl.classList.add('block');
        openPop('mode');
        console.log('가로 모드 지원 안함');
      } else {
        wrapEl.classList.remove('block');
        closePop('mode');
      }

      //wrapEl setScale
      var left = windowW / 2 - (wrapEl.clientWidth / 2) * _scale + 'px';
      var top = windowH / 2 - (wrapEl.clientHeight / 2) * _scale + 'px';
      wrapEl.setAttribute('style', transform + 'transform-origin: 0% 0%; -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%;' + 'left:' + left + ';' + 'top:' + top);
    },
  };
})();
