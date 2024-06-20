import {Component} from "vue";

export type Button = {
    component: Component;
    text: string;
    type?: string;
    click: () => void;
}