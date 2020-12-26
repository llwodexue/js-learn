

/* 
{
  name:zhufeng,
  age:10,
  id:14
}

*/
var  str ="https://www.baidu.com?name=zhufeng&age=10&id=14";
function getParms(str){
    var obj={};
    //"name=zhufeng&age=10&id=14"
    var strParms=str.split("?")[1];//["https://www.baidu.com","name=zhufeng&age=10&id=14"]
    var strAry=strParms.split("&");//["name=zhufeng","age=10","id=14"]
    for(var i=0;i<strAry.length;i++){
       var item=strAry[i];//"name=zhufeng"
       var key=item.split("=");//["name","zhufeng"]
       obj[key[0]]=key[1];
    }
    return obj;
}

var res=getParms(str);
console.log(res);