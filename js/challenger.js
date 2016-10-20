let setting = {
  autoPlay: true,
  interval: 500,
};
const shake = (obj) => {
  const interval = 100;
  const distance = 10;
  const times = 4;

  $(obj).css('position','relative');

  for (let iter = 0 ; iter < (times + 1) ; iter++) {
    $(obj).animate({
      left:((iter % 2 == 0 ? distance : distance * -1))
    }, interval);
  }

  $(obj).animate({ left: 0},interval);
}

const findTarget = () => {
  const spans = $('div#box > span');
  let target = {};

  $.each(spans, (index, span) => {
    var bgc = $(span).css('backgroundColor');
    if (!target[bgc]) {
      target[bgc] = [];
    }
    target[bgc].push(span);
  });

  Object.keys(target).forEach((key) => {
    if (target[key].length === 1) {
      const span = target[key][0];
      if (setting.autoPlay) {
        setTimeout(() => {
          $(span).trigger('click');
        }, setting.interval);
      } else {
        shake(span);
      }
    }
  });
}

$(document).ready(() => {
  chrome.storage.sync.get({
    setting: []
  }, (items) => {
    Object.assign(setting, items.setting);

    $('button.play-btn').on('click', findTarget);

    $('div#box').on('click', () => {
      setTimeout(findTarget, 50);
    });
  });
});