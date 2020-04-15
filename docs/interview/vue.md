# Vue篇

## 一. watch 和 computed 和 methods 区别是什么？

### watch

用法：监听一个值，当值发生变化的时候，可以执行一个函数。

::: details 点击查看示例

```html
<div>
      <p>FullName: {{fullName}}</p>
      <p>FirstName: <input type="text" v-model="firstName"></p>
</div>
```

```js
new Vue({
  el: '#root',
  data: {
    firstName: 'Dawei',
    lastName: 'Lou',
    fullName: ''
  },
  watch: {
    firstName(newName, oldName) {
      this.fullName = newName + ' ' + this.lastName;
// 监听firstName的值
// 方法中有两个参数，一个个是改变后的值，第二个是改变前的值
    }
  } 
})
```

:::

::: danger 注意

**不应该使用箭头函数来定义 watcher 函数** (例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.updateAutocomplete` 将是 undefined。

:::

### computed

用法：当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。

所以，对于任何复杂逻辑，你都应当使用**计算属性**。

::: details 点击查看示例

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.message.split('').reverse().join('')
    }
  }
})
```

:::

::: tip 注意

计算属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。注意，如果某个依赖 (比如非响应式属性) 在该实例范畴之外，则计算属性是**不会**被更新的。

:::

### methods

用法：`methods` 将被混入到 `Vue` 实例中。可以直接通过 `VM` 实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 `Vue` 实例。

::: details 点击展开示例

```js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})
vm.plus()
vm.a // 2
```

:::

::: danger 注意

注意，**不应该使用箭头函数来定义 method 函数** (例如 `plus: () => this.a++`)。理由是箭头函数绑定了父级作用域的上下文，所以 `this` 将不会按照期望指向 Vue 实例，`this.a` 将是 undefined。

:::

### 区别

`computed`是在`HTML` `DOM`加载后马上执行的，如赋值

`methods`则必须要有一定的触发条件才能执行，如点击事件

`watch`则是用于观察`Vue`实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项。

所以他们的执行顺序为：默认加载的时候先`computed`再`watch`，不执行`methods`；等触发某一事件后，则是：先`methods`再`watch`。

`computed` vs `watched` ：Vue 确实提供了一种更通用的方式来观察和响应 `Vue` 实例上的数据变动：`watch` 属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 `watch`，通常更好的想法是使用 `computed` 属性而不是命令式的 `watch` 回调。

## 二. Vue 有哪些生命周期钩子函数？分别有什么用？

- beforecreated：

   实例初始化之后，this指向创建的实例，不能访问到`data`、`computed`、`watch`、`methods`上的方法和数据

- created：

  实例创建完成，可访问`data`、`computed`、`watch`、`methods`上的方法和数据，未挂载到`DOM`，不能访问到`$el`属性，`$ref`属性内容为空数组

- beforeMount：

  在挂载开始之前被调用，`beforeMount`之前，会找到对应的`template`，并编译成`render`函数

- mounted：

   实例挂载到DOM上，此时可以通过`DOM API`获取到`DOM`节点，`$ref`属性可以访问

- beforeUpdate： 

  响应式数据更新时调用，发生在虚拟`DOM`打补丁之前

- updated：

  虚拟 `DOM` 重新渲染和打补丁之后调用，组件`DOM`已经更新，可执行依赖于`DOM`的操作

- beforeDestroy：

  实例销毁之前调用。这一步，实例仍然完全可用，`this`仍能获取到实例

- destroyed：

  实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

**总结**

`beforecreate`：可以在这加个loading事件

`created` ：在这结束loading，还做一些初始化，实现函数自执行

`mounted` ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情

`beforeDestroy`： 你确认删除XX吗？ destroyed ：当前组件已被删除，清空相关内容

## 三. Vue 如何实现组件间通信？

### 父组件向子组件传值

::: details 点击展开示例

```vue
<!--App.vue父组件-->
<template>
  <div id="app">
    <users v-bind:users="users"></users>
<!--前者自定义名称便于子组件调用，后者要传递数据名-->
  </div>
</template>
<script>
import Users from "./components/Users"
export default {
  name: 'App',
  data(){
    return{
      users:["Henry","Bucky","Emily"]
    }
  },
  components:{
    "users":Users
  }
}
```

```vue
<!--users子组件-->
<template>
  <div class="hello">
    <ul>
      <li v-for="user in users">{{user}}</li>
        <!--遍历传递过来的值，然后呈现到页面-->
    </ul>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  props:{
    users:{           
      //这个就是父组件中子标签自定义名字
      type:Array,
      required:true
    }
  }
}
</script>
```

:::

总结：父组件通过`props`向下传递数据给子组件。注：组件中的数据共有三种形式：`data`、`props`、`computed`

### 子组件向父组件传值（通过事件形式）

::: details 点击展开示例

```vue
<!--父组件-->
<template>
  <div id="app">
    <app-header v-on:titleChanged="updateTitle" ></app-header>
   <!--与子组件titleChanged自定义事件保持一致-->
   <!--updateTitle($event)接受传递过来的文字-->
    <h2>{{title}}</h2>
  </div>
</template>
<script>
import Header from "./components/Header"
export default {
  name: 'App',
  data(){
    return{
      title:"传递的是一个值"
    }
  },
  methods:{
    updateTitle(e){   //声明这个函数
      this.title = e;
    }
  },
  components:{
   "app-header":Header,
  }
}
</script>
```

```vue
<!--子组件-->
<template>
  <header>
    <h1 @click="changeTitle">{{title}}</h1>
	<!--绑定一个点击事件-->
  </header>
</template>
<script>
export default {
  name: 'app-header',
  data() {
    return {
      title:"Vue.js Demo"
    }
  },
  methods:{
    changeTitle() {
      this.$emit("titleChanged","子向父组件传值");//自定义事件  传递值“子向父组件传值”
    }
  }
}
</script>
```

:::

总结：子组件通过`events`给父组件发送消息，实际上就是子组件把自己的数据发送到父组件。

### $emit/$on(全组件传值)

这种方法通过一个空的`Vue`实例作为中央事件总线（事件中心），用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级。

#### 实现方式

```js
var Event=new Vue();
Event.$emit(事件名,数据);
Event.$on(事件名,data => {});
```

::: details 点击展开示例
```vue
<div id="itany">
	<my-a></my-a>
	<my-b></my-b>
	<my-c></my-c>
</div>
<template id="a">
  <div>
    <h3>A组件：{{name}}</h3>
    <button @click="send">将数据发送给C组件</button>
  </div>
</template>
<template id="b">
  <div>
    <h3>B组件：{{age}}</h3>
    <button @click="send">将数组发送给C组件</button>
  </div>
</template>
<template id="c">
  <div>
    <h3>C组件：{{name}}，{{age}}</h3>
  </div>
</template>
<script>
var Event = new Vue();//定义一个空的Vue实例
var A = {
	template: '#a',
	data() {
	  return {
	    name: 'tom'
	  }
	},
	methods: {
	  send() {
	    Event.$emit('data-a', this.name);
	  }
	}
}
var B = {
	template: '#b',
	data() {
	  return {
	    age: 20
	  }
	},
	methods: {
	  send() {
	    Event.$emit('data-b', this.age);
	  }
	}
}
var C = {
	template: '#c',
	data() {
	  return {
	    name: '',
	    age: ""
	  }
	},
	mounted() {//在模板编译完成后执行
	 Event.$on('data-a',name => {
	     this.name = name;//箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
	 })
	 Event.$on('data-b',age => {
	     this.age = age;
	 })
	}
}
var vm = new Vue({
	el: '#itany',
	components: {
	  'my-a': A,
	  'my-b': B,
	  'my-c': C
	}
});	
</script>
```
:::

### Vuex

请看第六题

## 四. Vue 数据响应式怎么做到的？

待添加...

## 五. Vue.set 是做什么用的？

待添加...

## 六. Vuex 你怎么用的？

待添加...

## 七. VueRouter 你怎么用的？

待添加...

## 八. 路由守卫是什么？

待添加...