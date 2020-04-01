# JavaScript

## 组成部分

- ECMAscript（核心）
- DOM（Document Object Model）
- BOM（Browser Object Model）

## 书写规范

```html
<scritp>
​	xxxxxxx
</script>
```

```html
<script scr=""></script>
<!--引入外部文件-->
```

## 语法

| 语法             | 功能         | 备注         |
| ---------------- | ------------ | ------------ |
| document.write() | 在页面打印   |              |
| console.log()    | 在控制台输出 | 调式程序     |
| alert()          | 弹窗         | 阻塞程序运行 |
| typeof           | 检测数据类型 |              |

## 变量

关键字：**var**	**let** 	**const**

数据类型：根据值的类型确定数据类型。

| 基本数据类型 | 说明       |
| ------------ | ---------- |
| number       | 数值型     |
| string       | 字符型     |
| boolean      | 布尔型     |
| undefined    | 未定义     |
| null         | 初始化对象 |

| 引用数据类型 | 说明 |
| :----------- | ---- |
| object       | 对象 |
| function     | 函数 |

## 运算符

| 运算符 | 说明   |
| ------ | ------ |
| +      | 加     |
| -      | 减     |
| *      | 乘     |
| /      | 除     |
| %      | 求余数 |

| 单目运算符 | 说明  |
| ---------- | ----- |
| ++         | 自加1 |
| --         | 自减1 |

| 三目运算符                  | 说明                                 |
| --------------------------- | ------------------------------------ |
| 表达式1 ? 表达式2 : 表达式3 | 条件为真执行表达式2，为假执行表达式3 |

| 逻辑运算符 | 说明 |
| ---------- | ---- |
| &&         | 与   |
| \|\|       | 或   |
| !          | 非   |

## 判断

| 判断  | 说明 |
| ----- | ---- |
| if    |      |
| swich |      |

```javascript
//if使用方法
var k = 2;
if(k>2){
	console.log("hhh");
}
else{
	console.log("ggg");
}
```

```javascript
//swich使用方法
var week = 7;
swich(week){
	case 1 : 
		console.log("一");
		brake;
    case 2 : 
		console.log("二");
		brake;
    case 3 : 
        console.log("三");
        brake;
    case 4 : 
        console.log("四");
        brake;
    case 5 : 
        console.log("五");
        brake;
    case 6 : 
        console.log("六");
        brake;
    case 7 : 
        console.log("七");
        brake;
	default :  console.log("输入错误");
}
```

## 循环

### 循环5大要素

1. 循环变量
2. 循环变量的初始
3. 循环变量终止条件
4. 循环变量的自增自减
5. 循环体

| 语法       | 说明         |
| ---------- | ------------ |
| for        | 最常用的循环 |
| while      | 先判断在循环 |
| do...while | 选循环再判断 |
| foreach    | 遍历数组     |
| break      | 跳出整个循环 |
| continue   | 继续执行循环 |

## 函数

### 函数的特点

1. 重复性使用
2. 隐藏内部原理（细节）
3. 选择性应用

### 创建函数

~~~javascript
//关键字
function 函数名称(){

}
~~~

~~~javascript
//字面量
var fn = function(){

}
~~~

~~~javascript
//构造函数
var fn = new Function();
~~~

### 函数的调用

~~~javascript
//函数名
函数名();
~~~

~~~javascript
//事件驱动
document.onclick = function(){
	函数名();
}
~~~

## 参数

| 类型 | 说明                             |
| ---- | -------------------------------- |
| 实参 | 函数在调用的时候用到的参数       |
| 形参 | 函数在制定的时候传递的参数，变量 |

~~~javascript
function fn (形参1,形参2...){

}
fn(实参1,实参2);
~~~

### 返回值

~~~javascript
function sum(n,m){
	return n+m;
}
console.log(sum(10,20));
~~~

> return也用作跳出当前函数体

### 作用域

> 在函数外部无法访问函数内部的变量

## 数组

### 数组的创建

~~~javascript
//字面量
var arr = [];
~~~

~~~javascript
//构造函数
var arr = new Array();
~~~

### 数组的赋值

~~~javascript
//直接赋值
var arr = [];
arr[0] = 'a';
~~~

~~~javascript
//调用方法
var arr = [];
arr.push('222');
~~~

### 数组的遍历

~~~javascript
//使用for循环遍历
var arr = [1,2,3,4,5,6,7,8];
for(var i = 0; i < arr.length; i++){
    console.log(arr[i]);
}
~~~

## DOM的操作

### 获取元素

~~~javascript
var obj = document.getElementById('box');//通过ID获取#box元素
var obj = document.getElementByTagName('div');//通过标签名获取元素

var obj = document.querySelector('#box') //IE低版本不支持
var obj = document.querySelectorAll('div') //获取全部div元素
~~~

### 创建节点

~~~javascript
var obj = document.creatElement('div');
~~~

### 设置样式

~~~javascript
obj.style.top = 30px;
obj.style.color = "#FF0000";
~~~

### 显示节点

~~~javascript
document.body.appendChild(obj);
~~~

### 绑定事件

~~~javascript
节点.obclick = function(){
    //事件处理程序
}
~~~

| 鼠标事件      | 说明               | 备注                                                 |
| ------------- | ------------------ | ---------------------------------------------------- |
| onclick       | 鼠标单击事件       | 必须在当前区域按下再弹起时才会触发                   |
| ondblclick    | 鼠标双击事件       |                                                      |
| oncontextmemu | 鼠标右击事件       |                                                      |
| onmouseover   | 鼠标移入事件       | 经过其子元素时也触发该事件                           |
| onmouseout    | 鼠标移出事件       | 经过其子元素时也触发该事件                           |
| onmouseenter  | 鼠标移入事件       | 经过其子元素时不触发该事件                           |
| onmouseleave  | 鼠标移出事件       | 经过其子元素时不触发该事件                           |
| onmousedown   | 鼠标按下时触发     | 按下立即触发                                         |
| onmousemove   | 鼠标指针移动时触发 | 耗费系统资源                                         |
| onmouseup     | 鼠标弹起的时候触发 | 不管在哪里按下，只要弹起的时候在目标区域上，就会触发 |

| 键盘事件   | 说明         | 备注                 |
| ---------- | ------------ | -------------------- |
| onkeyup    | 键盘抬起事件 |                      |
| onkeydown  | 键盘按下事件 | 任何键都可以响应     |
| onkeypress | 键盘按下事件 | 字母数字键才可以响应 |

| 表单事件 | 说明                       | 备注           |
| -------- | -------------------------- | -------------- |
| onfocus  | 获得焦点                   |                |
| onblur   | 失去焦点                   |                |
| oninput  | 文本框输入事件             | 实时监控文本框 |
| onchange | 文本框失去焦点内容发生改变 |                |
| onsubmit | 表单提交                   | form才有       |

| 其他事件     | 说明       | 备注 |
| ------------ | ---------- | ---- |
| onmousewheel | 滚轮事件   |      |
| onscroll     | 滚动条事件 |      |

### 定时器

我不也不知道定时器为什么放这里，不要在意细节

| 方法名                      | 说明       |
| --------------------------- | ---------- |
| setInterval(函数，时间)     | 设置定时器 |
| clearInterval(定时器的名称) | 清除定时器 |

~~~javascript
//设置定时器
var tiemr = setInterval(function(){
	console.log('111')
},1000)
~~~

~~~javascript
//清除定时器
var count = 1; 
var tiemr = setInterval(function(){
	console.log('111');
    count++;
    if(count > 10){
        clearInterval(timer);
    }
},1000)
~~~

## Cookie

- 大小限制（不超过4K）

- 每个域下cookie不能超过50个

- 有效期和设定时间有关

### 获取Cookie

~~~javascript
document.cookie
~~~

### 设置Cookie

~~~javascript
document.cookie = 'age=18;
~~~

### 设置过期时间

~~~javascript
//设置过期天数
var d = new Date();
d.setDate(d.getDate() + 10);
document.cookie='name=100;path=/;expires='+ d.toGMTString();
//name=100     cookie的值
//path=/       cookie在主域名的所有文件夹下都能访问
//expires      设置cookie过期时间
~~~

### 获取时间方法

~~~javascript
var date = new Date();
    console.log(date.getDate());  //号
    console.log(date.getDay());  //星期中的某一天，使用本地时间。返回值是 0（周日） 到 6（周六）
    console.log(date.getMinutes()); //分钟
    console.log(date.getHours());   //小时
    console.log(date.getMonth());   //月  0-11
    console.log(date.getSeconds()); //秒
    console.log(date.getFullYear()); //年
~~~

## 字符串方法

### 查找字符串

字符串使用 indexOf() 来定位字符串中某一个指定的字符首次出现的位置：

~~~javascript
var str="Hello world, welcome to the universe.";
var n=str.indexOf("welcome");
~~~

如果没找到对应的字符函数返回-1

lastIndexOf() 方法在字符串末尾开始查找字符串出现的位置。

### 内容匹配

**match()**函数用来查找字符串中特定的字符，并且如果找到的话，则返回这个字符。

~~~javascript
var str="Hello world!";
document.write(str.match("world") + "<br>");
document.write(str.match("World") + "<br>");
document.write(str.match("world!"));
~~~

### 替换内容

**replace()** 方法在字符串中用某些字符替换另一些字符。

~~~javascript
str="Please visit Microsoft!"
var n=str.replace("Microsoft","Runoob");
~~~

### 大小写转换

字符串大小写转换使用函数 **toUpperCase()** / **toLowerCase()**:

~~~javascript
var txt="Hello World!";       // String
var txt1=txt.toUpperCase();   // txt1 文本会转换为大写
var txt2=txt.toLowerCase();   // txt2 文本会转换为小写
~~~

### 分割文本

字符串使用**split()**函数分割文本为数组：

~~~javascript
txt="a,b,c,d,e"  // String
txt.split(",");  // 使用逗号分隔
txt.split(" ");  // 使用空格分隔
txt.split("|");  // 使用竖线分隔 
~~~

### charAt()

charAt() 方法可返回指定位置的字符

~~~javascript
var str="Hello world!"
document.write(str.charAt(1))
//输出e
~~~

### charCodeAt() 

charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。

```javascript
var str="Hello world!"
document.write(str.charCodeAt(1)
//输出101
```

## localStorage

- 没有过期时间
- 没有域的限制
- 存储量在5M
- 只能存储字符串

### 永久储存

#### 存储

~~~javascript
localStorage.name = 'name';
localStorage['age'] = '18';
localStorage.setItem('sex','nan');
~~~

#### 读取

~~~javascript
localStorage.name;
localStorage['age'];
localStorage.setItem('sex');
~~~

#### 删除

~~~javascript
localStorage.removeItem('name');
~~~

### 临时存储

> 使用sessionStorage即可

## AJAX

### 优势

- 优化用户体验（异步状态）
- 实现网页某个板块的数据刷新
- 提高运行效率

### 工作流程

通过对象XMLHttpRequest  代理完成数据交互

> 前后端交互的一个桥梁

### 使用方法

~~~javascript
var xhr = new XMLHttpRequest();
xhr.open('get','url');
//open参数  1:post/get  2:接口（数据请求地址） 3：布尔值（可选）

xhr.send();//发送

//监测状态： ajax状态  服务端状态
~~~

#### AJAX状态码

| 状态码 | 说明                                           |
| ------ | ---------------------------------------------- |
| 0      | 初始化，尚未调用open()方法                     |
| 1      | 调用open()，已经调用send()的方法，正在发送请求 |
| 2      | 发送：已经调用send()方法，已接收到响应         |
| 3      | 解析正在解析响应数据                           |
| 4      | 成功                                           |

#### 服务器状态码

| 状态码 | 说明           |
| ------ | -------------- |
| 200    | 成功           |
| 301    | 永久重定向     |
| 404    | 未找到对应文件 |
| 500    | 服务器错误     |

## 其他常用

随便写的一些当时学的时候常用的

| 方法/属性                        | 说明                     |
| -------------------------------- | ------------------------ |
| parseInt()                       | 将数值转换为整数         |
| Math.random()                    | 取0-1之间的数(不包括1)   |
| document.createElement('标签名') | 生成一个标签对象         |
| 对象.innerHTML = 文本            | 修改标签的文本           |
| 父对象.appendChild(对象)         | 将对象元素添加到父对象里 |
