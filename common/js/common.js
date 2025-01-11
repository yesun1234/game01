'use strict';

var SHADOW_ROOT;
try {
  SHADOW_ROOT = document.querySelector('remote-html-embed').shadowRoot;
} catch (error) {
  SHADOW_ROOT = document.querySelector('your-component').shadowRoot;
}

var SHADOW_WRAP = SHADOW_ROOT.getElementById('classStyudyContent');

function initCommonScrit() {
  var view = COMMONLIBRARY.view;
  view.setScale();
  // 이미지 뷰어 시작 화면
  if (qs('#imgViewer').length > 0) {
    imgViewerGuide();
  }
}

window.addEventListener('resize', COMMONLIBRARY.view.setScale);

$(document).ready(function () {
  /**
   * header - 너비 맞춤
   */
  qs('.header .btn.wide').click(function () {
    qs(this).toggleClass('full');
  });
  /**
   * header - QR 목록
   */
  qs('.header .btn.qrlist').click(function () {
    qs('#qrList').addClass('show');

    qs('#qrList .close').click(function () {
      qs('#qrList').removeClass('show');
    });
  });

  qs('#qrList .menu > div').click(function () {
    const target = $(this).parents('.menu');
    if (target.hasClass('show')) {
      target.removeClass('show');
    } else {
      qs('#qrList .menu').removeClass('show');
      target.addClass('show');
    }
  });

  /**
   * header - 그리기&쓰기
   */

  function drawInit() {
    qs('.header .btn.drawing').removeClass('on');
    qs('#drawing').removeClass('show');
    qs('.tool_style').removeClass('on');
  }
  qs('.header .btn.drawing').click(function () {
    if ($(this).hasClass('on')) {
      drawInit();
    } else {
      $(this).addClass('on');
      qs('#drawing').addClass('show');
    }
  });

  qs('#drawing .tool').click(function () {
    qs('#drawing .panels').removeClass('hide');
    if (!$(this).hasClass('on')) {
      qs('#drawing .tool').removeClass('on');
      $(this).addClass('on');
      qs('.tool_style').removeClass('on');
    }
  });

  qs('#drawing .tool_style .color').click(function () {
    $(this).parents('.tool_style').toggleClass('on');
  });

  $(SHADOW_WRAP).click(function (e) {
    if (qs('#drawing').hasClass('show')) {
      if ($(e.target).parents('#container').length > 0) {
        qs('#drawing .panels').addClass('hide');
        qs('.tool_style').removeClass('on');
      }
    }
  });

  qs(".ui_pop[data-pop='drawDelete'] .btn.cancel").click(function () {
    // qs("#drawing .tool.delete").removeClass("on");
    closePop('drawDelete');
  });

  qs('.header .btn_group > .btn').click(function () {
    if (!$(this).hasClass('drawing') && $('.header .btn.drawing').hasClass('on')) {
      drawInit();
    }
  });

  /**
   * 음성, 영상 뷰어 공통
   */

  // 재생 속도
  qs('.media_viewer .speed_list .value').click(function () {
    qs('.speed_list > ul').toggleClass('show');

    qs('.speed_list > ul > li').click(function () {
      var speed = $(this).attr('data-speed');
      qs('.speed_list > ul').removeClass('show');
      qs('.speed_list > ul > li').removeClass('on');
      qs('.speed_list .value > span').text(speed);
      $(this).addClass('on');
    });
  });

  // 재생/일시정지 버튼
  qs('.media_viewer .controls button.btn.play').click(function () {
    $(this).toggleClass('pause');
  });

  /**
   * 음성 뷰어
   */

  // 자막 크기
  qs('#audioViewer .subtitle_option .btn').click(function () {
    qs('.subtitle_option .btn').removeClass('on');
    $(this).addClass('on');
    let fontSize = $(this).attr('data-size');
    qs('#audioViewer .viewer_ct').attr('data-size', fontSize);
  });

  /**
   * 영상 뷰어
   */
  // 사운드
  qs('#videoViewer .sound_bar > i').click(function () {
    $(this).parents('.sound_bar').toggleClass('mute');
  });
  // 구간 재생
  qs('#videoViewer .script_option .btn.section').click(function () {
    var mode = $(this).attr('data-mode');
    switch (mode) {
      case 'off':
        // 구간 재생 시작
        $(this).addClass('on');
        $(this).attr('data-mode', 'start');
        qs('#videoViewer .seek_bar').addClass('sec_play');
        qs('#videoViewer .seek_bar .progress').addClass('start');
        break;

      case 'start':
        // 구간 재생 종료
        $(this).attr('data-mode', 'end');
        qs('#videoViewer .seek_bar .progress').addClass('end');
        break;

      case 'end':
        // 구간 재생 해제
        $(this).removeClass('on');
        $(this).attr('data-mode', 'off');
        qs('#videoViewer .seek_bar').removeClass('sec_play');
        qs('#videoViewer .seek_bar .progress').removeClass('start end');
        break;
    }
  });
  // 자막
  qs('#videoViewer .script_option .btn.script').click(function () {
    if ($(this).hasClass('on')) {
      // 자막 숨김
      $(this).removeClass('on');
      qs('.video  .script_area').removeClass('on');
      qs('.lang_mode .part').removeClass('show');
    } else {
      // 자막 보임
      $(this).addClass('on');
      qs('.video .script_area').addClass('on');
      qs('.lang_mode .part').addClass('show');
    }

    // 자막 선택 시
    qs('.lang_mode .part .p').click(function () {
      var mode = $(this).attr('data-mode');
      qs('.lang_mode .part .p').removeClass('on');
      $(this).addClass('on');
      qs('.lang_mode .part').removeClass('show');
      qs('.video .script_area').attr('data-mode', mode);
    });
  });
});
