# JavaScript(ES6)

记录ES6一些新特性，新方法。

## 关于Promise

### 什么是 Promise？

- `Promise` 是`JavaScript`编程`ES6`中新增的对象,是用于异步编程的解决方案，最早由社区提出。`Promise/A+` 规范是`JavaScript` `Promise` 的标准，规定了一个`Promise`所必须具备的特性

### Promise 详解

- `Promise`是一个构造函数，接收一个函数作为参数，返回一个`Promise`实例，一个`Promise`实例中有三种状态，分别是 `pending`、`resolved`和`rejected`，分别代表`进行中`、`已成功`和`已失败`。实例的状态只能由`pending`转变`resolved`或者`rejected`状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变时通过`resolve()`和`reject()`函数来实现的，我们可以在异步操作结束后调用这两个函数来改变`Promise`实例的状态，它的原型上定义了一个`then`方法，使用这个`then`方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。

### Promise 的特点

1.  对象的状态不受外界影响。`Promise` 对象代表一个异步操作。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 Promise 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
2.  一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 `resolved`（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

### Promise 的缺点

1.  一旦执行，则无法取消
2.  如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部
3.  当处于 `pending` 状态时，无法得知目前进展到哪一阶段

---

### Promise 的基本用法

下面代码创建了一个 `Promise` 实例

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 `JavaScript` 引擎提供，不用自己部署。
`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 `pending` 变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```js
promise.then(
  function (value) {
    // success
  },
  function (error) {
    // failure
  }
);
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是`Promise`对象的状态变为`resolved`时调用，第二个回调函数是`Promise`对象的状态变为`rejected`时调用。其中，第二个函数是可选的，不一定要提供。这两个函数都接受 `Promise` 对象传出的值作为参数。**所以 then 方法中也可以捕获异常！**`Promise` 新建后就会立即执行。

```js
let promise = new Promise(function (resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function () {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

上面代码中，`Promise` 新建后立即执行，所以首先输出的是`Promise`。然后，`then`方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以`resolved`最后输出。

---

### Promise 的原型方法

- ### Promise.prototype.then()

  `Promise` 实例具有`then`方法，也就是说，`then`方法是定义在原型对象`Promise.prototype`上的。

  它的作用是为 `Promise` 实例添加状态改变时的回调函数。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数。

  `then`方法返回的是一个新的`Promise`实例（注意，不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法。

  ```js
  getJSON('/posts.json')
    .then(function (json) {
      return json.post;
    })
    .then(function (post) {
      // ...
    });
  ```

- ### Promise.prototype.catch()

  `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

  ```js
  getJSON('/posts.json')
    .then(function (posts) {
      // ...
    })
    .catch(function (error) {
      // 处理 getJSON 和 前一个回调函数运行时发生的错误
      console.log('发生错误！', error);
    });
  ```

  上面代码中，`getJSON()`方法返回一个 `Promise` 对象，如果该对象状态变为`resolved`，则会调用`then()`方法指定的回调函数；如果异步操作抛出错误，状态就会变为`rejected`，就会调用`catch()`方法指定的回调函数，处理这个错误。另外，`then()`方法指定的回调函数，如果运行中抛出错误，也会被`catch()`方法捕获。
  一般总是**建议**，`Promise` 对象后面要跟`catch()`方法，这样可以处理 `Promise` 内部发生的错误。`catch()`方法返回的还是一个 `Promise` 对象，因此后面还可以接着调用`then()`方法。

- ### Promise.prototype.finally()

  `finally()`方法用于指定**不管** `Promise` 对象最后状态如何，都会执行的操作。该方法是 `ES2018` 引入标准的。

  ```js
  promise
  .then(result => {···})
  .catch(error => {···})
    .finally(() => {···});
  ```

  上面代码中，不管`promise`最后的状态，在执行完`then`或`catch`指定的回调函数以后，都会执行`finally`方法指定的回调函数。

---

### Promise 对象方法

- ### Promise.all()

  `Promise.all()`方法用于将多个 `Promise` 实例，包装成一个新的 `Promise` 实例。只有这传入**所有的实例**的状态都变成`fulfilled`，或者其中有一个变为`rejected(失败)`，才会调用`Promise.all`方法后面的回调函数。

  ```js
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
    .then((result) => result)
    .catch((e) => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
    .then((result) => result)
    .catch((e) => e);
  
  Promise.all([p1, p2])
    .then((result) => console.log(result))
    .catch((e) => console.log(e));
  // ["hello", Error: 报错了]
  ```

  上面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数。
  **注**：如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。

- ### Promise.race()

  `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

  ```javascript
  const p = Promise.race([p1, p2, p3]);
  ```

  上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

  ```javascript
  const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), 5000);
    }),
  ]);
  
  p.then(console.log).catch(console.error);
  ```

  上面代码中，如果 5 秒之内`fetch`方法无法返回结果，变量`p`的状态就会变为`rejected`，从而触发`catch`方法指定的回调函数。

- ### Promise.allSettled()

  `Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 `Promise` 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。该方法由 [ES2020](https://github.com/tc39/proposal-promise-allSettled) 引入。

  有时候，我们不关心异步操作的结果，只关心这些操作有没有结束。这时，`Promise.allSettled()`方法就很有用。如果没有这个方法，想要确保所有操作都结束，就很麻烦。`Promise.all()`方法无法做到这一点。

  ```js
  const resolved = Promise.resolve(42);
  const rejected = Promise.reject(-1);
  
  const allSettledPromise = Promise.allSettled([resolved, rejected]);
  
  allSettledPromise.then(function (results) {
    console.log(results);
  });
  // [
  //    { status: 'fulfilled', value: 42 },
  //    { status: 'rejected', reason: -1 }
  // ]
  ```

- ### Promise.any()

  `Promise.any()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。该方法目前是一个第三阶段的[提案](https://github.com/tc39/proposal-promise-any) 。

  `Promise.any()`跟`Promise.race()`方法很像，只有一点不同，就是不会因为某个 Promise 变成`rejected`状态而结束。

  ```javascript
  const promises = [
    fetch('/endpoint-a').then(() => 'a'),
    fetch('/endpoint-b').then(() => 'b'),
    fetch('/endpoint-c').then(() => 'c'),
  ];
  try {
    const first = await Promise.any(promises);
    console.log(first);
  } catch (error) {
    console.log(error);
  }
  ```

  上面代码中，`Promise.any()`方法的参数数组包含三个 Promise 操作。其中只要有一个变成`fulfilled`，`Promise.any()`返回的 Promise 对象就变成`fulfilled`。如果所有三个操作都变成`rejected`，那么`await`命令就会抛出错误。

- ### Promise.resolve()

  有时需要将现有对象转为 `Promise` 对象，`Promise.resolve()`方法就起到这个作用。

  ```javascript
  const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  ```

  上面代码将 jQuery 生成的`deferred`对象，转为一个新的 Promise 对象。

  `Promise.resolve()`等价于下面的写法。

  ```javascript
  Promise.resolve('foo');
  // 等价于
  new Promise((resolve) => resolve('foo'));
  ```

- ### Promise.reject()

  `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

  ```javascript
  const p = Promise.reject('出错了');
  // 等同于
  const p = new Promise((resolve, reject) => reject('出错了'));
  
  p.then(null, function (s) {
    console.log(s);
  });
  // 出错了
  ```

  上面代码生成一个 `Promise` 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

### 手写 Promise

```js
const PENDING = 'pengding';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn) {
  // 保存初始状态
  var self = this;
  // 初始化状态
  this.state = PENDING;
  // 用于保存resolve 或者 rejected 传入的值
  this.value = null;
  // 用于保存 resolve 的回调函数
  this.resolvedCallbacks = [];
  // 用于保存 reject 的回调函数
  this.rejectedCallbacks = [];
  // 状态转变为resolved 方法
  function resolve(value) {
    // 判断传入的元素是否为Promise 值，如果是，则改变状态必须等待前一个状态改变后在进行改变
    if (value instanceof MyPromise) {
      return value.then(resolve, reject);
    }
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = RESOLVED;
        //修改传入的值
        self.value = value;
        // 执行回调函数
        self.resolvedCallbacks.forEach((callbakc) => {
          callback(value);
        });
      }
    }, 0);
  }
  // 状态转变为 rejected 时的方法
  function reject(value) {
    // 保证代码的执行顺序为本轮事件循环的末尾
    setTimeout(() => {
      // 只有状态为pending 时才能转变
      if (self.state === PENDING) {
        // 修改状态
        self.state = REJECTED;
        // 设置传入的值
        self.value = value;
        // 执行回调函数
        self.rejectedCallbacks.forEach((callback) => {
          callback(value);
        });
      }
    }, 0);
  }
  // 将两个方法传入函数执行
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  // 首先判断两个参数是否为函数类型，因为这两个参数是可选参数
  onResolved =
    typeof onResolved === 'function'
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function (error) {
          throw error;
        };
  // 如果是等待状态，则将函数加入到对应列表中
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(onResolved);
    this.rejectedCallbacks.push(onRejected);
  }
  // 如果状态已经凝固，则直接执行对应状态的函数
  if (this.state === RESOLVED) {
    onResolved(this.value);
  }
  if (this.state === REJECTED) {
    onRejected(this.value);
  }
};
```

---

> 