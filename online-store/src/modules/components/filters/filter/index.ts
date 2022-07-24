import './style.scss';
import Component from '../../component';
import materialTemplate from './material.html';
import genderTemplate from './gender.html';
import stockTemplate from './stock.html';
import typeTemplate from './type.html';
import SettingLoader from '../../../controller/settingLoader';
import Settings from '../../../interface/settings';
import Products from '../../../interface/products';
import ComponentBuilder from '../../../view/componentBuilder';
import getHTMLElement from '../../../../utils/getHTMLElement';
import getSelectElement from '../../../../utils/getHTMLSelectElement';

export default class FilterComponent extends Component {
    constructor(temp: string = materialTemplate, type?: string) {
        super(temp);
        this.marker = 'filter';
        switch (type) {
            case 'material':
                this.marker = `${type}-${this.marker}`;
                this.template = materialTemplate;
                break;
            case 'gender':
                this.marker = `${type}-${this.marker}`;
                this.template = genderTemplate;
                break;
            case 'stock':
                this.marker = `${type}-${this.marker}`;
                this.template = stockTemplate;
                break;
            case 'type':
                this.marker = `${type}-${this.marker}`;
                this.template = typeTemplate;
                break;
        }
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let component = getSelectElement(getHTMLElement(node).getElementsByClassName('filter-key')[0]);

        component.addEventListener('change', () => {
            let clearButton = document.querySelector('.clear-filter')!;
            let catalog = getHTMLElement(document.querySelector('.catalog'));
            clearButton.classList.remove('disable');

            switch (component.id) {
                case 'materialFilter':
                    this.updateComponent(catalog, 'catalog', component.id, component.value);
                    break;
                case 'genderFilter':
                    this.updateComponent(catalog, 'catalog', component.id, component.value);
                    break;
                case 'stockFilter':
                    this.updateComponent(catalog, 'catalog', component.id, component.value);
                    break;
                case 'typeFilter':
                    this.updateComponent(catalog, 'catalog', component.id, component.value);
                    break;
            }
        });
        return node;
    }

    updateComponent(node: HTMLElement, component: string, ...args: Array<string>) {
        let callback = (settings: Settings, products: Products) => {
            let builder = new ComponentBuilder(products, settings);

            for (const key in products.en.products) {
                if (args[0] == 'materialFilter') {
                    switch (args[1]) {
                        case '1':
                            if (products.en.products[key].props.material != 'silver') {
                                delete products.en.products[key];
                            }
                            break;
                        case '2':
                            if (products.en.products[key].props.material != 'gold') {
                                delete products.en.products[key];
                            }
                            break;
                        case '3':
                            if (products.en.products[key].props.material != 'steel') {
                                delete products.en.products[key];
                            }
                    }
                }
                if (args[0] == 'genderFilter') {
                    switch (args[1]) {
                        case '1':
                            if (products.en.products[key].props.gender != 'man') {
                                delete products.en.products[key];
                            }
                            break;
                        case '2':
                            if (products.en.products[key].props.gender != 'woman') {
                                delete products.en.products[key];
                            }
                            break;
                    }
                }
                if (args[0] == 'stockFilter') {
                    if (products.en.products[key].stock > 0 && args[1] == '2') {
                        delete products.en.products[key];
                    } else if (products.en.products[key].stock >= 0 && args[1] == '1') {
                        delete products.en.products[key];
                    } else if (products.en.products[key].stock <= 0 && args[1] == '0') {
                        delete products.en.products[key];
                    }
                }
                if (args[0] == 'typeFilter') {
                    switch (args[1]) {
                        case '1':
                            if (products.en.products[key].props.type != 'barrette') {
                                delete products.en.products[key];
                            }
                            break;
                        case '2':
                            if (products.en.products[key].props.type != 'ring') {
                                delete products.en.products[key];
                            }
                            break;
                        case '3':
                            if (products.en.products[key].props.type != 'earring') {
                                delete products.en.products[key];
                            }
                            break;
                        case '4':
                            if (products.en.products[key].props.type != 'brooch') {
                                delete products.en.products[key];
                            }
                            break;
                    }
                }
            }
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
}
