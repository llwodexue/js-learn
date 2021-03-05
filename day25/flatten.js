class Model {
    constructor(element) {
        element = element || document;
        this.element = element;
    }
    static position = {
        x: 100,
        y: 200,
    };
    static setPosition(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }
    show() {
        this.element.style.display = "block";
    }
    hide() {
        this.element.style.display = "none";
    }
}
let m = new Model(document.body);