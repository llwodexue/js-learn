var flag=996;
function person(fg){
    let o = new Object();
    o.flag = fg;
    o.getval=()=>{
        console.log(this);
    }
    this.a = 1;
    console.log("^^^^^^");
    console.log(this);
    console.log("^^^^^^");
    return o;
}
var pp = new person("251")
pp.getval();
console.log("&&&&&&&");
console.log(pp);
console.log("&&&&&&&");