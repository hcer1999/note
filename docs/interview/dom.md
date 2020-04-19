# DOM 篇
目录
[[toc]]
## 一. 事件模型

> `W3C`中定义事件的发生经历三个阶段：捕获阶段（`capturing`）、目标阶段（`targetin`）、冒泡阶段（`bubbling`）

- 冒泡型事件：当你使用事件冒泡时，子级元素先触发，父级元素后触发
- 捕获型事件：当你使用事件捕获时，父级元素先触发，子级元素后触发
- DOM 事件流：同时支持两种事件模型：捕获型和冒泡型
- 阻止冒泡：在高级浏览器中，使用 `stopPropagation()`方法；在 `IE` 浏览器中使用 `cancelBubel = true`
- 阻止捕获：阻止事件的默认行为，例如 `a` 标签的 `click` 事件，在高级浏览器中使用 `preventDefault()`方法，在 IE 浏览器中设置 `window.event.returnValue = false`

## 二. 用 mouse 事件写一个可拖曳的 div

- 给需要拖拽的节点绑定`mousedown`, `mousemove`, `mouseup`事件
- `mousedown`事件触发后，开始拖拽
- `mousemove`时，需要通过`event.clientX`和`clientY`获取拖拽位置，并实时更新位置
- `mouseup`时，拖拽结束
- 需要注意浏览器边界的情况