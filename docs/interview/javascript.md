# JS 篇

## 一. 谈谈你对 ES6 的理解？

ES6是JS发展史上最重要的一个版本之一，因为他发布了很多的新特性，新功能，使JS的功能更强大，语法更简洁，阅读更顺畅，他有以下几个重要特性。

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

## 十三. 如何判断一个对象是否为数组

1. 使用`instanceof`操作符
2. 使用`ECMAScript 5`中新增的`Array.isArray()`方法
3. 使用`Object.prototype` 上的原生`toString()`方法判断

## 十四. 什么是面向对象

面向对象是把构成问题失误分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为。

**面向对象和面向过程的异同：**

- **面向过程**就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。
- **面向对象**是把构成事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为。

## 十五. 你对松散类型的理解

`JavaScript`中的变量为松散类型，所谓松散类型就是指当一个变量被申明出来就可以保存任意类型的值，而不像`python`一样声明为int型就只能保存整型的数值，《JavaScript编程精解》中提到应该将变量理解为“触手”，他不保存值，而是抓取值，抓取那些保存在地址中的值。

## 十六. JS的严格模式和正常模式

JS的严格模式是在`ES5`版本中添加的，目前已支持大部分主流浏览器，包括`IE10`。需要开启严格模式，需要在代码最顶部输入`"use strict";`，也可以针对函数启用严格模式，将`"use strict";`放入函数体顶部即可。

作用：

- 消除`JavaScript`语法中的一些不合理、不严谨之处，减少一些怪异的行为
- 消除代码运行的一些不安全之处，保证代码运行的安全
- 提高编译器的效率，增加运行速度
- 为未来新版的`JavaScript`做好铺垫

表现：

- 严格模式下，`delete`运算符后跟随非法标识符(即delete不存在的标识符)，会抛出语法错误；非严格模式下，会静默失败并返回`false`
- 严格模式中，函数形参存在同名的，就会抛出错误
- 严格模式中变量必须先声明；直接给变量赋值，不会隐式创建全局变量，不能用with
- 严格模式中`call`和`apply` 传入`null`和`undefined` 会保持原样不被转换为`widow`

## 十七. JS 单线程还是多线程，如何显示异步操作

JS本身是单线程的，他是依靠浏览器完成的异步操作

具体步骤：

1. **主线程**执行`JS`中的所有代码
2. **主线程**在执行过程中发现了需要**异步**的任务后，将这个任务扔给浏览器(浏览器创建线程执行)，并且在`callback queque`中创建对应的回调函数(回调函数是一个对象，包含该函数是否执行完毕等)
3. **主线程**已经执行完毕所有**同步**的代码。开始监听`callback queuque`，一旦浏览器中某个线程任务完成，将会改变**回调函数**的状态。**主线程**查看某个函数的状态为已完成，就会执行该函数。

## 十八. JavaScript 数组的函数map/forEach/reduce/filter

1. map

   ```js
   //作用：对数组进行遍历
   //返回值：新的数组
   //是否改变原数组：否
   var arr = [2,5,3,4];
   var ret = arr.map(function(item) {
       return item + 1;
   });
   console.log(ret);// [3,6,5,4]
   console.log(arr);// [2,5,3,4]
   ```

2. forEach

   ```js
   //作用：遍历数组的每一项
   //返回值：undefined
   //是否改变原数组：否
   var arr = [2,5,3,4];
   var ret = arr.forEach(function(item) {
       console.log(item);
   });
   console.log(ret); // undefined
   console.log(arr); // [2,5,3,4]
   ```

3. reduce

   ```js
   //作用：对数组进行迭代，，然后两两进行操作，最后返回一个值
   //返回值：reduce出来的结果
   //是否改变原数组：否
   var arr = [1,2,3,4];
   var ret = arr.reduce(function(a, b) {
       return a * b;
   });
   console.log(ret); //24
   console.log(arr); //[1,2,3,4]
   ```

4. filter

   ```js
   //作用：筛选一部分元素
   //返回值：一个满足筛选条件的新数组
   //是否改变原数组：不会
   var arr = [2,5,3,4];
   var ret = arr.filter(function(item){
       return item > 3;
   });
   console.log(ret); // [5,4]
   console.log(arr); //[2,5,3,4]
   ```

## 十九. JS块级作用域、变量提升

1. 块级作用域

   `JS`中作用域有：全局作用域和函数作用域。在`ES6`以前，`JS`没有块级作用域的概念。在`ES6`中新增了块级作用域。块级作用域由`{}`包括，`if`语句和`for`语句的`{}`也属于块级作用域。

   ```js
   {
       var a = 1;
       console.log(a); // 1
   }
   console.log(a);
   //由于a是由var定义的，所以没有块级作用域的限制，所以也能正常访问
   //-------------------
   function fnc() {
       var b = 2;
       console.log(b);// 2
   }
   console.log(b)// 报错
   // 因为在函数内部定义的变量受到函数作用域的限制，函数外部无法访问到。
   //-------------------
   {
       var x = 1;
       let y = 2;
       const z = 3;
   }
   console.log(x); // 1
   // 因为x是由var定义的，所以不受块级作用域的限制
   consolo.log(y); // 报错 y is not defined
   // 因为y是由let 关键字定义的，所以受到块级作用域的影响，外部无法访问
   consolo.log(z); // 报错 z is not defined
   // 与y同理
   ```

拓展：

`var`、`let`、`const`的区别

- `var`定义的变量，没有块的概念，可以跨块访问，但是依然有函数作用域的限制
- `let`定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
- `const` 用来定义常亮，即**值**不会发生改变的量，使用时必须赋予初始值，只能在块作用域里访问，而且不能对常量的值进行修改。引用类型除外。
- 同一个变量只能使用一种方式声明，不然会报错

## 二十. null与undefined的区别

null： `Null`类型，代表"空值"，代表一个空对象指针，使用`typeof`运算符得到的值为`object`，所以你可以认为他是一个特殊的对象。

undefined： `Undefined`类型，当一个变量声明但未赋值时，得到的就是`undefined`。

## 二十一. 重排与重绘的区别，什么情况下会触发？

- 重排
  - 浏览器下载完页面中的 所有组件(`HTML`、`CSS`、`JavaScript`、`图片`)之后会解析生成两个内部数据结构(`DOM树`和`渲染树`)，`DOM树`表示页面结构，`渲染树`表示`DOM节点`如何显示。重排是`DOM元素`的几何属性变化，`DOM树`的结构变化，`渲染树`需要重新计算。
- 重绘
  - 重绘是一个元素外观的改变所触发的浏览器行为，例如改变`visibility`、`outline`、背景颜色等属性。浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但`table`及其内部元素除外，他可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍的时间，这就是我们尽量避免使用`table`布局页面的原因之一。

1. 简述重绘与重排的关系

   重绘不会引起重排，但重排一定会引起重绘，一个元素的重排通常会带来一系列的反应，甚至触发整个文档的重排和重绘，性能代价是高昂的

2. 什么情况下会触发重排

   - 页面渲染初始化时(这个无法避免)
   - 浏览器窗口改变尺寸
   - 元素尺寸改变时
   - 元素位置改变时
   - 元素内容改变时
   - 添加或删除课件的`DOM`元素时

3. 重排优化的五种办法

   - 将多次改变样式属性的操作合并成一次操作，减少`DOM`访问
   - 如果要批量添加`DOM`，可以先让元素脱离文档流，操作后再带入文档流，这样只会触发一次重排(`fragment`元素的应用)
   - 将需要多次重排的元素，`position`属性设为`absolute`或`fixed`，这样此元素就脱离了文档流，他的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位
   - 由于`display`属性为`none`的元素不在渲染树中，对隐藏元素的操作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成之后再显示。这样只在隐藏和显示时触发两次重排
   - 在内存中多次操作节点，完成后再添加到文档中去。例如要异步获取表格数据，渲染到页面。可以先取得数据后在内存中构建整个表格的`HTML`片段，再一次性添加到文档中去，而不是循环添加每一行。

## 二十二.  jsonp有哪些优缺点

- 优点
  - 它不像`XMLHttprequest` 对象实现的Ajax请求那样受到同源策略的限制，`JSONP`可以跨越同源策略
  - 它的兼容性更好，在更古老的浏览器中都可以运行，不需要`XMLHttpRequest`或`ActiveX`的支持
  - 在请求完毕后可以通过调用`callback`的方式回传结果。将毁掉方法的权限给了调用方。这个就相当于将`controller`层和`view`层分开了。我提供的`jsonp`服务只提供纯服务的数据，至于提供服务以后的页面渲染的后续`view`操作都由掉调用者自己来定义就好了。如果有两个页面需要渲染同一份数据，你们只需要有不同的渲染逻辑就可以了，逻辑都可以使用同一个`jsonp`服务。
- 缺点
  - 他只支持`GET`请求而不支持`POST`等其他类型的`HTTP`请求
  - 她只支持跨域`HTTP`请求这种情况，不能解决不同域的两个页面之间如何进行`javascript`调用的问题
  - `jsonp`在调用失败的时候不会返回各种`HTTP状态码`
  - 安全的问题，万一提供的`jsonp`的服务中存在页面注入的漏洞，即它返回的`javascript`内容被人控制。所以一定要确保`jsonp`接口的安全性问题

## 二十二. 兼容各种浏览器版本的事件绑定

```js
/*
兼容低版本IE，ele为需要绑定事件的元素，
eventName为事件名(保持addEventListener语法，去掉on)，fun为事件响应函数
*/
// 定义一个自定义的事件绑定对象
function addEvent(ele,eventNmae, fun) {
    if (ele.addEventListener) {
        // 判断当前浏览器是否支持addEventListener函数
        ele.addEventListener(eventName, fun, false);
    } else {
        ele.attachEvent("on" + eventName, fun);
      // attachEvent 是IE浏览器兼容的事件绑定语法。但是事件名需要加上on
    }
}
```

## 二十三. new操作符具体干了什么？

```js
function Test(){}
const test = new Test()
```

- 创建一个空对象

 ```js
 const obj = {}
 ```

- 设置原型链

 ```js
 obj.constructor = Test
 obj.__proto__ = Test.prototype
 ```

- 让`Func`中的`this`指向`obj`，并执行`Func`的函数

```js
Test.call(obj)
```

- 判断`Func`的返回值类型

## 二十四. call()和apply()的区别和含义？

含义：

- call： 调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.call(A, args1, args2)`，即A对象调用B对象的方法
- apply： 调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.apply(A, arguments)`，即A对象应用B对象的方法

异同：

- 相同点
  - 方法的含义是一样的，即方法功能是一样的
  - 第一个参数的作用是一样的
- 不同点
  - `call`可以传入多个参数
  - `apply`只能插入两个参数，所以其第二个参数往往是作为数组形式传入

## 二十五. JavaScript中的this指向问题

- 全局环境、普通函数(非严格模式)指向`window`
- 普通函数(严格模式)指向`undefined`
- 函数作为对象方法及院原型链指向的就是上一级的对象
- 构造函数指向构造的对象
- `DOM`事件中指向触发事件的元素
- 箭头函数中与上下文有关

## 二十六. 异步加载JS的方法

- `script`标签中的`async="async"`属性

HTML5中新增的属性，高级浏览器及`IE9`以上的浏览器支持。此外，这种方法不能保证脚本按顺序执行

- `script`标签的`defer="defer"`属性

兼容所有的浏览器，此外这种方法可以确保所有收支`defer`属性的脚本按顺序执行

- 动态创建`script`标签

```js
var s = document.createElement_x("script");
s.type = "text/javascript";
s.src = "http://code.jquery.com/jquery-1.7.2.min.js";
var tmp = document.getElementsByTagName_r("script")[0];
tmp.parentNode.insertBefore(s, tmp);
```

兼容所有浏览器

## 二十七. instanceof有什么作用？

`instanceof`的内部机制是通过判断对象的原型链中是不是能找到类型的`prototype`

使用`instanceof`判断一个对象是否为数组。`instanceof`会判断这个对象的原型链上是否会找到对应的`Array`的原型，找到返回`true`，否则返回`false`。

```js
[] instanceof Array; // true
```

但`instanceof`只能用来判断对象类型，原始类型不可以。并且所有对象类型`instanceof` `Object` 都是 `true`。

```js
[] instanceof Object; // true
```

优点：`instanceof`可以弥补`Object.prototype。toString.call()`不能判断自定义实例化对象的缺点。

缺点：`instanceof`只能用来判断对象类型，原始类型不可以。并且所有对象类型的`instanceof Object` 都是`true`，且不同于其他两种方法的是它不能检测出`iframes`。

```js
function f(name) {
  this.name = name;
}
var f1 = new f("martin");
console.log(f1 instanceof f); //true
```

