var name="珠峰培训";
function fn(){
   console.log(this.name);// obj.name  "你好世界"
                          // window.name "珠峰培训"
                          // window.name "珠峰培训"
}
var obj={
  name:"你好世界",
  fn:fn
}
obj.fn();
fn();

(function(){
  this.fn(); // this =window
})();