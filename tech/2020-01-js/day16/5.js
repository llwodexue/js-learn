

var obj={
    name:"li"
}

obj.hasOwnProperty("name");
[1,2,3].hasOwnProperty("length");

Object.prototype.hasPublicPro=function(attr){
    //this 
    return attr in this&&!this.hasOwnProperty(attr)?true:false;

}


obj.hasPublicPro("name");
[1,2,3].hasPublicPro("length")

