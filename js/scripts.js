'use strict';

let QUIZNUM = 1;
let idx = 1;
let isLocked = false;
let correctMatch = 0; 

$(document).ready(function () {
  soundSet();

  $(document).on('click', '.quiz .btn, .ui_pop .close, .btn', function (e) {
    if ($('#wrap').hasClass('finish') && !$(this).hasClass('reset_btn')) {
      e.preventDefault();
      return; 
    }
  });
  
  qs('.quiz_txt .quiz').click(function () {
    if (isLocked) return;  // 퀴즈가 완료되면 클릭 막기

    let $quiz = $(this).closest('.quiz');
    let dataNum = $(this).attr('data-num');
    let matchNum = parseInt($(this).attr('data-match'), 10); 
  
    $(this).addClass('on');
    $quiz.addClass('on');
    let $currentPwd;

    // incorrect 클릭 시
    if ($(this).hasClass('incorrect')) {
      $currentPwd = qs(`.pwd[data-num="${matchNum}"]`);
      $currentPwd.addClass('onx'); 
      qs('.ui_pop[data-pop="finish"]').removeClass('show'); 
      qs('.ui_pop[data-pop="tryAgain"]').addClass('show'); 
      qs('#wrap').addClass('finish');
      playSound('incorrect');  // incorrect.mp3 재생
      setTimeout(() => {
        qs('.ui_pop[data-pop="tryAgain"]').removeClass('show');
        qs('#wrap').removeClass('finish');
        qs('.quiz').removeClass('on');
        qs('.pwd').removeClass('on');
        qs('.pwd').removeClass('onx');
      }, 2000);
    } else {
      // correct 클릭 시
      $currentPwd = qs(`.pwd[data-num="${matchNum}"]`);
      $currentPwd.addClass('on'); 
      if ($(this).hasClass('correct')) {
        playSound('correct');  // correct.mp3 재생
        correctMatch++; 
      }
    }

    // 퀴즈가 모두 맞았을 때 완료 처리
    if (qs('.quiz.correct.on').length === qs('.quiz.correct').length) {
      qs('.ui_pop[data-pop="finish"]').addClass('show'); 
      qs('.ui_pop[data-pop="tryAgain"]').removeClass('show'); 
      playSound('complete');  // complete.mp3 재생
      qs('.reset_btn').addClass('on');
      qs('#container').addClass('finish');
      
      // quiz 클릭을 막기 위해 isLocked 설정
      isLocked = true;

      setTimeout(() => {
        qs('.ui_pop[data-pop="finish"]').removeClass('show');
      }, 2000);
    }
  
    // 미리 틀린 경우
    if (matchNum === correctMatch + 1 && $(this).hasClass('correct')) {
      playSound('correct');
      correctMatch++; 
    } else if ($(this).hasClass('incorrect')) {
      isLocked = true;
      playSound('incorrect');
      $currentPwd.addClass('incorrect');
      setTimeout(() => {
        isLocked = false;
      }, 1);
    }
  });

  qs('.btn.reset_btn').click(function () {
    clickSound();
    reset();
  });
});

// 버튼들을 비활성화하는 함수 (reset_btn 제외)
function disableButtons() {
  $('.quiz_txt .quiz').off('click');  // quiz 클릭 이벤트 제거
}

function playSound(type) {
  let audio;
  if (type === 'correct') {
    audio = new Audio('common/sound/correct.mp3');
  } else if (type === 'incorrect') {
    audio = new Audio('common/sound/incorrect.mp3');
  } else if (type === 'complete') {
    audio = new Audio('common/sound/complete.mp3');
  }
  audio.play();
}

function reset() {
  QUIZNUM = 1;
  correctMatch = 0; 
  idx = 1;
  isLocked = false;
  qs('#wrap').removeClass('finish');
  qs('.quiz').removeClass('on');
  qs('.pwd').removeClass('on');
  qs('.pwd').removeClass('onx');
  
  // reset 후 quiz 클릭을 다시 활성화
  $('.quiz_txt .quiz').on('click', function () {
    if (isLocked) return;

    let $quiz = $(this).closest('.quiz');
    let dataNum = $(this).attr('data-num');
    let matchNum = parseInt($(this).attr('data-match'), 10); 
  
    $(this).addClass('on');
    $quiz.addClass('on');
    let $currentPwd;

    if ($(this).hasClass('incorrect')) {
      $currentPwd = qs(`.pwd[data-num="${matchNum}"]`);
      $currentPwd.addClass('onx'); 
      qs('.ui_pop[data-pop="finish"]').removeClass('show'); 
      qs('.ui_pop[data-pop="tryAgain"]').addClass('show'); 
      qs('#wrap').addClass('finish');
      playSound('incorrect');
      setTimeout(() => {
        qs('.ui_pop[data-pop="tryAgain"]').removeClass('show');
        qs('#wrap').removeClass('finish');
        qs('.quiz').removeClass('on');
        qs('.pwd').removeClass('on');
        qs('.pwd').removeClass('onx');
      }, 2000);
    } else {
      $currentPwd = qs(`.pwd[data-num="${matchNum}"]`);
      $currentPwd.addClass('on'); 
      if ($(this).hasClass('correct')) {
        playSound('correct');
        correctMatch++; 
      }
    }

    if (qs('.quiz.correct.on').length === qs('.quiz.correct').length) {
      qs('.ui_pop[data-pop="finish"]').addClass('show'); 
      qs('.ui_pop[data-pop="tryAgain"]').removeClass('show'); 
      playSound('complete');
      qs('.reset_btn').addClass('on');
      qs('#container').addClass('finish');
      
      isLocked = true;

      setTimeout(() => {
        qs('.ui_pop[data-pop="finish"]').removeClass('show');
      }, 2000);
    }
  });
}
