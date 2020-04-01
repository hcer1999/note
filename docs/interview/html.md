# HTML 篇

## 一. 你是如何理解 HTML 语义化的？

- 用正确的标签做正确的事情！
- `HTML`语义化就是让页面的内容结构化，便于让浏览器、搜索引擎解析
- 在没有`CSS`样式的情况下也以一种文档格式显示，并且使人容易阅读
- 搜索引擎的爬虫依赖于标记来确定上下文和各个关键字的权重利于`SEO`
- 使阅读带代码的人对网站更容易将网站结构分块，便于阅读维护理解

## 二. meta viewport 是做什么用的，怎么写？

一个常用的针对移动端网页优化页面的一个 `meta` 标签的属性，常用的属性如下：

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```

- `width`：控制 viewport 的大小，可以指定一个值，或者为 `device-width`，则设置为设备的宽度
- `height`：和 `widht` 对应，即指定高度
- `initial-scale`：初始缩放比例，即页面第一次加载时显示的缩放比例
- `maximum-scale`：允许用户缩放的最大比例
- `minimum-scale`：允许用户缩放的最小比例
- `user-scalable`：用户是否可以手动缩放

## 三. HTML5 有哪些新特性？

`HTML5` 现在已经不是 `SGML` 的子集，主要是关于图像，位置，存储，多任务等功能的增加

- 新特性

  - 绘画 `canvas`

  - 用于媒介回放的 `video` 和 `audio` 元素

  - 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失

  - `sessionStorage` 的数据在浏览器关闭后自动删除

  - 语意化更好的内容元素，比如 `article`、`footer`、`header`、`nav`、`section`

  - 表单控件，`calendar`、`date`、`time`、`email`、`url`、`search`

  - 新的技术`webworker`、 `websocket`、 `Geolocation`

- 移除的元素

  - 纯表现的元素：`basefont`、`big`、`center`、`font`、 `s`、`strike`、`tt`、`u`

  - 对可用性产生负面影响的元素：`frame`、`frameset`、`noframes`
