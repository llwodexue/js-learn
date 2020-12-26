function Fn() {
    this.age = 14;
    this.name = "lion";
}
Fn.prototype.category = "animal";
var f = new Fn();

function hasOwnPublicProperty(obj, attr) {
    return attr in obj && !obj.hasOwnProperty(attr)?true:false
}
console.log(hasOwnPublicProperty(f, "category"));

// Object.prototype.hasOwnPublic = function (attr) {
//     if (attr in this) {
//         if (!this.hasOwnProperty(attr)) {
//             return true;
//         }
//     }
//     return false;
// };