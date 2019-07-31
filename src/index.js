const { miniprogramWindow } = require("./provider");

Component({
  properties: {
    title: {
      type: String,
      value: "",
      observer: "propChange"
    },
    navigationBarColor: {
      type: String,
      value: "",
      observer: "propChange"
    },
    backgroundColor: {
      type: String,
      value: "",
      observer: "propChange"
    },
    backgroundTextStyle: {
      type: String,
      value: "",
      observer: "propChange"
    },
    shareContent: {
      type: null,
      value: null
    }
  },
  lifetimes: {
    created() {
      this.emitChange = () => {
        const defAttrs = miniprogramWindow.defaultAttrs;
        const attrs = this.getMountedAttrs();
        let navigationBarOptions = {};
        let backgroundColorOptions = {};
        let backgroundTextStyle = "";

        if (attrs.navigationBarColor) {
          let { navigationBarColor } = attrs;
          navigationBarColor = navigationBarColor.split(" ");
          let [backgroundColor, frontColor] = navigationBarColor;

          navigationBarOptions.backgroundColor = backgroundColor;

          if (frontColor === "#ffffff" || frontColor === "#000000") {
            navigationBarOptions.frontColor = frontColor;
          }
        }

        if (attrs.backgroundColor) {
          let { backgroundColor } = attrs;
          backgroundColor = backgroundColor.split(" ");
          const [
            normalBackgroundColor,
            backgroundColorTop,
            backgroundColorBottom
          ] = backgroundColor;

          backgroundColorOptions.backgroundColor = normalBackgroundColor;

          if (backgroundColorTop) {
            backgroundColorOptions.backgroundColorTop = backgroundColorTop;
          }

          if (backgroundColorBottom) {
            backgroundColorOptions.backgroundColorBottom = backgroundColorBottom;
          }
        }

        if (
          attrs.backgroundTextStyle === "dark" ||
          attrs.backgroundTextStyle === "light"
        ) {
          backgroundTextStyle = attrs.backgroundTextStyle;
        }

        wx.setNavigationBarTitle({ title: attrs.title || defAttrs.title });
        wx.setNavigationBarColor({
          ...defAttrs.navigationBarColor,
          ...navigationBarOptions,
          animation: { duration: 0 }
        });
        wx.setBackgroundColor({
          ...defAttrs.backgroundColor,
          ...backgroundColorOptions
        });
        wx.setBackgroundTextStyle({
          textStyle: backgroundTextStyle || defAttrs.backgroundTextStyle
        });
      };

      this.getMountedAttrs = () => {
        const webviewId = this.__wxWebviewId__;
        const mountedInstances = miniprogramWindow.mountedInstances;
        const mountedList = mountedInstances[webviewId];
        let attrs = {};

        if (!mountedList) {
          return attrs;
        }

        for (let idx = mountedList.length - 1; idx >= 0; idx--) {
          const instance = mountedList[idx];
          let completed = true;
          if (attrs.title === undefined) {
            if (instance.data.title !== "") {
              attrs.title = instance.data.title;
            }
            completed = false;
          }
          if (attrs.navigationBarColor === undefined) {
            if (instance.data.navigationBarColor !== "") {
              attrs.navigationBarColor = instance.data.navigationBarColor;
            }
            completed = false;
          }
          if (attrs.backgroundColor === undefined) {
            if (instance.data.backgroundColor !== "") {
              attrs.backgroundColor = instance.data.backgroundColor;
            }
            completed = false;
          }
          if (attrs.backgroundTextStyle === undefined) {
            if (instance.data.backgroundTextStyle !== "") {
              attrs.backgroundTextStyle = instance.data.backgroundTextStyle;
            }
            completed = false;
          }

          if (completed) {
            return attrs;
          }
        }

        return attrs;
      };
    },

    attached() {
      const webviewId = this.__wxWebviewId__;
      const mountedInstances = miniprogramWindow.mountedInstances;

      if (!mountedInstances[webviewId]) {
        mountedInstances[webviewId] = [];
      }

      mountedInstances[webviewId].push(this);
    },

    ready() {
      this.componentReady = true;
      this.emitChange();
    },

    detached() {
      const webviewId = this.__wxWebviewId__;
      const mountedInstances = miniprogramWindow.mountedInstances;
      const mountedList = mountedInstances[webviewId];

      mountedList.splice(mountedList.indexOf(this), 1);

      if (mountedList.length === 0) {
        mountedInstances[webviewId] = undefined;
        delete mountedInstances[webviewId];
      }

      if (this.componentReady) {
        setTimeout(() => {
          const pages = getCurrentPages();
          const topPageRoute = pages[pages.length - 1];

          if (topPageRoute && topPageRoute.__wxWebviewId__ === webviewId) {
            this.emitChange();
          }
        }, 0);
      }

      this.componentReady = false;
    }
  },
  methods: {
    propChange() {
      if (this.componentReady) {
        this.emitChange();
      }
    }
  }
});
