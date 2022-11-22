vue中创建一个响应式的对象，该对象由其他js提供

```vue
 var app=createApp({
    setup(){
      const sceneContoller = ref(sceneController)
      const getScene=computed(()=>sceneContoller.value.scene)
      return{ getScene,sceneContoller}
    },
  }).mount('#app')
  console.log(app.sceneContoller.scene)
  sceneController=app.sceneContoller
```

方法：通过组合式api，以及ref(),声明一个响应变量，其为需要被响应化的对象的代理，**同时要在反向将原对象赋值为新创建的响应变量**

原理：ref（）会创造一个响应变量，但是新创造的响应变量是一个新的代理对象，而不是原来的对象，所以对于原来对象的更改，并不会影响到被vue监听的响应对象，所以我们需要将vue监听的响应对象赋值给旧的变量。这是一个代理对象，所以并不会印象到他的其他功能。

缺点：由于改变了实际上对象的地址，所以持有旧对象的其他对象，就会对错误的对象进行更改。

