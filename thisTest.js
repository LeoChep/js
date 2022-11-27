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
              console.log(this)
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

