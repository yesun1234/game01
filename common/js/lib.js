/**
 * 선택자
 */
function qs(el) {
  return $(SHADOW_WRAP).find(el);
}

/**
 * 팝업
 */
function openPop(name) {
  qs(`.ui_pop[data-pop="${name}"]`).addClass("show");
  qs(".header").addClass("block");

  qs(`.ui_pop[data-pop="${name}"] .close`).click(function () {
    closePop(name);
  });
}
function closePop(name) {
  qs(`.ui_pop[data-pop="${name}"]`).removeClass("show");
  qs(".header").removeClass("block");
}

/**
 * 이미지 뷰어 손가락 가이드
 */
function imgViewerGuide() {
  qs("#imgViewer .guide_zoom").addClass("show");
  qs("#imgViewer").addClass("block");
  setTimeout(() => {
    qs("#imgViewer .guide_zoom").removeClass("show");
    qs("#imgViewer").removeClass("block");
  }, 4500);
}
