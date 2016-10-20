const getSettingInfo = () => {
  return {
    autoPlay: $('#autoPlay').is(":checked"),
    interval: $('#interval').val(),
  };
}

const restoreOptions = () => {
  chrome.storage.sync.get({
    setting: []
  }, (items) => {
    const setting = Object.assign({ autoPlay: false, interval: 500}, items.setting);

    $('#autoPlay').prop('checked', setting.autoPlay);
    $('#interval').val(setting.interval);
  });
}

const saveOptions = () => {
  chrome.storage.sync.set({
    setting: getSettingInfo()
  }, () => {
    window.close();
  });
}

$(document).ready(() => {
  restoreOptions();

  $('#save').click(saveOptions);
});