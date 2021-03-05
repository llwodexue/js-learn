// 检测target是否为ctor的实例
function instance_of(target, ctor) {
    let tType = typeof target,
        cType = typeof ctor;
    // 保证ctor是一个构造函数
    if (cType !== "function" || !ctor.prototype) throw new TypeError('Ctor is not a constructor!');
    // 不处理原始值，排除null undefined
    if (target == null) return false;
    // 不处理原始值，排除字面量
    if (!/^(object|function)$/i.test(tType)) return false;
    // 优先检测 Symbol.hasInstance
    if (typeof ctor[Symbol.hasInstance] === "function") return ctor[Symbol.hasInstance](target)
    // 没有这个属性，按照ctor.prototype是否出现在target的原型链上检测
    let prototype = Object.getPrototypeOf(target);
    while (prototype) {
        if (prototype == ctor.prototype) return true
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
}
console.log(instance_of([], Array));
console.log(instance_of([], RegExp));
console.log(instance_of([], Object));