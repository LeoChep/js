class Test {
  name = "";
  point = "";
  run() {
    console.log("run");
  }
  runNum(num) {
    console.log("runNumis");
    console.log(num);
    // console.log(num);
    //this.point = num;
  }
}

//handler.addWatcher(watcher);
// var testProxy = new Proxy(test, handler);
// testProxy.addWatcher(watcher);

class ProxyManHandler {
  set(target, prop, value, proxy) {
    proxy._handler._invoke_watchers(
      proxy._handler.watchers_before[prop],
      prop,
      [value, target[prop]]
    );
    var oldVal = target[prop];
    target[prop] = value;
    console.log("setValue");
    proxy._handler._invoke_watchers(proxy._handler.watchers_after[prop], prop, [
      value,
      oldVal,
    ]);
    return true;
  }
  get(target, prop, proxy) {
    //  console.log(prop);
    //console.log(this);
    var type = typeof target[prop];
    if (prop == "_target") return target;
    if (prop == "_handler") return this;
    if (prop == "addWatcher") {
      if (this.addWatcherProxy == undefined)
        this.addWatcherProxy = new Proxy(this.addWatcher, {
          apply: function (target, thisArg, argumentsList) {
            thisArg._handler.addWatcher.apply(thisArg._handler, argumentsList);
            return;
          },
        });
      return this.addWatcherProxy;
    }
    if (type == "function") {
      var newF = new Proxy(target[prop], {
        apply: function (target, thisArg, argumentsList) {
          console.log(target.name);
          console.log(argumentsList);
          thisArg._handler._invoke_watchers(
            thisArg._handler.watchers_before[target.name],
            target.name,
            argumentsList
          );
          var result = target.apply(target, argumentsList);
          console.log("proxy function");
          thisArg._handler._invoke_watchers(
            thisArg._handler.watchers_after[target.name],
            target.name,
            argumentsList
          );

          //console.log(this);
          return result;
        },
      });
      return newF;
    } else return target[prop];
  }
  _invoke_watchers(watchers, prop, argumentsList) {
    console.log("invoke_watcher");
    console.log(watchers);
    var length = watchers == undefined ? 0 : watchers.length;
    console.log;
    for (var i = 0; i < length; i++) {
      watchers[i]["function"].apply(watchers[i]["function"], argumentsList);
    }
  }
  watchers_before = {};
  watchers_after = {};
  addWatcher(watcher, plane) {
    var key = watcher.key;
    console.log("add watcher " + key);
    // console.log(this.watchers);
    var watchers = [];
    if (plane === "before") watchers = this.watchers_before;
    if (plane === "after") watchers = this.watchers_after;
    if (watchers[key] == undefined) watchers[key] = [];
    watchers[key].push(watcher);
    console.log(this);
  }
}

class ProxyMan {
  static getProxy(target) {
    var handler = new ProxyManHandler();
    var testProxy = new Proxy(target, handler);
    return testProxy;
  }
  watch(Proxy,Watcher){}
}

class Watcher {
  constructor(key, f) {
    this.key = key;
    this.function = f;
  }
}
class Happy {
  name = "";
  getMuchHappy() {
    this.getTooHappy()
  }
}
function happy2test(op){
  this.op=op;

}

function proxyTest() {
  var test = new Test();
  var watcher_before = new Watcher("runNum", (value) => {
    console.log("watch_before" + value);
  });


  var watcher_before_setName = new Watcher("name", (newVal, oldVal) => {
    console.log("watch_before " + oldVal + " tobe " + newVal);
  });
  var watcher_after_setName = new Watcher("name", (newVal, oldVal) => {
    console.log("watch_after " + oldVal + " tobe " + newVal);
  });
  //or
  // var watcher = {
  //   key: "runNum",
  //   function: (value) => {
  //     console.log("watch" + value);
  //   },
  // };
  testProxy = ProxyMan.getProxy(test);
  var ars=[]
  for (var i=0;i<=2;i++){
     ars[i] = new Watcher("runNum", function (value) {
      console.log(i)
      console.log(this)
      console.log("watch_after" + value);
    });
        ars[i].op="wcaoop"+i
      //ars.push(watcher_after)
      //testProxy.addWatcher(watcher_after,"after")
  }
  //ars[0]["function"]();
  ars[0]["function"].apply(ars[0],[1])
  testProxy.addWatcher(watcher_before, "before");
  //testProxy.addWatcher(watcher_after, "after");
  testProxy.addWatcher(watcher_before_setName, "before");
  testProxy.addWatcher(watcher_after_setName, "after");
 // testProxy.name = "test";
  console.log(testProxy);
  console.log(testProxy.runNum);
  //for (var i = 0; i < 1000; i++) testProxy.runNum(i);
 // testProxy.name = "cyq";
  var happy = new Happy();
  var happyProxy = ProxyMan.getProxy(happy);
  //happyProxy.addWatcher(watcher_after_setName, "after");
  //happyProxy.name = "cyq";
  testProxy.runNum();
 //testProxy._handler.watchers_after['runNum'][0]["function"]()
 //console.log(testProxy._handler.watchers_after['runNum'][0].op)
 var happy2=new Happy();
 
 happy2.getHappy=(value)=>{
  happy2.getMuchHappy()
 }
 happy2.getTooHappy=(value)=>{
  console.log(this)
  
 }
 //happy2.getTooHappy();
happy2.getMuchHappy()
 //happy2.getHappy.apply(happy2)
  console.log(test);

}