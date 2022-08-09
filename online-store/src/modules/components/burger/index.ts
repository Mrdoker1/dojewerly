import template from './index.html';
import Component from '../component';
import PageBuilder from '../../view/pageBuilder';
import SettingLoader from '../../controller/settingLoader';
import Settings from '../../interface/settings';
import ProductList from '../../interface/productList';
import './style.scss';

export default class BurgerComponent extends Component {
    constructor(temp: string = template) {
        super(temp);
        this.marker = 'burger';
        this.node = this.getNode();
    }

    getNode(): Node {
        let node = super.getNode();
        const barrette = (node as HTMLElement).getElementsByClassName('menu-barrette')[0] as HTMLElement;
        const rings = (node as HTMLElement).getElementsByClassName('menu-rings')[0] as HTMLElement;
        const brooch = (node as HTMLElement).getElementsByClassName('menu-brooch')[0] as HTMLElement;

        barrette.addEventListener('click', () => {
            let callback = (settings: Settings, productList: ProductList) => {
                for (const key in productList) {
                    if (productList[key].props.type != 'barrette') {
                        delete productList[key];
                    }
                }
                let builder = new PageBuilder();
                builder.build('catalog-page', productList, settings);
            };

            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });

        rings.addEventListener('click', () => {
            let callback = (settings: Settings, productList: ProductList) => {
                for (const key in productList) {
                    if (productList[key].props.type != 'ring') {
                        delete productList[key];
                    }
                }
                let builder = new PageBuilder();
                builder.build('catalog-page', productList, settings);
            };

            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });

        brooch.addEventListener('click', () => {
            let callback = (settings: Settings, productList: ProductList) => {
                for (const key in productList) {
                    if (productList[key].props.type != 'brooch') {
                        delete productList[key];
                    }
                }
                let builder = new PageBuilder();
                builder.build('catalog-page', productList, settings);
            };

            let settings: SettingLoader = new SettingLoader(true);
            settings.load('data/settings.json', callback);
        });


        return node;
    }
}
