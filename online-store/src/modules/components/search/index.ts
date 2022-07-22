import './style.scss';
import Component from '../component';
import template from './index.html';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import Products from '../../interface/products';
import ComponentBuilder from '../../view/componentBuilder';

export default class SearchComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'search';
        this.node = this.getNode();
    }
    getNode(): Node {
        let node = super.getNode();
        let search = (node as HTMLElement).getElementsByClassName('search-field')[0] as HTMLInputElement;

        document.addEventListener('pageBuilded', () => {
            search.focus();
        });

        search.addEventListener('input', (e) => {
            let catalog = document.querySelector('.catalog') as HTMLElement;
            this.updateComponent(catalog, 'catalog', search.value);
        });
        return node;
    }

    updateComponent(node: HTMLElement, component: string, ...args: Array<string>) {
        let callback = (settings: Settings, products: Products) => {
            for (const key in products.en.products) {
                let productName = products.en.products[key].name.toLowerCase();
                let productInfo = products.en.products[key].props.info.toLowerCase();

                if (!productName.includes(args[0].toLowerCase()) && !productInfo.includes(args[0].toLowerCase())) {
                    delete products.en.products[key];
                }
            }

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
}
