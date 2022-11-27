箭头函数中尽量不要使用this，如果使用this，最好确保，这个箭头函数不会被赋值给此处之外的其他类和对象
因为：
箭头函数由单纯的定义地方的this，传入其中作为this

```js

 var happy2=new Happy();
 
 happy2.getHappy=(value)=>{
  console.log(this)
 }
 happy2.getTooHappy=(value)=>{
  console.log(this)
  
 }
 happy2.getTooHappy();

 ```
 这里的this都是指向window，因为这里是全局调用

在看一个复杂的案例
```js
class Test {
    name=''
    a = () => {
        // var tto=()=>{console.log(this)}
        // tto();
      console.log(this);
    };
    b() {
        console.log(this);
    }
  }
  class Test2 {
    a = () => {
        var tto=()=>{console.log(this)}
        tto();
      //console.log(this);
    };
   
  }
 class testMkaer{
   static make(){
        var t =new Test();
        var pf= new Proxy(t.a, {
            apply: function (target, thisArg, argumentsList) {
              console.log(thisArg);
              console.log(this)//指向proxy
              console.log(argumentsList);
              target();
            }
        })
        t.b = pf;
        return t;
    }
    static add(t,f) {
        t.a=f;
    }
 } 
  let test1 = testMkaer.make()

  //test1.a(); //指向的是test类
  test1.b(); //指向的也是test类！！！
console.log(test1)
//   let test2= new Test2();
//   testMkaer.add(test1,test2.a)
//   test1.b();

```
特别的，我们关注pf中的this，因为这里实际上是定义Proxy的增加方法，所以console.log此时this的结果是proxy，
而target调用的函数，其并不是在此时被定义，所以依旧是其target的所属对象被创建时传入的this

