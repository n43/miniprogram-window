let miniprogramWindow = {};

module.exports.initWindow = function(defaultAttrs, options) {
  miniprogramWindow.defaultAttrs = defaultAttrs;
  miniprogramWindow.options = options;
  miniprogramWindow.mountedInstances = {};
};

module.exports.getShareContent = function(context) {
  const webviewId = context.__wxWebviewId__;
  const { mountedInstances, options } = miniprogramWindow;
  const { shareContentGetter } = options;
  const mountedList = mountedInstances[webviewId];

  const latestShareContent =
    mountedList[mountedList.length - 1].data.shareContent || null;

  if (shareContentGetter) {
    return shareContentGetter(latestShareContent);
  }

  return latestShareContent;
};

module.exports.miniprogramWindow = miniprogramWindow;
