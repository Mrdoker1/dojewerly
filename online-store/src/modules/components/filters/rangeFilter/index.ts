import './style.scss';
import Component from '../../component';
import template from './index.html';
import ComponentBuilder from '../../../view/componentBuilder';
import getHTMLElement from '../../../../utils/getHTMLElement';
import SettingLoader from '../../../controller/settingLoader';
import Settings from '../../../interface/settings';
import Products from '../../../interface/products';
import * as noUiSlider from 'nouislider';
const wNumb = require('wnumb');

interface noUiSliderInstance extends HTMLElement {
    noUiSlider: noUiSlider.API;
}

export default class RangeFilterComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'price-filter';
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let slider = getHTMLElement(getHTMLElement(node).getElementsByClassName('price-slider')[0]);

        noUiSlider.create(slider, {
            start: [0, 700],
            connect: true,
            range: {
                min: 0,
                max: 1000,
            },
            format: wNumb({
                decimals: 0,
                thousand: '',
            }),
        });

        // slider.addEventListener('mousedown', () => {
        //     let value = (slider as noUiSliderInstance).noUiSlider.get() as Array<string>;
        //     console.log(value);
        // });

        slider.addEventListener('click', () => {
            let value = (slider as noUiSliderInstance).noUiSlider.get() as Array<string>;
            let catalog = getHTMLElement(document.querySelector('.catalog'));
            let startRange = getHTMLElement(document.querySelector('.price-filter-start-range'));
            let finishRange = getHTMLElement(document.querySelector('.price-filter-finish-range'));
            startRange.textContent = `£${value[0]}`;
            finishRange.textContent = `£${value[1]}`;
            this.updateComponent(catalog, 'catalog', ...value);
        });

        return node;
    }

    updateComponent(node: HTMLElement, component: string, ...args: Array<string>) {
        let callback = (settings: Settings, products: Products) => {
            let builder = new ComponentBuilder(products, settings);

            for (const key in products.en.products) {
                let price = products.en.products[key].price;
                if (price < parseInt(args[0]) || price > parseInt(args[1])) {
                    delete products.en.products[key];
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
