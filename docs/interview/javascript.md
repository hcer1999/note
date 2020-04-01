# JS 篇

## 一. 谈谈你对 ES6 的理解？

- 模板字符串（为 JavaScript 提供了简单的字符串插值功能）

  方便我们在字符串中拼接变量等操作

  ```javascript
  //es5
  var name = 'lux'
  console.log('hello' + name)
  //es6
  const name = 'lux'
  console.log(`hello ${name}`) //hello lux
  ```

- 箭头函数

- for-of（用来遍历数据—例如数组中的值。）

- `arguments` 对象可被不定参数和默认参数完美代替。

- ES6 将 `Promise` 对象纳入规范，提供了原生的 `Promise` 对象。

- 增加了 `let` 和 `const` 命令，用来声明变量。

- 增加了块级作用域。

- `let` 命令实际上就增加了块级作用域。

- 还有就是引入 `module` 模块的概念

## 二. 关于箭头函数

- 箭头函数有几个使用注意点。

  1. 函数体内的 `this` 对象，就是定义时所在的对象，而不是使用时所在的对象。
  2. 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误。
  3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替。
  4. 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数。

  ::: warning 注意
  es5 中 function 的 this 对象的指向是可变的，但是在箭头函数中，它是固定的
  :::

  ```javascript
  function foo() {
    setTimeout(() => {
      console.log('id:', this.id)
    }, 100)
  }
  
  var id = 21
  
  foo.call({ id: 42 })
  // id: 42
  ```

## 三. for-of 有什么特点

    for-of 可以遍历除对象以外的所有类型数据，包括字符串，数组，`nodelist` 等。

## 四. 对 Promise 的理解

`Promise` 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件监听——更合理和更强大，防止了`回调地狱`的出现

所谓 `Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，`Promise` 是一个对象，从它可以获取异步操作的消息。`Promise` 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

`Promise` 对象有以下两个特点:

1. 对象的状态不受外界影响，`Promise` 对象代表一个异步操作，有三种状态：`Pending`（进行中）、`Resolved`（已完成，又称 `Fulfilled`）和 `Rejected`（已失败）

2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

::: warning 注意
不要把异步操作和异步请求搞混，请求指的是 HTTP 请求。
:::

## 五. Promise、Promise.all、Promise.race 分别怎么用？

- Promise

  `Promise` 的回调中有两个参数。`resolve` 和 `reject`，我们在判断请求成功后调用 `resolve`，请求失败调用 `reject`

  ```javascript
  let p = new Promise((resolve, reject) => {
    if (true) {
      resolve('成功了')
    } else {
      reject('失败了')
    }
  })
  ```

- Promise.all

  `Promise.all`可以将多个`Promise`实例包装成一个新的`Promise`实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，而失败的时候则返回最先被`reject`失败状态的值。**只要有一个请求失败了，那么就返回失败的`reject`**

  ```javascript
  let p1 = new Promise((resolve, reject) => {
    resolve('成功了')
  })
  
  let p2 = new Promise((resolve, reject) => {
    resolve('success')
  })
  
  let p3 = Promse.reject('失败')
  Promise.all([p1, p3, p2])
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error) // 失败了，打出 '失败'
    })
  ```

- Promise.race

  顾名思义，`Promse.race`就是赛跑的意思，意思就是说，`Promise.race([p1, p2, p3])`里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。

  ```javascript
  let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success')
    }, 1000)
  })
  
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('failed')
    }, 500)
  })
  
  Promise.race([p1, p2])
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error) // 打开的是 'failed'
    })
  ```

## 六. 说说函数防抖和函数节流

**防抖**

即如果瞬间触发多次一个函数，我们只响应最后一次触发。效果类似搜索引擎的搜索联想功能，如果一次性输入很多文本，我们只需要响应最后一次输入即可。

实现：

- 开始一个定时器，只要我定时器还在，不管你怎么点击都不会执行回调函数。一旦定时器结束并设置为 `null`，就可以再次点击了
- 对于延时执行函数来说的实现：每次调用防抖动函数都会判断本次调用和之前的时间间隔，如果小于需要的时间间隔，就会重新创建一个定时器，并且定时器的延时为设定时间减去之前的时间间隔。一旦时间到了，就会执行相应的回调函数

::: details 查看实现代码

```js
// 使用 underscore 的源码来解释防抖动

/**
 * underscore 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，是否立即调用函数
 * @return {function}             返回客户调用函数
 */
_.debounce = function(func, wait, immediate) {
  var timeout, args, context, timestamp, result

  var later = function() {
    // 现在和上一次时间戳比较
    var last = _.now() - timestamp
    // 如果当前间隔时间少于设定时间且大于0就重新设置定时器
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      // 否则的话就是时间到了执行回调函数
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function() {
    context = this
    args = arguments
    // 获得时间戳
    timestamp = _.now()
    // 如果定时器不存在且立即执行函数
    var callNow = immediate && !timeout
    // 如果定时器不存在就创建一个
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      // 如果需要立即执行函数的话 通过 apply 执行
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}
```

:::

**节流**

防抖和节流本质是不一样的。防抖是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行

::: details 展开实现代码

```js
/**
 * underscore 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 *
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 * @param  {object}     options   如果想忽略开始函数的的调用，传入{leading: false}。
 *                                如果想忽略结尾函数的调用，传入{trailing: false}
 *                                两者不能共存，否则函数不能执行
 * @return {function}             返回客户调用函数
 */
_.throttle = function(func, wait, options) {
  var context, args, result
  var timeout = null
  // 之前的时间戳
  var previous = 0
  // 如果 options 没传则设为空对象
  if (!options) options = {}
  // 定时器回调函数
  var later = function() {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : _.now()
    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null
    result = func.apply(context, args)
    if (!timeout) context = args = null
  }
  return function() {
    // 获得当前时间戳
    var now = _.now()
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于0
    if (!previous && options.leading === false) previous = now
    // 计算剩余时间
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    // 如果当前调用已经大于上次调用时间 + wait
    // 或者用户手动调了时间
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了2秒
    // 但是他需要2.2秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}
```

:::

## 七. 说说原生 AJAX,有哪些优点和缺点。

- 原理

  通过 `XmlHttpRequest` 对象来向服务器发异步请求，从服务器获得数据，然后用 `javascript` 来操作 `DOM` 而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据

- 优点：

  - 通过异步模式，提升了用户体验.
  - 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.
  - `Ajax` 在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
  - `Ajax` 可以实现动态不刷新（局部刷新）

- 缺点：

  - 安全问题 `AJAX` 暴露了与服务器交互的细节。
  - 对搜索引擎的支持比较弱。
  - 不容易调试。

- 代码

  ```js
  /** 1. 创建连接 **/
  var xhr = null
  xhr = new XMLHttpRequest()
  /** 2. 连接服务器 **/
  xhr.open('get', url, true)
  /** 3. 发送请求 **/
  xhr.send(null)
  /** 4. 接受请求 **/
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        success(xhr.responseText)
      } else {
        /** false **/
        fail && fail(xhr.status)
      }
    }
  }
  ```

## 八. 如何解决跨域问题?

- 为什么会出现跨域？

  > 首先了解下浏览器的同源策略 同源策略 SOP（Same origin policy）是一种约定，由 Netscape 公司 1995 年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。所谓同源是指"**协议**+**域名**+**端口**"三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源

- 什么是 CORS?

  > CORS 是一个 W3C 标准，全称是"跨域资源共享"（Cross-origin resource sharing）。 它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求,从而克服了 AJAX 只能同源使用的限制。

**解决办法**

- jsonp

  - 原理

    因为`script`标签引入的文件不受跨域的限制，所以我们利用在页面中创建`script`节点的方法向不同域提交 HTTP 请求的方法称为 `jsonp`，这项技术可以解决跨域提交 `Ajax` 请求的问题。

  - 优点

    它不像 `XMLHttpRequest` 对象实现的 `Ajax` 请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要 `XMLHttpRequest` 或 `ActiveX` 的支持；并且在请求完毕后可以通过调用 `callback` 的方式回传结果。

  - 缺点

    它只支持 `GET` 请求而不支持 `POST` 等其它类型的 `HTTP` 请求；它只支持跨域 `HTTP` 请求这种情况，不能解决不同域的两个页面之间如何进行 `JavaScript` 调用的问题。

  - 代码

  ```js
  var script = document.createElement('script')
  script.type = 'text/javascript'
  
  // 传参并指定回调执行函数为onBack
  script.src = 'http://www.....:8080/login?user=admin&callback=onBack'
  document.head.appendChild(script)
  
  // 回调执行函数
  function onBack(res) {
    alert(JSON.stringify(res))
  }
  ```

* 反向代理

  `nginx` 服务内部配置 `Access-Control-Allow-Origin \*`

* iframe 标签

## 九. 闭包是什么？

- 闭包就是能够读取其他函数内部变量的函数
- 闭包是指有权访问另一个函数作用域中变量的一个函数，创建闭包最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量，利用闭包可以突破作用链域

**闭包的特性**

- 函数内再嵌套函数
- 内部函数可以引用外层函数的参数和变量
- 参数和变量不会被垃圾回收机制回收

**使用闭包的注意点**

- 由于闭包会使得函数中的变量都被保存在内存中，对内存的消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在 `IE` 中可能导致内存泄漏
- 解决办法是在退出函数之前，将不使用的局部变量全部删除

**说说你对闭包的理解**

- 使用闭包主要是为了设计私有的方法和变量，闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存的使用量，使用不当很容易造成内存泄漏。
- 闭包最大的用处有两个，一个是可以读取函数内部的变量，让这些变量始终保持在内存中。另一个用处就是封装对象的私有属性和私有方法

## 十. 立即执行函数是什么

简单来说就是

1. 声明一个匿名函数
2. 马上调用这个函数

```js
;(function() {
  alert('我是匿名函数')
})()
```

上面是一个典型的立即执行函数。

- 首先声明一个匿名函数 `function(){alert('我是匿名函数')}`。
- 然后在匿名函数后面接一对括号 ()，调用这个匿名函数。

**立即执行函数有什么用**

只有一个作用：创建一个独立的作用域。这个作用域里面的变量，外面访问不到（即避免`变量污染`）。

## 十. async/await 怎么用，如何捕获异常？

`async` 和 `await` 的作用就是将异步代码修饰成更易于编写和后续阅读。它们使异步代码看起来更像是旧式同步代码。

**使用方法**

```js
function getSomething() {
  return 'something'
}

async function testAsync() {
  return Promise.resolve('hello async')
}

async function test() {
  const v1 = await getSomething()
  const v2 = await testAsync()
  console.log(v1, v2)
}

test()
```

在函数的前面加上 `async` 关键字，在返回回来的数据前加上 `await` 关键字。我们即可拿到一个 `Promise` 对象，里面包含了返回回来的结果。

**捕获异常的方式**

1. 因为返回回来的数据是 `Promise` 对象，所以我们可以调用 `Promise` 的 `catch` 方法捕获异常
2. 也可以使用传统的 `try...catch` 来捕获异常

## 十一. 如何实现深拷贝？

**什么是深拷贝？**

`JS` 的引用类型数据在用=号复制给其他变量时，并不是像基本数据类型一样复制出一份，而是将这个变量的指针指向这个数据，即两个变量共用一个数据，当数据发生改变，则两个变量的值都会改变。

**怎么实现深拷贝**

有很多种方法，这里只列举几种

1. 使用循环

   使用循环遍历每个成员给新数组添加上对应的成员

   ```js
   function deepCopy(arr1, arr2) {
     for (var i = 0; i < arr1.length; ++i) {
       arr2[i] = arr1[i]
     }
   }
   ```

2. 使用ES6 扩展运算符

   ```js
   var arr = [1, 2, 3, 4, 5]
   var [...arr2] = arr
   arr[2] = 5
   console.log(arr) //[1,2,5,4,5]
   console.log(arr2) //[1,2,3,4,5]
   ```

3. 对象与 Json 相互转换

   即先把对象转化成 `json` 字符串，赋给其他变量的同时再转换成对象。但是这个方法如果成员属性值有 `undefined`、`function`、`symbol`，则会在转换过程中忽略

   ```js
   function deepClone(origin) {
     var clone = {}
     try {
       clone = JSON.parse(JSON.stringify(origin))
     } catch (e) {}
     return clone
   }
   ```

## 十二. 如何实现数组的去重

有以下几种方法：

1. **利用 ES6 Set 去重**
   ::: details 点击查看代码

   ```js
   function unique(arr) {
     return Array.from(new Set(arr))
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
   ```

   :::

2. **利用 for 嵌套 for，然后 splice 去重**

   双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。
   ::: details 点击查看代码

   ```js
   function unique(arr) {
     for (var i = 0; i < arr.length; i++) {
       for (var j = i + 1; j < arr.length; j++) {
         if (arr[i] == arr[j]) {
           //第一个等同于第二个，splice方法删除第二个
           arr.splice(j, 1)
           j--
         }
       }
     }
     return arr
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   //[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和{}没有去重，两个null直接消失了
   ```

   :::

3. **利用 indexOf 去重**

   新建一个空的结果数组，`for` 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则`push`进数组

   ::: details 点击查看代码

   ```js
   function unique(arr) {
     if (!Array.isArray(arr)) {
       console.log('type error!')
       return
     }
     var array = []
     for (var i = 0; i < arr.length; i++) {
       if (array.indexOf(arr[i]) === -1) {
         array.push(arr[i])
       }
     }
     return array
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   // [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
   ```

   :::

4. **利用 sort()**

   利用`sort()`排序方法，然后根据排序后的结果进行遍历及相邻元素比对
   ::: details 点击查看代码

   ```js
   function unique(arr) {
     if (!Array.isArray(arr)) {
       console.log('type error!')
       return
     }
     arr = arr.sort()
     var arrry = [arr[0]]
     for (var i = 1; i < arr.length; i++) {
       if (arr[i] !== arr[i - 1]) {
         arrry.push(arr[i])
       }
     }
     return arrry
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   // [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]      //NaN、{}没有去重
   ```

   :::

5. **利用 filter**
   ::: details 点击查看代码

   ```js
   function unique(arr) {
     return arr.filter(function(item, index, arr) {
       //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
       return arr.indexOf(item, 0) === index
     })
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   //[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
   ```

   :::

6. **利用递归去重**
   ::: details 点击查看代码

   ```js
   function unique(arr) {
     var array = arr
     var len = array.length
   
     array.sort(function(a, b) {
       //排序后更加方便去重
       return a - b
     })
   
     function loop(index) {
       if (index >= 1) {
         if (array[index] === array[index - 1]) {
           array.splice(index, 1)
         }
         loop(index - 1) //递归loop，然后数组去重
       }
     }
     loop(len - 1)
     return array
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
   ```

   :::

7. **利用 Map 数据结构去重**
   ::: details 点击查看代码

   ```js
   function arrayNonRepeatfy(arr) {
     let map = new Map()
     let array = new Array() // 数组用于返回结果
     for (let i = 0; i < arr.length; i++) {
       if (map.has(arr[i])) {
         // 如果有该key值
         map.set(arr[i], true)
       } else {
         map.set(arr[i], false) // 如果没有该key值
         array.push(arr[i])
       }
     }
     return array
   }
   var arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]
   console.log(unique(arr))
   //[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
   ```

   :::

十三. 请简单实现双向数据绑定

```html
<input id="input" />
```

```js
const data = {}
const input = document.getElementById('input')
Object.defineProperty(data, 'text', {
  set(value) {
    input.value = value
    this.value = value
  }
})
input.onChange = function(e) {
  data.text = e.target.value
}
```
