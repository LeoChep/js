js的proxy是一个语法糖式的存在，有许多陷阱
proxy的操作，无论如何都无法绕开对应handler，只能经由handler对其进行操作,其本身无法拥有更多的属性与函数（因为任何对proxy的赋值都会触发handler的set），
要么是一个对target对象侵入式的修改，
要么只能在handler上声明更多的属性和方法，而在handler中，正常是无法获取到target对象的（当然可以使用特殊的get来做到），
在handler中，除了get和set，this均指向proxy。但在get和set中，this会指向handler自身

如果想要自由的通过proxy对对象方法前后进行增强，
那么我们需要动态的生成需要的handler，
其get中需要一个后门（可能是propKey为'_target'时），获取proxy的target，
然后动态生成对应target中所有需要增强的方法，
并在增强方法中调用target的原方法,传入对应的参数,
以及在get中指定，如果为特定的propKey时，不调用target的，而是调用handler的
```
class Test{
    name=''
    point=''
    run() {
        console.log('run')
    }
    runNum(num){
        console.log("run"+num)
        this.point='333'
    }
}
var test=new Test();
var handler={
    set (target,prop, value,proxy) {
        if (prop!='proPoint'){
            target[prop]=value
         //   proxy[prop]=value
        }
    
        return true;
    },
   get (target,prop,proxy){
        console.log(prop)
        console.log(this)
        if (prop=='_target')
        return target
        if (prop=="runNum"){

        proxy.proPoint="233"
          return this.runNum}
        else
        return target[prop]
    },
    runNum () {
        console.log(arguments)
        this._target["runNum"].apply(this._target,arguments)
        console.log("proxy runNum")
        console.log(this)
    }
}
var testProxy=new Proxy(test,handler)
function proxyTest() {
    testProxy.name='test'
    console.log(testProxy)
    testProxy.runNum("333")
    console.log(test)

}


```
