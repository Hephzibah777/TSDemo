export default class BaseComponent {
    element: HTMLElement;
    constructor() {
       this.element= document.createElement("div");
    }

    render() {
       return this.element;
    }

}