# CSS 篇

## 一. 两种盒模型分别说一下。

- W3C 盒子模型(标准盒模型)
- IE 盒子模型(怪异盒模型)

盒模型都是由内容(`content`)、填充(`padding`)、边界(`margin`)、 边框(`border`)组成。他们的区别就是怪异盒模型把`margin`和`padding`计算在`content`之内

## 二. 如何水平居中？

- 元素为行内元素，设置父元素 `text-align` 为 `center`
- 如果元素宽度固定，可以设置左右 `margin` 为 `auto`;
- 如果元素为绝对定位，设置父元素 `position` 为 `relative`，元素设 `left:0`;`right:0`;`margin:auto`;
- 使用 `flex-box` 布局，指定 `justify-content` 属性为 `center`
- `display` 设置为 `tabel-ceil`

## 三. 如何垂直居中？

- 将显示方式设置为表格，`display`:`table-cell`,同时设置` vertial-align``：middle `
- 使用`flex`布局，设置为`align-item：center`
- 绝对定位中设置 `bottom:0`,`top:0`,并设置 `margin:auto`
- 绝对定位中固定高度时设置 `top:50%`，`margin-top` 值为高度一半的负值
- 文本垂直居中设置 `line-height` 为 `height` 值

## 四. flex 怎么用，常用属性有哪些？

`flex` 主要用于一维布局,`flex` 容器中存在两条轴， 横轴和纵轴， 容器中的每个单元称为 `flexitem`。

::: tip 注意
注意：当设置 `flex` 布局之后，子元素的 float、clear、vertical-align 的属性将会失效。
:::

**flex 容器有以下属性：**

- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

**flex 的子元素有以下属性：**

- order
- flex-basis
- flex-grow
- flex-shrink
- flex
- align-self

## 五. link 与@import 的区别

- `link`是`HTML`方式， `@import`是`CSS`方式
- `link`最大限度支持并行下载，`@import`过多嵌套导致串行下载，出现 FOUC(文档样式短暂失效)
- `link`可以通过`rel="alternate stylesheet"`指定候选样式
- 浏览器对`link`支持早于`@import`，可以使用`@import`对老浏览器隐藏样式
- `@import`必须在样式规则之前，可以在`css`文件中引用其他文件
- 总体来说：`link`优于`@import`

## 六. display 有哪些值？说明他们的作用

**display：** `none` | `inline` | `block` | `list-item` | `inline-block` | `table` | `inline-table` | `table-caption` | `table-cell` | `table-row` | `table-row-group` | `table-column` | `table-column-group` | `table-footer-group` | `table-header-group` | `run-in` | `box` | `inline-box` | `flexbox` | `inline-flexbox` | `flex` | `inline-flex`

::: details 展开作用详情

- none： 隐藏对象。与 visibility 属性的 hidden 值不同，其不为被隐藏的对象保留其物理空间
- inline： 指定对象为内联元素。
- block： 指定对象为块元素。
- list-item： 指定对象为列表项目。
- inline-block： 指定对象为内联块元素。（CSS2）
- table： 指定对象作为块元素级的表格。类同于 html 标签 table（CSS2）
- inline-table： 指定对象作为内联元素级的表格。类同于 html 标签 table（CSS2）
- table-caption： 指定对象作为表格标题。类同于 html 标签 caption（CSS2）
- table-cell： 指定对象作为表格单元格。类同于 html 标签 td（CSS2）
- table-row： 指定对象作为表格行。类同于 html 标签 tr（CSS2）
- table-row-group： 指定对象作为表格行组。类同于 html 标签 tbody（CSS2）
- table-column： 指定对象作为表格列。类同于 html 标签 col（CSS2）
- table-column-group： 指定对象作为表格列组显示。类同于 html 标签 colgroup（CSS2）
- table-header-group： 指定对象作为表格标题组。类同于 html 标签 thead（CSS2）
- table-footer-group： 指定对象作为表格脚注组。类同于 html 标签 tfoot（CSS2）
- run-in： 根据上下文决定对象是内联对象还是块级对象。（CSS3）
- box： 将对象作为弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）
- inline-box： 将对象作为内联块级弹性伸缩盒显示。（伸缩盒最老版本）（CSS3）
- flexbox： 将对象作为弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）
- inline-flexbox： 将对象作为内联块级弹性伸缩盒显示。（伸缩盒过渡版本）（CSS3）
- flex： 将对象作为弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）
- inline-flex： 将对象作为内联块级弹性伸缩盒显示。（伸缩盒最新版本）（CSS3）

:::

## 七. BFC 是什么？

BFC（Block Formatting Context）块级格式化上下文，是 Web 页面中盒模型布局的 CSS 渲染模式，指一个独立的渲染区域或者说是一个隔离的独立容器。

形成 `BFC` 的条件：

- 浮动元素，`float` 除 `none`以外的值
- 定位元素，`position`（`absolute`，`fixed`）
- `display` 为以下其中之一的值 `inline-block`，`table-cell`，`table-caption`
- `overflow` 除了 `visible` 以外的值（`hidden`，`auto`，`scroll`）

BFC 的特性：

- 内部的 Box 会在垂直反向上一个接一个的放位置
- 垂直方向上的距离有`margin` 距离
- `BFC` 的区域不会与 `float` 的元素区域重叠
- 计算 `BFC` 的高度时，浮动元素也参与计算
- `BFC` 就是页面上的独立容器，容器里面的子元素不会影响外面元素

## 八. CSS 选择器优先级

!important > 行内样式 > ID 选择器 > 类名选择器 = 属性选择器 = 伪类选择器 > 标签选择器

::: tip 注意
如果权重值一样，则按照样式规则的先后顺序来应用，顺序靠后的覆盖靠前的规则
:::

## 九. 说一下清除浮动的几种方式

清除浮动的核心是`clear:both`;

1. 使用额外标签法（不推荐使用）

   在浮动的盒子下面再放一个标签，使用 `clear:both`;来清除浮动

2. 使用 `overflow` 清除浮动（不推荐使用）

   先找到浮动盒子的父元素，给父元素添加一个属性：`overflow:hidden`;就会清除子元素对页面的影响

3. 使用伪元素清除浮动(用的最多)

   ```css
   .clearfix:after {
     content: '';
     height: 0;
     line-height: 0;
     display: block;
     clear: both;
     visibility: hidden; /*将元素隐藏起来
      在页面的 clearfix 元素后面添加了一个空的块级元素
     （这个元素的高为 0 行高也为 0   并且这个元素清除了浮动）*/
   }
   .clearfix {
     zoom: 1; /*为了兼容 IE6*/
   }
   ```
