const timer = 500;
const findTarget = () => {
  const spans = $('div#box > span');
  let target = {};
  $.each(spans, (index, span) => {
    var bgc = $(span).css('backgroundColor');
    if (!target[bgc]) {
      target[bgc] = [];
    }
    target[bgc].push(span)
  });

  Object.keys(target).forEach((key) => {
    if (target[key].length === 1) {
      $(target[key][0]).trigger('click');
      setTimeout(findTarget, timer);
    }
  });
}

$(document).ready(() => {
  const playBtn = $('button.play-btn');
  $(playBtn).on('click', findTarget)
});