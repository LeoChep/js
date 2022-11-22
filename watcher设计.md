watcher

为什么要watcher

需要监听属性变化

实现watcher和广播

需要早对象中有一个广播，在属性变化时自动发送给所有监听的watcher，所以他本身也需要是一个监听对象的watcher

其格式｛‘watch_prototype’：prototype_name，‘watcher’:[watcherA,watcherB]｝

在需要挂载钩子时，只需要加入到对应的wathcer数组中即可

广播类为TRUE_WATCHER，真正的观察者