# miniprogram-window
A wechat miniprogram component which aims to set window options in pages 

## Installation
```
npm install --save miniprogram-window
```
## Usage
app.js
```
App(
   WINDOW_DEFAULT: {
      title: '默认页面标题',
      backgroundColor: { backgroundColor: '#ffffff' },
      navigationBarColor: {
        frontColor: '#000000',
        backgroundColor: '#ffffff',
      },
      backgroundTextStyle: 'dark',
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
index.wxml
```
<window title="首页" navigationBarColor="#e0b790 #ffffff" backgroundColor="#e0b790 #e0b790 #fafafa" backgroundTextStyle="light" />
```

## Properties
所有属性均为非必填项，不填写时将使用WINDOW_DEFAULT指定的默认值
#### title
设置当前页面的标题

#### navigationBarColor
设置页面导航条颜色
格式 | 设置项 | tips

---|---|---

#e0b790 | backgroundColor

#e0b790 #ffffff | backgroundColor frontColor | frontColor仅支持 #ffffff 和 #000000

#### backgroundColor
设置窗口的背景色
格式 | 设置项

---|---

#e0b790 | backgroundColor
#e0b790 #e0b790 | backgroundColor backgroundColorTop
#e0b790 #e0b790 #fafafa | backgroundColor backgroundColorTop backgroundColorBottom

#### backgroundTextStyle
动态设置下拉背景字体、loading 图的样式
仅支持light或dark
