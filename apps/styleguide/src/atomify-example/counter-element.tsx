import { Component, Prop } from "@atomify/core";
import { h } from "@atomify/jsx";

@Component({
    tag: "counter-element",
    style: `
        :host {
            display: block;
            background-color: tomato;
        }
    `,
    shadow: true
})
export default class CounterElement extends HTMLElement {
    @Prop({ type: "String" }) title: string = "Hello worldss!";
    @Prop({ reflectToAttribute: true, type: "String" }) type: string = "small";

    sayHello() {
        return "AAAAA";
    }
    render() {
        return <div class="counter-element">{this.title}</div>;
    }
}