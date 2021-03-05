function instance_of(target, ctor) {
    let tType = typeof target,
        cType = typeof ctor;
    // 保证ctor是一个构造函数
    if (cType !== "function" || !ctor.prototype) throw new TypeError("ctor is not a constructor!");
    // 不处理原始值，排除null undefined 字面量
    if (target == null) return false;
    if (!/^(object|function)$/i.test(tType)) return false;
    // 优先检测 Symbol.hasInstance
    if (typeof ctor[Symbol.hasInstance] === "function") {
        return ctor[Symbol.hasInstance](target);
    }
    // 没有这个属性，再按照 ctor.prototype 是否出现在 example 的原型链上检测
    let prototype = Object.getPrototypeOf(target);
    while (prototype) {
        if (prototype == ctor.prototype) return true;
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
}

console.log(instance_of([], Array)); //->true
console.log(instance_of([], RegExp)); //->false
console.log(instance_of([], Object)); //->true