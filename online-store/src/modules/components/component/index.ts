import template from './index.html';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import Products from '../../interface/products';
import ComponentBuilder from '../../view/componentBuilder';
import getHTMLElement from '../../../utils/getHTMLElement';
import getHTMLMetaElement from '../../../utils/getHTMLMetaElement';
import getElement from '../../../utils/getElement';

export default class Component {
    template: string;
    fragment: DocumentFragment;
    node: Node;
    marker: string;
    constructor(temp: string = template) {
        if (temp && temp.length != 0) this.template = temp;
        else this.template = '{Error rendering component! Template not assigned!}';
        this.marker = 'component';
        this.fragment = this.getFragment();
        this.node = this.getNode();
    }
    updateComponent(node: HTMLElement, component: string, ...args: Array<string>) {
        let callback = (settings: Settings, products: Products) => {
            let builder = new ComponentBuilder(products, settings);
            node.parentNode!.replaceChild(builder.build(component)!, node);
            const event = new CustomEvent('componentUpdated', {
                detail: {
                    component: `${component}`,
                },
            });
            document.dispatchEvent(event);
        };
        let settings: SettingLoader = new SettingLoader();
        settings.load('data/settings.json', callback);
    }
    getFragment(): DocumentFragment {
        const temp = document.createRange().createContextualFragment(this.template);
        return temp;
    }
    getNode(): Node {
        const element = document.createElement('div');
        element.innerHTML = this.template;
        getHTMLElement(element.childNodes[0]).dataset.marker = this.marker;
        return element.childNodes[0];
    }
    getTemplate(): string {
        return this.template;
    }
    includeAll(...templateList: Array<Component>): string {
        let temp = this.template;
        templateList.forEach((component) => {
            temp = temp.replaceAll(`<template>${component.marker}</template>`, component.getTemplate());
        });
        return temp;
    }
    include(...templateList: Array<Component>): string {
        let temp = this.template;
        templateList.forEach((component) => {
            temp = temp.replace(`<template>${component.marker}</template>`, component.getTemplate());
        });
        return temp;
    }
    insert(node: Node = this.getNode(), ...nodeList: Array<Node>): Node {
        if (node.nodeType) {
            let child: Node = node.firstChild!;
            while (child) {
                if (child.nodeType == 1) {
                    if (getElement(child).tagName == 'TEMPLATE') {
                        let templateValue = ((child as HTMLMetaElement).content as unknown as { textContent: string })
                            .textContent;
                        nodeList.forEach((element) => {
                            if (element && (element as HTMLElement).dataset.marker == templateValue) {
                                node.replaceChild(element, child);
                                child = node.firstChild!;
                            }
                        });
                    }
                    this.insert(child, ...nodeList);
                }
                child = child.nextSibling!;
            }
        }
        return node;
    }

    insertAll(node: Node = this.getNode(), ...nodeList: Array<Node>) {
        var loop = function (node: Node) {
            do {
                if ((node as Element).tagName == 'TEMPLATE') {
                    nodeList.forEach((element) => {
                        node.parentNode!.appendChild(element);
                    });
                    node.parentNode?.removeChild(node);
                }
                if (node.hasChildNodes()) loop(node.firstChild!);
            } while ((node = node.nextSibling!));
        };
        loop(node);
        return node;
    }
}
