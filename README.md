# miniprogram-window

A page window options manager for Wechat Miniprogram

## Installation

```
npm install --save miniprogram-window
```

## Usage

app.js

```
const { initWindow } = require('miniprogram-window/provider');
App(
    onLaunch() {
      initWindow({
        title: '默认标题',
        backgroundColor: { backgroundColor: '#ffffff' },
        navigationBarColor: {
          frontColor: '#000000',
          backgroundColor: '#ffffff',
        },
        backgroundTextStyle: 'dark',
        shareContent: {
          title: '分享默认标题',
          imageUrl: '分享默认图片',
          path: '分享默认路径',
        },
      });
    },
)
```

index.json

```
{
  "enablePullDownRefresh": true,
  "usingComponents": {
    "window": "miniprogram-window",
  }
}
```

index.js

```
const { getShareContent } = require('miniprogram-window/provider');

Page({
  data:{
    shareContent:{
      title: "首页“
    }
  },
  onShareAppMessage() {
    return getShareContent(this);
  }
})
```

index.wxml

```
<window title="首页" navigationBarColor="#e0b790 #ffffff" backgroundColor="#e0b790 #e0b790 #fafafa" backgroundTextStyle="light" shareContent="{{shareContent}}"/>
```

## Properties

所有属性均为非必填项，不填写时将使用 WINDOW_DEFAULT 指定的默认值

### title

设置当前页面的标题

### navigationBarColor

设置页面导航条颜色

| 格式              | 设置项                     | tips                                 |
| ----------------- | -------------------------- | ------------------------------------ |
| "#e0b790"         | backgroundColor            |
| "#e0b790 #ffffff" | backgroundColor frontColor | frontColor 仅支持 #ffffff 和 #000000 |

### backgroundColor

设置窗口的背景色

| 格式                      | 设置项                                                   |
| ------------------------- | -------------------------------------------------------- |
| "#e0b790"                 | backgroundColor                                          |
| "#e0b790 #e0b790"         | backgroundColor backgroundColorTop                       |
| "#e0b790 #e0b790 #fafafa" | backgroundColor backgroundColorTop backgroundColorBottom |

### backgroundTextStyle

动态设置下拉背景字体、loading 图的样式
仅支持 light 或 dark
