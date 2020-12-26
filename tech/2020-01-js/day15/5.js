var fullName="languge";
var obj={
    fullName:'javascript',
    prop:{
        getFullName:function(){
            //obj.prop.fullName;//undefined
            //window.fullName;//"languge"
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());
var test=obj.prop.getFullName;
console.log(test());