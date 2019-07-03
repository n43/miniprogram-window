let miniprogramWindow = {};

module.exports.initWindow = function(defaultAttrs) {
  miniprogramWindow.defaultAttrs = defaultAttrs;
  miniprogramWindow.mountedInstances = {};
};

module.exports.getShareContent = function(context) {
  const webviewId = context.__wxWebviewId__;
  const { mountedInstances, defaultAttrs } = miniprogramWindow;
  const mountedList = mountedInstances[webviewId];

  return (
    mountedList[mountedList.length - 1].data.shareContent ||
    defaultAttrs.shareContent
  );
};

module.exports.miniprogramWindow = miniprogramWindow;
